import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BicycleSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    color: {
      type: String,
    },
    model: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
    reserved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Bicycle = model('bicycle', BicycleSchema);

export default Bicycle;
