create sequence if not exists hibernate_sequence START 1 INCREMENT 1;

create table role
(
    id   integer not null,
    name varchar(255),

    primary key (id)
);

create table app_user
(
    id        integer not null,
    first_name varchar(255),
    last_name varchar(255),
    google_id varchar(255),
    google_email varchar(255) unique,
    role_id   integer,

    primary key (id),
    foreign key (role_id) references role
);

create table language_type
(
    id   integer not null,
    name varchar(255),

    primary key (id)
);

create table project_type
(
    id   integer not null,
    name varchar(255),
    export_name varchar(255),
    description text,

    primary key (id)
);

create table skill_type
(
    id   integer not null,
    name varchar(255),

    primary key (id)
);

create table technology_type
(
    id   integer not null,
    name varchar(255),

    primary key (id)
);

create table position_type
(
    id   integer not null,
    name varchar(255),

    primary key (id)
);

create table project_type_technologies
(
    project_type_id integer not null,
    technologies_id integer not null,

    foreign key (project_type_id) references project_type,
    foreign key (technologies_id) references technology_type
);

create table certificate
(
    id integer not null,
    name varchar(255),
    date date,
    description varchar(255),

    primary key (id)
);

create table language
(
    id integer not null,
    level integer,
    language_type_id integer,

    primary key (id),
    foreign key (language_type_id) references language_type
);

create table other
(
    id integer not null,
    name varchar(255),
    date date,
    description text,

    primary key (id)
);

create table project
(
    id integer not null,
    app_from date,
    app_to date,
    company varchar(255),
    contribution text,
    project_type_id integer,

    primary key (id),
    foreign key (project_type_id) references project_type
);

create table project_positions
(
    project_id        integer not null,
    positions_id integer not null,

    foreign key (project_id) references project,
    foreign key (positions_id) references position_type
);

create table project_technologies
(
    project_id        integer not null,
    technologies_id integer not null,

    foreign key (project_id) references project,
    foreign key (technologies_id) references technology_type
);

create table skill
(
    id integer not null,
    level integer,
    skill_type_id integer,

    primary key (id),
    foreign key (skill_type_id) references skill_type
);

create table technology
(
    id integer not null,
    level integer,
    technology_type_id integer,

    primary key (id),
    foreign key (technology_type_id) references technology_type
);

create table cv
(
    id      integer not null,
    profile text,
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
