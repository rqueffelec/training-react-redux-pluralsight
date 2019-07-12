import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors, deleteAuthor } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import AuthorList from "./AuthorList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

/*
Cory's challenge: Author administration
Defined the AuthorsPage component.
Known issue: Table header appears/disappears before the Spinner shows
*/
function AuthorsPage({
  authors,
  courses,
  loading,
  loadAuthors,
  loadCourses,
  deleteAuthor
}) {
  const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }
  }, []);

  const handleDeleteAuthor = async author => {
    toast.success("Author deleted");
    try {
      await deleteAuthor(author);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      {redirectToAddAuthorPage && <Redirect to="/author" />}
      <h2>Authors</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddAuthorPage(true)}
          >
            Add author
          </button>
          <AuthorList onDeleteClick={handleDeleteAuthor} authors={authors} />
        </>
      )}
    </>
  );
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    authors:
      state.courses.length === 0
        ? []
        : state.authors.map(author => {
            return {
              ...author,
              coursesAmount: state.courses.filter(c => author.id === c.authorId)
                .length
            };
          }),
    courses: state.courses,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
  deleteAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
