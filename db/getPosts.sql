SELECT url, upload_date, upload_time,caption,photo.id, username, avatar FROM photo JOIN app_user ON user_id = app_user.id ORDER BY photo.id DESC