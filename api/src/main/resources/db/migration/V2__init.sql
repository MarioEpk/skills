create table education(
    id         integer not null,
    school     text,
    field      text,
    year_from  date,
    year_to    date,
    note       text,

    primary key (id)
);

create table cv_educations(
     cv_id        integer not null,
     education_id integer not null,

    foreign key (cv_id) references cv on delete cascade,
    foreign key (education_id) references education on delete cascade
);
