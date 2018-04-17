module.exports = {
  register: (req, res) => {
    let { username, password } = req.body;
    req.app.get('db').user.read_user(username, password)
      .then(user => {
        if (user[0]) {
          req.session.userid = user[0].id;
          res.status(200).send(user[0]);
        } else {
          db.user.create_user(username, password, `https://robohash.org/${username}.png`)
            .then(user => {
              req.session.userid = user[0].id;
              res.status(200).send(user[0]);
            })
        }
      })
  },
  login: (req, res) => {
    let { username, password } = req.body;
    req.app.get('db').user.read_user(username, password)
      .then(user => {
        if (user[0]) {
          req.session.userid = user[0].id;
          res.status(200).send(user[0]);
        } else {
          res.status(404).send();
        }
      })
  },
  userProfile: (req, res) => {
    req.app.get('db').user.read_user_id(req.session.userid)
      .then(user => res.status(200).send(user[0]))
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send();
  },
  readPosts: (req, res) => {
    let { userid } = req.session;
    let { mine, search } = req.query;
    if (mine && !search) {
      req.app.get('db').search.read_my_posts()
        .then(posts => res.status(200).send(posts))
    } else if (!mine && search) {
      req.app.get('db').search.search_all_posts(`%${search.toLowerCase()}%`, userid)
        .then(posts => res.status(200).send(posts))
    } else if (mine && search) {
      req.app.get('db').search.search_my_posts(`%${search.toLowerCase()}%`)
        .then(posts => res.status(200).send(posts))
    } else {
      req.app.get('db').search.read_all_posts(userid)
        .then(posts => res.status(200).send(posts))
    }
  },
  createPost: (req, res) => {
    let { userid } = req.session;
    let { title, img, content } = req.body;
    req.app.get('db').post.create_post(userid, title, img, content)
      .then(_ => res.status(200).send())
  },
  readPost: (req, res) => {
    req.app.get('db').post.read_post(req.params.id)
      .then(post => post[0] ? res.status(200).send(post[0]) : res.status(200).send({}))
  }
}