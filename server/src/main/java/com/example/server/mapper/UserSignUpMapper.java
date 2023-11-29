package com.example.server.mapper;

import com.example.server.dto.request.SignUpRequest;
import com.example.server.entity.User;

public interface UserSignUpMapper {

    User mapSignUpRequestToUser(SignUpRequest signUpRequest);
}
