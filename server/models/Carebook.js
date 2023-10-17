import mongoose from "mongoose";

// Schema is a method (function inside object) native to MongoDB
const careBookSchema = new mongoose.Schema({
  // alter data to MY OWN MODEL
  data: [
    {
      id: 1,
      common_name: "European Silver Fir",
      scientific_name: ["Abies alba"],
      other_name: ["Common Silver Fir"],
      cycle: "Perennial",
      watering: "Frequent",
      sunlight: [],
      default_image: {
        image_id: 9,
        license: 5,
        license_name: "Attribution-ShareAlike License",
        license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
        original_url:
          "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg",
        regular_url:
          "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg",
        medium_url:
          "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/medium/49255769768_df55596553_b.jpg",
        small_url:
          "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/small/49255769768_df55596553_b.jpg",
        thumbnail:
          "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/thumbnail/49255769768_df55596553_b.jpg"
      }
    }
  ],
  to: 30,
  per_page: 30,
  current_page: 1,
  from: 1,
  last_page: 405,
  total: 10104
});

// convert Schema method to model method
const CareBook = mongoose.model("CareBook", careBookSchema);

export default CareBook;
