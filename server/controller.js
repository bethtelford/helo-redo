module.exports = {
  register: (req, res) => {
    let { username, password } = req.body;
    req.app.get('db').read_user(username, password)
      .then(user => {
        if (user[0]) {
          res.status(200).send(user[0]);
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
  }
}