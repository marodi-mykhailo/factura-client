import {Dispatch} from "redux";
import {getClientsTC} from "./client-reducer";
import {getSellersTC} from "./sellers-reducer";
import {getInvoicesTC} from "./invoice-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppReducerStateType = {
    status: RequestStatusType
    error: string | null,
    isInitialized: true | false
}

const appReducerInitialState: AppReducerStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export const appReducer = (state = appReducerInitialState, action: AppReducerActionType): AppReducerStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.status}
        default:
            return state
    }
}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type AppReducerActionType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setIsInitializedAC>


export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedAC = (status: boolean) => ({type: 'APP/SET-IS-INITIALIZED', status} as const)

