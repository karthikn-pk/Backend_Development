const express = require("express");
const ejs = require("ejs");
const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;

passport.use(
  new Strategy(
    {
      clientID: "2233027983702202",
      clientSecret: "aa63f13c9c08918109e265793d0404af",
      callbackURL: "http://localhost/3000/login/facebook/return",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const app = express();

app.set("views", __dirname + "views");
app.set("view engine", "ejs");

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "lco app",
    resave: true,
    saveUninitialized: true,
  })
);
