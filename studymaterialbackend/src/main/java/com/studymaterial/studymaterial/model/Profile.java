package com.studymaterial.studymaterial.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String fullname;
    @NonNull
    private String username;
    @NonNull
    private String email;
    private String branch;
    private String semester;
    private String phoneNumber;
    private String bio;

    @Lob
    @Column(name = "profile_image", columnDefinition = "LONGBLOB")
    private byte [] profileImage;

    @NonNull
    private String profileImageNameString;

    @Column(name = "resume", columnDefinition = "LONGBLOB")
    private byte [] resume;
    @NonNull
    private String resumeNameString;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
