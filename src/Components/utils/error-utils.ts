import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../reducers/app-reducer";
import {ResponseType} from "../../api/factures-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.message) {
        dispatch(setAppErrorAC(data.message))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }

    if(data.resultCode === 0) {
        dispatch(setAppStatusAC('succeeded'))

    }else {
        dispatch(setAppStatusAC('failed'))
    }
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}


// export const handleServerAppSuccess =
