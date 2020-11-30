import {isObjEqual} from "../Components/InvoiceForm/InvoiceForm";

export type InvoiceProductType = {
    ID: string
    amount: string
}

type InvoiceProductReducerType = InvoiceProductType[]

const initialState: InvoiceProductReducerType = []

export const invoiceProductReducer = (state = initialState, action: InvoiceProductReducerActionType) => {
    switch (action.type) {
        case "ADD_PRODUCT":{
            let newArr = [...state]
            if (newArr.map(item => isObjEqual(action.obj, item)).some(item => !item)) {
                return newArr
            } else {
                const similarObj = newArr.find(item => item.ID === action.obj.ID)
                if (similarObj) {
                    similarObj.amount = action.obj.amount
                } else {
                    return [
                        action.obj,
                        ...newArr
                    ]
                }
            }
            return newArr
        }
        case "DELETE_PRODUCT":
            return state.filter(item => item.ID !== action.id)
        case "RESET_PRODUCTS":
            return []
        case "CHANGE_AMOUNT":
            return state.map(item => item.ID === action.id ? {...item, amount: action.newAmount} : item)
        default:
            return state
    }
}

type InvoiceProductReducerActionType =
    | ReturnType<typeof addProduct>
    | ReturnType<typeof deleteProduct>
    | ReturnType<typeof resetProducts>
    | ReturnType<typeof changeAmount>

export const addProduct = (obj: InvoiceProductType) => ({
    type: "ADD_PRODUCT",
    obj
} as const)

export const deleteProduct = (id: string) => ({
    type: "DELETE_PRODUCT",
    id
} as const)

export const resetProducts = () => ({
    type: "RESET_PRODUCTS"
} as const)

export const changeAmount = (id: string, newAmount: string) => ({
    type: "CHANGE_AMOUNT", id, newAmount
} as const)
