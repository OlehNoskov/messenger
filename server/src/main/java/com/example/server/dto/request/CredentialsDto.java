package com.example.server.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CredentialsDto {

    private String login;

    private char[] password;
}
