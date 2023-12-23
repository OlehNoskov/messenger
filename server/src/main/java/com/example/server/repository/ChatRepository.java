package com.example.server.repository;

import com.example.server.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    boolean existsBySenderNameAndAndReceiverName(String senderName, String receiverName);

    Optional<Chat> findChatBySenderNameAndReceiverName(String senderName, String receiverName);

    List<Chat> findChatBySenderNameOrReceiverName(String senderName, String receiverName);
}
