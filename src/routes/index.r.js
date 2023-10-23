import { Router } from "express"
import { ping } from "../controllers/index.c.js"

const router = Router()

router.get('/ping', ping)

export default router