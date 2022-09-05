import mongoose from 'mongoose';
import shortid from 'shortid';

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
  },
  {
    timestamps: true,
  }
);

BicycleSchema.pre('save', function (next) {
  //Crear el código
  this.code = shortid.generate(),
  next();
});

const Bicycle = model('bicycle', BicycleSchema);

export default Bicycle;
