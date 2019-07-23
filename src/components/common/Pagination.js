import React from "react";
import PropTypes from "prop-types";

/*
Cory's challenge: Pagination.
Added the pagination component.
*/
const Pagination = ({ page, length, items, onPreviousClick, onNextClick }) => {
  return (
    <div style={{ textAlign: "right" }}>
      <button
        style={{ marginBottom: 20, marginRight: 10 }}
        className="btn btn-primary add-course"
        disabled={page === 0}
        onClick={onPreviousClick}
      >
        Previous
      </button>
      <button
        style={{ marginBottom: 20 }}
        className="btn btn-primary add-course"
        disabled={page * items + items >= length}
        onClick={onNextClick}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  items: PropTypes.number.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export default Pagination;
