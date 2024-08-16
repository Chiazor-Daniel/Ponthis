/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Accordion from "react-bootstrap/Accordion";

const faqData = [
  {
    question: "What services does LedgerSafe provide?",
    answer:
      "LedgerSafe offers comprehensive digital asset recovery services, including account recovery, investigation of unauthorized activity, wallet restoration, and security consulting.",
  },
  {
    question: "How can I recover access to my lost digital account?",
    answer:
      "LedgerSafe's account recovery service provides expert assistance to help you regain access to compromised or lost digital asset accounts efficiently and securely.",
  },
  {
    question: "Is it safe to use LedgerSafe for digital asset recovery?",
    answer:
      "Yes, LedgerSafe uses state-of-the-art security measures to ensure the safety and privacy of your digital assets during the recovery process.",
  },
  {
    question: "What should I do if I suspect unauthorized activity in my digital transactions?",
    answer:
      "Contact LedgerSafe's investigation team immediately. They conduct thorough investigations to track and recover assets lost to unauthorized activities.",
  },
  {
    question: "How does the wallet restoration service at LedgerSafe work?",
    answer:
      "LedgerSafe's wallet restoration service helps you restore access to your digital wallets, ensuring that you can manage your assets without any interruptions.",
  },
  {
    question: "What can I do to enhance the security of my digital assets with LedgerSafe?",
    answer:
      "LedgerSafe's security consulting service provides proactive strategies and best practices to enhance the security of your digital assets and protect them from potential threats.",
  },
];

const Faq = () => {
  return (
    <section className="faq padding-top padding-bottom of-hidden">
      <div className="section-header section-header--max65">
        <h2 className="mb-15 mt-minus-5">
          <span>Frequently</span> Asked questions
        </h2>
        <p>
          Got questions? We've got answers. Check out our FAQ page
          for more information. If you need further assistance, please contact us.
        </p>
      </div>
      <div className="container">
        <div className="faq__wrapper">
          <div className="row g-5 align-items-center justify-content-between">
            <div className="col-lg-6">
              <Accordion className="accordion--style1">
                <div className="row">
                  {faqData.map((data, index) => (
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
                  ))}
                </div>
              </Accordion>
            </div>
            <div className="col-lg-6">
              <div
                className="faq__thumb faq__thumb--style1"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <img className="dark" src="/box.png" alt="FAQ illustration" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
