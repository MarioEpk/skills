package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.CertificateDto;
import com.skillsmanagerapi.models.Certificate;
import com.skillsmanagerapi.repositories.CertificateRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CertificateService(@NonNull final CertificateRepository certificateRepository, @NonNull final ModelMapper modelMapper) {
        this.certificateRepository = certificateRepository;
        this.modelMapper = modelMapper;
    }

    public CertificateDto getCertificate(final int id) {
        return modelMapper.map(certificateRepository.findById(id).orElseThrow(EntityNotFoundException::new), CertificateDto.class);
    }

    @Transactional
    public CertificateDto createCertificate(@NonNull final CertificateDto certificateDto) {
        final Certificate certificate = new Certificate();
        certificate.setName(certificateDto.getName());
        certificate.setDate(certificateDto.getDate());
        certificate.setDescription(certificateDto.getDescription());

        return modelMapper.map(certificateRepository.save(certificate), CertificateDto.class);
    }

    @Transactional
    public void updateCertificate(@NonNull final CertificateDto certificateDto) {
        final CertificateDto updatedCertificateDto = this.getCertificate(certificateDto.getId());
        updatedCertificateDto.setName(certificateDto.getName());
        updatedCertificateDto.setDate(certificateDto.getDate());
        updatedCertificateDto.setDescription(certificateDto.getDescription());
        certificateRepository.save(modelMapper.map(updatedCertificateDto, Certificate.class));
    }

    @Transactional
    public void deleteCertificate(final int id) {
        certificateRepository.deleteById(id);
    }

}
