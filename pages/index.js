import Counter from "@/src/components/Counter";
import Faqs from "@/src/components/Faqs";
import ProgressBar from "@/src/components/ProgressBar";
import Layout from "@/src/layout/Layout";
import { testimonial_list_slider } from "@/src/sliderProps";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
const CaseStudies = dynamic(
  () => import("@/src/components/isotope/CaseStudies"),
  {
    ssr: false,
  }
);
const Landing1 = () => {
  const features = [
    {
      imgSrc: "assets/images/resource/main1.png",
      title: "Financial Planning",
      description: "Comprehensive financial planning services to help you achieve your financial goals with ease and confidence.",
      backTitle: "Planning",
      backSubtitle: "Tailored Financial Plans",
    },
    {
      imgSrc: "assets/images/resource/main3.png",
      title: "Online Banking",
      description: "Secure and convenient online banking solutions to manage your finances from anywhere, at any time.",
      backTitle: "Solutions",
      backSubtitle: "Digital Banking",
    },
    {
      imgSrc: "assets/images/resource/main2.png",
      title: "Customer Support",
      description: "Dedicated customer support to assist you with all your banking needs, ensuring a seamless banking experience.",
      backTitle: "Support",
      backSubtitle: "24/7 Assistance",
    },
  ];

  const aboutData = {
    imageSrc: "https://images.pexels.com/photos/12911176/pexels-photo-12911176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    shapes: [
      "assets/images/about/about-shpe.png",
      "assets/images/about/about-shape4.png"
    ],
    title: "About POga",
    subtitle1: "We Are Leading Innovators",
    subtitle2: "Empowering 2000+ Financial Institutions",
    description: "Leading the way in financial solutions with innovative banking services and cutting-edge technology. Our commitment to excellence drives us to deliver unparalleled service and results.",
    iconList: [
      "Deliver secure and reliable banking solutions",
      "Innovate with advanced financial technology"
    ],
    progress: [
      { value: 90, label: "Customer Satisfaction" },
      { value: 88, label: "Compliance and Security" }
    ],
    buttonText: "Learn More About Us",
    buttonLink: "/about"
  };
  const serviceData = {
    title: "What We Do?",
    subtitle1: "We Offer Comprehensive Banking Services",
    subtitle2: "From <span> Secure Transactions </span>",
    services: [
      {
        iconSrc: "assets/images/resource/service-icon8.png",
        title: "Account Management",
        description: "Manage your accounts efficiently with our user-friendly online banking system.",
        link: "/service-details"
      },
      {
        iconSrc: "assets/images/resource/service-icon5.png",
        title: "Loan Services",
        description: "Get personalized loan solutions tailored to your financial needs.",
        link: "/service-details"
      },
      {
        iconSrc: "assets/images/resource/service-icon6.png",
        title: "Investment Advice",
        description: "Receive expert advice on investment strategies and grow your wealth.",
        link: "/service-details"
      },
      {
        iconSrc: "assets/images/resource/service-icon7.png",
        title: "Customer Support",
        description: "Our dedicated support team is here to assist you with any banking inquiries.",
        link: "/service-details"
      }
    ],
    bottomText: "Explore our range of banking services and solutions. <Link href='/service'><a>Find out more</a></Link>",
    shapes: [
      "assets/images/resource/all-shape3.png",
      "assets/images/resource/all-shape6.png"
    ]
  };

  const whyChooseUsData = {
    title: "Why Choose Us?",
    subtitle1: "The Fastest Way To Achieve",
    subtitle2: "Banking <span> Excellence </span>",
    description: "Experience streamlined banking services with cutting-edge technology and personalized support. Our commitment is to offer you the best banking solutions.",
    features: [
      {
        icon: "bi bi-arrow-right-circle",
        text: "Seamless Account Management"
      },
      {
        icon: "bi bi-arrow-right-circle",
        text: "Tailored Financial Solutions"
      },
      {
        icon: "bi bi-arrow-right-circle",
        text: "24/7 Customer Support"
      },
      {
        icon: "bi bi-arrow-right-circle",
        text: "Secure Online Transactions"
      }
    ],
    button: {
      text: "More About Us",
      link: "/about"
    },
    images: [
      "https://images.pexels.com/photos/5668878/pexels-photo-5668878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "assets/images/resource/all-shape2.png",
      "assets/images/resource/case-shape.png",
      "assets/images/resource/case-shape2.png",
      "assets/images/about/about-shape4.png"
    ]
  };
  const processData = {
    title: "Our Process",
    subtitle1: "We follow some easy steps to",
    subtitle2: "deliver <span> Banking Solutions </span>",
    description: "Our process is designed to ensure a smooth and efficient experience for our clients. From initial consultation to ongoing support, we follow a structured approach to meet your banking needs.",

    images: [
      "assets/images/resource/all-shape3.png",
      "assets/images/resource/all-shape6.png"
    ]
  };
  const processExtraData = {
    title: "Account Creation Process",
    steps: [
      {
        icon: "assets/images/resource/a.png",
        title: "Fill Out Application",
        description: "Start by completing the online application form with your personal and financial details."
      },
      {
        icon: "assets/images/resource/b.png",
        title: "Verify Identity",
        description: "Submit required identification documents for verification to ensure security and compliance."
      },
      {
        icon: "assets/images/resource/c.png",
        title: "Account Activation",
        description: "Once verified, you will receive a confirmation and activation link to finalize your account setup."
      }
    ],
    shapeImage: "assets/images/resource/all-shape2.png"
  };


  return (
    <Layout header={1}>
      <div className="slider-area slider2 d-flex align-items-center" id="home" style={{ position: 'relative' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="row " >
                <div className="col-6">
                  <div className="slider-content">
                    <h1> Welcome to </h1>
                    <h1>
                      {" "}
                       <span > Apex Trust</span>{" "}
                    </h1>
                    <p>
                      Experience seamless and secure banking with Apex. Our innovative solutions are designed to help you manage your finances effortlessly.
                    </p>
                  </div>
                  <div className="slider-button mt-5">
                    <Link legacyBehavior href="http://dashboard.apextrustcapital.com">
                      <a>
                        {" "}
                        <i className="bi bi-gear" />  Get Started{" "}
                      </a>
                    </Link>
                  </div>

                </div>
              </div>
            </div>

            {/* slider shape */}
            <div className="slider-shape">
              <div className="slider-shape-thumb2">
                <img src="assets/images/slider/shape2.png" alt="" />
              </div>
              <div className="slider-shape-thumb4">
                <img src="assets/images/slider/shape3.png" alt="" />
              </div>
              <div className="slider-shape-thumb5 dance">
                <img src="assets/images/slider/circle1.png" alt="" />
              </div>
              <div className="slider-shape-thumb6 bounce-animate">
                <img src="assets/images/slider/circle2.png" alt="" />
              </div>
              <div className="slider-shape-thumb7 bounce-animate2">
                <img src="assets/images/slider/circle3.png" alt="" />
              </div>
              <div className="slider-shape-thumb8 bounce-animate3">
                <img src="assets/images/slider/white-dot.png" alt="" />
              </div>
              <div className="slider-shape-thumb9 ">
                <img src="assets/images/slider/line.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* <img src="https://wbstatic.webullfintech.com/v1/webull-au-g/assets/58740b5e71f3fdfce1ed9e8ef93f37ad.png" alt="" style={{width: '600px'}}/> */}
        <div className="col-6 d-flex justify-items-center" style={{ background: 'black', position: 'absolute', width: '100%', height: '100%', right: 0, clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)' }}>
          <video
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              objectFit: 'cover',
              zIndex: '-2' // Place the video behind the overlay
            }}
          >
            <source src="play.mp4" type="video/mp4" />
          </video>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: '0',
              left: '0',
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent black color for the dim effect
              zIndex: '-1' // Place the overlay behind any other content in the parent div
            }}
          />
        </div>

      </div>
      {/*==================================================*/}
      {/* Start consen feature Area */}
      {/*==================================================*/}
      <div className="feature-area">
        <div className="container">
          <div className="row feature-bg">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="single-feature-box">
                  <div className="feature-box-inner">
                    <div className="feature-icon1">
                      <img src={feature.imgSrc} alt={feature.title} />
                    </div>
                    <div className="feature-title">
                      <h3>{feature.title}</h3>
                    </div>
                    <div className="feature-text">
                      <p>{feature.description}</p>
                    </div>
                    <div className="feature-bar" />
                  </div>
                  {/* feature back */}
                  <div className="consen-feature-back">
                    <div className="feature-back-title">
                      <h3>{feature.backTitle}</h3>
                      <h2>{feature.backSubtitle}</h2>
                    </div>
                    <div className="feature-back-icon">
                      <a href="#">+</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* feature shape */}
            <div className="feature-shape bounce-animate2">
              <img src="assets/images/resource/all-shape4.png" alt="Decorative Shape" />
            </div>
          </div>
        </div>
      </div>
      <div className="about-area style-three" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="dreamit-about-thumb mr-lg-4">
                <img src={aboutData.imageSrc} alt="About POga" style={{ transform: 'skew(5deg, -12deg)', borderRadius: '20px', height: '700px', marginLeft: '50px' }} />
                {/* about-shape */}
                {aboutData.shapes.map((shape, index) => (
                  <div key={index} className={`about-shape-thumb${index + 1} bounce-animate${index + 2}`}>
                    <img src={shape} alt={`Shape ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="consen-section-title">
                <h5>{aboutData.title}</h5>
                <h2>{aboutData.subtitle1}</h2>
                <h2>
                  {aboutData.subtitle2}
                </h2>
                <p className="about-text1">
                  {aboutData.description}
                </p>
              </div>
              <div className="dreamit-icon-box">
                <div className="dreamit-icon-list">
                  <ul>
                    {aboutData.iconList.map((item, index) => (
                      <li key={index}>
                        <i className="bi bi-arrow-right-circle" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* progress bar */}
              <div className="progress-box">
                {aboutData.progress.map((item, index) => (
                  <div key={index} className={`circle-progress${index + 1}`}>
                    <ProgressBar value={item.value} />
                    <div className="circle-progress-title">
                      <h4>{item.label}</h4>
                    </div>
                  </div>
                ))}
              </div>
              <div className="about-button">
                <Link legacyBehavior href={aboutData.buttonLink}>
                  <a>
                    <i className="bi bi-gear" /> {aboutData.buttonText}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-area style-three" id="service">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-6">
              <div className="consen-section-title white pb-50 mb-1">
                <h5>{serviceData.title}</h5>
                <h2>{serviceData.subtitle1}</h2>
                <h2 dangerouslySetInnerHTML={{ __html: serviceData.subtitle2 }} />
              </div>
            </div>
          </div>
          <div className="row">
            {serviceData.services.map((service, index) => (
              <div key={index} className="col-lg-3 col-sm-6 pl-1">
                <div className="dreamit-service-box">
                  <div className="service-box-inner">
                    <div className="em-service-icon1">
                      <img src={service.iconSrc} alt={service.title} />
                    </div>
                    <div className="em-service-title">
                      <h3>{service.title}</h3>
                    </div>
                    <div className="service-bar" />
                    <div className="em-service-text">
                      <p>{service.description}</p>
                    </div>
                    <div className="service-button">
                      <Link legacyBehavior href={service.link}>
                        <a>
                          Read More <i className="bi bi-plus" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-lg-12">
              <div className="service-bottom-text">
                <p dangerouslySetInnerHTML={{ __html: serviceData.bottomText }} />
              </div>
            </div>
            {serviceData.shapes.map((shape, index) => (
              <div key={index} className={`service-shape${index === 1 ? '1 bounce-animate2' : ''}`}>
                <img src={shape} alt={`Shape ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="why-choose-us-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="consen-section-title">
                <h5>{whyChooseUsData.title}</h5>
                <h2>{whyChooseUsData.subtitle1}</h2>
                <h2 dangerouslySetInnerHTML={{ __html: whyChooseUsData.subtitle2 }} />
                <p className="choose-text1">{whyChooseUsData.description}</p>
              </div>
              <div className="dreamit-icon-list">
                <ul>
                  {whyChooseUsData.features.map((feature, index) => (
                    <li key={index}>
                      <i className={feature.icon} /> <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="why-choose-button">
                <Link legacyBehavior href={whyChooseUsData.button.link}>
                  <a>
                    <i className="bi bi-gear" /> {whyChooseUsData.button.text}
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="why-choose-us-thumb">
                <img src={whyChooseUsData.images[0]} alt="Why Choose Us" style={{ width: '600px' }} />
                {/* choose shape thumb */}
                <div className="why-choose-us-image">
                  <div className="why-choose-us-shape-thumb bounce-animate">
                    <img src={whyChooseUsData.images[1]} alt="Shape 1" />
                  </div>
                  <div className="why-choose-us-shape-thumb2 rotateme">
                    {/* <img src={whyChooseUsData.images[2]} alt="Shape 2" /> */}
                  </div>
                  <div className="why-choose-us-shape-thumb3 bounce-animate2">
                    <img src={whyChooseUsData.images[3]} alt="Shape 3" />
                  </div>
                  <div className="why-choose-us-shape-thumb4">
                    <img src={whyChooseUsData.images[4]} alt="Shape 4" />
                  </div>
                </div>
                {/* end choose shape thumb */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="process-area style-two">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="consen-section-title white pb-4 pb-lg-5">
                <h5>{processData.title}</h5>
                <h2>{processData.subtitle1}</h2>
                <h2 dangerouslySetInnerHTML={{ __html: processData.subtitle2 }} />
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="process-text">
                <p>{processData.description}</p>
              </div>
            </div>
          </div>

          {/* Process Shape */}
          <div className="process-shape">
            <div className="service-shape">
              <img src={processData.images[0]} alt="Shape 1" />
            </div>
            <div className="process-shape-thumb bounce-animate2">
              <img src={processData.images[1]} alt="Shape 2" />
            </div>
          </div>
        </div>
      </div>

      <div className="process-extra-area style-two">
        <div className="container">
          <div className="row justify-content-center process-bg">
            {processExtraData.steps.map((step, index) => (
              <div className="col-lg-4 col-sm-6" key={index}>
                <div className="process-single-box2">
                  <div className="process-icon-thumb">
                    <img src={step.icon} alt={step.title} />
                  </div>
                  <div className="process-title">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="process-shape">
              <div className="process-shape-thumb3 bounce-animate3">
                <img src={processExtraData.shapeImage} alt="Process Shape" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*==================================================*/}
      {/* End consen process Area */}
      {/*==================================================*/}
      {/*==================================================*/}
      {/* Start consen Team Area */}
      {/*==================================================*/}

      {/*==================================================*/}
      {/* End consen Team Area */}
      {/*==================================================*/}
      {/*==================================================*/}
      {/* Start faq Area */}
      {/*==================================================*/}
      <div className="faq-area" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-6 pl-0">
              {/* Start Accordion */}
              <div className="tab_container">
                <div className="consen-section-title white pb-40 mb-1">
                  <h5> FAQ </h5>
                  <h2>
                    {" "}
                    Frequently Asked <span> Question </span>
                  </h2>
                </div>
                <Faqs />
              </div>
              {/* End Accordion */}
            </div>

            <div className="form-shape">
              <div className="testi-shape-thumb">
                <img src="assets/images/resource/all-shape5.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};
export default Landing1;
