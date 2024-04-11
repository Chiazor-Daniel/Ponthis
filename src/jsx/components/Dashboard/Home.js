import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Dropdown, Nav, Tab } from 'react-bootstrap';
import { ThemeContext } from "../../../context/ThemeContext";
import BalanceCardSlider from './Dashboard/BalanceCardSlider';
import OrderForm from './Dashboard/OrderForm';
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from './SvgIcon';
import TradingViewWidget from '../TradingView/TradinView';
import AssetsChart from './Dashboard/AssetsChart';
import TradingViewMarketOverview from '../TradingView/TradingStock';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MyChart } from '../myChart';
const marketBlog = [
	{ icon: LtcIcon, classBg: 'bg-success', Name: 'LTC', },
	{ icon: BtcIcon, classBg: 'bg-warning', Name: 'BTC', },
	{ icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZ', },
	{ icon: EthIcon, classBg: 'bg-pink', Name: 'ETH', },
	{ icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZ', },
];

const pickerData = [
	{ fillcolor: 'var(--primary)', datatitle: 'BNBBTC', price: '763' },
	{ fillcolor: 'var(--primary)', datatitle: 'NEOBTC', price: '763' },
	{ fillcolor: 'var(--primary)', datatitle: 'LTCBTC', price: '763' },
	{ fillcolor: 'var(--secondary)', datatitle: 'QTUMETH', price: '763' },
	{ fillcolor: 'var(--primary)', datatitle: 'ESOSETH', price: '763' },
	{ fillcolor: 'var(--primary)', datatitle: 'BNTETH', price: '763' },
	{ fillcolor: 'var(--primary)', datatitle: 'BCCBTC', price: '763' },
];

const Home = () => {
	const navigate = useNavigate()
	const [tradePair, setTradePair] = useState("NEOBTC")
	const [showChart, setShowChart] = useState(true);
	const { loading, userInfo, userToken, error, success } = useSelector(state => state.auth);
	// useEffect(() => {
	// 	console.log("token", userToken); 
	// 	if (!userToken) {
	// 		navigate("/");
	// 	}
	// }, []); 
	return (
		<>
			<div className="row">
				<div className="col-xl-9">
					<div className="row">
						<div className="col-xl-12">
							<BalanceCardSlider />
						</div>
						<div className="col-xl-12 row rm" style={{height: "520px"}}>
							<div className="col-xl-3 assets-al col-lg-12" style={{height: "100%"}}>
								<div className="card" >
									<div className="card-header border-0 pb-0">
										<h2 className="heading">Assets lists</h2>
									</div>
									<div className="card-body text-center pt-0 pb-2 rm" style={{overflow: "auto"}}>
											<div className="row">
												<div className=" col-xl-12 col-sm-12">
													<div className="text-start" style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "10px", marginTop: "20px"}}>
														{pickerData.map((data, ind) => (
															<div
															className={data.datatitle == tradePair? "singleAssetActive": "singleAsset"}
															key={ind}
															onClick={() => {
															  setShowChart(true);
															  setTradePair(data.datatitle);
															}}
														  >
															<span className="mb-0 col-6 fs-14 asset-pair" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
															  <svg className="me-2" width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect width="14" height="14" rx="4" fill={data.fillcolor} />
															  </svg>
															  {data.datatitle}
															</span>
														  </div>
														  
														))}
													</div>
												</div>
											</div>
										</div>
								</div>
							</div>
							<div className="card col-xl-9" style={{  }}>
								<div className="card-header border-0 align-items-start flex-wrap pb-0">
									<h2 className="heading">Market Chart</h2>
									<Dropdown className="dropdown custom-dropdown">
										<Dropdown.Toggle as="div" className="btn sharp btn-primary tp-btn i-false">
											<svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M5.19995 10.001C5.19995 9.71197 5.14302 9.42576 5.03241 9.15872C4.9218 8.89169 4.75967 8.64905 4.55529 8.44467C4.35091 8.24029 4.10828 8.07816 3.84124 7.96755C3.5742 7.85694 3.28799 7.80001 2.99895 7.80001C2.70991 7.80001 2.4237 7.85694 2.15667 7.96755C1.88963 8.07816 1.64699 8.24029 1.44261 8.44467C1.23823 8.64905 1.0761 8.89169 0.965493 9.15872C0.854882 9.42576 0.797952 9.71197 0.797952 10.001C0.798085 10.5848 1.0301 11.1445 1.44296 11.5572C1.85582 11.9699 2.41571 12.2016 2.99945 12.2015C3.58319 12.2014 4.14297 11.9694 4.55565 11.5565C4.96832 11.1436 5.20008 10.5838 5.19995 10L5.19995 10.001ZM5.19995 3.00101C5.19995 2.71197 5.14302 2.42576 5.03241 2.15872C4.9218 1.89169 4.75967 1.64905 4.55529 1.44467C4.35091 1.24029 4.10828 1.07816 3.84124 0.967552C3.5742 0.856941 3.28799 0.800011 2.99895 0.800011C2.70991 0.800011 2.4237 0.856941 2.15667 0.967552C1.88963 1.07816 1.64699 1.24029 1.44261 1.44467C1.23823 1.64905 1.0761 1.89169 0.965493 2.15872C0.854883 2.42576 0.797953 2.71197 0.797953 3.00101C0.798085 3.58475 1.0301 4.14453 1.44296 4.55721C1.85582 4.96988 2.41571 5.20164 2.99945 5.20151C3.58319 5.20138 4.14297 4.96936 4.55565 4.5565C4.96832 4.14364 5.20008 3.58375 5.19995 3.00001L5.19995 3.00101ZM5.19995 17.001C5.19995 16.712 5.14302 16.4258 5.03241 16.1587C4.9218 15.8917 4.75967 15.6491 4.55529 15.4447C4.35091 15.2403 4.10828 15.0782 3.84124 14.9676C3.5742 14.8569 3.28799 14.8 2.99895 14.8C2.70991 14.8 2.4237 14.8569 2.15666 14.9676C1.88963 15.0782 1.64699 15.2403 1.44261 15.4447C1.23823 15.6491 1.0761 15.8917 0.965493 16.1587C0.854882 16.4258 0.797952 16.712 0.797952 17.001C0.798084 17.5848 1.0301 18.1445 1.44296 18.5572C1.85582 18.9699 2.41571 19.2016 2.99945 19.2015C3.58319 19.2014 4.14297 18.9694 4.55565 18.5565C4.96832 18.1436 5.20008 17.5838 5.19995 17L5.19995 17.001Z" fill="var(--primary)" />
											</svg>
										</Dropdown.Toggle>
										<Dropdown.Menu className="dropdown-menu dropdown-menu-end">
											{/* <Dropdown.Item className="dropdown-item" href="javascript:void(0);">Option 1</Dropdown.Item>
											<Dropdown.Item className="dropdown-item" href="javascript:void(0);">Option 2</Dropdown.Item>
											<Dropdown.Item className="dropdown-item" href="javascript:void(0);">Option 3</Dropdown.Item> */}
										</Dropdown.Menu>
									</Dropdown>
								</div>
								{
									showChart && (
										<MyChart tradePair={tradePair} />
									)
								}
								<div className="card-body">
									{/* <div id="tradingview_e8053" className="tranding-chart"></div> */}

								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3">
					<div className="row">
						<div className="col-xl-12 col-sm-6">
							<div className="card" style={{maxHeight: "250px",}}>
								<div className="card-header border-0 pb-0">
									<div>
										<h2 className="heading">Market Previews</h2>
									</div>
								</div>
								<div className="pt-0 px-0" style={{flex: 1, overflow: "auto" }}>
									{marketBlog.map((data, ind) => (
										<div className="previews-info-list" key={ind}>
											<div className="pre-icon">
												<span className={`icon-box icon-box-sm ${data.classBg}`}>
													{data.icon}
												</span>
												<div className="ms-2">
													<h6>{data.Name}/Year</h6>
													<span>January</span>
												</div>
											</div>
											<div className="count">
												<h6>120.45</h6>
												<span className={ind % 2 == 0 ? "text-success" : ""}>1,24%</span>
											</div>
										</div>
									))}
									{/* <TradingViewMarketOverview /> */}

								</div>
								{/* </div> */}
							</div>
						</div>
						<div className="col-xl-12 col-sm-6" style={{ height: "auto"}}>
							<div className="card h-auto">
								<div className="px-0">
									<Tab.Container defaultActiveKey="Navbuy">
										<div className="">
											<div className="buy-sell">
												<Nav className="nav nav-tabs" eventKey="nav-tab2" role="tablist" style={{padding: 0}}>
													<Nav.Link as="button" className="nav-link" eventKey="Navbuy" type="button">buy</Nav.Link>
													<Nav.Link as="button" className="nav-link" eventKey="Navsell" type="button">sell</Nav.Link>
												</Nav>
											</div>
											<Tab.Content  >
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
															<OrderForm />
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
															<OrderForm />
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
				</div>
			</div>
		</>
	)
}
export default Home;



