package com.studymaterial.studymaterial.controller;
import com.studymaterial.studymaterial.model.Course_model;
import com.studymaterial.studymaterial.service.Course_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class Course_controller {

    @Autowired
    Course_service c_service;


    @GetMapping
    public ResponseEntity<List<Course_model>> get_allcourses(){

       List<Course_model> cources= c_service.all_courses();
       if(!cources.isEmpty()){
           return  new ResponseEntity<>(cources, HttpStatus.OK);
       }
       else {
           return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
    }

    @PostMapping
    public ResponseEntity<String> post_course(@RequestBody Course_model course) {
        if (course == null) {
            return new ResponseEntity<>("Course cannot be empty", HttpStatus.BAD_REQUEST);
        }

        boolean completed = c_service.add_course(course);
        if (completed) {
            return new ResponseEntity<>("Course added successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to add course", HttpStatus.BAD_REQUEST);
        }
    }



    @GetMapping("/ise")
    public ResponseEntity<List<Course_model>> get_allcourses_ISE(){

        List<Course_model> isecourse = c_service.get_isecourses();
        if(!isecourse.isEmpty()){
            return new ResponseEntity<>(isecourse,HttpStatus.OK);
        }
        return new ResponseEntity<>(isecourse,HttpStatus.BAD_REQUEST);
    }


    @GetMapping("/cse")
    public ResponseEntity<List<Course_model>> get_allcourses_CSE(){

        List<Course_model> csecourse = c_service.get_csecourses();
        if(!csecourse.isEmpty()){
            return new ResponseEntity<>(csecourse,HttpStatus.OK);
        }
        return new ResponseEntity<>(csecourse,HttpStatus.BAD_REQUEST);
    }


    @GetMapping("/id/{cid}")
    public ResponseEntity<Course_model> get_courseby_id(@PathVariable String cid){

        Course_model course =c_service.getby_courseid(cid);
        if(course!=null){
            return new ResponseEntity<>(course,HttpStatus.OK);

        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }



    @DeleteMapping("/id/{cid}")
    public ResponseEntity<?> delete_courseby_id(@PathVariable String cid){

      long task=  c_service.delete_course(cid);
        if(task>0){
            return new ResponseEntity<>("course deleted sucessfully",HttpStatus.OK);

        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/id/{cid}")
    public ResponseEntity<String> update_courseby_id(@PathVariable String cid,@RequestBody Course_model course){

    boolean updated =   c_service.update_course(cid,course);
    if(updated){
        return new ResponseEntity<>("course updated",HttpStatus.OK);

    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
