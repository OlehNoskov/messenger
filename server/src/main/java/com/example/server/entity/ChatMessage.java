package com.example.server.entity;

import com.example.server.enums.MessageType;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ChatMessage extends AbstractEntity {

    private MessageType type;
    private String content;
    private String sender;

}
