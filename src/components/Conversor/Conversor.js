import React, {useState} from "react";

import "./conversor.css";
import * as Constants from "./../../constants/Constants"
import FmaTokenLogo from './../../assets/images/fma-logo.png';
import FssTokenLogo from './../../assets/images/fss-logo.png';
import FlapTokenLogo from './../../assets/images/flap-logo.png';
import { CircleSpinner } from "react-spinners-kit";


function Conversor(props) {

    const [allowanceFMA, setAllowanceFMA] = useState(null);
    const [FMAinStaking, setFMAinStaking] = useState(0);
    const [totalSupplyFSS, setTotalSupplyFSS] = useState(0);
    const [sendValue, setSendValue] = useState(0);
    const [receiveValue, setReceiveValue] = useState(0);
    const [isStaking, setIsStaking] = useState(1);
    const [buttonLabel, setButtonLabel] = useState('Stake');
    const [loading, setLoading] = useState(false);

    const supply_fss = () => {

        const web3 = props.myWeb3

             var Stake = new web3.eth.Contract(Constants.ABISTAKING, Constants.stakeAddress);
        
        Stake.methods.totalSupply().call().then(r => {
            //const fssSupply = Number(r);
            setTotalSupplyFSS(r);        
        });
    }
         
    const fma_staked = () => {

        const web3 = props.myWeb3
        var Flama = new web3.eth.Contract(Constants.ABIFLAMA, Constants.flamaAddress);
            
        Flama.methods.balanceOf(Constants.stakeAddress).call().then(r => {
            console.log(r);
            //const stakedFMA = Number(r);
            //console.log(stakedFMA);

            setFMAinStaking(r);            
        });
    }
    
    

    console.log(allowanceFMA)
    const updateButtonLabel = () => {
        if (!props.connected || !isStaking) {
            return;
        }
        console.log('entra update connected');

        const web3 = props.myWeb3

        var Flama = new web3.eth.Contract(Constants.ABIFLAMA, Constants.flamaAddress);

        Flama.methods.allowance(props.selectedAddress, Constants.stakeAddress).call().then(r => {
            const allowance = Number(r);
            setAllowanceFMA(allowance);

            console.log(allowance)

            if (allowance < sendValue) {
                setButtonLabel('Allow')
            }else if (allowanceFMA >= sendValue) {
                setButtonLabel('Stake')
            }
        });
    }
    
    const stake = () => {

        if (!props.connected) {
            return;
        }

        const web3 = props.myWeb3
        if (allowanceFMA < sendValue) {
            setButtonLabel('Allow')
            var approveAmount = '999999999';
            approveStake(web3.utils.toWei(approveAmount, 'ether'));

        } else if (allowanceFMA >= sendValue) {
            stakingFlama(web3.utils.toWei(sendValue, 'ether'));
        }

        async function stakingFlama(amount) {

            setLoading(true)
            setButtonLabel('')

            var Stake = new web3.eth.Contract(Constants.ABISTAKING, Constants.stakeAddress);
            await Stake.methods.stake(amount).send({
                from: props.selectedAddress,
                gas: 220000
            }).on('receipt', function (receipt) {
                setLoading(false)
                setButtonLabel('Stake')
                props.getBalances(web3, props.selectedAddress);


            });
        }

        async function approveStake(amount) {

            setLoading(true)
            setButtonLabel('')

            var Flama = new web3.eth.Contract(Constants.ABIFLAMA, Constants.flamaAddress);
            await Flama.methods.approve(Constants.stakeAddress, amount)
                .send({from: props.selectedAddress, gas: 100000})
                .on('receipt', function (receipt) {
                    setButtonLabel('Stake')
                    setLoading(false)
                    console.log(receipt);
                });
        }
    }

    const unstake = () => {

        if (!props.connected) {
            return;
        }
        setLoading(true)
        setButtonLabel('')

        const web3 = props.myWeb3

        unstakingFlama(web3.utils.toWei(sendValue, 'ether'));
        
        async function unstakingFlama(amount) {
            var Stake = new web3.eth.Contract(Constants.ABISTAKING, Constants.stakeAddress);

            await Stake.methods.unstake(amount).send({
                from: props.selectedAddress,
                gas: 220000
            }).on('receipt', function (receipt) {
                setLoading(false)
                setButtonLabel('Unstake')
                props.getBalances(web3, props.selectedAddress);
            });
        }  
    }

    const selectMaxAmount = () => {
        if (props.connected) {
            const web3 = props.myWeb3
            if (isStaking === 1) {
                setSendValue(props.flm);
                tokenOutput(props.flm);
            } else if (isStaking === 0) {
                setSendValue(props.fss);
                tokenOutput(props.fss);
            }
            console.log(props.flm)
            console.log(props.fss)

        
    }}

    const tokenOutput = (input) => {
        if (props.connected) {
        supply_fss();
        fma_staked();
        const web3 = props.myWeb3
        if (isStaking === 0) {
            setReceiveValue(input*FMAinStaking/totalSupplyFSS)
        } else if (isStaking === 1) {
            setReceiveValue((input*totalSupplyFSS/FMAinStaking)*0.97)
        }
    }}

    const renderDividends = () => {

        return (
            <div className="conversor-wr">
            <div className="input-wr">
                    <label for="dividendsItem">Pending Dividends</label>
                    <div className="input-wr-inner">
                        <input id="dividendsItem" type="number" placeholder="0.0" disabled/>
                        {renderCoin(Dividends)}
                    </div>
                    
            </div>
            <button type="submit" className="claim-btn" onClick={() => claimDividends()}
            disabled={!props.connected}>
        Claim
        </button>
            </div>
            
        
        )
        }
    

    const claimDividends = () => {

        if (!props.connected) {
            return;
        }
        const web3 = props.myWeb3

        withdrawDividends();
        
        async function withdrawDividends() {
            var Stake = new web3.eth.Contract(Constants.ABISTAKING, Constants.stakeAddress);

            await Stake.methods.withdrawDividendsFLAP().send({
                from: props.selectedAddress,
                gas: 220000
            }).on('receipt', function (receipt) {
                props.getBalances(web3, props.selectedAddress);

            });
        }
    }


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

    const renderCoin = (token) => {
        return <div className="coin-name">
            <img src={token.logo} alt={token.name}/>
            <small>{token.name}</small>
        </div>
    }
    const Tokens =
        {
            fma: {name: 'FMA', logo: FmaTokenLogo},
            fss: {name: 'FSS', logo: FssTokenLogo},
            flap: {name: 'FLAP', logo: FlapTokenLogo},
        };

    const Deposit = isStaking === 1 ? Tokens.fma : Tokens.fss;
    const Receive = isStaking === 0 ? Tokens.fma : Tokens.fss;
    const Dividends = Tokens.flap;

    return (
        <div className="conversor-wr">
            <section className="conversor">
                <div className="option-controller">
                    <a href="#" className={isStaking ? 'active' : ''} onClick={() => {
                        setIsStaking(1);
                        setButtonLabel('Stake');
                        tokenOutput(sendValue);
                    }}>
                        Stake
                    </a>
                    <a href="#" className={!isStaking ? 'active' : ''} onClick={() => {
                        setIsStaking(0);
                        setButtonLabel('UnStake');
                        tokenOutput(sendValue);
                    }}>Unstake</a>
                </div>
                <div className="input-wr">
                    <label for="sendItem">Deposit</label>
                    <div className="input-wr-inner">
                        <input onChange={event => {
                            setSendValue(event.target.value);
                            updateButtonLabel();
                            tokenOutput(event.target.value);
                        }} id="sendItem" type="number"
                               placeholder="0.0" value={sendValue}/>
                        {renderCoin(Deposit)}
                    </div>
                </div>
                <button class="max-btn" onClick={() => selectMaxAmount()}>MAX</button>
                <div className="input-wr">
                    <label for="receivedItem">Receive</label>
                    <div className="input-wr-inner">
                        <input id="receivedItem" type="number" placeholder="0.0" value={receiveValue} disabled/>
                        {renderCoin(Receive)}
                    </div>
                </div>
                <button type="submit" className="conv-btn" onClick={() => isStaking ? stake() : unstake()}
                        disabled={sendValue < 1000 || !props.connected}>
                    <CircleSpinner size={30} color="#FFF" loading={loading} />
                    {buttonLabel}
                </button>
                {renderDividends()}
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
