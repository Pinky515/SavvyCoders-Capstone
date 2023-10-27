// Router is express method that allows you to define routes outside of file and import it in (saves file from being too congested)
import { Router, response } from "express";
import Carebook from "../models/Carebook.js";

const router = Router();

// Create route
router.post("/", async (request, response) => {
  try {
    const newCarebook = new Carebook(request.body);

    const data = await newCarebook.save();

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all CareBooks route
router.get("/", async (request, response) => {
  try {
    // store query param as js object
    const query = request.query; //Defaults to an empty {}
    const data = await Carebook.find(query);

    response.json(data);
  } catch (error) {
    console.log(error); //console shows error message

    return response.status(500).json(error.errors);
  }
});

// get a single Carebook by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Carebook.findById(request.params.id);

    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Delete CareBook by ID
router.delete("/:id", async (request, response) => {
  try {
    // filter by trait identified in {}
    const data = await Carebook.findByIdAndRemove(request.params.id, {});
    response.json(data);
  } catch (error) {
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

export default router;
