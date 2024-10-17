// Authorization-related routes
const express = require('express');
const { getAllAuthorizations, getAuthorizationById, createAuthorization, updateAuthorization, deleteAuthorization } = require('../controllers/authController');

const router = express.Router();

router.get('/', getAllAuthorizations);
router.get('/:id', getAuthorizationById);
router.post('/', createAuthorization);
router.put('/:id', updateAuthorization);
router.delete('/:id', deleteAuthorization);
module.exports = router;
