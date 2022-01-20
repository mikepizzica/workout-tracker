const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const viewRoutes = require("./routes/viewRoutes.js");
const apiRoutes = require("./routes/apiRoutes");

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout-tracker',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(viewRoutes);
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log("listening on " + PORT);
})