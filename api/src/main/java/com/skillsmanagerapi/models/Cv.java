package com.skillsmanagerapi.models;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "cv")
public class Cv {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "profile")
    private String profile;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinColumn(name = "languages_id", referencedColumnName = "id")
    private List<Language> languages;

    @ManyToMany
    @JoinColumn(name = "skills_id", referencedColumnName = "id")
    private List<Skill> skills;

    @ManyToMany
    @JoinColumn(name = "projects_id", referencedColumnName = "id")
    private List<Project> projects;

    @ManyToMany
    @JoinColumn(name = "technologies_id", referencedColumnName = "id")
    private List<Technology> technologies;

    @ManyToMany
    @JoinColumn(name = "others_id", referencedColumnName = "id")
    private List<Other> others;

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    @Column(name = "created_at")
    private Date createdAt;
}
