package com.example.server.service;

import com.example.server.dto.request.ChatDto;
import com.example.server.entity.Chat;

import java.util.List;

public interface ChatService {

    Chat save(ChatDto chat);

    List<Chat> findChatBySenderNameOrReceiverName(String senderName, String receiverName);

    List<Chat> findAll();
}
