/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { FaUserShield, FaSearchDollar, FaWallet, FaShieldAlt, FaHandshake, FaKey } from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    title: "Account Recovery",
    description: "Expert assistance in recovering access to your compromised or inaccessible digital accounts.",
    Icon: FaUserShield,
    delay: 800,
  },
  {
    id: 2,
    title: "Asset Investigation",
    description: "Thorough investigations to track and recover digital assets lost due to unforeseen circumstances.",
    Icon: FaSearchDollar,
    delay: 1000,
  },
  {
    id: 3,
    title: "Wallet Restoration",
    description: "Comprehensive services to restore access to your digital asset wallets.",
    Icon: FaWallet,
    delay: 1200,
  },
  {
    id: 4,
    title: "Security Consulting",
    description: "Proactive strategies to enhance the security of your valuable digital assets.",
    Icon: FaShieldAlt,
    delay: 800,
  },
  {
    id: 5,
    title: "Transaction Dispute Resolution",
    description: "Expert mediation and resolution services for disputed digital transactions.",
    Icon: FaHandshake,
    delay: 1000,
  },
  {
    id: 6,
    title: "Key Recovery",
    description: "Specialized techniques to recover lost or forgotten access keys for your digital assets.",
    Icon: FaKey,
    delay: 1200,
  },
];

const Services = () => {
  return (
    <section className="service padding-top padding-bottom bg-color-7">
      <div className="container">
        <div className="section-header section-header--max50 text-center">
          <h2 className="mb-15 mt-minus-5"><span className="style2">Services </span>We Offer</h2>
          <p>Discover our premium services designed to help you recover and secure your valuable digital assets.</p>
        </div>
        <div className="service__wrapper">
          <div className="row g-4 align-items-center">
            {servicesData.map((service) => (
              <div className="col-sm-6 col-md-6 col-lg-4" key={service.id}>
                <div className="service__item service__item--style2" data-aos="fade-up" data-aos-duration={service.delay}>
                  <div className="service__item-inner text-center">
                    <div className="service__item-thumb mb-30">
                      <div className="service__thumb-inner">
                        <service.Icon size={48} className="dark" color='#00D094'/>
                      </div>
                    </div>
                    <div className="service__content">
                      <h5 className="mb-15">
                        <Link className="stretched-link" href="#">{service.title}</Link>
                      </h5>
                      <p className="mb-0">{service.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services;