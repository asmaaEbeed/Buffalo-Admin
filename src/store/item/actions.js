import { GET_ITEMS, GET_ITEMS_SUCCESS, GET_ITEMS_FAIL } from "./actionTypes"

export const getItems = () => ({
  type: GET_ITEMS,
})

export const getItemsSuccess = items => ({
  type: GET_ITEMS_SUCCESS,
  payload: items,
})

export const getItemsFail = items => ({
  type: GET_ITEMS_FAIL,
  payload: items,
})
