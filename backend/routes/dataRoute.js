const { Router } = require("express");
const role = require("../middlewares/role");
const dataRouter = Router();
const dataModel = require("../configs/models/dataModel");

dataRouter.get("/", role(["admin", "user"]), async (req, res) => {
  try {
    const data = await dataModel.find({});
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

dataRouter.post("/", role(["admin", "user"]), async (req, res) => {
  try {
    const role = req.role;
    const data = new dataModel(req.body);
    await data.save();
    res.status(201).send("Success!");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

dataRouter.patch("/:id", role(["admin", "user"]), async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.status == undefined) {
      const found = await dataModel.find({ _id: id });
      if (found.length > 0) {
        const {
          quantity,
          amount,
          postingYear,
          postingMonth,
          actionType,
          actionNumber,
          actionName,
          impact,
          status,
        } = found[0];
        const deletedData = await dataModel.deleteOne({ _id: id });
        const data = new dataModel({
          quantity,
          amount,
          postingYear,
          postingMonth,
          actionType,
          actionNumber,
          actionName,
          impact,
          status,
          ...req.body,
        });
        data.save();
        if (deletedData.deletedCount == 1)
          res.status(200).send({ message: "Updated Successfully" });
        else res.sendStatus(204);
      } else res.sendStatus(404);
    } else res.sendStatus(401);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

dataRouter.delete("/:id", role(["admin"]), async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.status) {
      const data = await dataModel.deleteOne({ _id: id });
      if (data.acknowledged && data.deletedCount == 1)
        res.status(200).json({ message: "Deleted Successfully" });
      else res.sendStatus(204);
    } else res.sendStatus(500);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

dataRouter.patch("/admin/:id", role(["admin"]), async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.status) {
      const found = await dataModel.find({ _id: id });
      if (found.length > 0) {
        const {
          quantity,
          amount,
          postingYear,
          postingMonth,
          actionType,
          actionNumber,
          actionName,
          impact,
        } = found[0];
        const deletedData = await dataModel.deleteOne({ _id: id });
        const data = new dataModel({
          quantity,
          amount,
          postingYear,
          postingMonth,
          actionType,
          actionNumber,
          actionName,
          impact,
          status: req.body.status,
        });
        data.save();
        if (deletedData.deletedCount == 1)
          res.status(200).json({ message: "Updated Successfully" });
        else res.sendStatus(204);
      } else res.sendStatus(404);
    } else res.sendStatus(500);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = dataRouter;
