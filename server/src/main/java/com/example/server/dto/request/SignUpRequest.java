package com.example.server.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

    @Size(min = 2, message = "Username must not be less than 2 characters!")
    public String username;

    @Size(min = 8, max = 16, message = "Password must contains more than 8 or less 16 characters!")
    private String password;

    @Email(message = "Email should contains valid email!")
    private String email;
}
