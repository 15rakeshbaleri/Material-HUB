package com.studymaterial.studymaterial.controller;
import com.studymaterial.studymaterial.model.Course;
import com.studymaterial.studymaterial.response.BaseResponse;
import com.studymaterial.studymaterial.response.CourseResponse;
import com.studymaterial.studymaterial.service.Course_service;
import com.studymaterial.studymaterial.serviceimpl.Course_serviceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;



@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class Course_controller {

    @Autowired
    private Course_serviceimpl courseService;

    @PostMapping
    public ResponseEntity<BaseResponse> createCourse(@RequestBody Course course) {
        Course created = courseService.createCourse(course);
        BaseResponse response = new BaseResponse(
                "success",
                "info",
                "Course created successfully",
                new Date(),
                created
        );
        return ResponseEntity.ok(response);
    }
    @GetMapping("/branch/{branch}")
    public ResponseEntity<BaseResponse> getCoursesByBranch(@PathVariable String branch) {
        if(branch.equals("all")) {
            List<Course> allCourses = courseService.getAllCourses();
            List<CourseResponse> allCoursesResponse = allCourses.stream()
                    .map(course -> new CourseResponse(
                            course.getId(),
                            course.getCode(),
                            course.getTitle(),
                            course.getSemester(),
                            course.getCredits(),
                            course.getBranches()))
                    .toList();
            BaseResponse response = new BaseResponse(
                    "success",
                    "info",
                    "All courses fetched successfully",
                    new Date(),
                    allCoursesResponse
            );
            return ResponseEntity.ok(response);
        }
        List<Course> courses = courseService.getCoursesByBranch(branch);
        BaseResponse response = new BaseResponse(
                "success",
                "info",
                "Courses fetched successfully for branch: " + branch,
                new Date(),
                courses
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCourseById(@PathVariable Long id) {
        Course course = courseService.getCourseById(id);
        BaseResponse response = new BaseResponse(
                "success",
                "info",
                "Course fetched successfully",
                new Date(),
                course
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<BaseResponse> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        BaseResponse response = new BaseResponse(
                "success",
                "info",
                "All courses fetched successfully",
                new Date(),
                courses
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        Course updated = courseService.updateCourse(id, updatedCourse);
        BaseResponse response = new BaseResponse(
                "success",
                "info",
                "Course updated successfully",
                new Date(),
                updated
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        BaseResponse response = new BaseResponse(
                "success",
                "info",
                "Course deleted successfully",
                new Date(),
                null
        );
        return ResponseEntity.ok(response);
    }
}