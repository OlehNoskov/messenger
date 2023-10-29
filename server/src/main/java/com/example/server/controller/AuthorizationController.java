package com.example.server.controller;

import com.example.server.dto.request.SignUpDto;
import com.example.server.entity.User;
import com.example.server.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthorizationController {

    private final RegistrationService registrationService;

    @GetMapping("/login")
    public ResponseEntity<String> getServerStatus() {
        return new ResponseEntity<>("Test login", HttpStatus.OK);
    }

    @PostMapping("/registration")
    public ResponseEntity<User> register(@RequestBody SignUpDto user) {
        return new ResponseEntity<>( registrationService.registerUser(user), HttpStatus.CREATED);
    }
}
