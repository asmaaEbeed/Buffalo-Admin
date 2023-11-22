import {
  GET_STOCK_BALANCE_BYSTOCK_SUCCESS,
  GET_STOCK_BALANCE_BYSTOCK_FAIL,
  GET_STOCK_BALANCE_BYMATERIAL_SUCCESS,
  GET_STOCK_BALANCE_BYMATERIAL_FAIL,
} from "./actionTypes"

//   const INIT_STATE = {
//     invoices: [],
//     invoiceDetail: {},
//     error: {},
//   }

const INIT_STATE = {
  stockBalanceByStock: [],
  stockBalanceByMaterial: [],
}

const Reports = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STOCK_BALANCE_BYSTOCK_SUCCESS:
      return {
        ...state,
        stockBalanceByStock: action.payload,
      }

    case GET_STOCK_BALANCE_BYSTOCK_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_STOCK_BALANCE_BYMATERIAL_SUCCESS:
      return {
        ...state,
        stockBalanceByMaterial: action.payload,
      }

    case GET_STOCK_BALANCE_BYMATERIAL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Reports
