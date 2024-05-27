import React from 'react';
import { Link } from 'react-router-dom';

// Images
import Icon9 from './../../assets/images/icons/icon9.svg';
import Icon10 from './../../assets/images/icons/icon10.svg';
import Icon11 from './../../assets/images/icons/icon11.svg';
import Icon12 from './../../assets/images/icons/icon12.svg';
import Icon13 from './../../assets/images/icons/icon13.svg';
import pic1 from './../../assets/images/about/pic1.jpg';
import support1 from './../../assets/images/icons/support1.png';

const cardData = [
    { image: Icon9, title: 'Data Insights', content: 'Access valuable data insights that empower your decision-making process.' },
    { image: Icon10, title: '24/7 Support', content: 'Our support team is available around the clock to assist you whenever needed.' },
    { image: Icon11, title: 'Seamless Onboarding', content: 'Experience a smooth onboarding process, getting you up and running effortlessly.' },
    { image: Icon12, title: 'Advanced Security', content: 'We implement top-tier security measures to safeguard your information.' },
    { image: Icon13, title: 'Efficiency Boost', content: 'Enjoy enhanced efficiency in your operations, ensuring smooth processes.' },
];



function OneStop() {
    return (
        <>
            {cardData.map((item, ind) => (
                <div className="col-xl-4 col-md-6 m-b60" key={ind}>
                    <div className="icon-bx-wraper style-3 text-center">
                        <div className="icon-media" style={{ backgroundColor: "#ACE1AF" }}>
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="icon-content">
                            <h4 className="title">{item.title}</h4>
                            <p className="m-b0">{item.content}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="col-xl-4 col-md-6 m-b60">
                <div className="icon-bx-wraper style-4" style={{ backgroundImage: `url(${pic1})` }}>
                    <div className="inner-content">
                        <div className="icon-media m-b30">
                            <img src={support1} alt="Support" />
                        </div>
                        <div className="icon-content">
                            <Link to={"/contact-us"} className="btn btn-primary">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OneStop;
