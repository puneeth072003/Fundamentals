const express = require('express');
const bodyParser = require('body-parser');
const router = require("./src/router/route");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };

  app.use("/api/v1/", router);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
