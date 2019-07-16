import React from "react";
import PropTypes from "prop-types";

/*
Cory's challenge: Filter course list
Defined the CourseFilter component.
*/
const CourseFilter = ({ name, label, value, onChange }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <form>
        <div className="field">
          <label htmlFor={name} style={{ marginRight: 10 }}>
            {label}:{" "}
          </label>
          <input type="text" id={name} onChange={onChange} value={value} />
        </div>
      </form>
    </div>
  );
};

CourseFilter.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CourseFilter;
