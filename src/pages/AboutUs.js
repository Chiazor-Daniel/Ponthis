import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalVideo from 'react-modal-video'

import PageLayout from './../layouts/PageLayout';
import PriceBlog from './../components/About/PriceBlog';
import RecentNews from './../components/Home/RecentNews';

//Images
import Shape1 from './../assets/images/home-banner/shape2.png';
import Shape3 from './../assets/images/home-banner/shape4.png';

import about2 from './../assets/images/about/about-2.jpg';
import about3 from './../assets/images/about/about-3.jpg';
import about4 from './../assets/images/about/about-4.jpg';
import about1 from './../assets/images/about/about-1.jpg';

import videobox from './../assets/images/about/videobx.png';

import bloglg from './../assets/images/blog/blog-ig.png';
import avatar3 from './../assets/images/avatar/avatar3.jpg';

const ImageBox = ({ image, changeClass }) => {
    return (

        <div className="col-6">
            <div className={`image-box ${changeClass}`}>
                <img src={image} alt="" />
            </div>
        </div>

    )
}

function AboutUs() {
    const nav = useNavigate();
    const formDetails = (e) => {
        e.preventDefault();
        nav("/contact-us");
    };
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <div className="page-content">
                <PageLayout pageTitle="About Us" />
                <section className="content-inner about-sec bg-primary-light">
                    <div className="container">
                        <div className="row about-bx2 style-1 align-items-center">
                            <div className="col-lg-6">
                                <div className="dz-media">
                                    <div className="row align-items-end">
                                        <ImageBox image={about4} changeClass="image-box-1" />
                                        <ImageBox image={about2} changeClass="image-box-2" />
                                    </div>
                                    <div className="row">
                                        <ImageBox image={about3} changeClass="image-box-3" />
                                        <ImageBox image={about1} changeClass="image-box-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 about-content ps-lg-5 m-b30">
                                <div className="section-head">
                                    <h2 className="title">Unlock the future of innovation with the world's leading ICO platform, offering exciting rewards and opportunities</h2>
                                    <p className="m-0 lh-base"></p>
                                </div>
                                <Link to={"/contact-us"} className="btn btn-lg btn-primary btn-shadow text-uppercase">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                    <img className="bg-shape1" src={Shape1} alt="" />
                    <img className="bg-shape2" src={Shape3} alt="" />
                    <img className="bg-shape3" src={Shape3} alt="" />
                    <img className="bg-shape4" src={Shape3} alt="" />
                </section>
                <section className="content-inner about-sec bg-primary-light">
                    <div className="container">
                        <div className="row about-bx2 style-1 align-items-center">
                            <div className="col-lg-6 about-content ps-lg-5 m-b30">
                                <div className="section-head">
                                    <h2 className="title">Revolutionizing the ICO Landscape</h2>
                                    <p className="m-0 lh-base">Welcome to our innovative platform, dedicated to empowering you to achieve your financial goals. Our commitment is to provide you with unparalleled support and opportunities in the rapidly evolving world of ICOs.</p>
                                </div>

                            </div>
                            <div className="col-lg-6">
                                <img src='https://images.pexels.com/photos/5831706/pexels-photo-5831706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' style={{borderRadius: "20px"}}/>
                            </div>
                        </div>
                    </div>
                    <img className="bg-shape1" src={Shape1} alt="" />
                    <img className="bg-shape2" src={Shape3} alt="" />
                    <img className="bg-shape3" src={Shape3} alt="" />
                    <img className="bg-shape4" src={Shape3} alt="" />
                </section>
                <section className="content-inner about-sec bg-primary-light">
                    <div className="container">
                        <div className="row about-bx2 style-1 align-items-center">
                            <div className="col-lg-6">
                                <img src='https://images.pexels.com/photos/6801872/pexels-photo-6801872.jpeg?auto=compress&cs=tinysrgb&w=600' style={{borderRadius: "20px"}}/>
                            </div>
                            <div className="col-lg-6 about-content ps-lg-5 m-b30">
                            <div className="section-head">
    <h2 className="title">
Transform your future with innovative rewards and AI-driven trading solutions.</h2>
    <p className="m-0 lh-base">
Embark on a transformative journey with our cutting-edge platform. We're dedicated to enriching your path to success by offering unique rewards that reflect your commitment and ambition. Join us as we revolutionize the landscape of opportunities.</p>
</div>


                            </div>
                        </div>
                    </div>
                    <img className="bg-shape1" src={Shape1} alt="" />
                    <img className="bg-shape2" src={Shape3} alt="" />
                    <img className="bg-shape3" src={Shape3} alt="" />
                    <img className="bg-shape4" src={Shape3} alt="" />
                </section>
                <section className="content-inner p-0 bg-primary-light video-bx-wrapper">
                    <img className="bg-shape1" src={Shape1} alt="" />
                    <div className="container wow fadeInUp" data-wow-delay="0.4s">
                        <div className="video-bx style-1">
                            <div className="video-media">
                                <img src={videobox} alt="" />
                                <Link to={"#"} className="popup-youtube play-icon" onClick={() => setOpen(true)}>
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.25 3.75L23.75 15L6.25 26.25V3.75Z" stroke="#A5DD9B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content-inner bg-white blog-wrapper">
                    <img className="bg-shape1" src={Shape1} alt="" />
                    <div className="container">
                        {/* <div className="row">
							<div className="col-xl-7 col-lg-12">
								<div className="section-head " >
									<h6 className="sub-title text-primary">FROM OUR BLOG</h6>
									<h2 className="title">Recent News &amp; Updates</h2>
								</div>
								<RecentNews />
							</div>
							<div className="col-xl-5 col-lg-12 m-b30 " >
								<div className="dz-card style-2" style={{backgroundImage: "url("+ bloglg +")"}}>
									<div className="dz-category">
										<ul className="dz-badge-list">
											<li><Link to={"#"} className="dz-badge">14 Fan 2022</Link></li>
										</ul>
									</div>
									<div className="dz-info">
										<h2 className="dz-title"><Link to={"/blog-details"} className="text-white">Directly support individuals Crypto</Link></h2>
										<div className="dz-meta">
											<ul>
												<li className="post-author">
													<Link to={"#"}>
														<img src={avatar3} alt=""  className="me-2"/>
														<span>By Noare</span>
													</Link>
												</li>
												<li className="post-date"><Link to={"#"}> 12 May 2022</Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div> */}
                    </div>
                </section>
            </div>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="cfmQFW1DpA0" onClose={() => setOpen(false)} />
        </>
    )
}
export default AboutUs;