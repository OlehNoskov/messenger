package com.example.server.mapper;

import com.example.server.dto.request.UserDto;
import com.example.server.entity.User;

public interface UserDtoMapper {

    UserDto mapUserDtoToUser(User user);
}