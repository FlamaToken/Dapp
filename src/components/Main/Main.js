import { NavLink, Switch, Route } from 'react-router-dom';
import Conversor from './../Conversor/Conversor'
import Bridge from './../Bridge/index'
import React, {useState} from "react";

function Main(props) {

    return(
        <Switch>
            <Route exact path='/' render={(propsChild) => <Conversor connectWallet={props.connectWallet} connected={props.connected} myWeb3={props.myWeb3} selectedAddress={props.selectedAddress}/>}/>
            <Route exact path='/bridge' component={Bridge}></Route>
        </Switch>
    );
}

export default Main;
