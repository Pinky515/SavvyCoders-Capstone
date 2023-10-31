import { Router } from "express";
import Schedule from "../models/Schedule.js";

const router = Router();

// Create Schedule Route
router.post("/", async (request, response) => {
  try {
    const newSchedule = new Schedule(request.body);

    const data = await newSchedule.save();

    response.json(data);
  } catch (error) {
    console.log(error); //show error in console

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all scheduled items
router.get("/", async (request, response) => {
  try {
    // store params into json
    const query = request.query; //Defaults to empty object
    const data = await Schedule.find(query);
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

// Get a specific schedule by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Schedule.findById(request.params.id);
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

// Delete a scheduled item by ID
router.delete("/:id", async (request, response) => {
  try {
    const data = await Schedule.findByIdAndRemove(request.params.id, {});
    response.json(data);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

// Update a scheduled item by ID
router.put("/:id", async (request, response) => {
  try {
    const body = request.body;
    const data = await Schedule.findByIdAndUpdate(
      request.params.id,
      {
        $set: {
          plantName: body.plantName,
          waterFrequency: body.waterFrequency,
          datePlanted: body.datePlanted
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
