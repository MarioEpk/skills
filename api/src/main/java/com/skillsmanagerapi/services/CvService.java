package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.CertificateDto;
import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.dto.OtherDto;
import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.dto.SkillDto;
import com.skillsmanagerapi.dto.TechnologyDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.models.Cv;
import com.skillsmanagerapi.models.User;
import com.skillsmanagerapi.repositories.CvRepository;
import com.skillsmanagerapi.utils.ModelMapperUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CvService {

    private final CvRepository cvRepository;
    private final LanguageService languageService;
    private final SkillService skillService;
    private final ProjectService projectService;
    private final TechnologyService technologyService;
    private final CertificateService certificateService;
    private final OtherService otherService;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final ModelMapperUtil modelMapperUtil;
    private final ExportService exportService;

    @Autowired
    public CvService(
            @NonNull final CvRepository cvRepository,
            @NonNull final LanguageService languageService,
            @NonNull final SkillService skillService,
            @NonNull final ProjectService projectService,
            @NonNull final TechnologyService technologyService,
            @NonNull final CertificateService certificateService,
            @NonNull final OtherService otherService,
            @NonNull final UserService userService,
            @NonNull final ModelMapper modelMapper,
            @NonNull final ModelMapperUtil modelMapperUtil,
            @NonNull final ExportService exportService
    ) {
        this.cvRepository = cvRepository;
        this.languageService = languageService;
        this.skillService = skillService;
        this.projectService = projectService;
        this.technologyService = technologyService;
        this.certificateService = certificateService;
        this.otherService = otherService;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.modelMapperUtil = modelMapperUtil;
        this.exportService = exportService;
    }

    public CvDto getCvOrCreateNew(@NonNull final UserDto userDto) {
        Cv cv = cvRepository.findByUser(modelMapper.map(userDto, User.class)).orElseGet(() -> createCv(userDto));
        return modelMapper.map(cv, CvDto.class);
    }

    public CvDto getCv(final int id) {
        return modelMapper.map(cvRepository.findById(id).orElseThrow(EntityNotFoundException::new), CvDto.class);
    }

    public void deleteCv(final int id) {
        cvRepository.deleteById(id);
    }

    public List<CvDto> getAllCvs() {
        return modelMapperUtil.mapList(cvRepository.findAllByOrderByIdAsc(), CvDto.class);
    }

    public void updateCv(@NonNull final CvDto cvDto) {
        CvDto updatedCvDto = this.getCv(cvDto.getId());
        UserDto userDto = updatedCvDto.getUser();
        userDto.setFirstName(cvDto.getUser().getFirstName());
        userDto.setLastName(cvDto.getUser().getLastName());
        userService.updateUser(userDto);
        updatedCvDto.setProfile(cvDto.getProfile());
        updatedCvDto.setPositions(cvDto.getPositions());
        updatedCvDto.setAvatar(cvDto.getAvatar());
        cvRepository.save(modelMapper.map(updatedCvDto, Cv.class));
    }

    public byte[] exportCvPdf(final int id) throws Exception {
        CvDto cvDto = getCv(id);

        return exportService.generateCvPdf(cvDto);
    }

    private Cv createCv(@NonNull final UserDto userDto) {
        log.info("Creating cv for user {}", userDto.getEmail());
        Cv cv = new Cv();
        cv.setUser(modelMapper.map(userDto, User.class));
        cvRepository.save(cv);

        return cv;
    }

    // Language
    public void addLanguageToCv(final int cvId, @NonNull final LanguageDto languageDto) {
        LanguageDto newLanguageDto = languageService.createLanguage(languageDto);
        CvDto cvDto = this.getCv(cvId);
        List<LanguageDto> languageDtoList = cvDto.getLanguages();
        languageDtoList.add(newLanguageDto);
        cvDto.setLanguages(languageDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
    }

    public void updateLanguage(@NonNull final LanguageDto languageDto) {
        languageService.updateLanguage(languageDto);
    }

    public void removeLanguageFromCv(final int id) {
        languageService.deleteLanguage(id);
    }

    // Skill
    public void addSkillToCv(final int cvId, @NonNull final SkillDto skillDto) {
        SkillDto newSkillDto = skillService.createSkill(skillDto);
        CvDto cvDto = this.getCv(cvId);
        List<SkillDto> skillDtoList = cvDto.getSkills();
        skillDtoList.add(newSkillDto);
        cvDto.setSkills(skillDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
    }

    public void updateSkill(@NonNull final SkillDto skillDto) {
        skillService.updateSkill(skillDto);
    }

    public void removeSkillFromCv(final int id) {
        skillService.deleteSkill(id);
    }

    // Project
    public void addProjectToCv(final int cvId, @NonNull final ProjectDto projectDto) {
        ProjectDto newProjectDto = projectService.createProject(projectDto);
        CvDto cvDto = this.getCv(cvId);
        List<ProjectDto> projectDtoList = cvDto.getProjects();
        projectDtoList.add(newProjectDto);
        cvDto.setProjects(projectDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
    }

    public void updateProject(@NonNull final ProjectDto projectDto) {
        projectService.updateProject(projectDto);
    }

    public void removeProjectFromCv(final int id) {
        projectService.deleteProject(id);
    }

    // Technology
    public void addTechnologyToCv(final int cvId, @NonNull final TechnologyDto technologyDto) {
        TechnologyDto newTechnologyDto = technologyService.createTechnology(technologyDto);
        CvDto cvDto = this.getCv(cvId);
        List<TechnologyDto> technologyDtoList = cvDto.getTechnologies();
        technologyDtoList.add(newTechnologyDto);
        cvDto.setTechnologies(technologyDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
    }

    public void updateTechnology(@NonNull final TechnologyDto technologyDto) {
        technologyService.updateTechnology(technologyDto);
    }

    public void removeTechnologyFromCv(final int id) {
        technologyService.deleteTechnology(id);
    }

    // Certificate
    public void addCertificateToCv(final int cvId, @NonNull final CertificateDto certificateDto) {
        CertificateDto newCertificateDto = certificateService.createCertificate(certificateDto);
        CvDto cvDto = this.getCv(cvId);
        List<CertificateDto> certificateDtoList = cvDto.getCertificates();
        certificateDtoList.add(newCertificateDto);
        cvDto.setCertificates(certificateDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
    }

    public void updateCertificate(@NonNull final CertificateDto certificateDto) {
        certificateService.updateCertificate(certificateDto);
    }

    public void removeCertificateFromCv(final int id) {
        certificateService.deleteCertificate(id);
    }

    // Other
    public void addOtherToCv(final int cvId, @NonNull final OtherDto otherDto) {
        OtherDto newOtherDto = otherService.createOther(otherDto);
        CvDto cvDto = this.getCv(cvId);
        List<OtherDto> otherDtoList = cvDto.getOthers();
        otherDtoList.add(newOtherDto);
        cvDto.setOthers(otherDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
    }

    public void updateOther(@NonNull final OtherDto otherDto) {
        otherService.updateOther(otherDto);
    }

    public void removeOtherFromCv(final int id) {
        otherService.deleteOther(id);
    }
}
