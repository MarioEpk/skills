create table certificate
(
    id          integer not null,
    date        date,
    description varchar(255),
    name        varchar(255),
    constraint certificate_pkey
        primary key (id)
);

alter table certificate
    owner to moro;

create table language_type
(
    id   integer not null,
    name varchar(255),
    constraint language_type_pkey
        primary key (id)
);

alter table language_type
    owner to moro;

create table language
(
    id               integer not null,
    level            integer not null,
    language_type_id integer,
    constraint language_pkey
        primary key (id),
    constraint fkg3qwvndvx4snwjh2n952n9an9
        foreign key (language_type_id) references language_type
);

alter table language
    owner to moro;

create table other
(
    id          integer not null,
    date        date,
    description varchar(255),
    name        varchar(255),
    constraint other_pkey
        primary key (id)
);

alter table other
    owner to moro;

create table project_type
(
    id   integer not null,
    name varchar(255),
    constraint project_type_pkey
        primary key (id)
);

alter table project_type
    owner to moro;

create table project
(
    id              integer not null,
    company         varchar(255),
    contribution    varchar(255),
    app_from        date,
    app_to          date,
    project_type_id integer,
    constraint project_pkey
        primary key (id),
    constraint fkah6s35k2p37mnlj6dbag3e8mw
        foreign key (project_type_id) references project_type
);

alter table project
    owner to moro;

create table role
(
    id   integer not null,
    name varchar(255),
    constraint role_pkey
        primary key (id)
);

alter table role
    owner to moro;

create table app_user
(
    id        integer not null,
    google_id integer not null,
    role_id   integer,
    constraint app_user_pkey
        primary key (id),
    constraint fk49hx9nj6onfot1fxtonj986ab
        foreign key (role_id) references role
);

alter table app_user
    owner to moro;

create table cv
(
    id      integer not null,
    user_id integer,
    constraint cv_pkey
        primary key (id),
    constraint fkg0i5xil4lane1jqe5ivrbpl2d
        foreign key (user_id) references app_user
);

alter table cv
    owner to moro;

create table cv_languages
(
    cv_id        integer not null,
    languages_id integer not null,
    constraint fkpsghm9vhux1k488yi11iudg87
        foreign key (languages_id) references language,
    constraint fkby0dj5u9x7q7o5g5aavs8igcb
        foreign key (cv_id) references cv
);

alter table cv_languages
    owner to moro;

create table cv_others
(
    cv_id     integer not null,
    others_id integer not null,
    constraint fk89sfvpdp8yehvlnqsv0y3ugrt
        foreign key (others_id) references other,
    constraint fkhoj0psap0pvolt60hhdjwyquq
        foreign key (cv_id) references cv
);

alter table cv_others
    owner to moro;

create table cv_projects
(
    cv_id       integer not null,
    projects_id integer not null,
    constraint fkmk3ns0t2nb2b4b32qm8klrquh
        foreign key (projects_id) references project,
    constraint fkojeptjoww1q5m38fuwr9vjk01
        foreign key (cv_id) references cv
);

alter table cv_projects
    owner to moro;

create table skill_type
(
    id   integer not null,
    name varchar(255),
    constraint skill_type_pkey
        primary key (id)
);

alter table skill_type
    owner to moro;

create table skill
(
    id            integer not null,
    level         integer not null,
    skill_type_id integer,
    constraint skill_pkey
        primary key (id),
    constraint fka944rqu8rtoxq030md56rg9ne
        foreign key (skill_type_id) references skill_type
);

alter table skill
    owner to moro;

create table cv_skills
(
    cv_id     integer not null,
    skills_id integer not null,
    constraint fkcldfju5qek0fqwg1p5dcdjvd1
        foreign key (skills_id) references skill,
    constraint fkpxux3g6iaxubcgeijhx5ju3hg
        foreign key (cv_id) references cv
);

alter table cv_skills
    owner to moro;

create table technology_type
(
    id   integer not null,
    name varchar(255),
    constraint technology_type_pkey
        primary key (id)
);

alter table technology_type
    owner to moro;

create table technology
(
    id                 integer not null,
    level              integer not null,
    technology_type_id integer,
    constraint technology_pkey
        primary key (id),
    constraint fk9d2kxek1x1ml90roxtkgko0an
        foreign key (technology_type_id) references technology_type
);

alter table technology
    owner to moro;

create table cv_technologies
(
    cv_id           integer not null,
    technologies_id integer not null,
    constraint fkdwh6xumipa3irykpexc5e1oll
        foreign key (technologies_id) references technology,
    constraint fkepved20etmn3s5n4q74gfbvv9
        foreign key (cv_id) references cv
);

alter table cv_technologies
    owner to moro;

