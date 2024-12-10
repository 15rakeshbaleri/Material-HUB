package com.studymaterial.studymaterial.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User_model {

    @NonNull
    @Indexed(unique = true)

    private String username;

    @NonNull

    private String password;



    private String phone;
}
