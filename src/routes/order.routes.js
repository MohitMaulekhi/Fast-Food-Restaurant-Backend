import { Router } from "express";

const router = Router()

router.route("/order").post()

router.route("/cancelOrder/:id").delete()

export default router