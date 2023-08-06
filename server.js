//to work with env
require("dotenv").config();

//requiring node modules
const express = require("express");
const mongoose = require("mongoose");
const notesRoute = require("./routes/notes")
const userRoutes = require("./routes/users")
const path = require("path");

//express app
const app = express();

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db & Server is running on port",
        process.env.PORT
      );
    });
  })
  .catch(console.error);

//middleware
app.use(express.json())   // to convert all data to JSO from json

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

//routes
app.use('/api/notes',notesRoute)
app.use('/api/user', userRoutes )

// serving the frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});
