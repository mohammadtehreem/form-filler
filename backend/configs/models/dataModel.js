const { Schema, model } = require("mongoose");

const dataSchema = new Schema({
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  postingYear: { type: Number, required: true },
  postingMonth: { type: String, required: true },
  actionType: { type: String, required: true },
  actionNumber: { type: String, required: true },
  actionName: { type: String, required: true },
  status: { type: String, required: true },
  impact: { type: String, required: true },
});

const dataModel = model("testData", dataSchema);

module.exports = dataModel;
