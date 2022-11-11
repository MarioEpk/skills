package com.skillsmanagerapi.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.Base64;

public class FileDownloadHttpResponse {

    public static ResponseEntity getResponseBase64Encoded(String fileName, byte[] fileData, String mediaType) {
        return getResponse(
                fileName,
                Base64.getEncoder().encode(fileData),
                mediaType);
    }
    public static ResponseEntity getResponse(String fileName, byte[] fileData, String mediaType) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(mediaType));
        headers.setContentDispositionFormData(fileName, fileName);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.setContentLength(fileData.length);
        return new ResponseEntity(fileData, headers, HttpStatus.OK);
    }

}
