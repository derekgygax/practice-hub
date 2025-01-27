import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema
// Define the structure
// Our "plan"
const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// Model
export const Event = mongoose.model('Event', eventSchema);