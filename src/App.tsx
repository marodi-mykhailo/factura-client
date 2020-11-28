import React, {useEffect} from 'react';
import './App.css';
import Main from "./Components/Main/Main";
import DataTable from "./Components/Table/Table";
import {useDispatch} from "react-redux";
import {getClientsTC} from "./reducers/client-reducer";
import {Route, Switch} from 'react-router-dom';
import ClientTable from "./Components/ClientsTable/ClientsTable";
import SellersTable from "./Components/SellersTable/SellersTable";
import {InvoiceForm} from "./Components/InvoiceForm/InvoiceForm";
import {getSellersTC} from "./reducers/sellers-reducer";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClientsTC())
        dispatch(getSellersTC())
    })
    return (
        <div>
            <Main>
                <Switch>
                    <Route path={'/clients'} render={() => <ClientTable/>}/>
                    <Route path={'/sellers'} render={() => <SellersTable/>}/>
                    <Route path={'/create-invoice'} render={() => <InvoiceForm/>}/>

                </Switch>
            </Main>
        </div>
    );
}

export default App;
