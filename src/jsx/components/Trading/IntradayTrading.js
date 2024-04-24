/* eslint-disable */
import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import OrderForm from '../Dashboard/Dashboard/OrderForm';
import { MyChart } from '../myChart';
import ToggleTrade from '../toggleTrade';
import { useSelector } from 'react-redux';
import { useGetAllAssetsQuery } from '../../../redux/services/trades';
import { RiTokenSwapFill } from "react-icons/ri";
import ReactDOMServer from 'react-dom/server';
import { useOpenTradeMutation } from '../../../redux/services/trades';
import { RingLoader } from 'react-spinners';
import swal from 'sweetalert';
const IntradayTrading = ({ fetchDataAndDispatch }) => {
    const { userToken } = useSelector(state => state.auth);
    const { data: allAssets = [], error, isLoading } = useGetAllAssetsQuery(userToken);
    const [tradePair, setTradePair] = useState("NEOBTC"); // Initialize tradePair state
    const [orderType, setOrderType] = useState("market");
    const [activeTab, setActiveTab] = useState("buy");
    const [openTradeMutation] = useOpenTradeMutation();

    // Function to generate random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Function to handle click event and set tradePair
    const handleClick = (pair) => {
        setTradePair(pair);
    };
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleOrderTypeClick = (type) => {
        setOrderType(type);
    };
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('232');
    const [total, setTotal] = useState('');

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

        return swal({
            title: '',
            content: {
                element: 'div',
                attributes: {
                    innerHTML: loadingElement,
                },
            },
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    };

    const handleTradeOrder = (e) => {
        e.preventDefault();
        // Display loading spinner
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
                console.log("Trade response:", response);
                // Hide loading spinner on success
                swal.close();
                // Check if the response status is success
                if (response && response[0] && response[0].status === "success") {
                    // Show success modal
                    fetchDataAndDispatch()
                    swal({
                        title: "Trade Opened!",
                        text: "Trade opened successfully.",
                        icon: "success",
                    });
                    // Add any success handling code here
                } else {
                    // Show error modal if status is not success
                    swal({
                        title: "Error!",
                        text: "Something went wrong. Please try again later.",
                        icon: "error",
                    });
                }
            })
            .catch((error) => {
                console.error("Error opening trade:", error);
                // Hide loading spinner on error
                swal.close();
                // Show error swal for insufficient balance
                swal({
                    title: "Error!",
                    text: "Insufficient Balance. Please deposit funds to your account.",
                    icon: "error",
                });
                // Add any error handling code here
            });
    };


    return (
        <>
            <div className='' style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <ToggleTrade />
            </div>
            <div className="row">
                <div className="col-xl-8">
                    <div className="card" style={{ height: "600px" }}>
                        <div className="card-header" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <div className="me-auto" style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                <h4 className="fs-20 text-black">Trading Chart</h4>
                                <Link to="#" className="btn btn-primary light btn-rounded me-3 mb-3">
                                    <i className="las la-download scale5 me-2"></i>Get Report
                                </Link>
                            </div>
                            <MyChart tradePair="NEOBTC" />
                        </div>
                    </div>
                    <div className="col-xl-12 col-sm-12" style={{ height: "auto" }}>
                        <div className="card h-auto">
                            <div className="px-0">
                                <Tab.Container defaultActiveKey="Navbuy">
                                    <div className="">
                                        <div className="buy-sell">
                                            <Nav className="nav nav-tabs" eventKey="nav-tab2" role="tablist" style={{ padding: 12 }}>
                                                <Nav.Link as="button" className={`nav-link ${activeTab === 'buy' ? 'active' : ''}`} onClick={() => handleTabClick('buy')} eventKey="Navbuy" type="button">Buy</Nav.Link>
                                                <Nav.Link as="button" className={`nav-link ${activeTab === 'sell' ? 'active' : ''}`} onClick={() => handleTabClick('sell')} eventKey="Navsell" type="button">Sell</Nav.Link>
                                            </Nav>
                                        </div>
                                        <Tab.Content className='col-11' style={{ margin: "auto", padding: "10px" }}>
                                            <Tab.Pane eventKey="Navbuy" >
                                                <Tab.Container defaultActiveKey="Navbuymarket">
                                                    <div className="limit-sell">
                                                        <Nav className="nav nav-tabs" id="nav-tab3" role="tablist">
                                                            <Nav.Link as="button" eventKey="Navsellmarket" className={`nav-link ${orderType === 'market' ? 'active' : ''}`} onClick={() => handleOrderTypeClick('market')}>Market Order</Nav.Link>
                                                            <Nav.Link as="button" eventKey="Navselllimit" className={`nav-link ${orderType === 'limit' ? 'active' : ''}`} onClick={() => handleOrderTypeClick('limit')}>Limit Order</Nav.Link>
                                                        </Nav>
                                                    </div>
                                                    <Tab.Content id="nav-tabContent1">
                                                        <Tab.Pane eventKey="Navbuymarket"></Tab.Pane>
                                                        <Tab.Pane eventKey="Navbuylimit"></Tab.Pane>
                                                    </Tab.Content>
                                                    <div className="sell-element">
                                                        <OrderForm
                                                            tradePair={tradePair}
                                                            onPriceChange={handlePriceChange}
                                                            onSubmit={handleTradeOrder}
                                                            amountVal={amount}
                                                            onAmountChange={handleAmountChange}
                                                            onTotalChange={handleTotalChange}
                                                        />
                                                    </div>
                                                </Tab.Container>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="Navsell">
                                                <Tab.Container defaultActiveKey="Navsellmarket">
                                                    <div className="limit-sell">
                                                        <Nav className="nav nav-tabs">
                                                            <Nav.Link as="button" eventKey="Navsellmarket" type="button">market order</Nav.Link>
                                                            <Nav.Link as="button" eventKey="Navselllimit" type="button" >limit order</Nav.Link>
                                                        </Nav>
                                                    </div>
                                                    <Tab.Content id="nav-tabContent2">
                                                        <Tab.Pane id="Navsellmarket" ></Tab.Pane>
                                                        <Tab.Pane id="Navselllimit" ></Tab.Pane>
                                                    </Tab.Content>
                                                    <div className="sell-element">
                                                        <OrderForm
                                                            tradePair={tradePair}
                                                            orderType={activeTab}
                                                            onPriceChange={handlePriceChange}
                                                            onAmountChange={handleAmountChange}
                                                            onSubmit={handleTradeOrder}
                                                            onTotalChange={handleTotalChange}
                                                        />
                                                    </div>
                                                </Tab.Container>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </div>
                                </Tab.Container>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4" style={{ height: "1200px", overflow: "hidden" }}>
                    <div className="card h-100">
                        <div className="card-header">
                            <h4 className="fs-20 text-black">Asset List</h4>
                        </div>
                            <div>
                                <Form.Control type="email" placeholder="Search pair" className="form-control-sm col-6" />
                                <Form.Select style={{ marginTop: "10px" }}>
                                    <option>Crypto</option>
                                    <option>Forex</option>
                                </Form.Select>
                            </div>
                        <div className="card-body" style={{ padding: "10px", maxHeight: "calc(100% - 50px)", overflow: "auto" }}>
                            <div className="row" style={{ flex: 1 }}>
                                {allAssets.map((asset, index) => (
                                    <div className="previews-info-list" key={index} style={{ position: "relative", cursor: "pointer", marginBottom: "10px" }} onClick={() => handleClick(asset.asset_pair)}> {/* Add onClick handler */}
                                        <div className="pre-icon">
                                            <div className="ms-2" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                <RiTokenSwapFill size={30} color={getRandomColor()} />
                                                <h6>{asset.asset_pair}</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default IntradayTrading;
