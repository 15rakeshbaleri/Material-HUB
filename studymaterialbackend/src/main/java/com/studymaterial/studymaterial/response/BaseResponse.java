package com.studymaterial.studymaterial.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class BaseResponse {

    private String status;
    private String messageType;
    private String message;
    private Date timeStamp;
    private Object data;




}
