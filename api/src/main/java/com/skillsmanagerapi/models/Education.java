package com.skillsmanagerapi.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "school")
    @Type(type="text")
    private String school;

    @Column(name = "field")
    @Type(type="text")
    private String field;

    @Temporal(TemporalType.DATE)
    @Column(name = "year_from")
    private Date yearFrom;

    @Temporal(TemporalType.DATE)
    @Column(name = "year_to")
    private Date yearTo;

    @Column(name = "note")
    @Type(type="text")
    private String note;
}
