const PORT = process.env.PORT || 4040;

require("dotenv").config();
const init = require("./db");
const cors = require("cors");
const path = require("path");
const badRequestHandler = require("./middlewares/badRequestHandler");
const genericErrorHandler = require("./middlewares/genericErrorHandler");

const express = require("express");
const server = express();

const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const booksRoute = require("./routes/books");
const uploadRoute = require("./routes/upload");
const reviewsRoute = require("./routes/reviews");
const githubRoute = require("./routes/github");

// storage
server.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// middleware
server.use(express.json());
server.use(
  cors({
    origin: ["https://epibooksfrontend.vercel.app/"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

server.use(badRequestHandler);
server.use(genericErrorHandler);

// routes
server.use("/", usersRoute);
server.use("/", loginRoute);
server.use("/", booksRoute);
server.use("/", uploadRoute);
server.use("/", reviewsRoute);
server.use("/", githubRoute);
init();

server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
