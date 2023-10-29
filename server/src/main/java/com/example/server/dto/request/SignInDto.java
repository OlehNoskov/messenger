package com.example.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@Builder
public class SignInDto {

    @NotEmpty
    private String email;

    @NotEmpty
    private String password;
}
