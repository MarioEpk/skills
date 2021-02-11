package com.skillsmanagerapi.models;

import org.hibernate.annotations.Type;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "project_type")
public class ProjectType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "description")
    @Type(type="text")
    private String description;

    @Column(name = "name")
    private String name;

    @Column(name = "export_name")
    private String exportName;

    @ManyToMany
    @JoinColumn(name = "technology_type_id", referencedColumnName = "id")
    @OrderBy(value = "id")
    private List<TechnologyType> technologies;
}
