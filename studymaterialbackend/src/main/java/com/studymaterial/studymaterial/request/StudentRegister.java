package com.studymaterial.studymaterial.request;

import com.studymaterial.studymaterial.model.Role;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NonNull;

@Data
public class StudentRegister {


    @NonNull
    private String name;

    @NonNull
    private String email;

    @NonNull
    private String username;

    @NonNull
    private String password;

}
