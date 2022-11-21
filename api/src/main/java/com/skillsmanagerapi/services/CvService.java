package com.skillsmanagerapi.services;

import com.skillsmanagerapi.dto.CertificateDto;
import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.EducationDto;
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
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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
    private final EducationService educationService;
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
        @NonNull final EducationService educationService,
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
        this.educationService = educationService;
    }

    public CvDto getCvOrCreateNew(@NonNull final UserDto userDto) {
        final Cv cv = cvRepository.findByUser(modelMapper.map(userDto, User.class)).orElseGet(() -> createCv(userDto));
        return modelMapper.map(cv, CvDto.class);
    }

    public CvDto getCv(final int id) {
        return modelMapper.map(cvRepository.findById(id).orElseThrow(EntityNotFoundException::new), CvDto.class);
    }

    public CvDto getCVByExternalCode(@NonNull final String externalCode) {
        return modelMapper.map(cvRepository.findByExternalCode(externalCode).orElseThrow(EntityNotFoundException::new), CvDto.class);
    }


    @Transactional
    public void deleteCv(final int id) {
        cvRepository.deleteById(id);
    }

    public List<CvDto> getAllCvs() {
        return modelMapperUtil.mapList(cvRepository.findAllByOrderByIdAsc(), CvDto.class);
    }

    @Transactional
    public void updateCv(@NonNull final CvDto cvDto) {
        final CvDto updatedCvDto = this.getCv(cvDto.getId());
        final UserDto userDto = updatedCvDto.getUser();
        userDto.setFirstName(cvDto.getUser().getFirstName());
        userDto.setLastName(cvDto.getUser().getLastName());
        userService.updateUser(userDto);
        updatedCvDto.setProfile(cvDto.getProfile());
        updatedCvDto.setPositions(cvDto.getPositions());
        updatedCvDto.setAvatar(cvDto.getAvatar());
        cvRepository.save(modelMapper.map(updatedCvDto, Cv.class));
        relatedCVDataChanged(cvDto.getId());
    }

    public void toggleShareStatus(final int cvId) {
        final CvDto cvDto = this.getCv(cvId);
        cvDto.setShared(!cvDto.isShared());
        //if external_code is empty and share=true, generate value
        if (cvDto.isShared() && StringUtils.isEmpty(cvDto.getExternalCode())) {
            cvDto.setExternalCode(generateExternalCode(cvDto));
        }
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
    }

    // Language
    @Transactional
    public void addLanguageToCv(final int cvId, @NonNull final LanguageDto languageDto) {
        final LanguageDto newLanguageDto = languageService.createLanguage(languageDto);
        final CvDto cvDto = this.getCv(cvId);
        final List<LanguageDto> languageDtoList = cvDto.getLanguages();
        languageDtoList.add(newLanguageDto);
        cvDto.setLanguages(languageDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void updateLanguage(final int cvId, @NonNull final LanguageDto languageDto) {
        languageService.updateLanguage(languageDto);
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void removeLanguageFromCv(final int cvId, final int id) {
        languageService.deleteLanguage(id);
        relatedCVDataChanged(cvId);
    }

    // Education
    @Transactional
    public void addEducationToCv(final int cvId, @NonNull final EducationDto educationDto) {
        final EducationDto newEducationDto = educationService.createEducation(educationDto);
        final CvDto cvDto = this.getCv(cvId);
        final List<EducationDto> educationDtoList = cvDto.getEducations();
        educationDtoList.add(newEducationDto);
        cvDto.setEducations(educationDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void updateEducation(final int cvId, @NonNull final EducationDto educationDto) {
        educationService.updateEducation(educationDto);
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void removeEducationFromCv(final int cvId, final int id) {
        educationService.deleteEducation(id);
        relatedCVDataChanged(cvId);
    }

    // Skill
    @Transactional
    public void addSkillToCv(final int cvId, @NonNull final SkillDto skillDto) {
        final SkillDto newSkillDto = skillService.createSkill(skillDto);
        final CvDto cvDto = this.getCv(cvId);
        final List<SkillDto> skillDtoList = cvDto.getSkills();
        skillDtoList.add(newSkillDto);
        cvDto.setSkills(skillDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void updateSkill(final int cvId, @NonNull final SkillDto skillDto) {
        skillService.updateSkill(skillDto);
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void removeSkillFromCv(final int cvId, final int id) {
        skillService.deleteSkill(id);
        relatedCVDataChanged(cvId);
    }

    // Project
    @Transactional
    public void addProjectToCv(final int cvId, @NonNull final ProjectDto projectDto) {
        final ProjectDto newProjectDto = projectService.createProject(projectDto);
        final CvDto cvDto = this.getCv(cvId);
        final List<ProjectDto> projectDtoList = cvDto.getProjects();
        projectDtoList.add(newProjectDto);
        cvDto.setProjects(projectDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void updateProject(final int cvId, @NonNull final ProjectDto projectDto) {
        projectService.updateProject(projectDto);
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void removeProjectFromCv(final int cvId, final int id) {
        projectService.deleteProject(id);
        relatedCVDataChanged(cvId);
    }

    // Technology
    @Transactional
    public void addTechnologyToCv(final int cvId, @NonNull final TechnologyDto technologyDto) {
        final TechnologyDto newTechnologyDto = technologyService.createTechnology(technologyDto);
        final CvDto cvDto = this.getCv(cvId);
        final List<TechnologyDto> technologyDtoList = cvDto.getTechnologies();
        technologyDtoList.add(newTechnologyDto);
        cvDto.setTechnologies(technologyDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void updateTechnology(final int cvId, @NonNull final TechnologyDto technologyDto) {
        technologyService.updateTechnology(technologyDto);
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void removeTechnologyFromCv(final int cvId, final int id) {
        technologyService.deleteTechnology(id);
        relatedCVDataChanged(cvId);
    }

    // Certificate
    @Transactional
    public void addCertificateToCv(final int cvId, @NonNull final CertificateDto certificateDto) {
        final CertificateDto newCertificateDto = certificateService.createCertificate(certificateDto);
        final CvDto cvDto = this.getCv(cvId);
        final List<CertificateDto> certificateDtoList = cvDto.getCertificates();
        certificateDtoList.add(newCertificateDto);
        cvDto.setCertificates(certificateDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void updateCertificate(final int cvId, @NonNull final CertificateDto certificateDto) {
        certificateService.updateCertificate(certificateDto);
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void removeCertificateFromCv(final int cvId, final int id) {
        certificateService.deleteCertificate(id);
        relatedCVDataChanged(cvId);
    }

    // Other
    @Transactional
    public void addOtherToCv(final int cvId, @NonNull final OtherDto otherDto) {
        final OtherDto newOtherDto = otherService.createOther(otherDto);
        final CvDto cvDto = this.getCv(cvId);
        final List<OtherDto> otherDtoList = cvDto.getOthers();
        otherDtoList.add(newOtherDto);
        cvDto.setOthers(otherDtoList);
        cvRepository.save(modelMapper.map(cvDto, Cv.class));
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void updateOther(final int cvId, @NonNull final OtherDto otherDto) {
        otherService.updateOther(otherDto);
        relatedCVDataChanged(cvId);
    }

    @Transactional
    public void removeOtherFromCv(final int cvId, final int id) {
        otherService.deleteOther(id);
        relatedCVDataChanged(cvId);
    }

    //force update if related data changed
    private void relatedCVDataChanged(final int cvId) {
        Cv cv = cvRepository.getOne(cvId);
        cv.setUpdatedAt(new Date());
        cvRepository.save(cv);
    }

    private Cv createCv(@NonNull final UserDto userDto) {
        log.info("Creating cv for user {}", userDto.getEmail());
        final Cv cv = new Cv();
        cv.setUser(modelMapper.map(userDto, User.class));
        cvRepository.save(cv);
        return cv;
    }

    public String generateExternalCode(@NonNull final CvDto cvDto) {
        final String toHash = cvDto.getUser().getEmail() + UUID.randomUUID();  //email + UUID hash
        String extCode;
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            byte[] hash = messageDigest.digest(toHash.getBytes(StandardCharsets.UTF_8));
            extCode = String.format("%064x", new BigInteger(1, hash));
        } catch (NoSuchAlgorithmException e) {
            log.warn("Cannot generate external code, fallback will be used");
            extCode = UUID.randomUUID().toString();
        }
        return extCode.length() > 16 ? extCode.substring(0, 16) : extCode;
    }


}
