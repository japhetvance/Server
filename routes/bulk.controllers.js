import express from "express";
import { Joke } from "../models/models.js";

const bulk = express.Router();

bulk.post("/jokes-bulk-insert", async (req, res, next) => {
  try {
    const jokes = req.body;

    // Use the promise-based insertMany method
    const insertedJokes = await Joke.insertMany(jokes);

    res.status(200).json({
      success: true,
      message: "jokes-bulk-insert success",
      data: insertedJokes,
    });
  } catch (err) {
    console.error("jokes-bulk-insert error: ", err);
    res.status(500).json({ success: false, message: "internal_server_error" });
  }
});

bulk.post("/jokes-bulk-update", async (req, res, next) => {
  try {
    const jokes = req.body;

    const promises = jokes.map(async (item) => {
      const res = await Joke.findByIdAndUpdate(item._id, {
        $set: { ...item },
      });

      return res;
    });

    Promise.all(promises)
      .then(() =>
        res.json({ success: true, message: "jokes-bulk-update success" })
      )
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.error("jokes-bulk-update error: ", err);
    res.status(500).json({ success: false, message: "internal_server_error" });
  }
});

export default bulk;
