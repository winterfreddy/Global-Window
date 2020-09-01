import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import ui from './ui_reducer';
import photos from './photo_reducer';

const RootReducer = combineReducers({
  photos,
  session,
  errors,
  ui
});

export default RootReducer;
