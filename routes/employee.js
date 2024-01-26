import express, { Router } from "express";
import { getEmployee } from "../controllers/employee.js"

const router = express.Router();

router.get("/employee", getEmployee)

export default router;