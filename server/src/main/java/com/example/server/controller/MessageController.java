package com.example.server.controller;

import com.example.server.entity.Message;
import com.example.server.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final MessageService messageService;

    @MessageMapping("/chat")
    public Message message(@Payload Message message) {
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/queue/messages", message);
        messageService.save(message);

        return message;
    }
}
