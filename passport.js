import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID =
  "879786406265-d854ttdo68h5ggkeptbrgjrop1egg8bi.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://expenser-backend-production.up.railway.app/auth/google/callback",
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
