/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Accordion } from "react-bootstrap";

const faqdata = [
  {
    id: 1,
    question: "What services do you offer?",
    answer:
      "We specialize in providing comprehensive solutions for crypto trading and recovery. Our services include account recovery, fraud investigation, wallet restoration, security consulting, transaction dispute resolution, and private key recovery.",
  },
  {
    id: 2,
    question: "Is crypto trading safe?",
    answer:
      "Cryptocurrency trading involves risks, but we implement advanced security measures and provide expert guidance to ensure the safety of your investments.",
  },
  {
    id: 3,
    question: "How does your recovery process work?",
    answer:
      "Our recovery process is tailored to swiftly and securely retrieve lost or compromised cryptocurrency assets using advanced techniques and expert assistance.",
  },
  {
    id: 4,
    question: "Do you offer consultation services?",
    answer:
      "Yes, we provide personalized security consulting to enhance the protection of your cryptocurrency holdings, ensuring proactive strategies are in place.",
  },
  {
    id: 5,
    question: "What if I'm not satisfied with your service?",
    answer:
      "Customer satisfaction is our priority. If you're not satisfied, we're committed to addressing your concerns promptly and ensuring a positive outcome.",
  },
];

const Faq2 = () => {
  return (
    <section className="faq padding-top padding-bottom of-hidden">
      <div className="section-header section-header--max57">
        <h2 className="mb-15 mt-minus-5">
          Most common <span className="style2">FAQ</span>
        </h2>
      </div>
      <div className="container">
        <div className="faq__wrapper">
          <div className="row g-4 justify-content-between">
            <div className="col-lg-6">
              <Accordion defaultActiveKey="0" className="accordion--style2">
                <div className="row gy-3">
                  {faqdata.slice(0, 2).map((item, index) => (
                    <div className="col-12" key={item.id}>
                      <Accordion.Item
                        className="accordion__item"
                        eventKey={index.toString()}
                      >
                        <div className="accordion__header">
                          <Accordion.Button className="accordion__button">
                            <span className="accordion__button-content">
                              {item.question}
                            </span>
                          </Accordion.Button>
                        </div>
                        <Accordion.Body className="accordion__body">
                          <p className="mb-0">{item.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>
            <div className="col-lg-6">
              <Accordion defaultActiveKey={"2"} className="accordion--style2">
                <div className="row gy-3">
                  {faqdata.slice(2, 5).map((item, index) => (
                    <div className="col-12" key={item.id}>
                      <Accordion.Item
                        className="accordion__item"
                        eventKey={(index + 2).toString()}
                      >
                        <div className="accordion__header">
                          <Accordion.Button className="accordion__button">
                            <span className="accordion__button-content">
                              {item.question}
                            </span>
                          </Accordion.Button>
                        </div>
                        <Accordion.Body className="accordion__body">
                          <p className="mb-0">{item.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq2;
