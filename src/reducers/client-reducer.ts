import {Dispatch} from "redux";
import {facturaAPI} from "../api/factures-api";
import {setIsInitializedAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../Components/utils/error-utils";

export type ClientInfoType = {
    ID: string,
    companyID: string,
    name: string,
    phone: string,
    email: string,
    numberTax: string,
    bill: string,
    currency: string
}

export type ClientAddressType = {
    ID: string,
    street: string,
    postalCode: string,
    city: string,
    country: string
}

export type ClientCompanyType = {
    ID: string,
    name: string
}

export type ClientType = {
    ID: string,
    info: ClientInfoType,
    address: ClientAddressType[],
    company: ClientCompanyType
}

let clientInitialState: ClientType[] = [
    {
        "ID": "1",
        "info": {
            "ID": "1",
            "companyID": "1",
            "name": "Andrzej Kanowski",
            "phone": "+48939285221",
            "numberTax": "4382348723",
            "email": "andrzej@gmail.com",
            "bill": "20000",
            "currency": "PL"
        },
        "address": [{"ID": "1", "street": "street 1", "postalCode": "35555", "city": "Rzeszow", "country": "Polska"}],
        "company": {"ID": "1", "name": "Ideo"}
    },
]

export const clientReducer = (state = clientInitialState, action: ClientsActionType) => {
    switch (action.type) {
        case "SET_CLIENTS":
            return [
                ...action.clients
            ]
        default:
            return state
    }
}


type ClientsActionType =
    |ReturnType<typeof setClients>


const setClients = (clients: ClientType[]) => ({
    type: "SET_CLIENTS",
    clients
} as const)


export const getClientsTC = () => (dispatch: Dispatch) => {
    dispatch(setIsInitializedAC(false))
    facturaAPI.getClients()
        .then((res) => {
            dispatch(setIsInitializedAC(true))
            if (res.data.resultCode === 0) {
                dispatch(setClients(res.data.data))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
