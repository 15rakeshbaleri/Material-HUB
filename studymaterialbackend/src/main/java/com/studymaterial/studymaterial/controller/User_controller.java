package com.studymaterial.studymaterial.controller;

import com.studymaterial.studymaterial.model.Role;
import com.studymaterial.studymaterial.model.User;
import com.studymaterial.studymaterial.repository.User_repo;
import com.studymaterial.studymaterial.request.StudentRegister;
import com.studymaterial.studymaterial.response.BaseResponse;
import com.studymaterial.studymaterial.service.User_service;
import com.studymaterial.studymaterial.serviceimpl.User_serviceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class User_controller {

    @Autowired
    private User_serviceimpl userService;

    @Autowired
    private User_repo userRepository;

    @Autowired
    private   PasswordEncoder passwordEncoder;


    @PostMapping
    public BaseResponse createUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return new BaseResponse("SUCCESS", "USER_CREATED", "User created successfully", new Date(), savedUser);
    }

    @GetMapping
    public BaseResponse getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new BaseResponse("SUCCESS", "USERS_FETCHED", "Fetched all users", new Date(), users);
    }

    @GetMapping("/{id}")
    public BaseResponse getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return new BaseResponse("SUCCESS", "USER_FOUND", "User found", new Date(), user);
    }

    @PutMapping("/{id}")
    public BaseResponse updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return new BaseResponse("SUCCESS", "USER_UPDATED", "User updated successfully", new Date(), user);
    }

    @DeleteMapping("/{id}")
    public BaseResponse deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new BaseResponse("SUCCESS", "USER_DELETED", "User deleted successfully", new Date(), null);
    }


}