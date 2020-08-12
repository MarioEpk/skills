package com.skillsmanagerapi.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Temporal(TemporalType.DATE)
    @Column(name = "app_from")
    private Date from;
    @Temporal(TemporalType.DATE)
    @Column(name = "app_to")
    private Date to;
    private String company;
    private String contribution;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private ProjectType projectType;
}
