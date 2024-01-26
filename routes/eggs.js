import express, { Router } from "express";
import { getEggs } from "../controllers/eggs.js"

const router = express.Router();

router.get("/eggs", getEggs)

export default router;