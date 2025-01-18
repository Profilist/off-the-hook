// src/store.js
import { createStore } from 'redux';

// Define initial state
const initialState = {
  data: null,
};

// Define actions
const SET_DATA = 'SET_DATA';

// Define action creators
export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});

// Define the reducer
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

// Create the store
const store = createStore(dataReducer);

export default store;
