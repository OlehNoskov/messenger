package com.example.server.service;

import com.example.server.entity.User;

import java.util.List;

public interface UserService {

    List <User> getFriendsByName(String userName);
}
