import { Switch, Route } from 'react-router-dom';
import Conversor from './../Conversor/Conversor'
import Bridge from './../Bridge/index'
import React from "react";

function Main(props) {

    return(
        <Switch>
            <Route exact path='/' render={(propsChild) => <Conversor flm={props.flm} flap={props.flap} fss={props.fss} connectWallet={props.connectWallet} getBalances={props.getBalances} connected={props.connected} myWeb3={props.myWeb3} selectedAddress={props.selectedAddress}/>}/>
            <Route exact path='/bridge' component={Bridge}></Route>
        </Switch>
    );
}

export default Main;
