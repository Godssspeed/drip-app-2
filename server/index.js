require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const {
  register,
  login,
  get_user,
  logout,
  deletePost,
  createPost,
  getPost
  // get_User_Account
} = require("./authCtrl/authCtrl");
const { getPosts } = require("./controller/controller");

const app = express();

app.use(json());

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

app.listen(SERVER_PORT || 4000, () =>
  console.log(`Listening on ${SERVER_PORT}`)
);
