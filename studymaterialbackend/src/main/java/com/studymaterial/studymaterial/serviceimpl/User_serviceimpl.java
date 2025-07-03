package com.studymaterial.studymaterial.serviceimpl;

import com.studymaterial.studymaterial.model.Role;
import com.studymaterial.studymaterial.model.User;
import com.studymaterial.studymaterial.repository.User_repo;
import com.studymaterial.studymaterial.request.StudentRegister;
import com.studymaterial.studymaterial.service.User_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class User_serviceimpl implements User_service {

    private final User_repo userRepo;

    @Autowired
    public User_serviceimpl(User_repo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepo.findById(String.valueOf(id)).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        return userRepo.findById(String.valueOf(id)).map(existingUser -> {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            return userRepo.save(existingUser);
        }).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        userRepo.deleteById(String.valueOf(id));
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
    @Autowired
    private PasswordEncoder passwordEncoder;
    public User registerNewUser(StudentRegister user) {
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setUsername(user.getUsername());
        newUser.setRole(Role.student);
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepo.save(newUser);
    }
    public User registerNewUser(User user, Role role) {
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setUsername(user.getUsername());
        newUser.setRole(role);
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepo.save(newUser);
    }
}
