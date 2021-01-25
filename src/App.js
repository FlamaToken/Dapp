import "./App.css";
import Header from '../src/components/Header'
import Conversor from '../src/components/Conversor'
import Footer from '../src/components/Footer'
import Wallet from "./components/Wallet/Wallet";
import React, {useState} from "react";
import * as Constants from "./constants/index"


function FlamaApp() {
    const {web3Loading, getWeb3} = Wallet()
    const [myWeb3, setMyWeb3] = useState()
    const [eth, setEth] = useState();
    const [flm, setFlm] = useState();
    const [flap, setFlap] = useState();
    const [connected, setConnected] = useState(false);


    async function connectWallet() {
        await getWeb3().then((web3) => {
            setMyWeb3(web3);
            setConnected(true);

            web3.eth.getAccounts().then((result) => {
                    web3.eth.getBalance(result[0]).then(value => {
                        var ether = web3.utils.fromWei(value, 'ether')
                        setEth(ether)
                    })

                    var Flama = new web3.eth.Contract(Constants.ABIFLAMA, Constants.flamaAddress);
                    Flama.methods.balanceOf(result[0]).call().then(value => {
                        console.log('flm ', value)
                        setFlm(value)
                    });

                    var Flap = new web3.eth.Contract(Constants.ABIFLAPP, Constants.flappAddress);
                    Flap.methods.balanceOf(result[0]).call().then(value => {
                        console.log('flap  ', value)
                        setFlap(value)
                    });
                }
            )
        });
    }

    return (
        <div className="flama">
            <Header eth={eth} flm={flm} flap={flap} connected={connected}/>
            <Conversor connectWallet={connectWallet} connected={connected}/>
            <Footer/>
        </div>
    );
}

export default FlamaApp;
