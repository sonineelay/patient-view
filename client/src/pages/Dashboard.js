import { useState, useEffect } from 'react';
import PatientList from '../components/PatientList';
import PatientDetails from '../components/PatientDetails';
import { AuthorizationForm, PatientForm } from '../components/Form';
import { getPatients } from '../services/api';
import { BsPlus } from 'react-icons/bs';

const SearchAddSection = ({ searchTerm, setSearchTerm, onAddPatient }) => {
    return (
        <div className="row mt-3">
            <div className='col-10'>
                <div className="input-group w-100">
                    <input
                        type="text"
                        className="form-control"
                        id='search-box'
                        placeholder="Search by name or condition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search by name or condition"
                    />
                </div>
            </div>
            <div className='col-2 ps-0'>
                <button className="btn btn-success w-100 fw-bold text-white" type="button" onClick={onAddPatient}>
                    <BsPlus /> Add
                </button>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [editingPatient, setEditingPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchPatients() {
            const data = await getPatients();
            setPatients(data);
        }
        fetchPatients();
    }, []);

    const handleSave = () => {
        setEditingPatient(null); // After saving, reset the editing state
        setSelectedPatientId(null); // Deselect patient after save
    };

    const handleCancel = () => {
        setEditingPatient(null); // Close the form and return to the default state
        setSelectedPatientId(null); // Deselect the patient
    };

    const handleAddPatient = () => {
        setEditingPatient({}); // Open the form for adding a new patient
    };

    // Filter patients based on the search term
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid" id='main-container'>
            <div className="row">
                <div className="col-md-4">
                    {/* Search and Add Section */}
                    <SearchAddSection
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onAddPatient={handleAddPatient}
                    />

                    {/* Patient List */}
                    <PatientList
                        patients={filteredPatients}
                        onSelectPatient={setSelectedPatientId}
                        onEditPatient={setEditingPatient}
                    />
                </div>

                <div className="col-md-8">

                    {/* Display Patient Details or Edit Form */}
                    {editingPatient ? (
                        <PatientForm patient={editingPatient} onSave={handleSave} onCancel={handleCancel} />
                    ) : selectedPatientId ? (
                        <div className="card p-3 m-4 mx-0 mt-3">
                            <div className="card-body row">
                                <PatientDetails patientId={selectedPatientId} />
                                <AuthorizationForm patientId={selectedPatientId} onSave={handleSave} />
                            </div>
                        </div>
                    ) : (
                        <p style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '18px', color: '#6c757d', border: '1px solid lightgrey', margin: '20px', borderRadius: '10px' }}>
                            Please select a patient to view details.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
