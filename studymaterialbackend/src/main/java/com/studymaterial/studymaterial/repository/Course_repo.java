package com.studymaterial.studymaterial.repository;

import com.studymaterial.studymaterial.model.Course_model;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Course_repo extends MongoRepository<Course_model,String> {

    List<Course_model> findAllBybranches(String branch);
    Course_model findBycode(String cid);
    long deleteBycode(String cid);
    List<Course_model> findBysemester(int sem);
}
