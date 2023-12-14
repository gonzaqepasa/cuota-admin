import { Schema, model, models } from "mongoose";

const ActivityScheme = new Schema({
  description: {
    type: String,
    unique: [false],
    required: [false],
  },

  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  //   username: {
  //     type: String,
  //     required: [true, "Username is required"],
  //     match: [
  //       /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  //       "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
  //     ],
  //   },
  //   password: {
  //     type: String,
  //     required: [true, "La contraseña es requerida"],
  //   },
  //   phoneNumber: {
  //     type: String,
  //     match: [
  //       /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  //       "Please enter a valid phone number",
  //     ],
  //     unique: [true, "This phone number is already registered with an account"]
  //   },
  //   image: {
  //     type: String,
  //   },
});

const Activity = models.Activity || model("Activity", ActivityScheme);

export default Activity;
