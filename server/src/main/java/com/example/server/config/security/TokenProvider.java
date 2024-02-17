package com.example.server.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Component
public class TokenProvider {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration.minutes}")
    private Long jwtExpirationMinutes;

    // Type of token
    public static final String TOKEN_TYPE = "JWT";

    //Clarifies name of application when we send token
    public static final String TOKEN_ISSUER = "messenger";

    public static final String TOKEN_AUDIENCE = "messenger-app";

    public String generate(Authentication authentication) {
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();

        byte[] signingKey = jwtSecret.getBytes();

        return Jwts.builder()
                .setHeaderParam("typ", TOKEN_TYPE)
                .signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(jwtExpirationMinutes).toInstant()))
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setId(UUID.randomUUID().toString())
                .setIssuer(TOKEN_ISSUER)
                .setAudience(TOKEN_AUDIENCE)
                .setSubject(user.getUsername())
                //Add data (Payload/JWT-claims), which store into JWT.
                .claim("username", user.getUsername())
                .claim("status", user.getStatus())
                .compact();
    }

    public Optional<Jws<Claims>> validateTokenAndGetJws(String token) {
        try {
            byte[] signingKey = jwtSecret.getBytes();

            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token);

            return Optional.of(jws);

        } catch (ExpiredJwtException exception) {
            throw new RuntimeException(String.format("Request to parse expired JWT : %s failed : %s", token, exception.getMessage()));
        } catch (IllegalArgumentException exception) {
            throw new IllegalArgumentException(String.format("Request to parse empty or null JWT : %s  failed : %s", token, exception.getMessage()));
        }
    }
}
