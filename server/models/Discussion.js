import mongoose from "mongoose";

// Schema
const discussionPostSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  post: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

// convert Schema to model
const DiscussionPost = mongoose.model("DiscussionPost", discussionPostSchema);

export default DiscussionPost;
