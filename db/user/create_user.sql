insert into sim3_users (username, password, profile_pic) 
values ($1, $2, $3)
returning *;