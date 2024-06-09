import React from 'react';
import { Nav, Tab, Form, Button } from 'react-bootstrap';
import BalanceCardSlider from './dashboard-components/BalanceCardSlider';
import OrderForm from './dashboard-components/OrderForm';
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from './SvgIcon';
import { useSelector } from 'react-redux';
import { MyChart } from '../../jsx/components/myChart';
import Swal from 'sweetalert2';
import { IoDiamondSharp } from "react-icons/io5";
import { useResponsive } from '../../redux-contexts/context/responsive';
import { RiTokenSwapFill } from "react-icons/ri";
import { useTrade } from '../../customHooks/user/userDashboard/useTrade';// Import the custom hook

const marketBlog = [
    { icon: LtcIcon, classBg: 'bg-success', Name: 'LTC' },
    { icon: BtcIcon, classBg: 'bg-warning', Name: 'BTC' },
    { icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZ' },
    { icon: EthIcon, classBg: 'bg-pink', Name: 'ETH' },
    { icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZ' },
];

const Home = ({ theme, fetchDataAndDispatch }) => {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const { userToken } = useSelector(state => state.auth);
    const {
        tradePair,
        showChart,
        price,
        amount,
        total,
        orderType,
        searchTerm,
        getAssets,
        activeTab,
        setTradePair,
        setShowChart,
        setPrice,
        data, 
        isLoadingError,
        setAmount,
        setTotal,
        setOrderType,
        setSearchTerm,
        setGetAssets,
        setActiveTab,
        handleTradeOrder,
        handlePriceChange,
        handleAmountChange,
        handleTotalChange,
        handleOrderTypeClick,
        handleTabClick,
        getRandomColor
    } = useTrade(userToken, fetchDataAndDispatch);

    if (!isLoadingError)
        return (
            <>
                <div className="row" style={{ height: "auto", overflow: "auto" }}>
                    <div className="col-12 col-xl-9">
                        <div className="row">
                            <div className="col-12">
                                <BalanceCardSlider accountData={data} />
                            </div>
                        
                            <div className="col-12 row">  
                                    <div className="col-lg-3 col-12" style={{ height: "580px" }}>
                                        <div className="card" >
                                            <div className="card-header border-0 pb-0">
                                                <h2 className="heading">Assets lists</h2>
                                            </div>
                                            <div style={{ padding: "10px" }}>
                                                <Form.Control type="text" placeholder="Search pair" className="form-control-sm col-12" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />

                                            </div>
                                            <div className="card-body text-center pt-0 pb-2" style={{ overflow: "auto" }}>
                                                <div className="text-start" style={{ display: "flex", flexDirection: "column", justifyContent: "", gap: "10px" }}>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card col-lg-9 col-md-12 col-12" style={{position: "relative", zIndex: 1, paddingBottom: "10px", height: "560px"}}>
                                        <div className="card-header border-0 align-items-start flex-wrap pb-0">
                                            <h2 className="heading">Market Chart</h2>

                                        </div>
                                        <MyChart tradePair={tradePair} newTheme={theme} />
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-12" style={{ flex: 1 }}>
                        {!isMobile && (
                            <div className="col-12">
                                <div className="card" style={{ height: "250px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
                                        <IoDiamondSharp color='#FF6500' size={50} style={{ filter: 'drop-shadow(0 0 10px #FF6500)' }} />
                                        <p style={{ fontSize: "1.2rem" }}>Upgrade to premium</p>
                                    </div>
                                    <Button onClick={() => {
                                        Swal.fire({
                                            title: "Upgrade Account",
                                            text: "You are not a premium user. Upgrade your account to enjoy more benefits.",
                                            icon: "info",
                                            showCancelButton: true,
                                            confirmButtonText: 'Upgrade',
                                            cancelButtonText: 'Cancel',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                // Handle Upgrade Account button click here
                                                // Example: Redirect user to upgrade account page or trigger upgrade action
                                                // history.push('/upgrade');
                                            }
                                        });
                                    }}>Upgrade Account</Button>
                                </div>


                            </div>
                        )}
                        <div className="col-12 card" style={{ height: "530px" }}>
                            <Tab.Container defaultActiveKey="Navbuy">
                                <div className="">
                                    <div className="buy-sell">
                                        <Nav className="nav nav-tabs" eventKey="nav-tab2" role="tablist">
                                            <Nav.Link as="button" className={`nav-link ${activeTab === 'buy' ? 'active' : ''}`} onClick={() => handleTabClick('buy')} eventKey="Navbuy" type="button">Buy</Nav.Link>
                                            <Nav.Link as="button" className={`nav-link ${activeTab === 'sell' ? 'active' : ''}`} onClick={() => handleTabClick('sell')} eventKey="Navsell" type="button">Sell</Nav.Link>
                                        </Nav>
                                    </div>
                                    <Tab.Content className='col-12' style={{ margin: "auto", padding: "10px" }}>
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
                                                        activeTab={activeTab}
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
            </>
        );
};

export default Home;
