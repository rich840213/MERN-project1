const express = require("express");
const app = express();
const PORT = 8888;

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((e) => {
    console.log(`Connection DB Fail. ${e}`);
    process.exit();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const patientController = require("./controllers/patient.controller");
const orderController = require("./controllers/order.controller");

app.get("/api/patients", patientController.getPatients);
app.get("/api/orders/:id", orderController.getOrders);
app.put("/api/orders", orderController.updateOrders);
app.delete("/api/orders/:id", orderController.deleteOrders);

// for testing
app.get("/api/reset", patientController.resetTestData);
app.delete("/api/orders", orderController.deleteAllOrders);

app.get("/*", (req, res) => {
  res.status(404).send({
    error: "not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    success: false,
    error: "Oops",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
