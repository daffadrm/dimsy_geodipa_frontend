import { persistReducer } from "redux-persist";
import { PERSIST_REDUCER } from "../../../../redux/BaseHost";
import { actionTypes } from "./deliveryMonitoringAction";

const initialAuthState = {
    dataDeverableDoc: null,
};

export const reducer = persistReducer(
    PERSIST_REDUCER,
    (state = initialAuthState, action) => {
    switch (action.type) {
        case actionTypes.SetDataDeverableDoc: {
          const { dataDeverableDoc } = action.payload;
          return { ...state, dataDeverableDoc };
        }
  
        default:
          return state;
      }
    }
);

export const setDataDeverableDoc = dataDeverableDoc => ({ type: actionTypes.SetDataDeverableDoc, payload: { dataDeverableDoc } })