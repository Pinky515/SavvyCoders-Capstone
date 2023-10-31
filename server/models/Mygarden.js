import mongoose from "mongoose";

// Schema
const myGardenSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true
  },
  maturityDate: {
    type: Date,
    min: "2023-10-23",
    max: "2199-12-31",
    required: true
  },
  countDown: {
    type: Number,
    required: true
  }
});

// convert schema to model and export
const MyGarden = mongoose.model("Mygarden", myGardenSchema);
export default MyGarden;
