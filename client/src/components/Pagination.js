import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            previousLabel="Previous"
            onPageChange={onPageChange}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center"  // Bootstrap class for pagination
            pageClassName="page-item"                               // Bootstrap class for page items
            pageLinkClassName="page-link"                           // Bootstrap class for page links
            previousClassName="page-item"                           // Bootstrap class for previous button
            previousLinkClassName="page-link"                       // Bootstrap class for previous link
            nextClassName="page-item"                               // Bootstrap class for next button
            nextLinkClassName="page-link"                           // Bootstrap class for next link
            breakClassName="page-item"                              // Bootstrap class for break (ellipses)
            breakLinkClassName="page-link"                          // Bootstrap class for break link
            activeClassName="active"                                // Bootstrap class for the active page
        />
    );
};

export default Pagination;
