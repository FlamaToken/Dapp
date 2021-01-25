import Web3 from "web3";
import Web3Modal from "web3modal";
import {useState} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function Wallet() {
    const [loading, setLoading] = useState(false);

    return {
        get web3Loading() {
            return loading
        },
        async getWeb3() {
            setLoading(true);
            let web3Modal;
            let provider;
            let web3;
            let providerOptions;
            providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1 " // required
                    }
                },
                metamask: {
                    id: 'injected',
                    name: 'MetaMask',
                    type: 'injected',
                    check: 'isMetaMask'
                },

            }

            web3Modal = new Web3Modal({
                cacheProvider: false,
                disableInjectedProvider: false,
                providerOptions
            });
            provider = await web3Modal.connect()
            provider.on('error', e => console.error('WS Error', e))
            provider.on('end', e => console.error('WS End', e))
            provider.on('disconnect', e => console.error('WS Disconnect', e))

            provider.on('connect', (info) => {
                console.log('connected')
            })
            web3 = new Web3(provider)
            setLoading(false)
            
            return web3
        },
    }
}