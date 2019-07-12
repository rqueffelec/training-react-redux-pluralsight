import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

/*
Cory's challenge: Author administration
Defined the AuthorForm component.
*/
const AuthorForm = ({ author, errors, onSave, onChange, saving }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{author.id ? "Edit" : "Add"} Author</h2>
      <TextInput
        name="name"
        label="Name"
        value={author.name}
        onChange={onChange}
        error={errors.name}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default AuthorForm;
