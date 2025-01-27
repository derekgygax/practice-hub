import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  // timestamps so you have a created and updated at field
  {
    timestamps: true
  }
);

// Model
export const Booking = mongoose.model('Booking', bookingSchema);