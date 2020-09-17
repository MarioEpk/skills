package com.skillsmanagerapi.models;

import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Temporal(TemporalType.DATE)
    @Column(name = "app_from")
    private Date from;

    @Temporal(TemporalType.DATE)
    @Column(name = "app_to")
    private Date to;

    @Column(name = "company")
    private String company;

    @Column(name = "contribution")
    @Type(type="text")
    private String contribution;

    @ManyToMany
    @JoinColumn(name = "position_type_id", referencedColumnName = "id")
    private List<PositionType> positions;

    @ManyToMany
    @JoinColumn(name = "technology_type_id", referencedColumnName = "id")
    private List<TechnologyType> technologies;

    @ManyToOne
    @JoinColumn(name = "project_type_id", referencedColumnName = "id")
    private ProjectType projectType;
}
