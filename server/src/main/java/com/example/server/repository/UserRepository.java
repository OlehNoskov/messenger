package com.example.server.repository;

import com.example.server.entity.Chat;
import com.example.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("SELECT friend FROM User friend WHERE friend.username LIKE %:username% AND friend.username <> :currentUsername")
    List<User> getAllUsersByUsernameExcludingCurrentUser(@Param("username") String username,
                                                         @Param("currentUsername") String currentUsername);

    boolean existsByUsername(String username);

    boolean existsByEmail(String emailId);
}
