import React, {Component, useState} from "react";

import "./bridge.css";

function Bridge(props) {

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
        <div className="bridge-wr">
            <section className="bridge">
                <div className="option-controller">
                    <a href="#" className="active">
                        ETH &rarr; BSC
                    </a>
                    <a href="#">BSC &rarr; ETH</a>
                </div>
                <div className="input-wr">
                    <label for="sendItem">Transfer</label>
                    <div className="input-wr-inner">
                        <input id="sendItem" type="number" placeholder="0.0"/>
                        <div className="coin-name">
                            <img src="/assets/balance/fma-logo.png" alt="FMA"/>
                            <small>FMA</small>
                        </div>
                    </div>
                </div>
                <button type="submit" className="conv-btn">
                    Bridge
                </button>
                {renderWalletStatus()}
            </section>

            <small className="note-instructions">
                You will receive your bridged FLAP in the same address after a few confirmations.
                <br/>
                Select the correct network on your wallet!
            </small>
        </div>
    );
}

export default Bridge;
