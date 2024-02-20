import { Schema, model, models } from "mongoose";

const ActivityScheme = new Schema(
  {
    description: {
      type: String,
      unique: [false],
      required: [false],
    },
    modality: {
      type: String,
      unique: [false],
      required: [true, "La modalidad es requerida"],
    },
    nameActivity: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    color: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    months: [{ type: Schema.Types.ObjectId, ref: "Month" }],
 
  },
  {
    timestamps: { updatedAt: true, createdAt: true },
  }
);

const Activity = models.Activity || model("Activity", ActivityScheme);

export default Activity;
