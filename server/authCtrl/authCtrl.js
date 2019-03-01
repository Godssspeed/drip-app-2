const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.get("db");
  const hash = await bcrypt.hash(password, 12);

  try {
    const response = await db.add_user([username, hash]);
    req.session.user = { username: response[0].username };
    res.status(200).json(response[0].username);
  } catch (err) {
    console.log(err);
    res.status(401).json("Username Exists, please pick another one.");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.get("db");

  db.find_user(username).then(async response => {
    console.log(response);
    if (!response.length) {
      res.status(401).json({ error: "No user found" });
    } else {
      const isMatch = await bcrypt.compare(password, response[0].hash);
      if (!isMatch) {
        return res.status(401).json({ error: "Wrong Password" });
      } else {
        req.session.user = {
          id: response[0].id,
          username: response[0].username,
          avatar: response[0].avatar
        };
        console.log(req.session);
        res.status(200).json(req.session.user);
      }
    }
  });
};

const logout = (req, res) => {
  req.session.destroy();
  // console.log(req.session);
  res.sendStatus(200);
};

const get_user = (req, res) => {
  const { username } = req.params;
  console.log(username);
  const db = req.app.get("db");
  db.getUser(username)
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};
const getUserPhotos = (req, res) => {
  const { username } = req.params;
  console.log(username);
  const db = req.app.get("db");
  db.getUserPhotos(username)
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

const deletePost = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const db = req.app.get("db");

  db.deletePost(id)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
};

createPost = (req, res) => {
  const { id } = req.session.user;
  const { url, caption } = req.body;
  const db = req.app.get("db");

  db.createPost([url, caption, id])
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send("Error Mate");
      console.log(err);
    });
};

const getPost = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const db = req.app.get("db");

  db.getPost(id)
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

createComment = (req, res) => {
  // const { id } = req.session.user;
  const { user_text } = req.body;
  // const { id } = req.params;
  const db = req.app.get("db");

  db.createComment([user_text, req.params.id, req.session.user.id])
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send("Error Mate");
      console.log(err);
    });
};

likeAction = (req, res) => {
  const db = req.app.get("db");
  const { user } = req.session;
  const { id } = req.params;

  db.likeAction([id, user.id])
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
};

deleteLike = (req, res) => {
  const db = req.app.get("db");
  const { user } = req.session;
  db.deleteLike(user.id)
    .then(response => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
};

getLikeFromUser = (req, res) => {
  const db = req.app.get("db");
  const { user } = req.session;
  const { id } = req.params;

  db.getLikeFromUser([user.id, id])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(er => console.log(err));
};

editProfile = (req, res) => {
  const db = req.app.get("db");
  const { username } = req.params;
  const { full_name, bio } = req.body;

  db.editProfile([username, full_name, bio])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

// const get_user = (req, res) => {
//   const { username } = req.body;
//   if (req.session.user.username === username) {
//     res.json(req.session.user);
//   } else {
//     res.status(401).json({ error: "Please log in" });
//   }
// };

// const getUserProfile = (req, res) => {
//   const { username } = req.params;
//   const db = req.app.get("db");
//   if (req.session.user.username === username) {
//     db.getUser(username).then(response => {
//       console.log(response);
//       res.status(200).json(response);
//     });
//   } else {
//     res.status(401).json({ error: "Please log in" });
//   }
// };

module.exports = {
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
  getLikeFromUser,
  getUserPhotos,
  editProfile
};

// const get_user = (req, res) => {
//   const { username } = req.params;
//   console.log(username);
//   const db = req.app.get("db");
//   if (req.session.user.username === username) {
//     db.getUser(username).then(response => {
//       console.log(response);
//       res.status(200).json(response);
//     });
//   } else {
//     res.status(401).json({ error: "Please log in" });
//   }
// };
