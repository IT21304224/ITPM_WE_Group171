import mongoose from "mongoose";

const ExchangeSchema = new mongoose.Schema({
  exchangecode: { type: String, required: true },
  productcode: { type: String, required: true },
  exchangename: { type: String, required: true },
  quantity: { type: Number, required: true },
  solddate: { type: Date, required: true },
  addeddate: { type: Date, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  reason: { type: String, required: true },
});

const ExchangeModel = mongoose.model("exchanges", ExchangeSchema);
export default ExchangeModel;