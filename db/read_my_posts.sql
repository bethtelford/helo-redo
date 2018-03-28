select p.id as post_id, title, content, img, profile_pic, username as author_username from sim3_posts p
join sim3_users u on u.id = p.author_id;