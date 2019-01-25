
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate, generateToken } = require("../auth/authenticate");
const db = require("../database/dbConfig");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  const userInfo = req.body;
  userInfo.password = bcrypt.hashSync(userInfo.password, 4);
  db("users")
    .insert(userInfo)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
}

function login(req, res) {
  const creds = req.body;
  console.log(creds);
  db("users")
    .where({ username: creds.username }).first()
    .then(user => {
      
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        console.log({user: user});
        const token = generateToken(user);
        console.log({token: token});
        res.status(200).json({ token: token });
      } else {
        res.status(401).json({ message: "you shall not pass!!" });
      }
    })
    .catch(err => res.status(500).json(err));
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };
  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
