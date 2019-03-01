SELECT url,photo.id FROM photo JOIN app_user ON user_id = app_user.id WHERE username = $1 ORDER BY photo.id DESC
