const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");

//@type   GET
//@route  -   /api/auth
//@desc   - just for testing
//@access  - PUBLIC
router.get("/", (req, res) => res.json({ test: "auth testing" }));

//import schema for person to register
const Person = require("../../models/Person");

//@type   POST
//@route  -  /api/auth/register
//@desc   - route for user registeration
//@access  - PUBLIC

router.post("/register", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then((person) => {
      if (person) {
        return res
          .status(400)
          .json({ emailerror: "email is already registered" });
      } else {
        const newPerson = new Person({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        //encrypt password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if (err) throw err;
            newPerson.password = hash;
            newPerson
              .save()
              .then((person) => res.json(person))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

//@type   POST
//@route  -  /api/auth/login
//@desc   - route for login user
//@access  - PUBLIC

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Person.findOne({ email })
    .then((person) => {
      if (!person) {
        return res.status(400).json({ emailerror: "user not found" });
      }
      bcrypt.compare(password, person.password).then((isCorrect) => {
        if (isCorrect) {
          // res.json({ success: "user is loggedin successfully" });
          //use payload and create token for user
          const payload = {
            id: person.id,
            name: person.name,
            email: person.email,
          };
          jsonwt.sign(
            payload,
            key.secret,
            { expiresIn: "1hr" },
            (err, token) => {
              res.json({ success: true, token: "Bearer " + token });
            }
          );
        } else {
          res.status(400).json({ password: "password incorrect" });
        }
      });
    })
    .catch((err) => console.log(err));
});

//@type   GET
//@route  -  /api/auth/profile
//@desc   - route for user profile
//@access  - PRIVATE

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.id,
      email: req.user.email,
      profilepic: req.user.profilepic,
    });
  }
);

module.exports = router;
