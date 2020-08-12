package com.skillsmanagerapi.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class Cv {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private User user;
    @ManyToMany
    @JoinColumn(referencedColumnName = "id")
    private List<Language> languages;
    @ManyToMany
    @JoinColumn(referencedColumnName = "id")
    private List<Skill> skills;
    @ManyToMany
    @JoinColumn(referencedColumnName = "id")
    private List<Project> projects;
    @ManyToMany
    @JoinColumn(referencedColumnName = "id")
    private List<Technology> technologies;
    @ManyToMany
    @JoinColumn(referencedColumnName = "id")
    private List<Other> others;

}
