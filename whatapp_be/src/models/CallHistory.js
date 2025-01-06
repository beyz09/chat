// models/CallHistory.js
import mongoose from "mongoose";


const callHistorySchema = new mongoose.Schema({
  
  userId: {
    type: String,
    required: true,
  },
  callerName: {
    type: String,
    required: true,
  },
  callerId: {
    type: String,
    required: true,
  },
  recever: {
    type: String,
    required: true,
  },
  
  callTime: {
    type: Date,
    required: true,
  },
  
});

const CallHistory = mongoose.model('CallHistory', callHistorySchema);

export default CallHistory; 
