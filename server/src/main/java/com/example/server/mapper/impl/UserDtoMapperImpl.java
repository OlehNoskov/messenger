package com.example.server.mapper.impl;

import com.example.server.dto.request.UserDto;
import com.example.server.entity.User;
import com.example.server.mapper.UserDtoMapper;
import org.springframework.stereotype.Service;

@Service
public class UserDtoMapperImpl implements UserDtoMapper {

    @Override
    public UserDto mapUserDtoToUser(User user) {

        if (user == null) {
            return null;
        }

        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }
}
