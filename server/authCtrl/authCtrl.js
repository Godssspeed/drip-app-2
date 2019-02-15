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
        req.session.user = { username: response[0].username };
        console.log(req.session);
        res.status(200).json(req.session.user);
      }
    }
  });
};

const logout = (req, res) => {
  req.session.destroy();
  console.log(req.session);
  res.sendStatus(200);
};

const get_user = (req, res) => {
  const { username } = req.params;
  console.log(username);
  const db = req.app.get("db");
  if (req.session.user.username === username) {
    db.getUser(username).then(response => {
      console.log(response);
      res.status(200).json(response);
    });
  } else {
    res.status(401).json({ error: "Please log in" });
  }
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
  deletePost
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
