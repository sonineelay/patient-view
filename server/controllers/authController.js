// Handles business logic for authorization requests
const Authorization = require('../models/Authorization');

// Get all authorization requests
exports.getAllAuthorizations = async (req, res, next) => {
    try {
        const authRequests = await Authorization.find({});
        res.status(200).json(authRequests);
    } catch (error) {
        next(error);
    }
};

// Get a single authorization request by ID
exports.getAuthorizationById = async (req, res, next) => {
    try {
        const authRequest = await Authorization.findById(req.params.id);
        if (!authRequest) return res.status(404).json({ message: 'Authorization request not found' });
        res.status(200).json(authRequest);
    } catch (error) {
        next(error);
    }
};

// Create a new authorization request
exports.createAuthorization = async (req, res, next) => {
    try {
        const newAuthRequest = await Authorization.create(req.body);
        res.status(201).json(newAuthRequest);
    } catch (error) {
        next(error);
    }
};

// Update an authorization request's status
exports.updateAuthorization = async (req, res, next) => {
    try {
        const updatedAuthRequest = await Authorization.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAuthRequest) return res.status(404).json({ message: 'Authorization request not found' });
        res.status(200).json(updatedAuthRequest);
    } catch (error) {
        next(error);
    }
};

// Delete an authorization request
exports.deleteAuthorization = async (req, res, next) => {
    try {
        const deletedAuthRequest = await Authorization.findByIdAndDelete(req.params.id);
        if (!deletedAuthRequest) return res.status(404).json({ message: 'Authorization request not found' });
        res.status(200).json({ message: 'Authorization request deleted' });
    } catch (error) {
        next(error);
    }
};
