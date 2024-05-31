import { Router } from "express";
import {registerUser,loginUser,logoutUser,getCurrentUser} from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewres/auth.middleware.js"
const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logoutUser)

router.route("/current").get(verifyJWT,getCurrentUser)

export default router