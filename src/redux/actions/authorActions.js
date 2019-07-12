import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

/*
Cory's challenge: Author administration
Defined the createAuthorSuccess, updateAuthorSuccess and deleteAuthorOptimistic functions.
*/
export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthorOptimistic(author) {
  return { type: types.DELETE_AUTHOR_OPTIMISTIC, author };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

/*
Cory's challenge: Author administration
Defined the saveAuthor and deleteAuthor functions.
*/
export function saveAuthor(author) {
  //es-lint-disable-next-line no-unused-vars
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .saveAuthor(author)
      .then(savedAuthor => {
        author.id
          ? dispatch(updateAuthorSuccess(savedAuthor))
          : dispatch(createAuthorSuccess(savedAuthor));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteAuthor(author) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status of this.
    dispatch(deleteAuthorOptimistic(author));
    return authorApi.deleteAuthor(author.id);
  };
}
