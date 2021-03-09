import { combineReducers } from "redux";
import {
  LOGIN,
  SIGNUP,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_NAME,
} from "../actions/user";
import {
  GET_MY_EVENTS,
  CREATE_EVENT,
  GET_EVENT_MEDIA,
} from "../actions/events";

const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

const events = (state = {}, action) => {
  switch (action.type) {
    case GET_MY_EVENTS:
      return { ...state, event: action.payload };
    case CREATE_EVENT:
      return { ...state, createdEvent: action.payload };
    case GET_EVENT_MEDIA:
      return { ...state, currentEventMedia: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
  events,
});

export default rootReducer;
