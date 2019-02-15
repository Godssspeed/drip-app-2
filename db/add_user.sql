INSERT INTO app_user (username, hash)
VALUES($1, $2);

SELECT * FROM app_user WHERE username = $1