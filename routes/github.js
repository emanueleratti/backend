const express = require("express");
const github = express.Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");
const jwt = require("jsonwebtoken");
require("dotenv").config();

github.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

github.use(passport.initialize());

github.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("DATI UTENTE", profile);

      // QUI POSSIAMO EVENTUALMENTE SALVARE I DATI DELL'UTENTE NEL NOSTRO DATABASE

      return done(null, profile);
    }
  )
);

github.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (request, response, next) => {
    console.log("AUTHENTICATO");
    const redirectUrl = `${
      process.env.FRONTEND_URL
    }/success?user=${encodeURIComponent(JSON.stringify(request.user))}`;
    response.redirect(redirectUrl);
  }
);

github.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (request, response) => {
    const user = request.user;
    const token = jwt.sign(user, process.env.JWT_SECRET);
    const redirectUrl = `${
      process.env.FRONTEND_URL
    }/success/${encodeURIComponent(token)}`;
    response.redirect(redirectUrl);
  }
);

github.get("/success", (request, response) => {
  request.redirect("/homepage");
});

module.exports = github;
