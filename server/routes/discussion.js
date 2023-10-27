import { Router } from "express";
import Discussion from "../models/Discussion.js";

const router = Router();

// Create Discussion Posts Route
router.post("/", async (request, response) => {
  try {
    const newPost = new Discussion(request.body);

    const data = await newPost.save();

    response.json(data);
  } catch (error) {
    console.log(error); //show error in console

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all discussion posts
router.get("/", async (request, response) => {
  try {
    // store params into json
    const query = request.query; //Defaults to empty object
    const data = await Discussion.find(query);
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

// Get a specific post by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Discussion.findById(request.params.id);
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

// Delete a post by ID
router.delete("/:id", async (request, response) => {
  try {
    const data = await Discussion.findByIdAndRemove(request.params.id, {});
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

// Update a post by ID
router.put("/:id", async (request, response) => {
  try {
    const body = request.body;
    const data = await Discussion.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          title: body.title,
          user: body.user,
          post: body.post
        }
      },
      {
        new: true
      }
    );

    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

export default router;
