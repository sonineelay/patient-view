import { useState } from 'react';
import Pagination from './Pagination'; // Assuming the Pagination component is in the same folder
import { BsPencilSquare } from 'react-icons/bs';

const PaginatedItems = ({ items, itemsPerPage, onSelectPatient, onEditPatient }) => {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {/* Display the current paginated and filtered items */}
            {currentItems.map(item => (
                <tr key={item._id} onClick={() => onSelectPatient(item._id)}>
                    <td>
                        {item.name}
                    </td>

                    <td>
                        {item.age}
                    </td>
                    <td>
                        {item.condition}
                    </td>
                    <td>
                        <button
                            className="btn"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents triggering onClick for the list item
                                onEditPatient(item); // Trigger patient editing
                            }}
                        >
                            <BsPencilSquare /> Edit
                        </button>
                    </td>
                </tr>
            ))
            }

            {/* Pagination Component */}
            <tr>
                <td colSpan={4}>
                    <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
                </td>
            </tr>
        </>
    );
};

export default PaginatedItems;
