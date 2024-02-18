package com.example.server.service.impl;

import com.example.server.dto.request.ChatDto;
import com.example.server.entity.Chat;
import com.example.server.repository.ChatRepository;
import com.example.server.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;

    @Override
    public Chat save(ChatDto chat) {
        Chat newChat = Chat
                .builder()
                .senderName(chat.getSenderName())
                .receiverName(chat.getReceiverName())
                .build();


        boolean isExistChat = chatRepository.existsBySenderNameAndAndReceiverName(newChat.getSenderName(), newChat.getReceiverName())
                || chatRepository.existsBySenderNameAndAndReceiverName(newChat.getReceiverName(), newChat.getSenderName());

        return isExistChat
                ? chatRepository.findChatBySenderNameAndReceiverName(newChat.getSenderName(), newChat.getReceiverName()).get()
                : chatRepository.save(newChat);
    }

    @Override
    public List<Chat> findChatBySenderNameOrReceiverName(String senderName, String receiverName) {
        return chatRepository.findChatBySenderNameOrReceiverName(senderName, receiverName);
    }

    @Override
    public List<Chat> findAll() {
        return chatRepository.findAll();
    }
}
