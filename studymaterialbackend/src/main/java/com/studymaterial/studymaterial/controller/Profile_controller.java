package com.studymaterial.studymaterial.controller;

import com.studymaterial.studymaterial.model.Profile;
import com.studymaterial.studymaterial.model.User;
import com.studymaterial.studymaterial.repository.Profile_repo;
import com.studymaterial.studymaterial.repository.User_repo;
import com.studymaterial.studymaterial.request.ProfileRequest;
import com.studymaterial.studymaterial.response.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class Profile_controller {

    @Autowired
    private Profile_repo profileRepo;

    @Autowired
    private User_repo userRepository;

    @PostMapping("/create")
    public Profile createProfile(@RequestBody ProfileRequest profileRequest, Principal principal) {
        User user = userRepository.findByUsername(principal.getName());

        Profile profile = new Profile();
        profile.setUsername(user.getUsername());
        profile.setEmail(user.getEmail());
        profile.setFullname(profileRequest.getFullname());
        profile.setBranch(profileRequest.getBranch());
        profile.setSemester(profileRequest.getSemester());
        profile.setPhoneNumber(profileRequest.getPhoneNumber());
        profile.setBio(profileRequest.getBio());
        profile.setUser(user);

         profileRepo.save(profile);

        BaseResponse response = new BaseResponse(
                "success",
                "info",
                "Profile created successfully",
                new Date(),
                profile
        );
        return profile;

    }

    @GetMapping("/me")
    public BaseResponse getMyProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        Profile profile = profileRepo.findByUserId(user.getId());
        Map <String, Object> responseData = new HashMap<>();
        responseData.put("profile", profile);

        BaseResponse response = new BaseResponse();
        response.setStatus("success");
        response.setMessage("Profile fetched successfully");
        response.setTimeStamp(new Date());
        response.setData(responseData);

        return response;
    }




    @PutMapping("/update")
    public BaseResponse updateProfile(@RequestBody ProfileRequest updatedProfile) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();  // <-- comes from JWT "sub"

        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        Profile profile = profileRepo.findByUserId(user.getId());
        if (profile == null) {
            profile = new Profile();
            profile.setUser(user);
        }

        profile.setUsername(user.getUsername());
        profile.setEmail(user.getEmail());
        profile.setFullname(updatedProfile.getFullname());
        profile.setBranch(updatedProfile.getBranch());
        profile.setSemester(updatedProfile.getSemester());
        profile.setPhoneNumber(updatedProfile.getPhoneNumber());
        profile.setBio(updatedProfile.getBio());


        Map<String, Object> responseData = new HashMap<>();
        responseData.put("profile", profile);

        BaseResponse response = new BaseResponse();
        response.setStatus("success");
        response.setMessage("Profile updated successfully");
        response.setTimeStamp(new Date());
        response.setData(responseData);
        return response;
    }


    @PostMapping("/upload-profile/{id}")
    public ResponseEntity<String> uploadProfileImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            // Convert file to byte[]
            byte[] imageData = file.getBytes();

            Profile  profile= profileRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            profile.setProfileImageNameString(file.getOriginalFilename()==null?profile.getFullname()+" "+"profile":file.getOriginalFilename());
            profile.setProfileImage(imageData);
            profileRepo.save(profile);

            return ResponseEntity.ok("Profile image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }
    @PostMapping("/upload-resume/{id}")
    public ResponseEntity<String> uploadresume(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {


            byte[] imageData = file.getBytes();

            Profile  profile= profileRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            profile.setResumeNameString(file.getOriginalFilename()==null?profile.getFullname()+" "+"resume":file.getOriginalFilename());
            profile.setResume(imageData);
            profileRepo.save(profile);

            return ResponseEntity.ok("Profile image uploaded successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }
}
