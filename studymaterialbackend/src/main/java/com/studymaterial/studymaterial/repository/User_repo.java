package com.studymaterial.studymaterial.repository;

import com.studymaterial.studymaterial.model.User_model;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface User_repo extends MongoRepository<User_model,String> {

    @
     findByEmail(String email);

    User_model findByUsername(String username);
}
