import express from"express";
import { Joke } from "../models/models.js";
import baseCrud from "./base.crud.js";

const router = express.Router();

// Api Routes
router.use("/jokes", baseCrud(Joke));


export default router;