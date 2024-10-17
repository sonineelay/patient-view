// Patient-related routes
const express = require('express');
const { getAllPatients, getPatientById, addPatient, updatePatient, deletePatient } = require('../controllers/patientController');

const router = express.Router();

router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
