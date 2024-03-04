package com.example.server.service.impl;

import com.example.server.entity.Chat;
import com.example.server.entity.User;
import com.example.server.repository.ChatRepository;
import com.example.server.repository.UserRepository;
import com.example.server.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    @Override
    public Chat save(Chat chat) {
        boolean isExistChat = chatRepository.existsBySenderNameAndAndReceiverName(chat.getSenderName(), chat.getReceiverName())
                || chatRepository.existsBySenderNameAndAndReceiverName(chat.getReceiverName(), chat.getSenderName());

        return isExistChat
                ? chatRepository.findChatBySenderNameAndReceiverName(chat.getSenderName(), chat.getReceiverName()).get()
                : chatRepository.save(chat);
    }

    @Override
    public List<Chat> findAllChatsByUserName(String username) {
        User user = userRepository.findByUsername(username).get();

        return user.getChats();
    }
}
