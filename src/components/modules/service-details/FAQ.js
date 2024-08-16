/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
const serviceFaqData = [
  {
    id: 1,
    question: "Trading FAQs: How to Start Investing",
    answer:
      "This is an artificial intelligence integrated tool by which you can automate your PTE and IELTS mock test systems in your educational systems.",
  },
  {
    id: 2,
    question: "Got questions about trading? Here's FAQ!",
    answer:
      "Online trading’s primary advantages are that it allows you to manage your trades at your convenience, serves as an extra source of income.",
  },
  {
    id: 3,
    question: "Is trading hard? Not necessarily, mate!",
    answer:
      "Definitely, you can give permission to all of your team members and can set their roles based on their position to manage it in your institution.",
  },
  {
    id: 4,
    question: "What's trading? How do I start?",
    answer:
      "Definitely, you can give permission to all of your team members and can set their roles based on their position to manage it in your institution.",
  },
];
const ServiceFaq = () => {
  const [show, setShow] = useState(0);
  return (
    <div
      className="service-details__faq mt-55"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="faq">
        <div className="faq__wrapper">
            <Accordion className="accordion--style1" defaultActiveKey="0">
              <div className="row">
              {serviceFaqData.map((data, index) => (
                <div className="col-12" key={index}>
                  <Accordion.Item className="accordion__item" eventKey={index}>
                    <div className="accordion__header">
                      <Accordion.Button className="accordion__button accordion__button--style2">
                        <span className="accordion__button-content">
                          {data.question}
                        </span>
                        <span className="accordion__button-plusicon"></span>
                      </Accordion.Button>
                    </div>
                    <Accordion.Body className="accordion__body">
                      <p className="mb-15">{data.answer}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              ))}
              </div>
            </Accordion>
            </div>
          </div>
        </div>


  );
};

export default ServiceFaq;
