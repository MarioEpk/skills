package com.skillsmanagerapi.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "private_project")
public class PrivateProject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

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
    @JoinColumn(name = "technology_type_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<TechnologyType> technologies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "cv_private_project",
            joinColumns = @JoinColumn(name = "private_project_id"),
            inverseJoinColumns = @JoinColumn(name = "cv_id"))
    private Cv cv;
}