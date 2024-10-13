// backend/server.js

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const beds24Api = require("./api/beds24Api");

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

// Beds24 API routes
app.use("/api", beds24Api);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
