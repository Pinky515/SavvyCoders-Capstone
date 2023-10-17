// Router is express method that allows you to define routes outside of file and import it in (saves file from being too congested)
import { Router } from "express";
import CareBook from "../models/Carebook.js";

const router = Router();

// Create route
router.post("/", async (request, response) => {
  try {
    const newCareBook = new CareBook(request.body);

    const data = await newCareBook.save();

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

export default router;
