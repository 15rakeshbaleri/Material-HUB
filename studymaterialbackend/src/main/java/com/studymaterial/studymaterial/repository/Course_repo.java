package com.studymaterial.studymaterial.repository;

import com.studymaterial.studymaterial.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
//public interface Course_repo extends MongoRepository<Course_model,String> {
//
//    List<Course_model> findAllBybranches(String branch);
//    Course_model findBycode(String cid);
//    long deleteBycode(String cid);
//    List<Course_model> findBysemester(int sem);
//}

@Repository
public interface Course_repo extends JpaRepository<Course, String> {

    List<Course> findByBranchesContaining(String branch);

    List<Course> findBySemester(String semester);
}
