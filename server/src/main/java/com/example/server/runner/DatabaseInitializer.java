package com.example.server.runner;

import com.example.server.entity.User;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@AllArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
        });
    }

    private static final List<User> USERS = Arrays.asList(

            User.builder()
                    .username("oleg")
                    .password("password")
                    .email("user1@messenger.com")
                    .build(),

            User.builder()
                    .username("volodymyr")
                    .password("password")
                    .email("user2@messenger.com")
                    .build(),

            User.builder()
                    .username("katya")
                    .password("password")
                    .email("user3@messenger.com")
                    .build()
    );
}
