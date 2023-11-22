import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL
  } from "./actionTypes"
  
  const INIT_STATE = {
    items: [],
    // userProfile: {},
    // error: {},
  }
  
  const items = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_ITEMS_SUCCESS:
        return {
          ...state,
          items: action.payload,
        }
  
      case GET_ITEMS_FAIL:
        return {
          ...state,
          error: action.payload,
        }
      default:
        return state
    }
  }
  
  export default items
  