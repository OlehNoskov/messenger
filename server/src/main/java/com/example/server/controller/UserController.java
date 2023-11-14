package com.example.server.controller;

import com.example.server.entity.User;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/friend")
public class UserController {

    private UserService userService;

    @GetMapping("/find")
    public ResponseEntity<List<User>> findUser(String userName) {
        return new ResponseEntity<>(userService.getFriendsByName(userName), HttpStatus.OK);
    }

//    @GetMapping("/add/{userId}/{friendId}")
//    public ResponseEntity<User> addUser(@PathVariable Long userId, @PathVariable Long friendId) {
//        return new ResponseEntity<>(userService.addFriend(userId, friendId), HttpStatus.OK);
//    }
}
