package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.services.CvService;
import com.skillsmanagerapi.services.ExportService;
import com.skillsmanagerapi.utils.FileDownloadHttpResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_PDF_VALUE;

@RequestMapping(value = "/public/cv")
@RestController
@Slf4j
public class PublicController {

    private final ExportService exportService;
    private final CvService cvService;

    @Autowired
    public PublicController(@NonNull CvService cvService,
                            @NonNull ExportService exportService) {
        this.cvService = cvService;
        this.exportService = exportService;
    }

    @GetMapping(value = "/{externalUrlCode}")
    public ResponseEntity<?> exportPublicCvAsPdf(@PathVariable("externalUrlCode") String extUrlCode) throws Exception {
        final CvDto cvDto;
        try {
            cvDto = cvService.getCVByExternalCode(extUrlCode);
        } catch (Exception e) {
            log.warn("CV for requested user {} not found", extUrlCode);
            return new ResponseEntity<>("Requested CV not found.", HttpStatus.BAD_REQUEST);
        }

        if (!cvDto.isShared()) {
            return new ResponseEntity<>("CV is not available for public access.", HttpStatus.FORBIDDEN);
        }

        final byte[] pdfData = exportService.generateCvPdf(cvDto);
        final String fileName = exportService.generateUserIdentifier(cvDto) + ".pdf";
        return FileDownloadHttpResponse.getResponse(fileName, pdfData, APPLICATION_PDF_VALUE);

    }

}
