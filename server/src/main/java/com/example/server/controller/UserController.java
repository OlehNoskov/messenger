package com.example.server.controller;

import com.example.server.config.security.CustomUserDetails;
import com.example.server.dto.request.UserDto;
import com.example.server.mapper.UserDtoMapper;
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
    private final UserDtoMapper userDtoMapper;

    @GetMapping("/current")
    public UserDto getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return userDtoMapper.mapUserDtoToUser(userService.getCurrentUserByUsername(currentUser.getUsername()));
    }

    @GetMapping("/{username}")
    public List<UserDto> getFriends(@PathVariable String username) {
        return userService.getFriendsByUsername(username).stream().map(userDtoMapper::mapUserDtoToUser).toList();
    }

    @GetMapping("/all")
    public List<UserDto> getUsers() {
        return userService.getUsers().stream()
                .map(userDtoMapper::mapUserDtoToUser)
                .collect(Collectors.toList());
    }
}
