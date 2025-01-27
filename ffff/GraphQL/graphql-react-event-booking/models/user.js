import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// The user needs to be able to create an event and book and event

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // This shows the user can create more than one event
  // We are storing a list of ids
  // This is NOT a list of objects, it is just data. Like above email and password are not objects
  createdEvents: [
    {
      // This is the object id 
      type: Schema.Types.ObjectId,
      // This ref is important to say two models are related for mongoose
      // put the name of the model you want to connect to
      // This then shows these are the ideas from the Event model
      ref: 'Event'
    }
  ]
});

// Model
export const User = mongoose.model('User', userSchema);