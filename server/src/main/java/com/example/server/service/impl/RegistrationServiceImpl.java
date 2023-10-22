package com.example.server.service.impl;

import com.example.server.entity.User;
import com.example.server.repository.UserRepository;
import com.example.server.service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationServiceImpl implements RegistrationService {

    private final UserRepository userRepository;


    @Override
    public User registerUser(String email) {
        return null;
    }
}
