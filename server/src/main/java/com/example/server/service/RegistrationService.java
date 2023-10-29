package com.example.server.service;

import com.example.server.dto.request.SignUpDto;
import com.example.server.entity.User;

public interface RegistrationService {

    User registerUser(SignUpDto userDto);

}
