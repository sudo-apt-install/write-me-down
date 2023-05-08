const express = require("express");
// const path = require("path");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require('./routes/apiRoutes'); 

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", apiRoutes);

app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
