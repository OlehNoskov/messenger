package com.example.server.controller;

import com.example.server.config.security.CustomUserDetails;
import com.example.server.dto.request.UserDto;
import com.example.server.mapper.UserMapper;
import com.example.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/current")
    public UserDto getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return userMapper.toUserDto(userService.getCurrentUserByUsername(currentUser.getUsername()));
    }

    @GetMapping("/{username}")
    public List<UserDto> getFriends(@PathVariable String username) {
        return userService.getFriendsByUsername(username).stream().map(userMapper::toUserDto).toList();
    }

    @GetMapping("/all")
    public List<UserDto> getUsers() {
        return userService.getUsers().stream()
                .map(userMapper::toUserDto)
                .collect(Collectors.toList());
    }
}
