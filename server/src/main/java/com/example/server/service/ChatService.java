package com.example.server.service;

import com.example.server.entity.Chat;

import java.util.List;

public interface ChatService {

    Chat save(Chat chat);

    List<Chat> findChatBySenderNameOrReceiverName(String senderName, String receiverName);
}
