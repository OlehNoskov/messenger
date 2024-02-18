package com.example.server.dto.request;

import com.example.server.entity.Message;
import lombok.Data;

import java.util.List;

@Data
public class ChatDto {
    private String senderName;
    private String receiverName;
    private List<Message> messages;
}
