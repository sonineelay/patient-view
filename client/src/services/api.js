import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust to match your backend URL

// Add a new patient
export const addPatient = async (patientData) => {
    const response = await axios.post(`${API_BASE_URL}/patients`, patientData);
    return response.data; // Return the created patient data
};

// Get patient details by ID
export const getPatientDetails = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/patients/${id}`);
    return response.data;
};

// Fetch all patients
export const getPatients = async () => {
    const response = await axios.get(`${API_BASE_URL}/patients`);
    return response.data;
};


// Update an existing patient
export const updatePatient = async (patientId, patientData) => {
    const response = await axios.put(`${API_BASE_URL}/patients/${patientId}`, patientData);
    return response.data; // Return the updated patient data
};



// Submit a new authorization request
export const submitAuthorizationRequest = async (patientId, requestData) => {
    const response = await axios.post(`${API_BASE_URL}/authorizations`, {
        patientId,
        ...requestData,
    });
    return response.data; // Return the created authorization request
};

// Update an existing authorization request
export const updateAuthorizationRequest = async (id, requestData) => {
    const response = await axios.put(`${API_BASE_URL}/authorizations/${id}`, requestData);
    return response.data; // Return the updated authorization request data
};

// Get all authorization request by Patient ID
export const getAuthorizationRequest = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/authorizations?patientId=${id}`);
    return response.data;
};
