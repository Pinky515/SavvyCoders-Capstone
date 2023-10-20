import mongoose from "mongoose";

// Schema is a method (function inside object) native to MongoDB
const careBookSchema = new mongoose.Schema({
  // alter data to MY OWN MODEL
  data: [
    {
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
            type: Number
          },
          license: {
            type: Number
          },
          license_name: {
            type: String
          },
          license_url: {
            type: String
          },
          original_url: {
            type: String
          },
          regular_url: {
            type: String
          },
          medium_url: {
            type: String
          },
          small_url: {
            type: String
          },
          thumbnail: {
            type: String
          }
        }
      }
    }
  ],
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
