import PaginatedItems from './PaginatedItems';

const PatientList = ({ patients, onSelectPatient, onEditPatient }) => {
    return (
        <div className="pt-3">
            {/* Render patients using pagination */}
            <table className="table table-borderless">
                <thead className='table-secondary'>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Condition</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    <PaginatedItems
                        items={patients}
                        itemsPerPage={5}
                        onSelectPatient={onSelectPatient}
                        onEditPatient={onEditPatient}
                    />
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;
