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
    google_id integer not null,
    role_id   integer,

    primary key (id),
    foreign key (role_id) references role
);
