package com.example.server.controller;

import com.example.server.config.security.CustomUserDetails;
import com.example.server.entity.Chat;
import com.example.server.entity.User;
import com.example.server.service.ChatService;
import com.example.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ChatService chatService;

    @GetMapping("/current")
    @ResponseStatus(HttpStatus.OK)
    public User getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return userService.getCurrentUserByUsername(currentUser.getUsername());
    }

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public List<User> getFriend(@PathVariable String username) {
        return userService.getFriendsByUsername(username);
    }

    @PostMapping("/create/chat")
    @ResponseStatus(HttpStatus.CREATED)
    public Chat createChat(@RequestBody Chat chat) {
        return chatService.save(chat);
    }

    @GetMapping("/chat/{userName}")
    @ResponseStatus(HttpStatus.OK)
    public List<Chat> findChats(@PathVariable String userName) {
        return chatService.findChatBySenderNameOrReceiverName(userName, userName);
    }
}
