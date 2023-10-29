package com.example.server.service;

import com.example.server.dto.request.SignInDto;
import com.example.server.dto.request.SignUpDto;
import com.example.server.entity.User;

public interface AuthorizationService {

    User registerUser(SignUpDto userDto);
    User login(SignInDto userDto);

}
