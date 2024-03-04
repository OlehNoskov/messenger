package com.example.server.controller;

import com.example.server.config.security.CustomUserDetails;
import com.example.server.entity.User;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/current")
    @ResponseStatus(HttpStatus.OK)
    public User getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return userService.getCurrentUserByUsername(currentUser.getUsername());
    }

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getFriendsByName(@PathVariable String username) {
        return userService.getFriendsByUsername(username);
    }
}
