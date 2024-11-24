package com.studymaterial.studymaterial.controller;
import com.studymaterial.studymaterial.model.Course_model;
import com.studymaterial.studymaterial.service.Course_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class Course_controller {

    @Autowired
    Course_service c_service;


    @GetMapping("/all")
    public RequestEntity<List<Course_model>> get_allcourses(){


    }


//
//    @GetMapping("/ise")
//    public RequestEntity<String> get_allcourses_ISE(){
//
//    }
//
//    @GetMapping("/cse")
//    public RequestEntity<String> get_allcourses_CSE(){
//
//    }
//
//    @GetMapping("/id/{cid}")
//    public RequestEntity<String> get_courseby_id(@PathVariable int cid){
//
//    }
//
//    @PostMapping("/post")
//    public RequestEntity<String> post_courses(){
//
//    }
//
//    @PutMapping("/id/{cid}")
//    public RequestEntity<String> update_courseby_id(@PathVariable int cid){
//
//    }
//
//    @DeleteMapping("/id/{cid}")
//    public RequestEntity<String> delete_courseby_id(@PathVariable int cid){
//
//    }


}
