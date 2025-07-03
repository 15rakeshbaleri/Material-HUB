package com.studymaterial.studymaterial.repository;

import com.studymaterial.studymaterial.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Material_repo extends JpaRepository<Material,Long> {
    List<Material> findByCourseId(Long courseId);

    List<Material> findByTypeAndCourseId(String type, Long courseId);
}
