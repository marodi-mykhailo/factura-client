import {Dispatch} from "redux";
import {facturaAPI} from "../api/factures-api";

export type InvoiceType = {
    ID: string,
    clientID: string,
    sellerID: string,
    numberFacture: string,
    products: InvoiceProductType[],
    sellDate: string,
    paymentDate: string,
    issueDate: string,
    status: string,
    priceNetto: string,
    priceBrutto: string
}

type InvoiceProductType = {
    ID: string,
    amount: string
}

const initialInvoiceReducerState: InvoiceType[] = [
    {
        "ID": "1",
        "clientID": "3",
        "sellerID": "1",
        "numberFacture": "2",
        "products": [
            {
                "ID": "1",
                "amount": "5"
            },
            {
                "ID": "3",
                "amount": "3"
            }
        ],
        "sellDate": "1606423638172",
        "paymentDate": "1606423638172",
        "issueDate": "1606423638172",
        "status": "paid",
        "priceNetto": "100",
        "priceBrutto": "110"
    },
    {
        "ID": "2",
        "clientID": "2",
        "sellerID": "1",
        "numberFacture": "2",
        "products": [
            {
                "ID": "2",
                "amount": "10"
            },
            {
                "ID": "5",
                "amount": "7"
            }
        ],
        "sellDate": "1606423638172",
        "paymentDate": "1606423638172",
        "issueDate": "1606423638172",
        "status": "partially",
        "priceNetto": "40",
        "priceBrutto": "44"
    },
    {
        "ID": "3",
        "clientID": "5",
        "sellerID": "1",
        "numberFacture": "3",
        "products": [
            {
                "ID": "5",
                "amount": "2"
            },
            {
                "ID": "6",
                "amount": "5"
            },
            {
                "ID": "7",
                "amount": "8"
            },
            {
                "ID": "8",
                "amount": "5"
            }
        ],
        "sellDate": "1606423638172",
        "paymentDate": "1606423638172",
        "issueDate": "1606423638172",
        "status": "unpaid",
        "priceNetto": "200",
        "priceBrutto": "240"
    },
]


export const invoiceReducer = (state = initialInvoiceReducerState, action: InvoiceReducerActionType) => {
    switch (action.type) {
        case "SET_INVOICES":
            return [
                ...state,
                ...action.invoices
            ]
        default:
            return state
    }
}

type InvoiceReducerActionType =
    | ReturnType<typeof setInvoices>

const setInvoices = (invoices: InvoiceType[]) => ({
    type: "SET_INVOICES",
    invoices
})


export const getInvoicesTC = () => (dispatch: Dispatch) => {
    facturaAPI.getInvoices()
        .then(res => {
            setInvoices(res.data)
        })
        .catch(error => {
            console.log(error)
        })
}
