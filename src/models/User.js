import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        // de esta manera relacionamos el Schema de Role al User
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// cifrado de password
userSchema.statics.encryptPassword = async (password) => {
  // genSalt() es un algoritmo aplicado la cantidad de veces definida
  const salt = await bcrypt.genSalt(10);
  // cifra el password a partir de la contraseña del user y el salt
  return await bcrypt.hash(password, salt);
};

// verificacón de contraseñas
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  // retorna true si las contraseñas coinciden
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
