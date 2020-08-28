create table cv
(
    id      integer not null,
    profile varchar(255),
    avatar varchar(255),
    user_id integer,
    updated_at timestamp,
    created_at timestamp,

    primary key (id),
    foreign key (user_id) references app_user
);

create table cv_languages
(
    cv_id        integer not null,
    languages_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (languages_id) references language on delete cascade
);

create table cv_others
(
    cv_id     integer not null,
    others_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (others_id) references other on delete cascade
);

create table cv_projects
(
    cv_id       integer not null,
    projects_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (projects_id) references project on delete cascade
);

create table cv_skills
(
    cv_id     integer not null,
    skills_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (skills_id) references skill on delete cascade
);

create table cv_technologies
(
    cv_id           integer not null,
    technologies_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (technologies_id) references technology on delete cascade
);

create table cv_certificates
(
    cv_id           integer not null,
    certificates_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (certificates_id) references certificate on delete cascade
);

create table cv_positions
(
    cv_id        integer not null,
    positions_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (positions_id) references position_type
);
