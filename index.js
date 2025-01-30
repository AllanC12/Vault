const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const AuthController = require("./controllers/authController");
const HomeController = require("./controllers/homeController");

const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");

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

app.use(
  session({
    name: "session",
    secret: "vault_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/vault/home", homeRoutes);
app.use("/vault", authRoutes);
app.use("/", AuthController.login);

conn.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`app running on port ${port}`);
    console.log("database connected");
  });
});
