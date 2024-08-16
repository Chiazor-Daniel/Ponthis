/* eslint-disable react/no-unescaped-entities */
import HeaderTwo from '@/components/HeaderTwo';
import PageHeader from '@/components/base/PageHeader';
import Footer from '@/components/modules/Home-2/Footer';
import React from 'react';

const TermsAndConditions = () => {
  // Define terms and conditions data
  const termsData = [
    {
      id: 1,
      heading: 'Introduction',
      content:
        'Welcome to LedgerSafeAI! These terms and conditions outline the rules and regulations for the use of LedgerSafe\'s website and services.',
    },
    {
      id: 2,
      heading: 'Services',
      content:
        'LedgerSafeAI provides digital asset management and recovery services. Our goal is to assist our clients in navigating the complexities of the digital asset market and recovering lost assets.',
    },
    {
      id: 3,
      heading: 'User Responsibilities',
      content:
        'You are responsible for maintaining the confidentiality of your account and password. LedgerSafe will not be liable for any loss or damage arising from your failure to comply with this security obligation.',
    },
    {
      id: 4,
      heading: 'Privacy Policy',
      content:
        'Your privacy is important to us. Our Privacy Policy outlines how we collect, use, and protect your personal information. By using our services, you consent to the terms of our Privacy Policy.',
    },
    {
      id: 5,
      heading: 'Limitation of Liability',
      content:
        'LedgerSafeAI strives to provide accurate and timely information, but we do not guarantee the completeness or accuracy of the information provided. We are not liable for any losses or damages resulting from your reliance on information obtained from our website or services.',
    },
    {
      id: 6,
      heading: 'Changes to Terms',
      content:
        'LedgerSafeAI reserves the right to modify these terms and conditions at any time. We encourage you to review this page periodically for changes. Your continued use of our website and services after changes are made constitutes acceptance of those changes.',
    },
    {
      id: 7,
      heading: 'Contact Us',
      content:
        'If you have any questions or concerns about these terms and conditions, please contact us at support@ledgersafe.com.',
    },
  ];

  return (
    <>
      <HeaderTwo />
      <PageHeader title="Terms and Conditions" text="Terms" />
      <section className="terms-and-conditions padding-top padding-bottom">
        <div className="container">
          <div className="section-header section-header--style4">
            <div className="section-header__content section-header__content--style3">
              <h2 className="mb-0">
                Terms and Conditions
              </h2>
            </div>
          </div>
          <div className="terms-and-conditions__content">
            {termsData.map((term) => (
              <div key={term.id}>
                <h3>{term.heading}</h3>
                <p>{term.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="terms-and-conditions__shape">
          <span className="terms-and-conditions__shape-item terms-and-conditions__shape-item--1">
            <span></span>
          </span>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
