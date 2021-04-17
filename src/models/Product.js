/*
  Modelo de Producto
*/
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgURL: String,
    dataFake: {
      type: Boolean,
      default: false,
    },
  },
  {
    // creación y actualizacion del obj
    timestamps: true,
    // evita el __uv
    versionKey: false,
  }
);

export default model("Product", productSchema);
