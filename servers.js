const express = require("express");
const cors = require("cors");

const app = express();
// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
  res.send("Your request for room service has been received. The service will arrive shortly.");
  console.log("hello");
});

app.listen(9003, () => {
  console.log("Server started on port 9003");
});
