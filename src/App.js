import "./App.css";
import Header from '../src/components/Header'
import Conversor from '../src/components/Conversor'
import Footer from '../src/components/Footer'
import Wallet from "./components/Wallet/Wallet";
import React, {useState} from "react";


function FlamaApp() {
    const {web3Loading, getWeb3} = Wallet()
    const [myWeb3, setMyWeb3] = useState()
    const [eth, setEth] = useState();
    const [connected, setConnected] = useState(false);


    async function connectWallet() {
        await getWeb3().then((response) => {
            setMyWeb3(response);
            setConnected(true);

            response.eth.getAccounts().then((result) => {
                response.eth.getBalance(result[0]).then(value => {
                        var ether = response.utils.fromWei(value, 'ether')
                        setEth(ether)
                        console.log(ether)
                        console.log(eth);
                    })
                }
            )
        });
    }

    return (
        <div className="flama">
            <Header eth = {eth} connected= {connected} />
            <Conversor  connectWallet = {connectWallet} connected= {connected}/>
            <Footer/>
        </div>
    );
}

export default FlamaApp;
