import React, {Component, useState} from "react";

import "./conversor.css";
import Wallet from '../Wallet/Wallet.js';

function Conversor() {
    const {web3Loading, getWeb3} = Wallet()
    const [myWeb3, setMyWeb3] = useState()

    async function connectWallet() {
        await getWeb3().then((response) => {
            setMyWeb3(response);
            response.eth.getAccounts().then((result) => {
                console.log(result[0])
                }
            )
        });
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
                    <label for="sendItem">Sent</label>
                    <div className="input-wr-inner">
                        <input id="sendItem" type="number" placeholder="0.0"/>
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
                <button type="submit" className="conv-btn">
                    Stake
                </button>

                <div className="wallet-status">
                    <div className="status"></div>
                    <p>Wallet disconnected</p>
                    <a href="#" onClick={connectWallet}>Connect now</a>

                </div>
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
