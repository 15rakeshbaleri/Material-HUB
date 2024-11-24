package com.studymaterial.studymaterial.repository;

import com.studymaterial.studymaterial.model.Course_model;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Course_repo extends MongoRepository<Course_model,String> {
}
