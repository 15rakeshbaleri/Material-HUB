package com.studymaterial.studymaterial.service;

import com.studymaterial.studymaterial.model.Course_model;
import com.studymaterial.studymaterial.repository.Course_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Course_service {

    @Autowired
    Course_repo c_repo;

    public List<Course_model> all_cources(){
       return c_repo.findAll();
    }

}
