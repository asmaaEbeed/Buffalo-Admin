import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  postLogin
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {

  // Buffalo Login Code
  console.log("loginuser")

  let userData = {
    username: user.email,
    password: user.password
  }

  const response = yield call(postLogin, userData);
  console.log(response);


  // const response = yield call(postFakeLogin, {
  //   email: user.email,
  //   password: user.password,
  // });
  // console.log(response)

  localStorage.setItem("authUser", JSON.stringify(response.data.rs.employee));
  localStorage.setItem("token", response.data.rs.token);
  console.log(response.data.rs.employee)
  yield put(loginSuccess(response.data.rs.employee));
  history('/products');


  try {
    console.log(fireBaseBackend.loginUser)
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      console.log("firebase")
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log("jwt");
      const response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      console.log("fake");
      const response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
      
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }

    history('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { type, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, type);
      if (response) {
        history("/dashboard");
      } else {
        history("/login");
      }
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    if(response)
    history("/dashboard");
  } catch (error) {
    console.log("error",error)
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
