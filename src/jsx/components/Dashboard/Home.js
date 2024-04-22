import React, { useEffect, useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import BalanceCardSlider from './Dashboard/BalanceCardSlider';
import OrderForm from './Dashboard/OrderForm';
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from './SvgIcon';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MyChart } from '../myChart';
import { setUserAccount } from '../../../redux/features/account/accountSlice';
import { useGetUserAccountQuery } from '../../../redux/services/account';
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

const Home = ({theme}) => {
	const dispatch = useDispatch();
	const [tradePair, setTradePair] = useState("NEOBTC")
	const [showChart, setShowChart] = useState(true);
	const { userToken } = useSelector(state => state.auth);
	const {user_id} = useSelector(state => state.userAccount)
	const { data, isLoadingError } = useGetUserAccountQuery(userToken);
	
	useEffect(() => {		
		const fetchData = () => {
		  if (data && !isLoadingError) { // Check if data exists
			const { account_type, referral_balance, id, main_balance, bonus_balance } = data;
			dispatch(setUserAccount({ user_id, account_type, referral_balance, id, main_balance, bonus_balance }));
		  }
		};
	  
		fetchData();
	  
	  }, [data,dispatch, isLoadingError, user_id]);
	if(!isLoadingError)  
	return (
		<>
			<div className="row">
				<div className="col-9">
					<div className="row">
						<div className="col-xl-12">
							<BalanceCardSlider accountData={data}/>
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
												<Form.Control type="email" placeholder="Search pair" className="form-control-sm" />
													<div className="text-start" style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "10px", marginTop: "20px"}}>
														{pickerData.map((data, ind) => (
															<div
															// eslint-disable-next-line
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
									
								</div>
								{
									showChart && (
										<MyChart tradePair={tradePair} newTheme={theme}/>
									)
								}
								
							</div>
						</div>
					</div>
				</div>
				<div className="col-3">
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
													<span className={ind % 2 === 0 ? "text-success" : ""}>1,24%</span>
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
				</div>
			</div>
		</>
	)
}
export default Home;



