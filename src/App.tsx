import React, {useEffect} from 'react';
import './App.css';
import Main from "./Components/Main/Main";
import DataTable from "./Components/Table/Table";
import {useDispatch} from "react-redux";
import {getClientsTC} from "./reducers/client-reducer";
import {Route, Switch} from 'react-router-dom';
import ClientTable from "./Components/ClientsTable/ClientsTable";
import SellersTable from "./Components/SellersTable/SellersTable";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClientsTC())
    })
    return (
        <div>
            <Main>
                <Switch>
                    <Route path={'/clients'} render={() => <ClientTable/>}/>
                    <Route path={'/sellers'} render={() => <SellersTable/>}/>
                </Switch>
            </Main>
        </div>
    );
}

export default App;
