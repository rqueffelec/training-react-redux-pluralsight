import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";

/*
Cory's challenge: Hide empty course list.
Added a test case to check whether or not the list of courses is empty or not. If yes, we display a relevant message, 
otherwise the matching filtered list is displayed.
*/
/*
Cory's challenge: Pagination.
Added the pagination related props, filtering the list of items according to the pagination status,
and added the pagination component.
*/
const CourseList = ({
  courses,
  onDeleteClick,
  page,
  items,
  onPreviousClick,
  onNextClick
}) => (
  <>
    {courses.length === 0 ? (
      <p>No courses available.</p>
    ) : (
      <>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {courses
              .filter(
                (course, index) =>
                  index >= page * items && index < page * items + items
              )
              .map(course => {
                return (
                  <tr key={course.id}>
                    <td>
                      <a
                        className="btn btn-light"
                        href={"http://pluralsight.com/courses/" + course.slug}
                      >
                        Watch
                      </a>
                    </td>
                    <td>
                      <Link to={"/course/" + course.slug}>{course.title}</Link>
                    </td>
                    <td>{course.authorName}</td>
                    <td>{course.category}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDeleteClick(course)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {courses.length > items && (
          <Pagination
            page={page}
            length={courses.length}
            items={items}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
          />
        )}
      </>
    )}
  </>
);

/*
Cory's challenge: Pagination.
Added the pagination related props.
*/
CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  items: PropTypes.number.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export default CourseList;
