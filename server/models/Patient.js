const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  treatmentPlan: [{
    treatment: { type: String },
    medication: { type: String },
    startDate: { type: Date }
  }],
  medicationHistory: [{
    medication: { type: String },
    dosage: { type: String },
    duration: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);