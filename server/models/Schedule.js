import mongoose from "mongoose";

// Schema
const scheduleSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true
  },
  waterFrequency: {
    type: String,
    required: true
  },
  datePlanted: {
    type: Date,
    required: true
  }
});

// convert schema to model and export
const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
