const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  id: {
    type: String,
    required: [true, "id is required"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  orderId: {
    type: String,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
