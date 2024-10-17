// Handles business logic for patients
const Patient = require('../models/Patient');

// Get all patients
exports.getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find({});
        res.status(200).json(patients);
    } catch (error) {
        next(error); // Passes the error to error handling middleware
    }
};

// Get a single patient by ID
exports.getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

// Add a new patient
exports.addPatient = async (req, res, next) => {
    try {
        const newPatient = await Patient.create(req.body);
        res.status(201).json(newPatient);
    } catch (error) {
        next(error);
    }
};

// Update patient details
exports.updatePatient = async (req, res, next) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(updatedPatient);
    } catch (error) {
        next(error);
    }
};

// Delete a patient
exports.deletePatient = async (req, res, next) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted' });
    } catch (error) {
        next(error);
    }
};
