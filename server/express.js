const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const connectDb = require("./db");
const mongoose = require("mongoose");
const Template = require("./assets/Template");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const app = express();
const userRouter = require("./routes/userRoutes");

// middlewares

app.use(express.json()); //parsing the json file over the internet
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use("/api/users", userRouter);

// routes
app.get("/", (req, res) => {
  res.status(200).send(Template());
});

const PORT = process.env.PORT || 4000;
const conenct = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app is listening to the port ${PORT}`);
    });
  } catch (error) {
    console.info(error);
  }
  mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database ${[process.env.MONGO_URI]}`);
  });
};
conenct();

module.exports = app;
