select title, content, img, profile_pic as author_pic, username as author from sim3_posts p 
join sim3_users u on u.id = p.author_id
where p.id = $1;