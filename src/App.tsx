import React, {useEffect} from 'react';
import './App.css';
import Main from "./Components/Main/Main";
import {useDispatch, useSelector} from "react-redux";
import {getClientsTC} from "./reducers/client-reducer";
import {Route, Switch} from 'react-router-dom';
import ClientTable from "./Components/ClientsTable/ClientsTable";
import SellersTable from "./Components/SellersTable/SellersTable";
import {InvoiceForm} from "./Components/InvoiceForm/InvoiceForm";
import {getSellersTC} from "./reducers/sellers-reducer";
import InvoicesTable from "./Components/InvoicesTable/InvoicesTable";
import {CircularProgress, LinearProgress} from "@material-ui/core";
import FirstPage from "./FirstPage/FirstPage";
import {AppRootStateType} from "./redux/store";
import {getInvoicesTC} from "./reducers/invoice-reducer";
import {ErrorSnackbar} from "./Components/ErrorSnackbar/ErrorSnackbar";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClientsTC())
        dispatch(getSellersTC())
        dispatch(getInvoicesTC())
    }, [])

    return (
        <Main>
            <ErrorSnackbar/>
            {/*<LinearProgress/>*/}
            <Switch>
                <Route exact path={'/'} render={() => <FirstPage/>}/>
                <Route path={'/clients'} render={() => <ClientTable/>}/>
                <Route path={'/sellers'} render={() => <SellersTable/>}/>
                <Route path={'/invoices'} render={() => <InvoicesTable/>}/>
                <Route path={'/create-invoice'} render={() => <InvoiceForm/>}/>
            </Switch>
        </Main>
    );
}

export default App;
