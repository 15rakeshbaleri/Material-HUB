package com.studymaterial.studymaterial.serviceimpl;

import com.studymaterial.studymaterial.model.Course;
import com.studymaterial.studymaterial.model.Material;
import com.studymaterial.studymaterial.repository.Material_repo;
import com.studymaterial.studymaterial.service.Material_service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@Slf4j
public class Material_serviceimpl implements Material_service {

    private final Material_repo materialRepository;

    @Autowired
    public Material_serviceimpl(Material_repo materialRepository) {
        this.materialRepository = materialRepository;
    }

    @Override
    public Material uploadMaterial(Material material) {
        return materialRepository.save(material);
    }

    @Override
    public List<Material> getMaterialsByCourseId(Long courseId) {
        if (courseId == null) {
            return List.of(); // Return empty list if courseId is null
        }
        List<Material> materials = materialRepository.findByCourseId(courseId);
        log.info("Retrieved {} materials for course ID {}", materials, courseId);
        return materials;
    }

    @Override
    public Material getMaterialById(Long id) {
        Optional<Material> material = materialRepository.findById(id);
        return material.orElse(null); // Or throw exception
    }

    @Override
    public Material updateMaterial(Long id, Material updatedMaterial) {
        return materialRepository.findById(id)
                .map(existing -> {
                    existing.setType(updatedMaterial.getType());
                    existing.setUrl(updatedMaterial.getUrl());
                    existing.setCourse(updatedMaterial.getCourse());
                    return materialRepository.save(existing);
                })
                .orElse(null);
    }

    @Override
    public boolean deleteMaterial(Long id) {
        if (!materialRepository.existsById(id)) {
            return false;
        }
        materialRepository.deleteById(id);
        return true;
    }

    @Override
    public List<Material> getMaterialsByTypeAndCourseId(String type, Long courseId) {
        if (type == null || courseId == null) {
            return List.of();
        }
        List<Material> materials =  materialRepository.findByTypeAndCourseId(type, courseId);
        log.info("Retrieved {} materials of type '{}' for course ID {}", materials, type, courseId);
        return materials.isEmpty() ? List.of() : materials;
    }


    public Material saveZippedMaterial(MultipartFile file, String type, Course course) throws IOException {
        // 1. Get original file name
        String originalName = file.getOriginalFilename();
        String zipFileName = removeExtension(originalName) + ".zip";

        // 2. Create ZIP in memory
        ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
        try (ZipOutputStream zipOut = new ZipOutputStream(byteOut)) {
            ZipEntry entry = new ZipEntry(originalName);
            zipOut.putNextEntry(entry);
            zipOut.write(file.getBytes());
            zipOut.closeEntry();
        }

        // 3. Store in database
        Material material = new Material();
        material.setTitle(removeExtension(originalName));
        material.setType(type);
        material.setCourse(course);

        material.setFileName(zipFileName);
        material.setFileSize((long) byteOut.size());
        material.setZipData(byteOut.toByteArray());

        return materialRepository.save(material);
    }


//    @Autowired
//    private Cloudinary cloudinary;
//
//    public String uploadToCloudinary(MultipartFile file) throws IOException {
//        String originalFilename = file.getOriginalFilename(); // e.g. rakesh_resume.pdf
//        String extension = getExtension(originalFilename);    // .pdf
//        String baseName = removeExtension(originalFilename);  // rakesh_resume
//
//        Map<String, Object> options = new HashMap<>();
//        options.put("resource_type", "raw");
//        options.put("public_id", baseName); // Cloudinary stores it as: rakesh_resume.pdf
//
//        Map<String, Object> uploadResult = cloudinary.uploader().upload(
//                file.getBytes(), options
//        );
//
//        return uploadResult.get("secure_url").toString();
//    }
//
//
//    private String getExtension(String filename) {
//        if (filename != null && filename.contains(".")) {
//            return filename.substring(filename.lastIndexOf("."));
//        }
//        return ""; // fallback, no extension
//    }
    private String removeExtension(String filename) {
        if (filename != null && filename.contains(".")) {
            return filename.substring(0, filename.lastIndexOf('.'));
        }
        return filename;
    }
}