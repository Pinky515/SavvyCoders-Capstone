import mongoose from "mongoose";

// Schema is a method (function inside object) native to MongoDB
const careBookSchema = new mongoose.Schema({
  // alter data to MY OWN MODEL
  data: [
    {
      id: Number,
      common_name: String,
      scientific_name: [String],
      other_name: [String],
      cycle: String,
      watering: String,
      sunlight: [],
      default_image: {
        image_id: Number,
        license: Number,
        license_name: String,
        license_url: String,
        original_url: String,
        regular_url: String,
        medium_url: String,
        small_url: String,
        thumbnail: String
      }
    }
  ],
  to: Number,
  per_page: Number,
  current_page: Number,
  from: Number,
  last_page: Number,
  total: Number
});

// convert Schema method to model method
const CareBook = mongoose.model("CareBook", careBookSchema);

export default CareBook;
