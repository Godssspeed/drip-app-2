module.exports = {
  getPosts: (req, res) => {
    const db = req.app.get("db");

    db.getPosts().then(response => {
      res.status(200).json(response);
    });
  },
  getLikes: (req, res) => {
    const db = req.app.get("db");

    db.getLikes().then(response => {
      res.status(200).json(response);
    });
  }
  //   getUserProfile: (req, res) => {
  //     const { username } = req.body;
  //     const db = req.app.get("db");
  //     console.log(req.session);

  //     db.getUser(username).then(response => {
  //       console.log(response);
  //       res.status(200).json(response);
  //     });
  //   }
  // };

  // db.getUser(username).then(response => {
  //   console.log(response);
  //   req.session.user = { username: response[0].username };
  //   const profile = { user: req.session.user, data: response };
  //   res.status(200).json(profile);
  // });
  // }
};
