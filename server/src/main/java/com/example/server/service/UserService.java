package com.example.server.service;

import com.example.server.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void saveUser(User user);

    List<User> getUsers();

    User getCurrentUserByUsername(String username);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    List<User> getFriendsByUsername(String username);
}
