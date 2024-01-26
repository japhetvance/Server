import express, { Router } from "express";
import { getManager } from "../controllers/manager.js"

const router = express.Router();

router.get("/manager", getManager)

export default router;