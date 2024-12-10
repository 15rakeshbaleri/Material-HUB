package com.studymaterial.studymaterial.controller;

import com.studymaterial.studymaterial.model.User_model;
import com.studymaterial.studymaterial.service.User_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class User_controller {

    @Autowired
    User_service userservice;

    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody User_model user) {
        boolean loginSuccess = userservice.adminLogin(user);

        if (loginSuccess) {
            return new ResponseEntity<>("Admin login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> adminSignup(@RequestBody User_model user) {


        boolean signupSuccess = userservice.adminsignup(user);

        if (signupSuccess) {
            return new ResponseEntity<>("Admin signup successful", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Username already exists", HttpStatus.BAD_REQUEST);
        }
    }


}
