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
    description varchar(255),

    primary key (id)
);

create table project
(
    id integer not null,
    app_from date,
    app_to date,
    company varchar(255),
    contribution varchar(255),
    project_type_id integer,

    primary key (id),
    foreign key (project_type_id) references project_type
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
