"use client"
import { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the open/close state of accordion items

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const faqs = [
    {
      question: "What is forex trading?",
      answer: "Forex trading is the buying and selling of currencies on the foreign exchange market with the aim of making a profit."
    },
    {
      question: "How do I start trading forex?",
      answer: "To start trading forex, you need to open an account with a forex broker, deposit funds, and then you can start buying and selling currencies."
    },
    {
      question: "What are the major currency pairs?",
      answer: "Major currency pairs are the most traded currency pairs in the forex market, such as EUR/USD, USD/JPY, GBP/USD, and USD/CHF."
    },
    {
      question: "What is a pip in forex trading?",
      answer: "A pip is the smallest price movement in the forex market. It usually refers to the fourth decimal place in a currency pair."
    }
  ];

  return (
    <Accordion defaultIndex={[0]} allowMultiple className="flex flex-col gap-6 w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} className="bg-black p-4 rounded-xl border-none" isOpen={isOpen}>
          <h2 className="text-white">
            <AccordionButton onClick={toggleAccordion}>
              <Box flex="1" textAlign="left" className="text-white">
                {faq.question}
              </Box>
              <IoIosArrowDown />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} className="text-white">
            {faq.answer}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;
