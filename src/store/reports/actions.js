import {
    GET_STOCK_BALANCE_BYSTOCK,
    GET_STOCK_BALANCE_BYSTOCK_SUCCESS,
    GET_STOCK_BALANCE_BYSTOCK_FAIL,

    GET_STOCK_BALANCE_BYMATERIAL,
    GET_STOCK_BALANCE_BYMATERIAL_SUCCESS,
    GET_STOCK_BALANCE_BYMATERIAL_FAIL
  } from "./actionTypes"
  
  export const getStockBalanceListByStock = () => ({
    type: GET_STOCK_BALANCE_BYSTOCK,
  })
  
  export const getStockBalanceByStockSuccess = stockBalance => ({
    type: GET_STOCK_BALANCE_BYSTOCK_SUCCESS,
    payload: stockBalance,
  })
  
  export const getStockBalanceByStockFail = error => ({
    type: GET_STOCK_BALANCE_BYSTOCK_FAIL,
    payload: error,
  })


  export const getStockBalanceListByMaterial = () => ({
    type: GET_STOCK_BALANCE_BYMATERIAL,
  })
  
  export const getStockBalanceByMaterialSuccess = materialBalance => ({
    type: GET_STOCK_BALANCE_BYMATERIAL_SUCCESS,
    payload: materialBalance,
  })
  
  export const getStockBalanceByMaterialFail = error => ({
    type: GET_STOCK_BALANCE_BYMATERIAL_FAIL,
    payload: error,
  })