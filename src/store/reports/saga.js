import { call, put, takeEvery } from "redux-saga/effects";

// Crypto Redux States
import { GET_STOCK_BALANCE_BYSTOCK, GET_STOCK_BALANCE_BYMATERIAL } from "./actionTypes";
// import {
//   getInvoicesSuccess,
//   getInvoicesFail,
//   getInvoiceDetailSuccess,
//   getInvoiceDetailFail,
// } from "./actions";

import {
    getStockBalanceListByStock,
    getStockBalanceByStockSuccess,
    getStockBalanceByStockFail,

    getStockBalanceByMaterialSuccess,
    getStockBalanceByMaterialFail
  } from "./actions";

//Include Both Helper File with needed methods
// import { getInvoices, getInvoiceDetail } from "helpers/fakebackend_helper";
import { getStockBalanceByStock, getStockBalanceByMaterial } from "helpers/fakebackend_helper";

function* fetchStockBalanceByStock() {
  try {
    const response = yield call(getStockBalanceByStock)
    yield put(getStockBalanceByStockSuccess(response))
  } catch (error) {
    yield put(getStockBalanceByStockFail(error))
  }
}

function* fetchStockBalanceByMaterial() {
    try {
      const response = yield call(getStockBalanceByMaterial)
      yield put(getStockBalanceByMaterialSuccess(response))
    } catch (error) {
      yield put(getStockBalanceByMaterialFail(error))
    }
  }


function* reportsSaga() {
  yield takeEvery(GET_STOCK_BALANCE_BYSTOCK, fetchStockBalanceByStock)
  yield takeEvery(GET_STOCK_BALANCE_BYMATERIAL, fetchStockBalanceByMaterial)
}

export default reportsSaga;
