package com.example.server.service.impl;

import com.example.server.dto.request.SignInDto;
import com.example.server.dto.request.SignUpDto;
import com.example.server.ecxeptions.AppException;
import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.AuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final UserRepository userRepository;


    @Override
    public User registerUser(SignUpDto userDto) {

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new AppException("User with this email have been already created!", HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .build();

        return userRepository.save(user);
    }

    @Override
    public User login(SignInDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail()).orElseThrow(
                () -> new RuntimeException(String.format("User with with email %s do not found!", userDto.getEmail())));

        if (user.getEmail().equals(userDto.getEmail()) && user.getPassword().equals(userDto.getPassword())) {
            return user;
        }

        return null;
    }
}
