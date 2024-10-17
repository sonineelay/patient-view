import { useState, useEffect } from 'react';
import { addPatient, updatePatient, submitAuthorizationRequest, updateAuthorizationRequest } from '../services/api';

export const PatientForm = ({ patient, onSave, onCancel }) => {
    const [form, setForm] = useState({
        name: '',
        age: '',
        condition: '',
        treatmentPlan: [{ treatment: '', medication: '', startDate: '' }],
        medicationHistory: [{ medication: '', dosage: '', duration: '' }]
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (patient && Object.keys(patient).length > 0) {

            const formattedPatient = {
                ...patient,
                treatmentPlan: patient.treatmentPlan.map(plan => ({
                    ...plan,
                    startDate: plan.startDate ? new Date(plan.startDate).toISOString().substring(0, 10) : ''
                }))
            };
            setForm(formattedPatient); // Populate form for editing
        } else {
            setForm({
                name: '',
                age: '',
                condition: '',
                treatmentPlan: [{ treatment: '', medication: '', startDate: '' }],
                medicationHistory: [{ medication: '', dosage: '', duration: '' }]
            });
        }
    }, [patient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleArrayChange = (e, index, arrayName) => {
        const { name, value } = e.target;
        const updatedArray = [...form[arrayName]];

        // For date input, ensure it stays in YYYY-MM-DD format
        if (name === 'startDate' && value) {
            updatedArray[index] = { ...updatedArray[index], [name]: new Date(value).toISOString().substring(0, 10) };
        } else {
            updatedArray[index] = { ...updatedArray[index], [name]: value };
        }

        setForm({ ...form, [arrayName]: updatedArray });
    };


    const addArrayItem = (arrayName) => {
        const newItem = arrayName === 'treatmentPlan'
            ? { treatment: '', medication: '', startDate: '' }
            : { medication: '', dosage: '', duration: '' };
        setForm({ ...form, [arrayName]: [...form[arrayName], newItem] });
    };

    const removeArrayItem = (arrayName, index) => {
        const updatedArray = form[arrayName].filter((_, i) => i !== index);
        setForm({ ...form, [arrayName]: updatedArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.age || !form.condition) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            if (patient && Object.keys(patient).length > 0) {
                await updatePatient(patient._id, form);
                setSuccess('Patient updated successfully.');
            } else {
                await addPatient(form);
                setSuccess('Patient added successfully.');
            }
            onSave(); // Notify parent component to refresh the patient list
        } catch (error) {
            setError('Failed to save the patient. Please try again.');
        }
    };

    return (
        <div className="p-3">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Age Input */}
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Condition Input */}
                <div className="mb-3">
                    <label htmlFor="condition" className="form-label">Condition</label>
                    <input
                        type="text"
                        className="form-control"
                        id="condition"
                        name="condition"
                        value={form.condition}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Treatment Plan Section */}
                <h5>Treatment Plan</h5>
                {form.treatmentPlan.map((item, index) => (
                    <div key={index} className="mb-3">
                        <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Treatment"
                            name="treatment"
                            value={item.treatment}
                            onChange={(e) => handleArrayChange(e, index, 'treatmentPlan')}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Medication"
                            name="medication"
                            value={item.medication}
                            onChange={(e) => handleArrayChange(e, index, 'treatmentPlan')}
                            required
                        />
                        <input
                            type="date"
                            className="form-control mb-1"
                            name="startDate"
                            value={item.startDate}
                            onChange={(e) => handleArrayChange(e, index, 'treatmentPlan')}
                        />

                        {index > 0 && (
                            <button type="button" className="btn btn-danger mb-2" onClick={() => removeArrayItem('treatmentPlan', index)}>Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-secondary mb-3" onClick={() => addArrayItem('treatmentPlan')}>Add Treatment Plan</button>

                {/* Medication History Section */}
                <h5>Medication History</h5>
                {form.medicationHistory.map((item, index) => (
                    <div key={index} className="mb-3">
                        <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Medication"
                            name="medication"
                            value={item.medication}
                            onChange={(e) => handleArrayChange(e, index, 'medicationHistory')}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Dosage"
                            name="dosage"
                            value={item.dosage}
                            onChange={(e) => handleArrayChange(e, index, 'medicationHistory')}
                            required
                        />
                        <input
                            type="text"
                            className="form-control mb-1"
                            placeholder="Duration"
                            name="duration"
                            value={item.duration}
                            onChange={(e) => handleArrayChange(e, index, 'medicationHistory')}
                            required
                        />
                        {index > 0 && (
                            <button type="button" className="btn btn-danger mb-2" onClick={() => removeArrayItem('medicationHistory', index)}>Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" className="btn btn-secondary mb-3" onClick={() => addArrayItem('medicationHistory')}>Add Medication History</button>
                <div className="d-flex justify-content-end mt-3">
                    <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {patient && Object.keys(patient).length > 0 ? 'Update Patient' : 'Add Patient'}
                    </button>
                </div>
            </form>
        </div>
    );
};



export const AuthorizationForm = ({ patientId, authorization, onSave }) => {

    const [form, setForm] = useState({
        treatment: '',
        insurancePlan: '',
        diagnosisCode: '',
        doctorNotes: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (authorization) {
            setForm(authorization); // Populate form for editing
        }
    }, [authorization]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.treatment || !form.insurancePlan || !form.diagnosisCode) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            if (authorization) {
                await updateAuthorizationRequest(authorization._id, form);
                setSuccess('Authorization updated successfully.');
            } else {
                await submitAuthorizationRequest(patientId, form);
                setSuccess('Authorization request submitted successfully.');
            }
            onSave(); // Notify parent component to refresh the authorization list
            setForm({ treatment: '', insurancePlan: '', diagnosisCode: '', doctorNotes: '', status: '' });
            setError(null); // Clear any previous error messages
        } catch (error) {
            setError('Failed to save the authorization request. Please try again.');
        }
    };

    return <>
        <div className="col-md-4">
            <h3>Prior Authorization Form</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="treatment" className="form-label">Treatment Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="treatment"
                        name="treatment"
                        value={form.treatment}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="insurancePlan" className="form-label">Insurance Plan</label>
                    <input
                        type="text"
                        className="form-control"
                        id="insurancePlan"
                        name="insurancePlan"
                        value={form.insurancePlan}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="diagnosisCode" className="form-label">Diagnosis Code</label>
                    <input
                        type="text"
                        className="form-control"
                        id="diagnosisCode"
                        name="diagnosisCode"
                        value={form.diagnosisCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="doctorNotes" className="form-label">Doctor's Notes</label>
                    <textarea
                        className="form-control"
                        id="doctorNotes"
                        name="doctorNotes"
                        value={form.doctorNotes}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {authorization ? 'Update Authorization' : 'Submit Authorization'}
                </button>
            </form>
        </div>
    </>
}
