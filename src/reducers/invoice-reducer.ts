import {Dispatch} from "redux";
import {facturaAPI} from "../api/factures-api";
import {Simulate} from "react-dom/test-utils";

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
                ...action.invoices
            ]
        case "ADD_INVOICE":
            return [
                action.invoiceData,
                ...state
            ]
        default:
            return state
    }
}

type InvoiceReducerActionType =
    | ReturnType<typeof setInvoices>
    | ReturnType<typeof addInvoice>

const setInvoices = (invoices: InvoiceType[]) => ({
    type: "SET_INVOICES",
    invoices
} as const)

const addInvoice = (invoiceData: InvoiceType) => ({
    type: "ADD_INVOICE",
    invoiceData
} as const)


export const getInvoicesTC = () => (dispatch: Dispatch) => {
    facturaAPI.getInvoices()
        .then(res => {
            setInvoices(res.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export type invoiceDataForCreate = {
    paymentMilliseconds: number | null,
    issueMilliseconds: number | null,
    client: string,
    seller: string,
    product: string,
    productCount: string,
    status: string
}


export const createInvoiceTC = (invoiceData: invoiceDataForCreate) => (dispatch: Dispatch) => {
    facturaAPI.createInvoice(invoiceData)
        .then((res) => {
                console.log(res.data)
        }).catch((error) => {
        console.log(error)
    })
}
