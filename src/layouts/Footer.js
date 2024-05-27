import React from 'react';
import { Link } from 'react-router-dom';

// Images
import shape1 from './../assets/images/home-banner/shape1.png';
import bgimage from './../assets/images/background/bg1.jpg';
import logowhite from './../assets/atlas.png';
import flags from './../assets/images/footer/world-map-with-flags1.png';

function Footer() {
    return (
        <>
            <footer className="site-footer style-1" id="footer" style={{ color: "white", position: "relative" }}>
                <img className="bg-shape1" src={shape1} alt="" />
                <div className="footer-top" style={{ backgroundImage: "url(https://images.pexels.com/photos/6770611/pexels-photo-6770611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="widget widget_about">
                                    <div className="footer-logo logo-white">
                                        <Link to={"/"}><img src={logowhite} alt="" style={{ height: "150px", width: "200px" }} /></Link>
                                    </div>
                                    <p>
Atlas Wavers stands at the forefront of innovation, harnessing cutting-edge AI technology to revolutionize the way you approach your financial goals. Powered by advanced artificial intelligence algorithms, our platform offers unparalleled insights and analysis, empowering you to make informed decisions with precision and speed.</p>
                                    
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6">
                                <div className="widget widget_services">
                                    <h4 className="widget-title">Quick Links</h4>
                                    <ul>
                                        <li><Link to={"/about-us"}>About Us</Link></li>
                                        <li><Link to={"/contact-us"}>Contact Us</Link></li>
                                        <li><Link to={"/"}>Terms of Service</Link></li>
                                        <li><Link to={"/"}>Privacy Policy</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-6">
                               
                            </div>
                            <div className="col-xl-3 col-lg-4 col-sm-12">
                                <div className="widget widget_locations">
                                    <h4 className="widget-title">Our Locations</h4>
                                    <div className="clearfix">
    <h6 className="title">London</h6>
    <p>123 Oxford Street, London, W1D 1BT, United Kingdom</p>
    <img src={flags} alt="" />
</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-center">
                    <div className="container">
                        <span className="copyright-text">© 2024 Atlas Wavers. All rights reserved.</span>
                    </div>
                </div>
                <div className="footer-disclaimer">
                    <div className="container">
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
