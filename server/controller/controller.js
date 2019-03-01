// const axios = require("axios");
// const news = [];

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
  },

  getComments: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    db.getComments(id).then(response => {
      console.log(response);
      res.status(200).json(response);
    });
  },

  deleteComment: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.deleteComment(id)
      .then(response => {
        res.sendStatus(200);
      })
      .catch(err => console.log(err));
  },

  editComment: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { user_text } = req.body;

    db.editComment([user_text, id])
      .then(response => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
      });
  },

  deleteAllComments: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.deleteAllComments(id).then(response => {
      res.sendStatus(200);
    });
  },

  getLikes: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.getLikes(id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // getNews: (req, res) => {
  //   const api = "apiKey=45268a277b8743078aa774f07329ce3f";
  //   const url = `https://newsapi.org/v2/top-headlines?country=us&${api}`;
  //   axios
  //     .get(url)
  //     .then(response => {
  //       console.log(response);
  //       news.push(response.data);
  //     })
  //     .catch(err => console.log(err));
  // }

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
