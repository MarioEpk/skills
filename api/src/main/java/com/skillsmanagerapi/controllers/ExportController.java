package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.services.CvService;
import com.skillsmanagerapi.services.ExportService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_PDF_VALUE;

@RequestMapping(value = "/api/cv")
@RestController
public class ExportController {

    private final CvService cvService;
    private final ExportService exportService;

    @Autowired
    public ExportController(@NonNull CvService cvService,
                            @NonNull ExportService exportService) {
        this.cvService = cvService;
        this.exportService = exportService;
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business') or @securityService.isOwnerOfCv(#id)")
    @GetMapping(value = "/{id}/export", produces = APPLICATION_PDF_VALUE)
    public ResponseEntity<?> exportCvAsPdf(@PathVariable("id") int id) throws Exception {
        final CvDto cvDto = cvService.getCv(id);
        final byte[] pdfData = exportService.generateCvPdf(cvDto);

        return getResponseEntity(
                cvDto.getUser().getFirstName() + "_" + cvDto.getUser().getLastName() + "_cv.pdf",
                APPLICATION_PDF_VALUE,
                pdfData);
    }

    @PreAuthorize("hasAnyAuthority('admin', 'business') or @securityService.isOwnerOfCv(#id)")
    @GetMapping(value = "/{id}/export/doc")
    public ResponseEntity<?> exportCvAsDoc(@PathVariable("id") int id) throws Exception {

        final CvDto cvDto = cvService.getCv(id);
        final byte[] docxData = exportService.generateCvDoc(cvDto);

        return getResponseEntity(
                cvDto.getUser().getFirstName() + "_" + cvDto.getUser().getLastName() + "_cv.docx",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                docxData);
    }

    private ResponseEntity<?> getResponseEntity(String fileName, String mediaType, byte[] data) {
        //Setting Headers
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(mediaType));
        headers.setContentDispositionFormData(fileName, fileName);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        headers.setContentLength(data.length);

        return new ResponseEntity<>(data, headers, HttpStatus.OK);
    }
}
