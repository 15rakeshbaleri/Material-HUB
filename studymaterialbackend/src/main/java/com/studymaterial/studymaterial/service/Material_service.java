package com.studymaterial.studymaterial.service;

import com.studymaterial.studymaterial.model.Material;

import java.util.List;

public interface Material_service {
    Material uploadMaterial(Material material); // Save URLs from Cloudinary
    List<Material> getMaterialsByCourseId(Long courseId);
    Material getMaterialById(Long id);
    Material updateMaterial(Long id, Material updatedMaterial);
    boolean deleteMaterial(Long id);
    List<Material> getMaterialsByTypeAndCourseId(String type, Long courseId); // e.g., type = "ppt"

}
