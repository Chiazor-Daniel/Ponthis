// eslint-disable-next-line
import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import OrderForm from '../Dashboard/Dashboard/OrderForm';
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from '../Dashboard/SvgIcon';
import { MyChart } from '../myChart';
import robo from "../../../images/robot.png"
import ToggleTrade from '../toggleTrade';
const IntradayTrading = () => {
    const tradePair = "NEOBTC"
    const marketBlog = [
        { icon: LtcIcon, classBg: 'bg-success', Name: 'LTC', },
        { icon: BtcIcon, classBg: 'bg-warning', Name: 'BTC', },
        { icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZ', },
        { icon: EthIcon, classBg: 'bg-pink', Name: 'ETH', },
        { icon: LtcIcon, classBg: 'bg-success', Name: 'LTC', },
        { icon: BtcIcon, classBg: 'bg-warning', Name: 'BTC', },
        { icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZ', },
        { icon: EthIcon, classBg: 'bg-pink', Name: 'ETH', },
        { icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZ', },
        { icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZ', },
    ];
    return (
        <>
          <div className='' style={{display: "flex", justifyContent: "flex-end", marginBottom: "20px"}}>
                <ToggleTrade autoTrader={true} handleAutoTrader={()=>alert("Enabled auto trading")}/>
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
                                                <Nav.Link as="button" className="nav-link" eventKey="Navbuy" type="button">buy</Nav.Link>
                                                <Nav.Link as="button" className="nav-link" eventKey="Navsell" type="button">sell</Nav.Link>
                                            </Nav>
                                        </div>
                                        <Tab.Content className='col-11' style={{ margin: "auto" }}>
                                            <Tab.Pane eventKey="Navbuy" >
                                                <Tab.Container defaultActiveKey="Navbuymarket">
                                                    <div className="limit-sell">
                                                        <Nav className="nav nav-tabs" id="nav-tab3" role="tablist">
                                                            <Nav.Link as="button" eventKey="Navbuymarket" type="button"  >market order</Nav.Link>
                                                            <Nav.Link as="button" eventKey="Navbuylimit" type="button" >limit order</Nav.Link>
                                                        </Nav>
                                                    </div>
                                                    <Tab.Content id="nav-tabContent1">
                                                        <Tab.Pane eventKey="Navbuymarket"></Tab.Pane>
                                                        <Tab.Pane eventKey="Navbuylimit"></Tab.Pane>
                                                    </Tab.Content>
                                                    <div className="sell-element">
                                                        <OrderForm tradePair={tradePair} />
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
                                                        <OrderForm tradePair={tradePair} />
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
                <div className="col-xl-4">
                    <div className="card h-100">
                        <div className="card-header">
                            <h4 className="fs-20 text-black">Asset List</h4>
                        </div>
                        <div className="card-body" style={{ padding: "10px" }}>
                            <div>
                                <Form.Control type="email" placeholder="Search pair" className="form-control-sm col-6" />
                                <Form.Select style={{ marginTop: "10px" }}>
                                    <option>Crypto</option>
                                    <option>Forecx</option>
                                </Form.Select>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="">
                                        <div className="card-body pt-0 px-0">
                                            {marketBlog.map((data, ind) => (
                                                <div className="previews-info-list" key={ind} style={{position:"relative"}}>
                                                
                                                    <div className="pre-icon">
                                                        <span className={`icon-box icon-box-sm ${data.classBg}`}>
                                                            {data.icon}
                                                        </span>
                                                        <div className="ms-2">
                                                            <h6>{data.Name}/Year</h6>
                                                            <span>March</span>
                                                        </div>
                                                    </div>
                                                    <div className="count">
                                                        <h6>120.45</h6>
                                                        <span className={ind % 2 == 0 ? "text-success" : ""}>1,24%</span>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IntradayTrading;
