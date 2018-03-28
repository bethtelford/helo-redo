create table sim3_users (
    id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic text
)

create table sim3_posts (
    id serial primary key,
    title varchar(45),
    content text,
    img text,
    author_id integer
)