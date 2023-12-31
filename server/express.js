const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const connectDb = require("./db");
const { default: mongoose } = require("mongoose");
const Template = require("./assets/Template");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());

// middlewares
app.use("/api/users", userRouter);
app.use("/auth", authRouter);

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
