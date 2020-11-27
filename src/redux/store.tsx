import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {clientReducer} from "../reducers/client-reducer";
import {sellersReducer} from "../reducers/sellers-reducer";

const rootReducer = combineReducers({
    clients: clientReducer,
    sellers: sellersReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
