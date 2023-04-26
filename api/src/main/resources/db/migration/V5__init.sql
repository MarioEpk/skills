create table private_project(
                          id                   integer not null,
                          name                 text,
                          description          text,
                          company              text,
                          app_from             date,
                          app_to               date,
                          contribution         text,
                          primary key (id)
);

create table cv_private_project(
                              cv_id              integer not null,
                              private_project_id integer not null,

                              foreign key (cv_id) references cv on delete cascade,
                              foreign key (private_project_id) references private_project on delete cascade
);

create table private_project_technologies(
                                private_project_id      integer not null,
                                technologies_id         integer not null,

                                foreign key (private_project_id) references private_project on delete cascade,
                                foreign key (technologies_id) references technology_type on delete cascade
);
