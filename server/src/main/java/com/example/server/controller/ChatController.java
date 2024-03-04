package com.example.server.controller;

import com.example.server.entity.Chat;
import com.example.server.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Chat createChat(@RequestBody Chat chat) {
        return chatService.save(chat);
    }

    @GetMapping("/all/{userName}")
    @ResponseStatus(HttpStatus.OK)
    public List<Chat> findChats(@PathVariable String userName) {
        return chatService.findAllChatsByUserName(userName);
    }
}
