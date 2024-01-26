import express from "express";

export default (Collection) => {
  const create = (req, res) => {
    const newEntry = req.body;
    Collection.create(newEntry)
      .then((newEntry) => {
        res.status(201).send(newEntry);
      })
      .catch((error) => {
        console.log("baseCrud.create error: ", error.message || error);
        res.status(400).send(error);
      });
  };

  const readMany = (req, res) => {
    const query = req.query || {};

    Collection.find(query)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log("baseCrud.find error: ", error.message || error);
        res.status(400).send(error);
      });
  };

  const readOne = (req, res) => {
    const { _id } = req.params;

    Collection.findById(_id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.log("baseCrud.findById error: ", error.message || error);
        res.status(400).send(error);
      });
  };

  const update = (req, res) => {
    const changedEntry = req.body;
    Collection.updateOne({ _id: req.params._id }, { $set: changedEntry })
      .then(() => {
        res.status(200).send({ message: "Successfully updated" });
      })
      .catch((error) => {
        console.log("baseCrud.update error: ", error.message || error);
        res.status(400).send(error);
      });
  };

  const remove = (req, res) => {
    Collection.deleteOne({ _id: req.params._id })
      .then(() => {
        res.status(200).send({ message: "Successfully deleted" });
      })
      .catch((error) => {
        console.log("baseCrud.remove error: ", error.message || error);
        res.status(400).send(error);
      });
  };

  const router = express.Router();

  router.post("/", create);
  router.get("/", readMany);
  router.get("/:_id", readOne);
  router.put("/:_id", update);
  router.delete("/:_id", remove);

  return router;
};