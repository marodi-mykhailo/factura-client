import axios from 'axios'
import {ClientType} from "../reducers/client-reducer";
import {SellersType} from "../reducers/sellers-reducer";

const settings = {
    withCredentials: true,
}

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    ...settings
})

export const facturaAPI = {
    getClients() {
        return instance.get<ClientType[]>('clients')
    },
    getSellers(){
        return instance.get<SellersType[]>('sellers')
    }
}
