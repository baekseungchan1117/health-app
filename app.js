const express = require("express");
const path = require("path");
const PORT = 3000;
const session = require("express-session");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Nut = require("./routes/Nutrition");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/exam", Nut);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.render("login", { loggedIn: req.session.user ? true : false });
});
app.use("/", require("./routes/qrcode"));
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
