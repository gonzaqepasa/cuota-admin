import { Schema, model, models } from "mongoose";

const MonthScheme = new Schema(
  {
    method: {
      type: String,
      enum: ["MP", "EF"],
    },
    monthName: { type: String },
    description: { type: String, required: false },
    trainer: {
      type: String,
    },
    isPay: {
      type: Boolean,
      default: false,
    },
    pricePay: { type: Number, required: true },
    // Otros campos del pago
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Completed",
    },

    expirationDate: {
      type: Date,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    activity: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
      required: [true, "La actividad es obligatorio"],
    },
    paymentDate: {
      type: String,
    },
  },
  {
    timestamps: { updatedAt: true, createdAt: true },
  }
);
// Middleware para formatear la fecha y hora antes de guardar
// PaymentScheme.pre("save", function (next) {
//   const now = new Date();
//   const formattedDateTime = `${now.getDate()}/${
//     now.getMonth() + 1
//   }/${now.getFullYear()}/${now.getHours()}/${now.getMinutes()}`;
//   this.paymentDate = formattedDateTime;
//   next();
// });
const Month = models.Month || model("Month", MonthScheme);

export default Month;
