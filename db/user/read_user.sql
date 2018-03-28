SELECT *
FROM sim3_users
WHERE username = $1
        AND password = $2;