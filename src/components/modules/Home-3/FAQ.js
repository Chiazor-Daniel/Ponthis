/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

const faqdata = [
  {
    question: "What does this tool do?",
    answer:
      "Online trading’s primary advantages are that it allows you to manage your trades at your convenience.",
  },
  {
    question: "What are the disadvantages of online trading?",
    answer:
      "You don’t need to worry, the interface is user-friendly. Anyone can use it smoothly. Our user manual will help you to solve your problem.",
  },
  {
    question: "Is online trading safe?",
    answer:
      "Online trading’s primary advantages are that it allows you to manage your trades at your convenience.",
  },
  {
    question: "What is online trading, and how does it work?",
    answer:
      "Online trading’s primary advantages are that it allows you to manage your trades at your convenience.",
  },
  {
    question: "Which app is best for online trading?",
    answer:
      "Online trading’s primary advantages are that it allows you to manage your trades at your convenience.",
  },
  {
    question: "How to create a trading account?",
    answer:
      "Online trading’s primary advantages are that it allows you to manage your trades at your convenience.",
  },
];

const Faq3 = () => {
  return (
    <section className="faq padding-top padding-bottom of-hidden">
      <div className="section-header section-header--max65">
        <h2 className="mb-15 mt-minus-5">
          <span>Frequently</span> Asked questions
        </h2>
        <p>
          Hey there! Got questions? We've got answers. Check out our FAQ page
          for all the deets. Still not satisfied? Hit us up.
        </p>
      </div>
      <div className="container">
        <div className="faq__wrapper">
          <div className="row g-5 align-items-center justify-content-between">
            <div className="col-lg-6">
              <Accordion className="accordion--style1">
                <div className="row">
                  {
                    faqdata.map((data, index) => (
                      <div key={index} className="col-12">
                        <Accordion.Item className="accordion__item" eventKey={index}>
                          <div className="accordion__header">
                            <Accordion.Button className="accordion__button">
                              <span className="accordion__button-content">
                                {data.question}
                              </span>
                            </Accordion.Button>
                          </div>
                          <Accordion.Body className="accordion__body">
                            <p className="mb-15">
                              {data.answer}
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                      </div>
                    ))
                  }
                </div>
              </Accordion>
            </div>
            <div className="col-lg-6">
              <div
                className="faq__thumb faq__thumb--style1"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <img className="dark" src="/images/others/1.png" alt="faq-thumb" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="faq__shape faq__shape--style1">
        <span className="faq__shape-item faq__shape-item--1">
          <img src="/images/others/2.png" alt="shpae-icon" />
        </span>
      </div>
    </section>
  );
};
export default Faq3;
