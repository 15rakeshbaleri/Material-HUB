package com.studymaterial.studymaterial.model;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Data
@Document(collection = "courses")
public class Course_model {

    @NonNull
    @Indexed(unique = true)
    private String code;
    @NonNull
    private String title;
    @NonNull
    private List<String> branches;
    @NonNull
    private int credits;
    private List<String> ppt;
    private List<String> textbook;
    private List<String> modelpapers;
    private List<String> labPrograms;

}
