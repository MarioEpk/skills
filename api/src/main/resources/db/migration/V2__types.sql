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
    description varchar(255),

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
