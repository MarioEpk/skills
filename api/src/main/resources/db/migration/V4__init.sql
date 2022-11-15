alter table cv add column shared bool default false;
alter table cv add column external_code varchar(32);
update cv set shared=false;