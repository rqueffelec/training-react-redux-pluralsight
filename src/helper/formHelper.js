/*
Cory's challenge: Enhance validation.
Extracted the input validation to a formHelp central location.
Validation includes: required, min/max length and regex tests.
*/
export const inputValidation = (
  label,
  value,
  errors,
  required,
  min,
  max,
  regex
) => {
  if (required && !value) {
    errors[label.toLowerCase()] = label + " is required.";
  } else if (min && value.length < min) {
    errors[label.toLowerCase()] =
      label + " cannot be shorter than " + min + " characters.";
  } else if (max && value.length > max) {
    errors[label.toLowerCase()] =
      label + " cannot be longer than " + min + " characters.";
  } else if (regex && regex.test(value)) {
    errors[label.toLowerCase()] = "Invalid " + label.toLowerCase() + ".";
  }
};
