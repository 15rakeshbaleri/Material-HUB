package com.studymaterial.studymaterial.service;

import com.studymaterial.studymaterial.model.User;

import java.util.List;
import java.util.Optional;

public interface User_service {
    User createUser(User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    User updateUser(Long id, User updatedUser);
    void deleteUser(Long id);
    Optional<User> getUserByEmail(String email);

}
