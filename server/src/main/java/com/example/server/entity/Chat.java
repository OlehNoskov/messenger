//package com.example.server.entity;
//
//import com.example.server.enums.MessageStatus;
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.EqualsAndHashCode;
//
//import java.util.List;
//
//@Entity
//@Table(name = "chats")
//@Data
//@EqualsAndHashCode(callSuper = true)
//public class Chat extends AbstractEntity {
//
//    @OneToMany(mappedBy="user")
//    private User friend;
//
//    @OneToMany
//    private List<Message> messages;
//
//    private MessageStatus status;
//}
