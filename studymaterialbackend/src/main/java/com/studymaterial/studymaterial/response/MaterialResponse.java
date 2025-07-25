package com.studymaterial.studymaterial.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MaterialResponse {
    private Long id;
    private String title;
    private String url;
    private String type;
}
