import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID =
  "967030061944-3f2glk3qq4gabhheffkkcmb8n5k5c722.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
