package com.example.server.controller;

import com.example.server.entity.Message;
import com.example.server.repository.MessageRepository;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final MessageRepository messageRepository;

    @MessageMapping("/chat")
    public Message message(@Payload Message message) {
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/queue/messages", message);
        messageRepository.save(message);
        return message;
    }
}
