package com.example.server.mapper;

import com.example.server.dto.request.UserDto;
import com.example.server.entity.User;

public interface UserMapper {

    UserDto toUserDto(User user);
}