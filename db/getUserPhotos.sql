SELECT url FROM photo JOIN app_user ON user_id = app_user.id WHERE username = $1
