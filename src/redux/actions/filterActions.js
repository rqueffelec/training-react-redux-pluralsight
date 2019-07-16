import * as types from "./actionTypes";

/*
Cory's challenge: Filter course list
Added the filter actions.
*/
export function filterSuccess(filter) {
  return { type: types.FILTER_COURSES_SUCCESS, filter };
}

export function filter(filter) {
  return function(dispatch) {
    return dispatch(filterSuccess(filter));
  };
}
