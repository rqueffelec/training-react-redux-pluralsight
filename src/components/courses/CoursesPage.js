import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import * as filterActions from "../../redux/actions/filterActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import CourseFilter from "./CourseFilter";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  /*
  Cory's challenge: Filter course list
  Added the onFilterChange method to push the event value to the store.
  */
  onFilterChange = event => {
    this.props.actions.filter(event.target.value);
  };

  /*
  Cory's challenge: Filter course list
  Added the CourseFilter component and filtering the course list 
  */
  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add course
            </button>

            <CourseFilter
              name="courseFilter"
              label="Filter"
              value={this.props.filter}
              onChange={event => this.onFilterChange(event)}
            />
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses.filter(course =>
                course.title
                  .toLowerCase()
                  .includes(this.props.filter.toLowerCase())
              )}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
    filter: state.filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      filter: bindActionCreators(filterActions.filter, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
