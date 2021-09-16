const users = [];
const bcrypt = require("bcryptjs");

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        console.log("I'm in the if statement");
        const existing = bcrypt.compareSync(password, users[i].passHash);
        if (existing) {
          let userToReturn = { ...users[i] };
          delete userToReturn.passHash;
          console.log(userToReturn);
          res.status(200).send(userToReturn);
          return;
        }
      }
    }
    res.status(400).send("User not found.");
  },

  register: (req, res) => {
    console.log("Registering User");
    console.log(req.body);
    const { password, username, email, firstName, lastName } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const passHash = bcrypt.hashSync(password, salt);

    let newUserObj = {
      username,
      email,
      firstName,
      lastName,
      passHash,
    };

    users.push(newUserObj);
    let userToReturn = { ...newUserObj };
    delete userToReturn.passHash;
    res.status(200).send(newUserObj);
    console.log(bcrypt);

    console.log(users);
  },
};
