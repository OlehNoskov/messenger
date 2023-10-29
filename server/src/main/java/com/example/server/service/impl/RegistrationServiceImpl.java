package com.example.server.service.impl;

import com.example.server.dto.request.SignUpDto;
import com.example.server.ecxeptions.AppException;
import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {

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
}
