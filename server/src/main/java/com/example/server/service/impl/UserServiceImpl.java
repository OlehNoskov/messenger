package com.example.server.service.impl;

import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public List<User> getFriendsByName(String userName) {
        return userRepository.findByFirstNameOrLastName(userName, userName);
    }

//    @Override
//    public User addFriend(Long userId, Long friendId) {
//        User user = userRepository.findById(userId).orElseThrow(
//                () -> new RuntimeException(String.format("User with with id %s wasn't found!", userId)));
//
//        Friend friend = friendRepository.findById(friendId).orElseThrow(
//                () -> new RuntimeException(String.format("Friend with with id %s wasn't found!", userId)));
//
//        Friend friendship = Friend.builder().friends(List.of(user)).build();
//
//        user.addFriend(friend);
//
//        friendRepository.save(friendship);
//
//        return user;
//    }
}
