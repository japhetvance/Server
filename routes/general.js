import express from "express";
import { getUser, addUser, deleteTemp, updateRecord, getTemp, validateTemp, getDashboardStats, fetchSession, getAllUsers, getAllReports, getAllTemp, addTempReport } from "../controllers/general.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/temp/:id", getTemp);
router.get("/user", getAllUsers);
router.get("/dashboard", getDashboardStats);
router.get("/fetch", fetchSession);
router.post("/add", addUser);
router.get("/reports", getAllReports);
router.get("/temp", getAllTemp);
router.post("/temp", addTempReport);
router.post("/delete", deleteTemp);
router.post("/validate", validateTemp);
router.post("/edit", updateRecord);

export default router;