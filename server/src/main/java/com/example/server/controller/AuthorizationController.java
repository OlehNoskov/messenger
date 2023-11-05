package com.example.server.controller;

import com.example.server.dto.request.SignInDto;
import com.example.server.dto.request.SignUpDto;
import com.example.server.entity.User;
import com.example.server.service.AuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthorizationController {

    private final AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody SignInDto user) {
        return new ResponseEntity<>(authorizationService.login(user), HttpStatus.OK);
    }

//    @PostMapping("/registration")
//    public ResponseEntity<User> register(@RequestBody SignUpDto user) {
//        return new ResponseEntity<>(authorizationService.registerUser(user), HttpStatus.CREATED);
//    }

    @PostMapping("/registration")
    public ResponseEntity<SignUpDto> register(@RequestBody SignUpDto user) {
        authorizationService.registerUser(user);

        return new ResponseEntity<>(SignUpDto.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build(), HttpStatus.CREATED);
    }
}
