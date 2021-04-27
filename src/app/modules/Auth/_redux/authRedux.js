import { persistReducer } from "redux-persist";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";
import { PERSIST_REDUCER } from "../../../../redux/BaseHost";
// Author: Jeffry Azhari Rosman
// Email: Jeffryazhari@gmail.com
// Penambahan Encryption pada Redux agar Tidak Dapat Dilihat Isinya.
// import { encryptTransform } from 'redux-persist-transform-encrypt';

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
  UpdateProfile: "[Update Profile] Request API",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
};

// Author: Jeffry Azhari Rosman
// Email: Jeffryazhari@gmail.com
// Penambahan Config Encryption pada Redux.
// const encryptor = encryptTransform({
//   secretKey: 'pt-geo-dipa-energi-persero-jakarta',
//   onError: function (error) {
//     console.error("REDUX_PERSIST -> encryptor: ", error);
//   }
// })

export const reducer = persistReducer(
  PERSIST_REDUCER,
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.UpdateProfile: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
  updateProfile: (user) => ({ type: actionTypes.UpdateProfile, payload: { user } }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();
    yield put(actions.fulfillUser(user.data.items));
  });
}
