package com.skillsmanagerapi.models;

import com.skillsmanagerapi.enums.AvatarType;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "cv")
public class Cv {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "profile")
    @Type(type = "text")
    private String profile;

    @Enumerated(EnumType.STRING)
    @Column(name = "avatar")
    private AvatarType avatar;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinColumn(name = "position_type_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<PositionType> positions;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "languages_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<Language> languages;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "skills_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<Skill> skills;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "projects_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<Project> projects;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "technologies_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<Technology> technologies;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "certificates_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<Certificate> certificates;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "others_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<Other> others;

    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "educations_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<Education> educations;

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "shared")
    private boolean shared;

    @Column(name = "external_code")
    private String externalCode;
}
