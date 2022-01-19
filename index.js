const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./api/routes/user");
const authRoute = require("./api/routes/auth");
const productRoute = require("./api/routes/product");
const cartRoute = require("./api/routes/cart");
const orderRoute = require("./api/routes/order");
const stripeRoute = require("./api/routes/stripe");
const cors = require("cors");


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Success!"))
  .catch((err) => {
    console.log(err);
  });
app.get("/tests", (req, res) => {
   res.send("something");
})
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {  res.sendFile(path.join(__dirname, "public", "index.html"));});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("ITS ALIVE!");
});
