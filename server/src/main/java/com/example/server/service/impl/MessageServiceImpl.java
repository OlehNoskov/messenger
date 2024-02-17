package com.example.server.service.impl;

import com.example.server.entity.Message;
import com.example.server.repository.MessageRepository;
import com.example.server.service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Override
    public Message save(Message message) {
        return messageRepository.save(message);
    }
}
