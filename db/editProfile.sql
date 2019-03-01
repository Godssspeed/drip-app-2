UPDATE app_user
SET full_name = $2, bio = $3
WHERE username = $1