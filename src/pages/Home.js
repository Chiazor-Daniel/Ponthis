import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

//components
import BannerCard from './../components/Home/BannerCard';
import OneStop from './../components/Home/OneStop';
import RecentNews from './../components/Home/RecentNews';

//images
import baner1 from './../assets/images/home-banner/img1.png';
import baner2 from './../assets/mybtc.png';
import Shape1 from './../assets/images/home-banner/shape2.png';
import Shape3 from './../assets/images/home-banner/shape4.png';
import wallet from './../assets/images/icons/wallet.svg';
import friend from './../assets/images/icons/friend.svg';

import coin1 from './../assets/images/coins/coin1.png';
import coin3 from './../assets/images/coins/coin3.png';
import coin4 from './../assets/images/coins/coin4.png';

import bloglg from './../assets/images/blog/blog-ig.png';
import avatar3 from './../assets/images/avatar/avatar3.jpg';
import { useEffect } from 'react';
import axios from 'axios';
const trustBlog = [
	{
		image: wallet,
		title: 'Risk Mitigation',
		text: 'Robust security protocols mitigate the potential for financial losses, operational disturbances, and reputational harm resulting from data breaches, cyberattacks, and other security incidents.',
	},
	{
		image: friend,
		title: 'Expert Consultancy',
		text: 'Tap into the expertise of our consultants for personalized financial guidance. Our team provides tailored advice on investment strategies, financial planning, and more, ensuring your financial success.',
	},
];

function Home() {
	const nav = useNavigate();
	const formDetails = (e) => {
		e.preventDefault();
		nav("/contact-us");
	};
	const [selecttext, setSelectText] = useState([coin4, 'Bitcoin']);
	const [btc, setBtc] = useState(null)

	useEffect(()=>{
		const fetchBtc = async() => {
			axios.get("https://crypto-price-by-api-ninjas.p.rapidapi.com/v1/cryptoprice", {
				params: {symbol: 'BTCUSD'},
				headers: {
					'X-RapidAPI-Key': '7860e96119mshe5fcc7bb91bfb89p1cc964jsn415fb06ad16c',
					'X-RapidAPI-Host': 'crypto-price-by-api-ninjas.p.rapidapi.com'
				}
			})
			.then(res=>{ console.log(res.data); setBtc(res.data)}).catch(err=>console.log(err))
		}
		fetchBtc()
	}, [])
	return (
		<>
			<div className="page-content">
				<div className="main-bnr style-1">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-12 text-center">
								<h1 className="">
									Transform your global OTC desk with <span style={{ color: "#ACE1AF" }}>
										state of the art </span>
									<span style={{
										backgroundImage: "linear-gradient(45deg, orange, purple)",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
										textShadow: "0 0 10px rgba(255, 165, 0, 0.5), 0 0 20px rgba(255, 165, 0, 0.5), 0 0 30px rgba(255, 165, 0, 0.5), 0 0 40px rgba(128, 0, 128, 0.5)"
									}}>
										AI
									</span> trading.
								</h1>
								<p className="text" style={{ color: "white" }}>
									Start today to explore exceptional AI trading!
								</p>


								<Link to={"http://trader.atlaswavestrader.com/"} className="btn space-lg btn-primary" >Get Started</Link>
								<ul className="image-before">
									<li className="left-img"><img src={baner2} alt="" /></li>
									<li className="right-img"><img src={baner2} alt="" /></li>
								</ul>
							</div>
						</div>
					</div>
					<img className="bg-shape1" src={Shape1} alt="" />
					<img className="bg-shape2" src={Shape1} alt="" />
					<img className="bg-shape3" src={Shape3} alt="" />
					<img className="bg-shape4" src={Shape3} alt="" />
				</div>
				<div className="clearfix bg-primary-light">
					<div className="container">
						<div className="currancy-wrapper">
							<div className="row justify-content-center col-12">
								<BannerCard btc={btc}/>
							</div>
						</div>
					</div>
				</div>
				<section className="clearfix section-wrapper1 bg-primary-light">
					<div className="container">
						<div className="content-inner-1">
							<div className="section-head text-center">
								<h2 className="title">Why Choose Us?</h2>
								<p>Experience the difference. Join our satisfied customers and discover the reliability and innovation at the core of our platform.</p>
							</div>

							<div className="row">
								{trustBlog.map((data, ind) => (
									<div className="col-lg-6 m-b30" key={ind}>
										<div className="icon-bx-wraper style-1">
											<div className="icon-media">
												<img src={data.image} alt="" />
											</div>
											<div className="icon-content">
												<h4 className="title">{data.title}</h4>
												<p>{data?.text}</p>
												<Link className="btn btn-primary" to={"/about-us"}>Read More</Link>
											</div>
										</div>
									</div>
								))}

							</div>
						</div>
					</div>
					<div className="container">

					</div>
					<img className="bg-shape1" src={Shape1} alt="" />
				</section>
				<section className="content-inner bg-light icon-section section-wrapper2">
					<div className="container">
						<div className="section-head text-center">
						<h2 className="title">Our AI-powered platform is revolutionizing trading by seamlessly capitalizing on market dynamics and optimizing deals.</h2>
						<p className="text">Experience unmatched convenience in AI trading. Our platform seamlessly executes trades, optimizing transactions with cutting-edge algorithms. With a user-friendly interface and secure processes, we ensure a hassle-free trading experience.</p>
						</div>
						<div className="row sp60">
							<OneStop />
						</div>
					</div>
					<img className="bg-shape1" src={Shape1} alt="" />
				</section>
				<section className="content-inner bg-white blog-wrapper">
					<img className="bg-shape1" src={Shape1} alt="" />

					<div className="container">

					</div>
				</section>
			</div>
		</>
	)
}
export default Home;