import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  pricePay: {
    type: Number,
    required: [true, "El campo precio es obligatorio"],
  },
  methodPay: {
    type: String,
    required: [true, "El campo metodo de pago es obligatorio"],
  },
  addData: {
    type: String,
    required: [true, "La fecha de pago es requerida"],
  },
  addAdmin: {
    type: String,
    required: [true, "El administrador es reqierodo"],
  },
  activity: {
    type: Object,
    required: [true, "Se necesita actividad"],
  },
  month: {
    type: Object,
    required: [true, "Se necesita se necesita mes"],
  },
  user: {
    type: Object,
    required: [true, "Se necesita usuario"],
  },
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
