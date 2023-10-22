package com.example.server.entity;

import com.example.server.enums.MessageStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Entity
@Table(name = "groups")
@Data
@EqualsAndHashCode(callSuper = true)
public class Chat extends AbstractEntity {

    @ManyToMany
    @JoinTable(name = "user_chat")
    private List<User> users;

    @OneToMany
    private List<Message> messages;

    private MessageStatus status;
}
