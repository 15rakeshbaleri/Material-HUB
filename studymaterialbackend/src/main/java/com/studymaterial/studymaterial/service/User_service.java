package com.studymaterial.studymaterial.service;

import com.studymaterial.studymaterial.model.User_model;
import com.studymaterial.studymaterial.repository.User_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Arrays;


@Service
public class User_service {

    @Autowired
    private User_repo userRepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean adminLogin(User_model user) {

        User_model existingAdmin = userRepo.findByUsername(user.getUsername());

        if (existingAdmin != null && passwordEncoder.matches(user.getPassword(), existingAdmin.getPassword())) {
            return true;
        }

        return false;
    }

    public boolean adminsignup(User_model user) {
        User_model existingAdmin = userRepo.findByUsername(user.getUsername());


        if (existingAdmin != null) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        return true;
    }

}
