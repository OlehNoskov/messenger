package com.example.server.controller;

import com.example.server.entity.VerificationToken;
import com.example.server.repository.UserRepository;
import com.example.server.service.EmailSenderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/ping")
@AllArgsConstructor
public class PingController {

    private final UserRepository userRepository;

    private final VerificationToken verificationToken;

    private final EmailSenderService emailSenderService;

    @Value("${spring.mail.username}")
    private static String email;

    @GetMapping
    public ResponseEntity<String> getServerStatus() {
        return new ResponseEntity<>("Server status OK", HttpStatus.OK);
    }

    @GetMapping("test")
    public ResponseEntity<String> test() {
        return new ResponseEntity<>(email, HttpStatus.OK);
    }
}
