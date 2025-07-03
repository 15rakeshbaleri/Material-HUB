package com.studymaterial.studymaterial.response;

import com.studymaterial.studymaterial.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.List;

@Data
public class CourseResponse {
    @Column(nullable = false, unique = true)
    private String code;
    private Long id;
    private String title;

    private String semester;

    private String credits;


    private List<String> branches;

    public CourseResponse(Long id, String code, String title, String semester, String credits, List<String> branches) {
        this.code = code;
        this.id = id;
        this.title = title;
        this.semester = semester;
        this.credits = credits;
        this.branches = branches;
    }
}
