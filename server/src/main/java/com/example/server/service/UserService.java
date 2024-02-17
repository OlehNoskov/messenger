package com.example.server.service;

import com.example.server.dto.request.UserAuthorizationRequest;
import com.example.server.entity.User;

import java.util.List;

public interface UserService {

    void saveUser(User user);

    List<User> getUsers();

    User getCurrentUserByUsername(String username);

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);

    List<User> getFriendsByUsername(String username);

    void connectUser(String username);

    void disconnect(String username);
}
