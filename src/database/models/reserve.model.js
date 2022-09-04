import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReserveSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    bicycle: {
      type: Schema.Types.ObjectId,
      ref: 'bicycle',
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Reserve = model('reserve', ReserveSchema);

export default Reserve;
