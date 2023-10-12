// express framework
import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

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

// tell express to start listening on local port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// test to see if server folder is being pushed to github
