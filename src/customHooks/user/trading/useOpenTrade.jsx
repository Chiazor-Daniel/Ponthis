// src/hooks/useIntradayTrading.js

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';
import { useSelector } from 'react-redux';
import { useGetAllAssetsQuery, useOpenTradeMutation } from  '../../../redux-contexts/redux/services/trades';
import { RingLoader } from 'react-spinners';

export const useOpenTrade = (fetchDataAndDispatch) => {
    const { userToken } = useSelector(state => state.auth);
    const { data: allAssets = [], error, isLoading } = useGetAllAssetsQuery(userToken);
    const [getAssets, setGetAssets] = useState(allAssets);
    const [tradePair, setTradePair] = useState("NEOBTC");
    const [orderType, setOrderType] = useState("market");
    const [activeTab, setActiveTab] = useState("buy");
    const [searchTerm, setSearchTerm] = useState("");
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('232');
    const [total, setTotal] = useState('');
    const [openTradeMutation] = useOpenTradeMutation();

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const handleClick = (pair) => {
        setTradePair(pair);
        Swal.fire({
            title: 'Asset Selected',
            text: `You have selected ${pair}`,
            icon: 'success'
        });
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleOrderTypeClick = (type) => {
        setOrderType(type);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
        setAmount(event.target.value !== "" ? event.target.value - 0.04 : 0.00);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleTotalChange = (event) => {
        setTotal(event.target.value);
    };

    const transactionProcessing = () => {
        const loadingElement = ReactDOMServer.renderToString(
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", padding: "100px", alignItems: "center" }}>
                <RingLoader color="#36d7b7" size={100} />
                <p>Processing Trade...</p>
            </div>
        );

        return Swal.fire({
            title: '',
            html: loadingElement,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    };

    const handleTradeOrder = (e) => {
        e.preventDefault();
        Swal.fire({
            title: `Confirm ${activeTab === 'buy' ? 'Buy' : 'Sell'} Order`,
            text: `Are you sure you want to ${activeTab === 'buy' ? 'buy' : 'sell'} $${price} worth ${tradePair}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                const loadingToast = transactionProcessing();
                const tradeData = {
                    asset_pair_type: tradePair,
                    amount: parseInt(price),
                    trade_type: orderType,
                    created_by: "self",
                    trade_transaction_type: activeTab === 'buy' ? 'buy' : 'sell'
                };
                openTradeMutation({ token: userToken, data: tradeData })
                    .unwrap()
                    .then((response) => {
                        Swal.close();
                        if(response[0].status === "success"){
                            if (Object.values(response[1].data).length === 0) {
                                fetchDataAndDispatch();
                                Swal.fire({
                                    title: "Trade Opened!",
                                    text: "Trade opened successfully.",
                                    icon: "success",
                                });
                            } else {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Insufficient Balance. Please deposit funds to your account.",
                                    icon: "error",
                                });
                            }
                        }
                    })
                    .catch((error) => {
                        console.error("Error opening trade:", error);
                        Swal.close();
                        Swal.fire({
                            title: "Error!",
                            text: "Insufficient Balance. Please deposit funds to your account.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    useEffect(() => {
        if (searchTerm !== "") {
            setGetAssets(allAssets.filter(asset => asset.asset_pair.toLowerCase().includes(searchTerm.toLowerCase())));
        } else {
            setGetAssets(allAssets);
        }
    }, [allAssets, searchTerm]);

    return {
        tradePair,
        orderType,
        activeTab,
        searchTerm,
        getAssets,
        price,
        amount,
        total,
        handleClick,
        handleTabClick,
        handleOrderTypeClick,
        handlePriceChange,
        handleAmountChange,
        handleTotalChange,
        handleTradeOrder,
        setSearchTerm,
        getRandomColor
    };
};
