import axios from 'axios'
import {ClientType} from "../reducers/client-reducer";
import {SellersType} from "../reducers/sellers-reducer";
import {invoiceDataForCreate, InvoiceType} from "../reducers/invoice-reducer";

const settings = {
    withCredentials: true,
}

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    ...settings
})


type ResponseType<T = []> = {
    resultCode: number
    data: T,
    message: string
}

export const facturaAPI = {
    getClients() {
        return instance.get<ResponseType<ClientType[]>>('clients')
    },
    getSellers() {
        return instance.get<ResponseType<SellersType[]>>('sellers')
    },
    getInvoices() {
        return instance.get<ResponseType<InvoiceType[]>>('factures')
    },
    createInvoice(invoiceData: invoiceDataForCreate) {
        return instance.post<ResponseType<InvoiceType>>('create-facture', invoiceData)
    }
}
