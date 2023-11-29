package com.example.server.initializer;

import com.example.server.entity.User;
import com.example.server.enums.Role;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@AllArgsConstructor
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
                    .role(String.valueOf(Role.USER))
                    .build(),

            User.builder()
                    .username("volodymyr")
                    .password("password")
                    .email("user2@messenger.com")
                    .role(String.valueOf(Role.USER))
                    .build(),

            User.builder()
                    .username("katya")
                    .password("password")
                    .email("user3@messenger.com")
                    .role(String.valueOf(Role.USER))
                    .build(),


            User.builder()
                    .username("olga")
                    .password("password")
                    .email("user4@messenger.com")
                    .role(String.valueOf(Role.USER))
                    .build(),

            User.builder()
                    .username("petya")
                    .password("password")
                    .email("user5@messenger.com")
                    .role(String.valueOf(Role.USER))
                    .build()
    );
}
