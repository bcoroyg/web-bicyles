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
    reserved: {
      type: Boolean,
      default: false,
    },
    location: {
      type: [Number],
      index: {
          type: '2dsphere ',
          sparse: true ,
      },
  },
  },
  {
    timestamps: true,
  }
);

const Bicycle = model('bicycle', BicycleSchema);

export default Bicycle;
