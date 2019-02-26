require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const {
  register,
  login,
  get_user,
  logout,
  deletePost,
  createPost,
  getPost,
  createComment,
  likeAction,
  deleteLike,
  getLikeFromUser
  // get_User_Account
} = require("./authCtrl/authCtrl");
const {
  getPosts,
  getComments,
  deleteComment,
  editComment,
  deleteAllComments,
  getLikes
  // getNews
} = require("./controller/controller");

const app = express();

app.use(json());
app.use(cors());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("Database Connected");
});

// AUTH REQUESTS
app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/:username", get_user);
app.post("/auth/logout", logout);
// app.get("/:username/photos", get_photos);
// DATA / USER REQUESTS
app.get("/api/posts", getPosts);
app.delete("/api/:id", deletePost);
app.post("/api/create", createPost);
app.get("/api/:id", getPost);
// app.post("/account/?username", get_User_Account);
// app.get("/api/:username", getUserProfile);

//COMMENTS
app.get("/api/:id/comments", getComments);
app.post("/api/:id/create/comment", createComment);
app.delete("/api/delete/:id", deleteComment);
app.delete("/api/post/delete/:id", deleteAllComments);
app.put("/api/edit/:id", editComment);

// LIKES
app.get("/api/:id/likes", getLikes);
app.post("/api/:id/like", likeAction);
app.delete("/api/like/delete", deleteLike);
app.get("/api/:id/like/user", getLikeFromUser);

// NEWS API
// app.get("/api/news", getNews);

app.listen(SERVER_PORT || 4000, () =>
  console.log(`Listening on ${SERVER_PORT}`)
);
