import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*
Cory's challenge: Author administration
Defined the AuthorList component.
*/
const AuthorList = ({ authors, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Courses</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {authors.map(author => {
        return (
          <tr key={author.id}>
            <td>
              <Link to={"/author/" + author.id}>{author.name}</Link>
            </td>
            <td>{author.coursesAmount}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                disabled={author.coursesAmount !== 0}
                onClick={() => onDeleteClick(author)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      coursesAmount: PropTypes.number
    })
  ).isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AuthorList;
