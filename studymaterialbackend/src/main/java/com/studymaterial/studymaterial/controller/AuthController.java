package com.studymaterial.studymaterial.controller;

import com.studymaterial.studymaterial.config.JwtUtil;
import com.studymaterial.studymaterial.model.Role;
import com.studymaterial.studymaterial.model.User;
import com.studymaterial.studymaterial.repository.User_repo;
import com.studymaterial.studymaterial.request.LoginRequest;
import com.studymaterial.studymaterial.request.StudentRegister;
import com.studymaterial.studymaterial.response.BaseResponse;
import com.studymaterial.studymaterial.serviceimpl.User_serviceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private User_serviceimpl userService;
    @Autowired
    private User_repo userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        String jwt = jwtUtil.generateToken(userDetails);
        String  role= userRepository.findByUsername(loginRequest.getUsername()).getRole().name();
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("role", role);

        return ResponseEntity.ok(response);

    }
    @PostMapping("/student/register")
    public ResponseEntity<?> registerUser(@RequestBody StudentRegister user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User savedUser = userService.registerNewUser(user);
        return ResponseEntity.ok(new BaseResponse("SUCCESS", "USER_REGISTERED", "User registered successfully", new Date(), savedUser));
    }
    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User savedUser = userService.registerNewUser(user, Role.admin);
        return ResponseEntity.ok(new BaseResponse("SUCCESS", "USER_REGISTERED", "User registered successfully", new Date(), savedUser));
    }
}
