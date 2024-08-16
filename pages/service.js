import Breadcumb from "@/src/components/Breadcumb";
import LogoSlider from "@/src/components/LogoSlider";
import ProgressBar from "@/src/components/ProgressBar";
import Layout from "@/src/layout/Layout";
import Link from "next/link";
import { FiUser, FiBriefcase, FiBarChart, FiSmartphone } from "react-icons/fi";

// Updated data object using React Icons
const data = {
  services: [
    {
      id: 1,
      icon: <FiUser size={40} />,
      title: "Personal Banking",
      description: "Tailored solutions for your individual financial needs, including savings, checking, and personal loans.",
    },
    {
      id: 2,
      icon: <FiBriefcase size={40} />,
      title: "Business Banking",
      description: "Comprehensive services to support your business growth, from merchant services to commercial lending.",
    },
    {
      id: 3,
      icon: <FiBarChart size={40} />,
      title: "Investment Services",
      description: "Expert guidance and diverse investment options to help you build and manage your wealth.",
    },
    {
      id: 4,
      icon: <FiSmartphone size={40} />,
      title: "Digital Banking",
      description: "Secure and convenient online and mobile banking solutions for 24/7 account access.",
    },
  ],
  about: {
    title: "Trusted Financial Partner",
    subtitle: "For Over 50 Years",
    description: "We provide comprehensive financial solutions tailored to meet your unique needs. Our experienced team is dedicated to helping you achieve your financial goals.",
    features: [
      "Personalized financial advice",
      "Cutting-edge digital banking solutions",
    ],
    progressBars: [
      { value: 95, title: "Customer Satisfaction" },
      { value: 90, title: "Financial Advisory" },
    ],
  },
  cta: {
    title: "We Deliver Financial Solutions With The Goal Of",
    subtitle: "Building Trusting Relationships",
    description: "Our team of experts is ready to assist you with all your banking needs, ensuring a secure and prosperous financial future.",
    videoLink: "https://youtu.be/BS4TUd7FJSg",
  },
};

const Service = () => {
  return (
    <Layout>
      <Breadcumb pageName={"Our Services"} />

      <div className="service-area">
        <div className="container">
          <div className="row align-items-center mb-90">
            <div className="col-lg-7 col-md-8 pl-0">
              <div className="consen-section-title mobile-center">
                <h2>Comprehensive Banking Services</h2>
                <h2>
                  For Your <span>Financial Success</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-5 col-md-4">
              <div className="consen-button text-right">
                <Link legacyBehavior href="/service">
                  <a>
                    All Services <i className="bi bi-plus" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            {data.services.map((service) => (
              <div key={service.id} className="col-lg-3 col-sm-6 p-0">
                <div className="dreamit-service-box">
                  <div className="service-box-inner">
                    <div className="em-service-icon">{service.icon}</div>
                    <div className="em-service-title">
                      <h2>{service.title}</h2>
                    </div>
                    <div className="service-number">
                      <h1>{String(service.id).padStart(2, "0")}</h1>
                    </div>
                    <div className="em-service-text">
                      <p>{service.description}</p>
                    </div>
                    <div className="service-button">
                      <Link legacyBehavior href={`/service-details/${service.id}`}>
                        <a>
                          Learn More <i className="bi bi-plus" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-area style-three upper sr-page">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="dreamit-about-thumb mr-lg-4">
                <img src="https://images.unsplash.com/photo-1486983493968-6550b6afbe96?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{ width: '500px', borderRadius: '20px' }} alt="Banking Services" />
                <div className="about-shape-thumb1 bounce-animate2">
                  <img src="assets/images/about/about-shpe.png" alt="" />
                </div>
                <div className="about-shape-thumb3 bounce-animate4">
                  <img src="assets/images/about/about-shape4.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="consen-section-title">
                <h5>About Our Bank</h5>
                <h2>{data.about.title}</h2>
                <h2>
                  <span>{data.about.subtitle}</span>
                </h2>
                <p className="about-text1">{data.about.description}</p>
              </div>
              <div className="dreamit-icon-box">
                <div className="dreamit-icon-list">
                  <ul>
                    {data.about.features.map((feature, index) => (
                      <li key={index}>
                        <i className="bi bi-arrow-right-circle" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="progress-box">
                {data.about.progressBars.map((bar, index) => (
                  <div key={index} className={index > 0 ? "extra-progress" : ""}>
                    <ProgressBar value={bar.value} />
                    <div className="circle-progress-title">
                      <h4>{bar.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
              <div className="about-button">
                <Link legacyBehavior href="/about">
                  <a>
                    <i className="bi bi-gear" /> Learn More
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="call-do-action-section"
        style={{
          background: `url('https://images.pexels.com/photos/5990271/pexels-photo-5990271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="call-do-action-video text-center mb-35">
                <div className="video-icon-cda">
                  <a
                    className="video-vemo-icon venobox vbox-item"
                    data-vbtype="youtube"
                    data-autoplay="true"
                    href={data.cta.videoLink}
                  >
                    <i className="bi bi-play-circle-fill" />
                  </a>
                </div>
              </div>
              <div className="call-do-action-content text-center">
                <h2 className="text-white">
                  {data.cta.title}
                  <br />
                  <span className="sub-title">{data.cta.subtitle}</span>
                </h2>
                <p className="text-white">{data.cta.description}</p>
                <div className="btn-common btn-cda mt-40">
                  <Link legacyBehavior href="/contact">
                    <a>Contact Us</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-section srv-page">
        <div className="container">
          <div className="row">
            {/* <LogoSlider /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Service;
