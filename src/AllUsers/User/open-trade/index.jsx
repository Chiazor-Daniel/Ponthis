// src/components/IntradayTrading.js

/* eslint-disable */
import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import OrderForm from '../dashboard-components/OrderForm';
import { MyChart } from '../../../jsx/components/myChart';
import ToggleTrade from '../../../jsx/components/toggleTrade';
import { RiTokenSwapFill } from "react-icons/ri";
import { useOpenTrade } from '../../../customHooks/user/trading/useOpenTrade';

const OpenTrade = ({ fetchDataAndDispatch }) => {
    const {
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
    } = useOpenTrade(fetchDataAndDispatch);

    return (
        <>
            <div className='row' style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <ToggleTrade />
            </div>
            <div className="row">
                <div className="col-xl-8">
                    <div className="card" style={{ height: "600px" }}>
                        <div className="card-header" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <div className="me-auto" style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                <h4 className="fs-20 text-black">Trading Chart</h4>
                            </div>
                            <MyChart tradePair={tradePair} />
                        </div>
                    </div>
                    <div className="col-xl-12 col-sm-12" style={{ height: "500px" }}>
                        <div className="card h-100">
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
                                                            myOrder={orderType}
                                                            onAmountChange={handleAmountChange}
                                                            onTotalChange={handleTotalChange}
                                                        />
                                                    </div>
                                                </Tab.Container>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="Navsell">
                                                <Tab.Container defaultActiveKey="Navsellmarket">
                                                    <div className="limit-sell">
                                                    <Nav className="nav nav-tabs" id="nav-tab3" role="tablist">
                                                            <Nav.Link as="button" eventKey="Navsellmarket" className={`nav-link ${orderType === 'market' ? 'active' : ''}`} onClick={() => handleOrderTypeClick('market')}>Market Order</Nav.Link>
                                                            <Nav.Link as="button" eventKey="Navselllimit" className={`nav-link ${orderType === 'limit' ? 'active' : ''}`} onClick={() => handleOrderTypeClick('limit')}>Limit Order</Nav.Link>
                                                        </Nav>
                                                    </div>
                                                    <Tab.Content id="nav-tabContent2">
                                                        <Tab.Pane id="Navsellmarket" ></Tab.Pane>
                                                        <Tab.Pane id="Navselllimit" ></Tab.Pane>
                                                    </Tab.Content>
                                                    <div className="sell-element">
                                                        <OrderForm
                                                            tradePair={tradePair}
                                                            myOrder={orderType}
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
                <div className="col-xl-4" style={{ height: "1120px", overflow: "hidden" }}>
                    <div className="card h-100">
                        <div className="card-header">
                            <h4 className="fs-20 text-black">Asset List</h4>
                        </div>
                        <div>
                            <div style={{padding: "10px"}}>
                                <Form.Control type="text" placeholder="Search pair" className="form-control-sm col-6" value={searchTerm} onChange={(e)=> {setSearchTerm(e.target.value)}}/>
                                <Form.Select style={{ marginTop: "10px" }}>
                                    <option>Crypto</option>
                                    <option>Forex</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className="card-body" style={{ padding: "10px", maxHeight: "calc(100% - 50px)", overflow: "auto" }}>
                            <div className="row" style={{ flex: 1 }}>
                                {getAssets?.map((asset, index) => (
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

export default OpenTrade;
