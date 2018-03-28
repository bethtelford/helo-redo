module.exports = {
  register: (req, res) => {
    console.log();
    let { username, password } = req.body;
    req.app.get('db').read_user(username, password)
      .then(user => {
        if (user[0]) {
          res.status(200).send(user[0])
        } else {
          db.create_user(username, password, `https://robohash.org/${username}.png`)
            .then(user => res.status(200).send(user[0]))
        }
      })
  },
  login: (req, res) => {
    let { username, password } = req.body;
    req.app.get('db').read_user(username, password)
      .then(user => {
        user[0] ? res.status(200).send(user[0]) : res.status(404).send();
      })
  },
  readPosts: (req, res) => {
    let {userid} = req.params;
    let { mine, search } = req.query;
    if (mine && !search) {
      req.app.get('db').read_my_posts()
        .then(posts => res.status(200).send(posts))
    } else if (!mine && search) {
      req.app.get('db').search_all_posts(`%${search.toLowerCase()}%`, userid)
        .then(posts => res.status(200).send(posts))
    } else if (mine && search) {
      req.app.get('db').search_my_posts(`%${search.toLowerCase()}%`)
        .then(posts => res.status(200).send(posts))
    } else {
      req.app.get('db').read_all_posts(userid)
        .then(posts => res.status(200).send(posts))
    }
  }
}