import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {clientReducer} from "../reducers/client-reducer";
import {sellersReducer} from "../reducers/sellers-reducer";
import {invoiceReducer} from "../reducers/invoice-reducer";
import {productReducer} from "../reducers/products-reducer";
import {invoiceProductReducer} from "../reducers/invoice-product-reducer";

const rootReducer = combineReducers({
    clients: clientReducer,
    sellers: sellersReducer,
    invoices: invoiceReducer,
    products: productReducer,
    invoiceProducts: invoiceProductReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
