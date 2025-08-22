package com.studymaterial.studymaterial.request;

import com.studymaterial.studymaterial.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
@Data
public class ProfileRequest {


    private String fullname;

    private String username;

    private String email;
    private String branch;
    private String semester;
    private String phoneNumber;
    private String bio;
    private byte [] profileImage;

    private byte [] resume;

}
