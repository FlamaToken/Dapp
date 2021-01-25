import React, {Component, useState} from "react";

import "./conversor.css";

function Conversor(props) {

    const renderWalletStatus = () => {
        if (!props.connected) {
            return <div className="wallet-status">
                <div className="status"></div>
                <p>Wallet disconnected</p>
                <a href="#" onClick={() => props.connectWallet()}>Connect now</a>
            </div>
        } else {
          return  <div className="wallet-status">
                <div className="status"></div>
                <p>Wallet Connected</p>
                
            </div>
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
                {renderWalletStatus()}
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
