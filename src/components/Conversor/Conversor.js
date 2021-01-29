import React, {Component, useState} from "react";

import "./conversor.css";
import * as Constants from "./../../constants/Constants"

function Conversor(props) {

    const [allowanceFMA, setAllowanceFMA] = useState();
    const [selectedAddress, setSelectedAddress] = useState();
    const [sendValue, setSendValue] = useState();


    const renderWalletStatus = () => {
        if (!props.connected) {
            return <div className="wallet-status">
                <div className="status"></div>
                <p>Wallet disconnected</p>
                <a href="#" onClick={() => props.connectWallet()}>Connect now</a>
            </div>
        } else {
            console.log(props.myWeb3)
            return <div className="wallet-status">
                <div className="status-connected"></div>
                <p>Wallet Connected</p>

            </div>
        }
    }

    const stake = () => {

        if (!props.connected) {
            return;
        }
        const web3 = props.myWeb3

        var Flama = new web3.eth.Contract(Constants.ABIFLAMA, Constants.flamaAddress);

        Flama.methods.allowance(props.selectedAddress, Constants.stakeAddress).call().then(r => {
            const allowance = Number(r);

            if (allowance < sendValue) {
                var approveAmount = '999999999';
                approvestake(web3.utils.toWei('999999999', 'ether'));
            } else if (allowanceFMA >= sendValue) {
                stakingflama(web3.utils.toWei(sendValue, 'ether'));
            }


        });

        async function stakingflama(amount) {
            var Stake = new web3.eth.Contract(Constants.ABISTAKING, Constants.stakeAddress);

            await Stake.methods.stake(amount).send({
                from: web3.givenProvider.selectedAddress,
                gas: 220000
            }).on('receipt', function (receipt) {
                console.log(receipt);
            });
        }

        //
        // async function unstakingflama(amount) {
        //     var Stake = new web3.eth.Contract(Constants.ABISTAKING, Constants.stakeAddress);
        //
        //     await Stake.methods.unstake(amount).send({
        //         from: web3.givenProvider.selectedAddress,
        //         gas: 150000
        //     }).on('receipt', function (receipt) {
        //         console.log(receipt);
        //     });
        // }
        //
        async function approvestake(amount) {
            var Flama = new web3.eth.Contract(Constants.ABIFLAMA, Constants.flamaAddress);

            await Flama.methods.approve(Constants.stakeAddress, amount)
                .send({from: props.selectedAddress, gas: 100000})
                .on('receipt', function (receipt) {
                    console.log(receipt);
                });
        }
    }

    return (
        <div className="conversor-wr">
            <section className="conversor">
                <div className="option-controller">
                    <a href="#" className="active">
                        Stake
                    </a>
                    <a href="#">Unstake</a>
                </div>
                <div className="input-wr">
                    <label for="sendItem">Deposit</label>
                    <div className="input-wr-inner">
                        <input onChange={event => setSendValue(event.target.value)} id="sendItem" type="number"
                               placeholder="0.0"/>
                        <div className="coin-name">
                            <img src="/assets/balance/fma-logo.png" alt="FMA"/>
                            <small>FMA</small>
                        </div>
                    </div>
                </div>
                <div className="input-wr">
                    <label for="receivedItem">Received</label>
                    <div className="input-wr-inner">
                        <input id="receivedItem" type="number" placeholder="0.0"/>
                        <div className="coin-name">
                            <img src="/assets/balance/fss-logo.png" alt="FSS"/>
                            <small>FSS</small>
                        </div>
                    </div>
                </div>
                <button type="submit" className="conv-btn" onClick={() => stake()}>
                    Stake
                </button>
                {renderWalletStatus(props)}
            </section>

            <small className="note-instructions">
                1% of FMA transaction goes to Flama Staking Shares (FSS).
                <br/>
                Stake FMA to get FSS. Unstake FSS to get FMA/FLAPs.
            </small>
        </div>
    );
}

export default Conversor;
