import { Router } from "express";
import {OrderFood,CancelOrder, fetchAllOrder} from "../controllers/order.controller.js"
import {verifyJWT} from "../middlewres/auth.middleware.js"
const router = Router()

router.route("/order").post(verifyJWT,OrderFood)

router.route("/cancelOrder/:id").delete(verifyJWT,CancelOrder)

router.route("/allOrders").get(verifyJWT,fetchAllOrder)

export default router