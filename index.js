const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const authRoutes = require("./routes/authRoutes");

const conn = require("./db/conn");

//models
const User = require("./models/User");
const Accounts = require("./models/Accounts");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static("public"));

app.use("/vault", authRoutes);

conn.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`app running on port ${port}`);
    console.log("database connected");
  });
});
