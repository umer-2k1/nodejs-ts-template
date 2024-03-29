import express, { Router } from "express";
import * as authController from "../controllers/authController";
import isAuthenticated from "../middleware/auth";

const router: Router = express.Router();
//get
router.route("/logout").get(authController.logout);
//post
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/requestEmailToken").post(authController.requestEmailToken);
router.route("/verifyEmail").post(authController.verifyEmail);
router.route("/forgotPassword").post(authController.forgotPassword);

router.route("/resetPassword").put(authController.resetPassword);
router
  .route("/updatePassword")
  .put(isAuthenticated, authController.updatePassword);

export default router;
