package com.studymaterial.studymaterial.service;

import com.studymaterial.studymaterial.model.Course;

import java.util.List;

public interface Course_service {

    Course createCourse(Course course);
    Course getCourseById(Long id);
    List<Course> getAllCourses();
    List<Course> getCoursesByBranch(String branch);
    List<Course> getCoursesBySemester(String semester);
    Course updateCourse(Long id, Course updatedCourse);
    void deleteCourse(Long id);

}
