import Breadcumb from "@/src/components/Breadcumb";
import Counter from "@/src/components/Counter";
import Faqs from "@/src/components/Faqs";
import LogoSlider from "@/src/components/LogoSlider";
import Layout from "@/src/layout/Layout";
import { testimonial_list_slider } from "@/src/sliderProps";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";

const About = () => {
  const aboutBoxes = [
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Comprehensive banking solutions for your financial future",
      icon: "fas fa-angle-right"
    },
    {
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Leading financial institution in the heart of your community",
      icon: "fas fa-angle-right"
    }
  ];

  const features = [
    "Secure online and mobile banking",
    "Personalized financial advice",
    "Wide range of investment options"
  ];

  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww",
      name: "Sarah Johnson",
      role: "Small Business Owner",
      quote: "Apex Trust has been instrumental in helping my business grow. Their personalized service is unmatched."
    },
    {
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
      name: "Michael Chen",
      role: "Investor",
      quote: "The wealth management team at Apex Trust has helped me achieve my financial goals. I couldn't be happier with their expertise."
    },
    {
      image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww",
      name: "Emily Rodriguez",
      role: "Homeowner",
      quote: "Thanks to Apex Trust, I was able to secure a great mortgage rate. Their team guided me through every step of the process."
    }
  ];

  const teamMembers = [
    {
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
      name: "John Smith",
      role: "CEO",
      socials: [
        { icon: "bi bi-linkedin", link: "#" },
        { icon: "bi bi-twitter", link: "#" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fHww",
      name: "Emma Davis",
      role: "Chief Financial Officer",
      socials: [
        { icon: "bi bi-linkedin", link: "#" },
        { icon: "bi bi-twitter", link: "#" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww",
      name: "Robert Lee",
      role: "Head of Customer Relations",
      socials: [
        { icon: "bi bi-linkedin", link: "#" },
        { icon: "bi bi-twitter", link: "#" }
      ]
    }
  ];

  const faqItems = [
    {
      question: "What types of accounts does Apex Trust offer?",
      answer: "Apex Trust offers a wide range of accounts including savings, checking, money market, and certificates of deposit. Each account is designed to meet different financial needs and goals."
    },
    {
      question: "How can I apply for a loan with Apex Trust?",
      answer: "You can apply for a loan online through our secure portal, by phone, or by visiting one of our branch locations. Our loan officers are always available to guide you through the process and answer any questions."
    },
    {
      question: "What online banking services does Apex Trust provide?",
      answer: "Our online banking platform offers a range of services including account management, bill pay, fund transfers, mobile check deposit, and real-time alerts. We also provide a robust mobile app for banking on-the-go."
    }
  ];

  return (
    <Layout>
      <Breadcumb pageName={"About Apex Trust"} />
      
      {/* About Area */}
      <div className="abouts_areas">
        <div className="container">
          <div className="row">
            {aboutBoxes.map((box, index) => (
              <div key={index} className="col-lg-6 col-md-6">
                <div className="singles_abouts_boxs">
                  <div className="abouts_thumb">
                    <img src={box.image} alt="Banking Services" />
                    <div className="about-inner-content">
                      <div className="abouts_titles">
                        <h3>{box.title}</h3>
                        <div className="abouts_icons">
                          <a href="#">
                            <i className={box.icon} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Area */}
      <div className="feature-area style-two">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="consen-section-title">
                <h5>Features</h5>
                <h2>
                  Trusted by Over <span>2000+ Clients</span>
                </h2>
                <p className="about-text1">
                  At Apex Trust, we're committed to providing innovative financial solutions tailored to your needs.
                </p>
              </div>
              <div className="dreamit-icon-list">
                <ul>
                  {features.map((feature, index) => (
                    <li key={index}>
                      <i className="bi bi-check-circle" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              {/* Add relevant banking image or infographic here */}
              <img src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D" alt="Banking Features" style={{width: '100%', height: 'auto'}} />
            </div>
          </div>
        </div>
      </div>

      

    

      {/* FAQ Section */}
      <div className="faq-sectiions" style={{background: 'black'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="consen-section-title white pb-1 mb-1">
                <h5>FAQs</h5>
                <h2>Frequently Asked <span>Questions</span></h2>
                <p className="study-text1">
                  Find answers to common questions about our banking services and financial solutions.
                </p>
              </div>
              <div className="dreamit-icon-list">
                <ul>
                  <li>
                    <i className="bi bi-check-circle" />
                    <span>Secure and reliable banking</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle" />
                    <span>Innovative financial solutions</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle" />
                    <span>Dedicated customer support</span>
                  </li>
                </ul>
              </div>
              <div className="why-choose-button">
                <Link legacyBehavior href="/contact">
                  <a>
                    <i className="bi bi-telephone" /> Contact Us
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 pl-0">
              <div className="tab_container pl-30 pt-20">
                <Faqs faqItems={faqItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;