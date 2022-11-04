package com.skillsmanagerapi.controllers;

import com.skillsmanagerapi.dto.CertificateDto;
import com.skillsmanagerapi.dto.CvDto;
import com.skillsmanagerapi.dto.LanguageDto;
import com.skillsmanagerapi.dto.LanguageTypeDto;
import com.skillsmanagerapi.dto.PositionTypeDto;
import com.skillsmanagerapi.dto.ProjectDto;
import com.skillsmanagerapi.dto.ProjectTypeDto;
import com.skillsmanagerapi.dto.RoleDto;
import com.skillsmanagerapi.dto.SkillDto;
import com.skillsmanagerapi.dto.SkillTypeDto;
import com.skillsmanagerapi.dto.TechnologyDto;
import com.skillsmanagerapi.dto.TechnologyTypeDto;
import com.skillsmanagerapi.dto.UserDto;
import com.skillsmanagerapi.enums.AvatarType;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class CVTest {

    public static CvDto createTestCv() {
        CvDto c = new CvDto();
        c.setId(0);
        c.setUser(new UserDto());
        c.getUser().setId(0);
        c.getUser().setFirstName("Boris");
        c.getUser().setLastName("Brinza");
        c.getUser().setRole(new RoleDto());
        c.getUser().getRole().setId(1);
        c.getUser().getRole().setName("admin");
        c.getUser().setEmail("boris.brinza@gmail.com");
        c.setAvatar(AvatarType.MEN);
        c.setCreatedAt(new Date());

        c.setCertificates(new ArrayList<>());
        c.getCertificates().add(new CertificateDto());
        c.getCertificates().get(0).setId(0);
        c.getCertificates().get(0).setDate(new Date());
        c.getCertificates().get(0).setName("udemy test cert");
        c.getCertificates().get(0).setDescription("this is description of certificate.......");

        LanguageTypeDto lt1 = new LanguageTypeDto();
        lt1.setId(0);
        lt1.setName("Slovak");
        LanguageTypeDto lt2 = new LanguageTypeDto();
        lt2.setId(1);
        lt2.setName("English");
        LanguageTypeDto lt3 = new LanguageTypeDto();
        lt3.setId(2);
        lt3.setName("German");

        c.setLanguages(new ArrayList<>());
        c.getLanguages().add(new LanguageDto());
        c.getLanguages().add(new LanguageDto());
        c.getLanguages().add(new LanguageDto());
        c.getLanguages().get(0).setId(0);
        c.getLanguages().get(0).setLevel(1);
        c.getLanguages().get(0).setLanguageType(lt1);
        c.getLanguages().get(1).setId(1);
        c.getLanguages().get(1).setLevel(3);
        c.getLanguages().get(1).setLanguageType(lt2);
        c.getLanguages().get(2).setId(2);
        c.getLanguages().get(2).setLevel(4);
        c.getLanguages().get(2).setLanguageType(lt3);

        SkillTypeDto st1 = new SkillTypeDto();
        st1.setId(0);
        st1.setName("AWS");
        SkillTypeDto st2 = new SkillTypeDto();
        st2.setId(1);
        st2.setName("Backend Development");

        c.setSkills(new ArrayList<>());
        c.getSkills().add(new SkillDto());
        c.getSkills().add(new SkillDto());
        c.getSkills().get(0).setId(0);
        c.getSkills().get(0).setLevel(1);
        c.getSkills().get(0).setSkillType(st1);
        c.getSkills().get(1).setId(1);
        c.getSkills().get(1).setLevel(3);
        c.getSkills().get(1).setSkillType(st2);

        TechnologyTypeDto tt1 = new TechnologyTypeDto();
        tt1.setId(0);
        tt1.setName("Java");
        TechnologyTypeDto tt2 = new TechnologyTypeDto();
        tt2.setId(1);
        tt2.setName("C++");
        TechnologyTypeDto tt3 = new TechnologyTypeDto();
        tt3.setId(2);
        tt3.setName("Akka/Actor framework");
        c.setTechnologies(new ArrayList<>());
        c.getTechnologies().add(new TechnologyDto());
        c.getTechnologies().add(new TechnologyDto());
        c.getTechnologies().add(new TechnologyDto());
        c.getTechnologies().get(0).setId(0);
        c.getTechnologies().get(0).setTechnologyType(tt1);
        c.getTechnologies().get(0).setLevel(3);
        c.getTechnologies().get(1).setId(1);
        c.getTechnologies().get(1).setTechnologyType(tt2);
        c.getTechnologies().get(1).setLevel(1);
        c.getTechnologies().get(2).setId(2);
        c.getTechnologies().get(2).setTechnologyType(tt3);
        c.getTechnologies().get(2).setLevel(3);


        c.setPositions(new ArrayList<>());
        c.getPositions().add(new PositionTypeDto());
        c.getPositions().get(0).setId(0);
        c.getPositions().get(0).setName("Backend developer");
        c.getPositions().add(new PositionTypeDto());
        c.getPositions().get(1).setId(1);
        c.getPositions().get(1).setName("Fullstack developer");



        c.setProjects(new ArrayList<>());
        c.getProjects().add(new ProjectDto());
        c.getProjects().add(new ProjectDto());
        c.getProjects().add(new ProjectDto());
        c.getProjects().get(0).setId(0);
        c.getProjects().get(0).setCompany("Morosystems");
        c.getProjects().get(0).setContribution("Boris contributed in the whole processing stack,\n" +
                "mostly loyalty systems and outdoor terminals. He implemented an\n" +
                "application installer/upgrade module (automatic system upgrade with\n" +
                "site data synchronisation from backend management system).");
        c.getProjects().get(0).setFrom(Date.from(Instant.now().minus(5*365, ChronoUnit.DAYS)));
        c.getProjects().get(0).setTo(Date.from(Instant.now().minus(3*365, ChronoUnit.DAYS)));
        c.getProjects().get(0).setPositions(Arrays.asList(c.getPositions().get(0)));
        c.getProjects().get(0).setTechnologies(Arrays.asList(c.getTechnologies().get(0).getTechnologyType(), c.getTechnologies().get(1).getTechnologyType()));
        c.getProjects().get(0).setProjectType(new ProjectTypeDto());
        c.getProjects().get(0).getProjectType().setId(0);
        c.getProjects().get(0).getProjectType().setDescription("EPS is a gas stations payment solution for\n" +
                "major oil companies in the US, EU and APAC region. The solution\n" +
                "processes requests from POS and payment terminals and initiates and\n" +
                "processes subsequent communication with external systems (banking,\n" +
                "loyalty and mobile payment systems).");
        c.getProjects().get(0).getProjectType().setExportName("EPS4");
        c.getProjects().get(0).getProjectType().setName("EPS4");
        c.getProjects().get(0).getProjectType().setTechnologies(Arrays.asList(c.getTechnologies().get(0).getTechnologyType(), c.getTechnologies().get(1).getTechnologyType()));


        c.getProjects().get(1).setId(1);
        c.getProjects().get(1).setCompany("Morosystems");
        c.getProjects().get(1).setContribution("Boris was responsible for analysis, design and\n" +
                "development of core system and also implementation of bash scripts\n" +
                "for communication with lens hardware (camera, bluetooth, wearable\n" +
                "remote controller etc.). He also designed and implemented plug-in\n" +
                "support and various demo plug-ins.");
        c.getProjects().get(1).setFrom(Date.from(Instant.now().minus(3*365, ChronoUnit.DAYS)));
        c.getProjects().get(1).setTo(Date.from(Instant.now().minus(365, ChronoUnit.DAYS)));
        c.getProjects().get(1).setPositions(Arrays.asList(c.getPositions().get(1)));
        c.getProjects().get(1).setTechnologies(Arrays.asList(c.getTechnologies().get(0).getTechnologyType()));
        c.getProjects().get(1).setProjectType(new ProjectTypeDto());
        c.getProjects().get(1).getProjectType().setId(1);
        c.getProjects().get(1).getProjectType().setDescription("On-device application for wearable\n" +
                "augmented reality (AR) solution. AIRe Lens has been developed\n" +
                "specifically for industrial applications. The smart glasses deliver technical\n" +
                "information and step-by-step guidance to industry operators through\n" +
                "work processes, such as assembly, maintenance or quality assurance\n" +
                "tasks.");
        c.getProjects().get(1).getProjectType().setExportName("Konica-Minolta AIRe Lens");
        c.getProjects().get(1).getProjectType().setName("Konica-Minolta AIRe Lens");
        c.getProjects().get(1).getProjectType().setTechnologies(Arrays.asList(c.getTechnologies().get(0).getTechnologyType()));

        c.getProjects().get(2).setId(1);
        c.getProjects().get(2).setCompany("Morosystems");
        c.getProjects().get(2).setContribution("Boris is responsible for implementation of new\n" +
                "features, bug fixing and optimization of legacy code in all of the\n" +
                "modules: loan management, user management, t'ransaction system,\n" +
                "notification system, mailing support etc. Secondary market design and\n" +
                "implementation (investor to investor market).");
        c.getProjects().get(2).setFrom(Date.from(Instant.now().minus(365, ChronoUnit.DAYS)));
        c.getProjects().get(2).setTo(Date.from(Instant.now()));
        c.getProjects().get(2).setPositions(Arrays.asList(c.getPositions().get(0)));
        c.getProjects().get(2).setTechnologies(Arrays.asList(c.getTechnologies().get(1).getTechnologyType(), c.getTechnologies().get(2).getTechnologyType()));
        c.getProjects().get(2).setProjectType(new ProjectTypeDto());
        c.getProjects().get(2).getProjectType().setId(2);
        c.getProjects().get(2).getProjectType().setDescription("Bondster is an online platform that connects\n" +
                "investors with trusted lenders. It brings new opportunities for investors\n" +
                "from the general public, who can invest simply, online and without deep\n" +
                "knowledge of the financial market");
        c.getProjects().get(2).getProjectType().setExportName("Bondster");
        c.getProjects().get(2).getProjectType().setName("Bondster");
        c.getProjects().get(2).getProjectType().setTechnologies(Arrays.asList(c.getTechnologies().get(1).getTechnologyType()));


        c.setProfile("Senior Backend Developer with more than 20 years of software\n" +
                "development experience. Even after so many years, software\n" +
                "programming is not only his job but also his hobby. He has worked on\n" +
                "projects across a wide range of technologies and domains in teams of\n" +
                "varying sizes (2-20 people).");

        c.setOthers(new ArrayList<>());
        return c;
    }
}
