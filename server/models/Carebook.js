import mongoose from "mongoose";

// Schema is a method (function inside object) native to MongoDB
const careBookSchema = new mongoose.Schema({
  // alter data to MY OWN MODEL

  id: {
    type: Number
  },
  common_name: {
    type: String,
    required: true
  },
  scientific_name: {
    type: [String]
  },
  other_name: {
    type: [String]
  },
  cycle: {
    type: String,
    required: true
  },
  watering: {
    type: String,
    required: true
  },
  sunlight: {
    type: [],
    required: true
  },
  default_image: {
    type: {
      image_id: {
        type: Number,
        required: false
      },
      license: {
        type: Number,
        required: false
      },
      license_name: {
        type: String,
        required: false
      },
      license_url: {
        type: String,
        required: false
      },
      original_url: {
        type: String,
        required: false
      },
      regular_url: {
        type: String,
        required: false
      },
      medium_url: {
        type: String,
        required: false
      },
      small_url: {
        type: String,
        required: false
      },
      thumbnail: {
        type: String,
        required: false
      }
    }
  },
  to: {
    type: Number
  },
  per_page: {
    type: Number
  },
  current_page: {
    type: Number
  },
  from: {
    type: Number
  },
  last_page: {
    type: Number
  },
  total: {
    type: Number
  }
});

// convert Schema method to model method
const CareBook = mongoose.model("CareBook", careBookSchema);

export default CareBook;
