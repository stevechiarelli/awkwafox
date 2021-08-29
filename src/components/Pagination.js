import React from "react";

const Pagination = ({itemsPerPage, totalItems, currentPage, paginate}) => {
    const items = [];

    // previous button arrow
    if (currentPage > 1) {
        items.push(<button key={-1} onClick={() => paginate(currentPage-1)}>{"<"}</button>)
    }
    else if (totalItems > 0) {
        items.push(<button className="disabled" key={-1}>{"<"}</button>);
    }

    // page numbers
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        if (currentPage === i) {
            items.push(<button className="active" key={i} onClick={() => paginate(i)}>{i}</button>)
        }
        else {
            items.push(<button key={i} onClick={() => paginate(i)}>{i}</button>)
        }
    }

    // next button arrow
    if (currentPage < (totalItems / itemsPerPage)) {
        items.push(<button key={0} onClick={() => paginate(currentPage+1)}>{">"}</button>)
    }
    else if (totalItems > 0) {
        items.push(<button className="disabled" key={0}>{">"}</button>);
    }

    return (
        <div className="pagination">
            {items}
        </div>
    );
}

export default Pagination;