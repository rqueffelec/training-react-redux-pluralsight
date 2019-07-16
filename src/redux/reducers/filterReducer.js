import * as types from "../actions/actionTypes";
import initialState from "./initialState";

/*
Cory's challenge: Filter course list
Added the filter reducer.
*/
export default function filterReducer(state = initialState.filter, action) {
  switch (action.type) {
    case types.FILTER_COURSES_SUCCESS:
      return action.filter;
    default:
      return state;
  }
}
