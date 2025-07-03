package com.studymaterial.studymaterial.repository;

import com.studymaterial.studymaterial.model.User;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
//public interface User_repo extends MongoRepository<User_model,String> {
//
//
//    User_model findByUsername(String username);
//}




public interface User_repo extends JpaRepository<User, String> {
    User findByUsername(@NonNull String username);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);


}