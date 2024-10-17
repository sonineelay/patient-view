// Authorization schema/model
const mongoose = require('mongoose');

const authorizationSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    treatment: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    diagnosisCode: { type: String, required: true },
    doctorNotes: { type: String },
    status: { type: String, default: 'pending' }, // pending, approved, denied
}, { timestamps: true });

module.exports = mongoose.model('Authorization', authorizationSchema);
