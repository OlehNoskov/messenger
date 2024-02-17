package com.example.server.controller;

import com.example.server.config.security.TokenProvider;
import com.example.server.dto.response.AuthResponse;
import com.example.server.dto.request.LoginRequest;
import com.example.server.dto.request.SignUpRequest;
import com.example.server.exceptions.DuplicatedUserInfoException;
import com.example.server.mapper.UserSignUpMapper;
import com.example.server.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final UserSignUpMapper userSignUpMapper;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        userService.connectUser(loginRequest.getUsername());

        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());

        return new AuthResponse(token);
    }

    @PostMapping("/logout/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void logout(@PathVariable String username) {
        userService.disconnect(username);
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new DuplicatedUserInfoException(String.format("Username %s already been used", signUpRequest.getUsername()));
        }
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new DuplicatedUserInfoException(String.format("Email %s already been used", signUpRequest.getEmail()));
        }

        userService.saveUser(userSignUpMapper.mapSignUpRequestToUser(signUpRequest));

        String token = authenticateAndGetToken(signUpRequest.getUsername(), signUpRequest.getPassword());
        return new AuthResponse(token);
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        return tokenProvider.generate(authentication);
    }
}
