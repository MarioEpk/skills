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
