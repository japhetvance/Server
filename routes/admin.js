import express, { Router } from "express";
import { getAdmin } from "../controllers/admin.js"

const router = express.Router();

router.get("/admin", getAdmin)

export default router;