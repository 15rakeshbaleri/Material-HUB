package com.studymaterial.studymaterial.controller;


import com.studymaterial.studymaterial.config.CloudinaryConfig;
import com.studymaterial.studymaterial.model.Course;
import com.studymaterial.studymaterial.model.Material;
import com.studymaterial.studymaterial.repository.Course_repo;
import com.studymaterial.studymaterial.repository.Material_repo;
import com.studymaterial.studymaterial.response.BaseResponse;
import com.studymaterial.studymaterial.response.MaterialResponse;
import com.studymaterial.studymaterial.service.Material_service;
import com.studymaterial.studymaterial.serviceimpl.Material_serviceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/materials")
public class Material_controller {

    @Autowired
    private Material_serviceimpl materialService;

    @Autowired
    private Material_repo   materialRepository;
    @Autowired
    private Course_repo courseRepository;

    @Autowired
    private CloudinaryConfig cloudinary;

    @PostMapping(value = "/upload/{courseId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponse> uploadMaterial(
            @PathVariable Long courseId,
            @RequestPart("file") MultipartFile file,
            @RequestParam("type") String type
    ) throws IOException {
        Course course = courseRepository.findById(String.valueOf(courseId))
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));

        Material saveZippedMaterial = materialService.saveZippedMaterial(file, type, course);



        BaseResponse response = new BaseResponse();
        Map<String, Object> data = new HashMap<>();
        data.put("material", saveZippedMaterial);
        data.put("course", course);

        response.setStatus("success");
        response.setMessage("Material uploaded successfully");
        response.setTimeStamp(new Date());
        response.setData(data);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(@PathVariable Long id) {
        Material material = materialService.getMaterialById(id);
        return ResponseEntity.ok(material);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/download/{materialId}")
    public ResponseEntity<byte[]> downloadMaterial(@PathVariable Long materialId) {
        Material material = materialRepository.findById(materialId)
                .orElseThrow(() -> new RuntimeException("Material not found"));

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + material.getFileName() + "\"")
                .body(material.getZipData());
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<MaterialResponse>> getMaterialsByCourse(@PathVariable Long courseId) {
        List<MaterialResponse> responses = materialService.getMaterialsByCourseId(courseId)
                .stream()
                .map(material -> new MaterialResponse(
                        material.getId(),
                        material.getTitle(),
                        material.getUrl(),
                        material.getType()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);

    }

    // ✅ Get materials by type for a course
    @GetMapping("/course/{courseId}/type/{type}")
    public ResponseEntity<List<Material>> getMaterialsByTypeAndCourse(
            @PathVariable Long courseId,
            @PathVariable String type
    ) {
        List<Material> materials = materialService.getMaterialsByTypeAndCourseId(type, courseId);
        return ResponseEntity.ok(materials);
    }

    // ✅ Update a material
    @PutMapping("/{id}")
    public ResponseEntity<Material> updateMaterial(
            @PathVariable Long id,
            @RequestBody Material updatedMaterial
    ) {
        Material updated = materialService.updateMaterial(id, updatedMaterial);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete a material
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.noContent().build();
    }
}