import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID =
  "967030061944-q61p9s66r068cn19bg5tfp8fm6sjtavs.apps.googleusercontent.com";
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
