import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
import filter from "./filterReducer";

/*
Cory's challenge: Filter course list
Added the filter to the store.
*/
const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
  filter
});

export default rootReducer;
