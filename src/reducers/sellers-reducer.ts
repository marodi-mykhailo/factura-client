import {ClientAddressType, ClientCompanyType, ClientInfoType, ClientType} from "./client-reducer";
import {Dispatch} from "redux";
import {facturaAPI} from "../api/factures-api";
import {ProductType} from "./products-reducer";



export type SellersType = {
    ID: string,
    info: ClientInfoType,
    address: ClientAddressType[],
    company: ClientCompanyType,
    sellerProducts: ProductType[]
}


let sellerInitialState: SellersType[] = [
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
        "company": {"ID": "1", "name": "Ideo"},
        "sellerProducts": [
            {
                "ID": "1",
                "name": "Milk",
                "price": "2",
                "unit": "bottle",
                "currency": "PL",
                "tax": "2"
            },
            {
                "ID": "2",
                "name": "Sweet fresh stawberry",
                "price": "10",
                "unit": "kg",
                "currency": "PL",
                "tax": "5"
            },
            {
                "ID": "3",
                "name": "Homemade bread",
                "price": "4",
                "unit": "piece",
                "currency": "PL",
                "tax": "5"
            },
            {
                "ID": "4",
                "name": "Tomato",
                "price": "5",
                "unit": "kg",
                "currency": "PL",
                "tax": "5"
            },
            {
                "ID": "5",
                "name": "Pears",
                "price": "3",
                "unit": "kg",
                "currency": "PL",
                "tax": "5"
            }
        ]
    }
]


export const sellersReducer = (state = sellerInitialState, action: SellersReducerActionType) => {
    switch (action.type) {
        case "SET_SELLERS":
            return [
                ...action.sellers
            ]
        default:
            return state
    }
}

type SellersReducerActionType =
    |ReturnType<typeof setSellers>

const setSellers = (sellers: SellersType[]) => ({
    type: "SET_SELLERS",
    sellers
})

export const getSellersTC = () => (dispatch: Dispatch) => {
    facturaAPI.getSellers()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setSellers(res.data.data))
            }
        }).catch(error => {
        console.log(error)
    })
}

