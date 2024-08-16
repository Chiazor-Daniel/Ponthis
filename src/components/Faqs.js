import { useState } from "react";
import { Accordion } from "react-bootstrap";

const faqsData = [
 
  {
    id: 2,
    title: "How to Open a New Bank Account?",
    content: "To open a new bank account, you typically need to visit a branch or apply online. You'll need to provide personal identification, proof of address, and other relevant documentation. Some banks may also require a minimum deposit to activate the account."
  },
  {
    id: 3,
    title: "What are the Benefits of Online Banking?",
    content: "Online banking offers numerous benefits, including 24/7 access to your account, the ability to transfer funds between accounts, pay bills online, and monitor transactions in real-time. It provides convenience and allows for efficient management of your finances."
  },
  {
    id: 4,
    title: "How to Secure Your Online Banking Account?",
    content: "To secure your online banking account, use strong and unique passwords, enable two-factor authentication, regularly monitor your account for unauthorized transactions, and avoid accessing your account from public Wi-Fi networks. Ensure your device has up-to-date security software."
  },
];


const Faqs = () => {
  const [active, setActive] = useState(faqsData[0].id);
  return (
    <div id="tab1" className="tab_content">
      <Accordion
        defaultActiveKey={faqsData[0].id}
        as={"ul"}
        className="accordion"
      >
        {faqsData.map((faq) => (
          <li key={faq.id}>
            <Accordion.Toggle
              as="a"
              eventKey={faq.id}
              onClick={() => setActive(faq.id == active ? null : faq.id)}
              className={faq.id == active ? "active" : ""}
            >
              <span> {faq.title} </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={faq.id}>
              <p>
                Continually cultivate inexpensive convergence whereas
                collaborative communitie. Credib generate team building vorta
                after professional value. Proactively administrate enabled
                paradigm
              </p>
            </Accordion.Collapse>
          </li>
        ))}
      </Accordion>
    </div>
  );
};
export default Faqs;
