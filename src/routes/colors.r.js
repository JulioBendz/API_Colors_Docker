import { Router } from "express";
import { getColors, createColors, updateColors, deleteColors, getColor } from "../controllers/colors.c.js"

const router = Router()

router.get('/colors', getColors)

router.get('/colors/:id', getColor)

router.post('/colors', createColors)

router.patch('/colors/:id', updateColors)

router.delete('/colors/:id', deleteColors)

export default router