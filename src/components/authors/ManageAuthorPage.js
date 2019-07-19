import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";
import { connect } from "react-redux";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { newAuthor } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { Prompt, Redirect } from "react-router-dom";
import { isEqual } from "underscore";
import * as formHelper from "../../helper/formHelper";

/*
Cory's challenge: Author administration
Defined the ManageAuthorPage component.
*/
/*
Cory's challenge: Handle 404 for item not found.
Added the boolean notFound prop.
*/
export function ManageAuthorPage({
  authors,
  notFound,
  loadAuthors,
  saveAuthor,
  history,
  ...props
}) {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    } else {
      setAuthor({ ...props.author });
    }
  }, [props.author]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value
    }));
  }

  /*
  Cory's challenge: Enhance validation.
  Added length and regex checks for the name, as well as using the common formHelper input validation.
  */
  function formIsValid() {
    const { name } = author;
    const errors = {};

    formHelper.inputValidation(
      "Name",
      name,
      errors,
      true,
      3,
      40,
      /[^a-zA-Z\- ]/i
    );

    setErrors(errors);
    //Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveAuthor(author)
      .then(() => {
        toast.success("Author saved.");
        history.push("/authors");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  /*
  Cory's challenge: Unsaved changes message
  Added a prompt to see any changes applied to the author. If changes have been made 
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
      {authors.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Prompt
            when={!isEqual(author, props.author) && !saving}
            message="You have unsaved changes. Are you sure you want to leave this page?"
          />
          <AuthorForm
            author={author}
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
Removed the isRequired rule from the author prop in the 
event of none being found or created.
*/
ManageAuthorPage.propTypes = {
  author: PropTypes.object,
  authors: PropTypes.array.isRequired,
  notFound: PropTypes.bool.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getAuthorById(authors, id) {
  return authors.find(author => author.id === parseInt(id, 10)) || null;
}

/*
Cory's challenge: Handle 404 for item not found.
Added the boolean notFound prop and initializing it to the correct value.
*/
function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const author =
    id && state.authors.length > 0
      ? getAuthorById(state.authors, id)
      : newAuthor;
  const notFound = (id && state.authors.length > 0 && !author) || false;
  return {
    author,
    authors: state.authors,
    notFound
  };
}

const mapDispatchToProps = {
  loadAuthors,
  saveAuthor,
  history
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorPage);
