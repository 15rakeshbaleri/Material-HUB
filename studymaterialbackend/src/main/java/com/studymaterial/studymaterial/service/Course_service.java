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

    public List<Course_model> all_courses(){
       return c_repo.findAll();
    }

    public boolean add_course(Course_model course) {
        try {
            c_repo.save(course);
            return true;
        } catch (Exception e) {

            return false;
        }
    }


    public List<Course_model> get_isecourses() {

        return  c_repo.findAllBybranches("ISE");

    }

    public List<Course_model> get_csecourses() {
        return  c_repo.findAllBybranches("CSE");
    }

    public Course_model getby_courseid(String cid) {
        return c_repo.findBycode(cid);
    }

    public long delete_course(String cid) {
        return c_repo.deleteBycode(cid);
    }

    public boolean update_course(String cid, Course_model new_course) {

      Course_model old_course =  c_repo.findBycode(cid);
      if(old_course==null){
          return false;
      }
      else{

         c_repo.deleteBycode(cid);
         c_repo.save(new_course);

          return true;
      }

    }

    public List<Course_model> getby_semester(int sem) {
       return c_repo.findBysemester(sem);
    }
}
