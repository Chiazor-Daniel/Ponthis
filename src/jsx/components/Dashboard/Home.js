/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import BalanceCardSlider from './Dashboard/BalanceCardSlider';
import OrderForm from './Dashboard/OrderForm';
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from './SvgIcon';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useOpenTradeMutation } from '../../../redux/services/trades';
import { MyChart } from '../myChart';
import swal from 'sweetalert';
import ReactDOMServer from 'react-dom/server';
import { useGetAllAssetsQuery } from '../../../redux/services/trades';
import { setUserAccount } from '../../../redux/features/account/accountSlice';
import { useGetUserAccountQuery } from '../../../redux/services/account';
import { RiTokenSwapFill } from "react-icons/ri";
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

const Home = ({ theme }) => {
	const dispatch = useDispatch();
	const [tradePair, setTradePair] = useState("NEOBTC")
	const [showChart, setShowChart] = useState(true);
	const { userToken, userInfo } = useSelector(state => state.auth);
	const { user_id } = useSelector(state => state.userAccount)
	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};
	const { data, isLoadingError } = useGetUserAccountQuery(userToken);
	const { data: allAssets = [], error, isLoading } = useGetAllAssetsQuery(userToken);

	useEffect(() => {
		console.log(userInfo)
		const fetchData = () => {
			if (data && !isLoadingError) { // Check if data exists
				const { account_type, referral_balance, id, main_balance, bonus_balance } = data;
				dispatch(setUserAccount({ user_id, account_type, referral_balance, id, main_balance, bonus_balance }));
			}
		};

		fetchData();

	}, [data, dispatch, isLoadingError, user_id, userInfo]);
	const [price, setPrice] = useState('');
	const [amount, setAmount] = useState('232');
	const [total, setTotal] = useState('');
	const [orderType, setOrderType] = useState("market");
	const [activeTab, setActiveTab] = useState("buy");
	const [openTradeMutation] = useOpenTradeMutation();
	const handleClick = (pair) => {
		setTradePair(pair);
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
	if (!isLoadingError)
		return (
			<>
				<div className="row">
					<div className="col-9">
						<div className="row">
							<div className="col-xl-12">
								<BalanceCardSlider accountData={data} />
							</div>
							<div className="col-xl-12 row rm" style={{ height: "560px" }}>
								<div className="col-xl-3 assets-al col-lg-12" style={{ height: "100%" }}>
									<div className="card" >
										<div className="card-header border-0 pb-0">
											<h2 className="heading">Assets lists</h2>
										</div>
										<div className="card-body text-center pt-0 pb-2 rm" style={{ overflow: "auto" }}>
											<div className="text-start" style={{ display: "flex", flexDirection: "column", justifyContent: "", gap: "10px" }}>
												{allAssets.map((asset, index) => (
													<div className="previews-info-list" onClick={() => setTradePair(asset.asset_pair)} key={index} style={{ position: "relative", cursor: "pointer" }}> {/* Add onClick handler */}
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
								<div className="card col-xl-9" style={{}}>
									<div className="card-header border-0 align-items-start flex-wrap pb-0">
										<h2 className="heading">Market Chart</h2>

									</div>
									{
										showChart && (
											<MyChart tradePair={tradePair} newTheme={theme} />
										)
									}

								</div>
							</div>
						</div>
					</div>
					<div className="col-3">
						<div className="row">
							<div className="col-xl-12 col-sm-6">
								<div className="card" style={{ maxHeight: "250px", }}>
									<div className="card-header border-0 pb-0">
										<div>
											<h2 className="heading">Market Previews</h2>
										</div>
									</div>
									<div className="pt-0 px-0" style={{ flex: 1, overflow: "auto" }}>
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
							<div className="col-xl-12 col-sm-6" style={{ height: "auto" }}>
								<div className="card h-auto">
									<div className="px-0">
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
					</div>
				</div>
			</>
		)
}
export default Home;



