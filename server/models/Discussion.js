import mongoose from "mongoose";

// Schema
const discussionPostSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

// convert Schema to model
const Discussion = mongoose.model("Discussion", discussionPostSchema);

export default Discussion;
