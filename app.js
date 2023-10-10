const dotenv = require("dotenv").config({ path: "./config.env" });
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const partnerRouter = require("./routes/partnerRouter");
const AppError = require("./utils/AppError");
const ErrorHandler = require("./controllers/ErrorHandler");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");

const limit = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: "Muitas requests desse IP, por favor tente de novo em 1 hora.",
});

const app = express();

// Limpeza de dados contra NOSQL injection
app.use(mongoSanitize());

// Limpeza de dados contra XSS
app.use(xss());

// Permição de requisição
app.use(cors());

// Protegendo o Header
app.use(helmet());

app.use(compression());

app.use(express.json({ limit: "30kb" }));

app.use("/", limit);

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.options("*", cors());

//Routers

app.use("/api/v1", partnerRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `This route '${req.originalUrl}' doesn't exist on server.`,
    404
  );

  next(error);
});

app.use(ErrorHandler);

module.exports = app;
