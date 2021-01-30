import "./App.css";
import Header from '../src/components/Header'
import Footer from '../src/components/Footer/Footer'
import Wallet from "./components/Wallet/Wallet";
import Main from "./components/Main/Main";
import React, {useState} from "react";
import * as Constants from "./constants/Constants"


function FlamaApp() {
    const {web3Loading, getWeb3} = Wallet()
    const [myWeb3, setMyWeb3] = useState()
    const [eth, setEth] = useState();
    const [flm, setFlm] = useState();
    const [flap, setFlap] = useState();
    const [fss, setFss] = useState();
    const [connected, setConnected] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState();


    async function connectWallet() {
        console.log(Constants.flamaAddress)


        await getWeb3().then((web3) => {
            setMyWeb3(web3);
            setConnected(true);

            web3.eth.getAccounts().then((result) => {
                     setSelectedAddress(result[0])
                     getBalances(web3, result[0])
                }
            )
        });
    }

    async function getBalances(web3, selectedAddress) {
        web3.eth.getBalance(selectedAddress).then(value => {
            var ether = value;
            setEth(web3.utils.fromWei(ether, 'ether'))
        })

        var Flama = new web3.eth.Contract(Constants.ABIFLAMA, Constants.flamaAddress);
        Flama.methods.balanceOf(selectedAddress).call().then(value => {
            var fma = value;
            console.log('flm ', value)
            console.log('flm fromwei to eth ', web3.utils.fromWei(fma, 'ether'))
            setFlm(web3.utils.fromWei(fma, 'ether'))
        });

        var Flap = new web3.eth.Contract(Constants.ABIFLAPP, Constants.flappAddress);
        Flap.methods.balanceOf(selectedAddress).call().then(value => {
            var flap = value;
            console.log('flap  ', value)
            setFlap(web3.utils.fromWei(flap, 'ether'))
        });

        var Stake = new web3.eth.Contract(Constants.ABISTAKING, Constants.stakeAddress);
        Stake.methods.balanceOf(selectedAddress).call().then(value => {
            var fss = value;
            console.log('fss  ', value)
            setFss(web3.utils.fromWei(fss, 'ether'))
        });
    }

    return (
        <div className="flama">
            <Header eth={eth} flm={flm} flap={flap} fss={fss} connectWallet={connectWallet} connected={connected}/>
            <Main flm={flm} flap={flap} fss={fss} connectWallet={connectWallet} getBalances={getBalances} connected={connected} myWeb3={myWeb3} selectedAddress={selectedAddress}/>
            <Footer/>
        </div>
    );
}

export default FlamaApp;
