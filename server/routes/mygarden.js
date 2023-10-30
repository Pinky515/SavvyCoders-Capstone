import { Router } from "express";
import Mygarden from "../models/Mygarden.js";

const router = Router();

// Create new Plant Log Route
router.post("/", async (request, response) => {
  try {
    const newLog = new Mygarden(request.body);

    const data = await newLog.save();

    response.json(data);
  } catch (error) {
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all Entries
router.get("/", async (request, response) => {
  try {
    // store query params as json
    const entry = request.query;
    const data = await Mygarden.find(entry);
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

// get one entry by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Mygarden.findById(request.params.id);
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

// Delete Entry by ID
router.delete("/:id", async (request, response) => {
  try {
    // can filter by trait using {}
    const data = await Mygarden.findByIdAndRemove(request.params.id, {});
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

export default router;
