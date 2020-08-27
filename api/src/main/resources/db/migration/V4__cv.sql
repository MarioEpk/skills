create table cv
(
    id      integer not null,
    profile varchar(255),
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
    foreign key (languages_id) references language
);

create table cv_others
(
    cv_id     integer not null,
    others_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (others_id) references other
);

create table cv_projects
(
    cv_id       integer not null,
    projects_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (projects_id) references project
);

create table cv_skills
(
    cv_id     integer not null,
    skills_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (skills_id) references skill
);

create table cv_technologies
(
    cv_id           integer not null,
    technologies_id integer not null,

    foreign key (cv_id) references cv,
    foreign key (technologies_id) references technology
);
