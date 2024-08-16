/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import ScrollToTop from "react-scroll-to-top";

const Footer = () => {
  return (
    <>
      <footer className="footer brand-1">
        <div className="container">
          <div className="footer__wrapper">
            <div className="footer__top footer__top--style2">
              <div className="row gy-5 gx-4">
                <div className="col-lg-6 col-md-5">
                  <div className="footer__about">
                  <Link href="/" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                <img src="logo2.png"  style={{width: '100px'}}/>

                <p style={{fontSize: '1.4rem', fontWeight: 'bold'}}>LEDGER SAFE AI</p>
                </Link>
                    <p className="footer__about-moto">
                      Welcome to LedgerSafeAI! We offer advanced digital asset management and recovery services. Explore our platform to secure your digital future.
                    </p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-4 col-6">
                  <div className="footer__links">
                    <div className="footer__links-tittle">
                      <h6>Quick links</h6>
                    </div>
                    <div className="footer__links-content">
                      <ul className="footer__linklist">
                        <li className="footer__linklist-item">
                          <Link href="/about">About Us</Link>
                        </li>
                        <li className="footer__linklist-item">
                          {/* <Link href="/team">Our Team</Link> */}
                        </li>
                        <li className="footer__linklist-item">
                          <Link href="/services">Services</Link>
                        </li>
                        <li className="footer__linklist-item">
                          <Link href="/features">Features</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <div className="footer__links">
                    <div className="footer__links-tittle">
                      <h6>Support</h6>
                    </div>
                    <div className="footer__links-content">
                      <ul className="footer__linklist">
                        <li className="footer__linklist-item">
                          <Link href="/terms-and-conditions">
                            Terms & Conditions
                          </Link>
                        </li>
                        <li className="footer__linklist-item">
                          <Link href="/terms-and-conditions">
                            Privacy Policy
                          </Link>
                        </li>
                        <li className="footer__linklist-item">
                          <Link href="/faq">
                            FAQs
                          </Link>
                        </li>
                        <li className="footer__linklist-item">
                          <Link href="/contact">
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer__bottom">
              <div className="footer__end justify-content-center">
                <div className="footer__end-copyright">
                  <p className="mb-0">
                    © 2024 LedgerSafe. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__shape">
          <span className="footer__shape-item footer__shape-item--3">
            <img src="/images/footer/1.png" alt="shape icon" />
          </span>
        </div>
      </footer>
      <ScrollToTop
        smooth
        height="16px"
        width="14px"
        className={"scrollToTop scrollToTop--home1"}
        viewBox="0 0 448 512"
        svgPath="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"
      />
    </>
  );
};

export default Footer;
