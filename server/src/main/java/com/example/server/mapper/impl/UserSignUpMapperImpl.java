package com.example.server.mapper.impl;

import com.example.server.dto.request.SignUpRequest;
import com.example.server.entity.User;
import com.example.server.enums.Role;
import com.example.server.mapper.UserSignUpMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSignUpMapperImpl implements UserSignUpMapper {

    private final PasswordEncoder passwordEncoder;

    @Override
    public User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
        return User.builder()
                .username(signUpRequest.getUsername())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .email(signUpRequest.getEmail())
                .role(String.valueOf(Role.USER))
                .build();
    }
}
