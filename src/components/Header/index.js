import React, {Component} from "react";
import "./header.css";
import { NavLink } from 'react-router-dom';


class Header extends Component {
    render() {
        const renderBalances = () => {
            if (!this.props.connected) {
                return <div className="wallet-status">
                    <div className="status"></div>
                    <div type="submit" className="connect-btn" onClick={() => this.props.connectWallet()}>Connect Wallet</div>
                </div>
            } else if (this.props.connected) {
                return <ul className="balance-wr">
                    <small>Balances:</small>
                    <li>
                        <img src="/assets/balance/eth.png" alt="Ether"/>
                        <b>
                            {this.props.eth > 0 ? parseFloat(this.props.eth).toFixed(5) : 0} <span>ETH</span>
                        </b>
                    </li>
                    <li>
                        <img src="/assets/balance/fma-logo.png" alt="FMA"/>
                        <b>
                            {this.props.flm > 0 ? parseFloat(this.props.flm).toFixed(2) : 0} <span>FMA</span>
                        </b>
                    </li>
                    <li>
                        <img src="/assets/balance/flap-logo.png" alt="FLAP"/>
                        <b>
                            {this.props.flap > 0 ? parseFloat(this.props.flap).toFixed(2) : 0} <span>FLAP</span>
                        </b>
                    </li>
                    <li>
                        <img src="/assets/balance/fss-logo.png" alt="FSS"/>
                        <b>
                            {this.props.fss > 0 ? parseFloat(this.props.fss).toFixed(2) : 0} <span>FSS</span>
                        </b>
                    </li>
                </ul>
            }
        }

        return (
            <header>
                <div className="container">
                    <div className="site-nav">
                        <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270.7 96.3">
                            <defs/>
                            <path
                                fill="#ea4c4c"
                                d="M9.7 39.7c1.6 2.5 2.7 4.3 3.9 5.9 1 1.3 2.3 2.6 3.7 3.4 4.7 2.9 8.6.8 8.7-4.7.1-5.9-.4-11.7-.2-17.6.2-8.5 2-16.5 6.9-23.7.6-.9 1.3-1.6 2.4-3-2 13.6 4.6 23.2 11.7 32.7 4.2 5.6 8.6 11.2 12.1 17.2 11.1 19.3-1 40.7-19 45.3C17.7 100.9-.4 83.8 0 64.2c.1-8.1 2.6-15.3 7.5-21.7.7-.9 1.3-1.7 2.2-2.8z"
                            />
                            <path
                                d="M105.4 41.3H90.5v8H104v10.5H90.5v18.7H78V30.8h27.3l.1 10.5zM122.4 30.8v47.6H111V30.8h11.4zM154.7 46.1h11.5v32.4h-11.5v-3.6c-2.5 3.1-5.8 4.6-10 4.6-2.3 0-4.5-.4-6.5-1.3s-3.7-2-5.2-3.6-2.6-3.4-3.5-5.5c-.8-2.1-1.2-4.4-1.2-6.9 0-2.3.4-4.5 1.2-6.6.8-2 2-3.9 3.4-5.5s3.1-2.8 5.2-3.7c2-.9 4.2-1.3 6.6-1.3 4.1 0 7.4 1.4 10 4.3v-3.3zm-14.4 16.1c0 1.1.2 2 .5 2.9s.9 1.7 1.5 2.4 1.4 1.2 2.3 1.6 1.9.5 2.9.5 2-.2 2.8-.5c.9-.4 1.7-.9 2.3-1.6.6-.7 1.2-1.4 1.6-2.3.4-.9.6-1.9.6-2.8 0-1-.1-2-.5-2.9-.4-.9-.9-1.7-1.6-2.4-.6-.7-1.4-1.2-2.3-1.6s-1.9-.5-2.8-.5c-1.1 0-2 .2-2.9.5-.9.4-1.7.9-2.3 1.6-.6.7-1.2 1.4-1.5 2.3-.4.8-.6 1.8-.6 2.8zM173.6 46.1h11.5v4c3.1-3 6.6-4.5 10.5-4.5 4.8 0 8.4 2 11 6 2.6-4.1 6.2-6.1 11-6.1 1.5 0 2.9.2 4.3.7 1.3.4 2.5 1.2 3.5 2 1 .9 1.8 2.1 2.3 3.7s.9 3.4.9 5.5v21.1h-11.5v-16c0-1.6-.1-3-.4-4-.3-1-.5-1.9-1-2.5-.4-.6-1-1-1.5-1.2-.5-.2-1.2-.4-1.9-.4-3.6 0-5.5 2.7-5.5 8v16h-11.5v-16c0-1.6-.1-3-.4-4.1-.2-1.1-.5-2-.9-2.6-.4-.6-.9-1.1-1.5-1.3-.6-.3-1.3-.4-2.2-.4-.7 0-1.4.1-2 .4-.6.3-1.2.6-1.7 1.2s-.9 1.4-1.2 2.5c-.3 1.1-.4 2.5-.4 4.2v16h-11.5l.1-32.2zM259.2 46.1h11.5v32.4h-11.5v-3.6c-2.5 3.1-5.8 4.6-10 4.6-2.3 0-4.5-.4-6.5-1.3s-3.7-2-5.2-3.6-2.7-3.4-3.5-5.5c-.8-2.1-1.2-4.4-1.2-6.9 0-2.3.4-4.5 1.2-6.6.8-2 2-3.9 3.4-5.5s3.1-2.8 5.2-3.7c2-.9 4.2-1.3 6.6-1.3 4 0 7.4 1.4 10 4.3v-3.3zm-14.4 16.1c0 1.1.2 2 .5 2.9s.9 1.7 1.5 2.4 1.4 1.2 2.3 1.6c.9.4 1.9.5 2.9.5s2-.2 2.8-.5 1.7-.9 2.3-1.6c.6-.7 1.2-1.4 1.6-2.3s.6-1.9.6-2.8c0-1-.2-2-.6-2.8-.4-.9-.9-1.7-1.6-2.4-.6-.7-1.4-1.2-2.3-1.6-.9-.4-1.9-.5-2.8-.5-1.1 0-2 .2-2.9.5s-1.7.9-2.3 1.6c-.6.7-1.2 1.4-1.5 2.3-.3.7-.5 1.7-.5 2.7z"/>
                        </svg>

                        <nav className="main-navigation">
                            <ul>
                                <li>
                                    <NavLink to='/' exact activeClassName="active">Staking</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/bridge/' exact activeClassName="active">Bridge</NavLink>
                                </li>
                                {/*<li>*/}
                                    {/*<a href="https://github.com/FlamaToken/Lending" target="_blank" rel="noopener noreferrer">Lending</a>*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                    {/*<a href="https://uniswap.exchange/swap?outputCurrency=0x0f8794f66c7170c4f9163a8498371a747114f6c4" target="_blank" rel="noopener noreferrer">Exchange</a>*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                    {/*<a href="https://flappbridge.justliquidity.org/" target="_blank" rel="noopener noreferrer">Bridge</a>*/}
                                {/*</li>*/}
                            </ul>
                        </nav>
                    </div>
                    {renderBalances()}
                </div>
            </header>
        );
    }
}

export default Header;
