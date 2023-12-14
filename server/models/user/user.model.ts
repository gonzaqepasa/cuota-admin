import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exsists!"],
    required: [false],
  },
  phone: {
    type: String,
    unique: [false],
    required: [false],
  },
  description: {
    type: String,
    unique: [false],
    required: [false],
  },
  is_active: {
    type: String,
    unique: [false],
    required: [false],
  },
  activity: {
    type: Schema.Types.ObjectId,
    ref: "Activity", // Hace referencia al modelo de actividad
    required: [true, "No se a que actividad pertenece"],
  },
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      `Debe contener de 3 a 20 caracteres, no puede comenzar ni terminar con "_" o "."`,
    ],
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

const User = models.User || model("User", UserSchema);

export default User;
