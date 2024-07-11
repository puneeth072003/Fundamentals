const express = require('express');
const bodyParser = require('body-parser');
const router = require("./src/router/route");
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pyd773:pyd773@cluster0.i0exuyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };

app.use(cors());

app.use("/api/v1/", router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
