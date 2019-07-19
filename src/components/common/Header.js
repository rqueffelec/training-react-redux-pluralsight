import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

/*
Cory's challenge: Author administration
Added an Authors navigation link
*/
/*
Cory's challenge: Show items number in the header.
Updated the Header component to get all required information 
from the store and display the items number with the matching 
link for the user to view.
Note: this has highlighted the requirement to centralize the 
items load in a common place when the entire application loads.
Instead of doing it in every component.
I would suggest to do that in the App.js. 
*/
const Header = ({ courses, authors, loadCourses, loadAuthors }) => {
  const activeStyle = { color: "#F15B2A" };

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }, []);

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses {courses.length === 0 ? "" : "(" + courses.length + ")"}
      </NavLink>
      {" | "}
      <NavLink to="/authors" activeStyle={activeStyle}>
        Authors {authors.length === 0 ? "" : "(" + authors.length + ")"}
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

Header.propTypes = {
  courses: PropTypes.array,
  authors: PropTypes.array,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
