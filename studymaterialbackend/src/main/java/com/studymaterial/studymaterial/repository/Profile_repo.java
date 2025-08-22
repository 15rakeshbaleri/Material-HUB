package com.studymaterial.studymaterial.repository;

import com.studymaterial.studymaterial.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Profile_repo extends JpaRepository<Profile, Long> {

   Profile  findByUserId(Long id);
}
