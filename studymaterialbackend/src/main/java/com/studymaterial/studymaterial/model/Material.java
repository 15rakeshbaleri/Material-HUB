package com.studymaterial.studymaterial.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // "PPT", "PDF", "TEXTBOOK", "ZIP", "MODEL_PAPER", "LAB_PROGRAM"
    private String fileName; // Optional: can be used for file storage or display
    private Long fileSize; // Optional: can be used for file size display
    private String title; // Optional: can be file name or label

    private String url; // Can be Google Drive, S3, or direct link

    @ManyToOne
    @JoinColumn(name = "course_id")
    @JsonBackReference
    private Course course;

    @Lob
    private byte[] zipData;


}
