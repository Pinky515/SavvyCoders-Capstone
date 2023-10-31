// express framework
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import custom route
import Carebook from "./routes/carebooks.js";
import Discussion from "./routes/discussion.js";
import Mygarden from "./routes/mygarden.js";
import Schedule from "./routes/schedule.js";

const app = express();

dotenv.config();

// Connect application to database in MongoDB
mongoose.connect(process.env.MONGODB, {
  // removes clutter in console from deprecation warnings
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// initiate connection
const db = mongoose.connection;

// error message for bad connection
db.on("error", console.error.bind(console, "Unable to Connect:"));
db.once(
  "open",
  console.log.bind(console, "Connection to MongoDB has opened, successfully!")
);

const PORT = process.env.PORT || 4040;

const dateLocal = function getTheDate(request, response, next) {
  let logging = `${request.method} ${request.url}`;
  console.log(logging);
  // internal js code for date and time
  let dateLocal = `${new Date().toLocaleString("en-us")}`;
  console.log(dateLocal);
  next();
};

// CORS Middleware makes your browser able to see other data than its own
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(cors);
app.use(express.json());
app.use(dateLocal);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service is healthy" }));
});

app.use("/carebooks", Carebook);
app.use("/discussion", Discussion);
app.use("/mygarden", Mygarden);
app.use("/schedule", Schedule);

// tell express to start listening on local port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// test to see if server folder is being pushed to github
