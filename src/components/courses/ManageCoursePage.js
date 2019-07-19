import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { Prompt, Redirect } from "react-router-dom";
import { isEqual } from "underscore";
import * as formHelper from "../../helper/formHelper";

/*
Cory's challenge: Handle 404 for item not found.
Added the boolean notFound prop.
*/
export function ManageCoursePage({
  courses,
  authors,
  notFound,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? (value ? parseInt(value, 10) : null) : value
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    /*
    Cory's challenge: Enhance validation.
    Added length and regex checks for the title and category, as well as using the common formHelper input validation.
    */
    formHelper.inputValidation(
      "Title",
      title,
      errors,
      true,
      3,
      50,
      /[^a-zA-Z0-9:\-!?., ]/i
    );
    formHelper.inputValidation("Author", authorId, errors, true);
    formHelper.inputValidation(
      "Category",
      category,
      errors,
      true,
      3,
      25,
      /[^a-zA-Z0-9 ]/i
    );

    setErrors(errors);
    //Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  /*
  Cory's challenge: Unsaved changes message
  Added a prompt to see any changes applied to the course. If changes have been made 
  or we are not in the saving process the message will be prompted to the user.
  */
  /*
  Cory's challenge: Handle 404 for item not found.
  Added a test case to check if we have a notFound item and redirecting to the not 
  found page if it's the case.
  */
  return (
    <>
      {notFound && <Redirect to="/notfound" />}
      {authors.length === 0 || courses.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt
            when={!isEqual(course, props.course) && !saving}
            message="You have unsaved changes. Are you sure you want to leave this page?"
          />
          <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave}
            saving={saving}
          />
        </>
      )}
    </>
  );
}

/*
Cory's challenge: Handle 404 for item not found.
Added the boolean notFound prop.
Removed the isRequired rule from the course prop in the 
event of none being found or created.
*/
ManageCoursePage.propTypes = {
  course: PropTypes.object,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  notFound: PropTypes.bool.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

/*
Cory's challenge: Handle 404 for item not found.
Added the boolean notFound prop and initializing it to the correct value.
*/
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  const notFound = (slug && state.courses.length > 0 && !course) || false;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
    notFound
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
  history
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
