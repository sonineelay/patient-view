import React, { useState, useEffect } from 'react';
import { getPatientDetails, getAuthorizationRequest } from '../services/api'; // Assuming you have this API endpoint

const PatientDetails = ({ patientId }) => {
    const [patient, setPatient] = useState(null);
    const [authorizations, setAuthorizations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPatientData() {
            setLoading(true);
            try {
                // Fetch patient details
                const patientData = await getPatientDetails(patientId);
                setPatient(patientData);

                // Fetch prior authorization requests for the patient
                const authorizationData = await getAuthorizationRequest(patientId);
                setAuthorizations(authorizationData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPatientData();
    }, [patientId]);

    if (loading) return <p>Loading...</p>;
    if (!patient) return <p>No patient data available.</p>;

    return (
        <div className="col-md-8">
            <h4 className="card-title">{patient.name} (Age: {patient.age})</h4>
            <p className="card-text">Condition: {patient.condition}</p>
            <strong>Treatment Plan:</strong>
            <ul>
                {patient.treatmentPlan.map((plan, index) => (
                    <li key={index}>{plan.treatment}: {plan.medication}</li>
                ))}
            </ul>

            <strong>Medication History:</strong>
            <ul>
                {patient.medicationHistory.map((med, index) => (
                    <li key={index}>{med.medication} - {med.dosage}</li>
                ))}
            </ul>

            {/* Uncomment if lab results are needed */}
            {/* <strong>Lab Results:</strong>
            <ul>
                {patient.labResults.map((result, index) => (
                    <li key={index}>{result.testName}: {result.result}</li>
                ))}
            </ul> */}

            {/* Prior Authorization Requests */}
            <h5 className="mt-4">Prior Authorization Requests</h5>
            <div className='container-fluid'>
                {authorizations.length === 0 ? (
                    <p>No prior authorization requests available for this patient.</p>
                ) : (
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Treatment</th>
                                <th scope="col">Insurance Plan</th>
                                <th scope="col">Diagnosis Code</th>
                                <th scope="col">Doctor Notes</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authorizations.map((auth, index) => (
                                <tr key={index}>
                                    <td>{auth.treatment}</td>
                                    <td>{auth.insurancePlan}</td>
                                    <td>{auth.doctorNotes}</td>
                                    <td>{auth.diagnosisCode}</td>
                                    <td>{auth.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PatientDetails;
