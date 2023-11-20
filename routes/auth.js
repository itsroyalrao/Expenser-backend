import express from "express";
import { callbackGoogle, logoutGoogle } from "../components/auth.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  callbackGoogle
);

router.get("/logout", logoutGoogle);

export default router;

// import express from "express";
// import passport from "passport";

// const router = express.Router();

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect(
//       `https://expenser-v1.netlify.app?user=${encodeURIComponent(
//         JSON.stringify(req.user._json)
//       )}`
//     );
//   }
// );

// router.get("/logout", (req, res) => {
//   req.logOut();
//   res.redirect("https://expenser-v1.netlify.app");
// });

// export default router;
