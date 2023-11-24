package com.example.server.mapper;

import com.example.server.dto.request.UserDto;
import com.example.server.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {

        if (user == null) {
            return null;
        }

        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
    }
}
