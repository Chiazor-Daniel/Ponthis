/* eslint-disable react/no-unescaped-entities */
import HeaderTwo from '@/components/HeaderTwo';
import PageHeader from '@/components/base/PageHeader';
import Footer from '@/components/modules/Home-2/Footer';
import React from 'react';

const PrivacyPolicy = () => {
  // Define privacy policy data
  const privacyPolicyData = [
    {
      id: 1,
      heading: 'Introduction',
      content:
        'Welcome to LedgerSafe\'s Privacy Policy! This policy outlines how LedgerSafe collects, uses, and protects your personal information when you use our website and services.',
    },
    {
      id: 2,
      heading: 'Information We Collect',
      content:
        'LedgerSafe may collect personal information such as your name, email address, and contact details. We may also collect non-personal information such as your IP address and browsing behavior.',
    },
    {
      id: 3,
      heading: 'How We Use Your Information',
      content:
        'We use your information to provide and improve our services, communicate with you, and customize your experience. LedgerSafe does not sell your personal information to third parties.',
    },
    {
      id: 4,
      heading: 'Data Security',
      content:
        'LedgerSafe takes reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.',
    },
    {
      id: 5,
      heading: 'Your Choices',
      content:
        'You have the right to access, update, or delete your personal information. You can also choose to opt-out of receiving promotional communications from us.',
    },
    {
      id: 6,
      heading: 'Changes to Privacy Policy',
      content:
        'LedgerSafe reserves the right to update or modify this Privacy Policy at any time. We will notify you of any changes by posting the new policy on our website. Your continued use of our services after changes are made constitutes acceptance of those changes.',
    },
    {
      id: 7,
      heading: 'Contact Us',
      content:
        'If you have any questions or concerns about our Privacy Policy, please contact us at support@ledgersafe.com.',
    },
  ];

  return (
    <>
      <HeaderTwo />
      <PageHeader title="Privacy Policy" text="Privacy" />
      <section className="privacy-policy padding-top padding-bottom">
        <div className="container">
          <div className="section-header section-header--style4">
            <div className="section-header__content section-header__content--style3">
              <h2 className="mb-0">Privacy Policy</h2>
            </div>
          </div>
          <div className="privacy-policy__content">
            {privacyPolicyData.map((policy) => (
              <div key={policy.id}>
                <h3>{policy.heading}</h3>
                <p>{policy.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="privacy-policy__shape">
          <span className="privacy-policy__shape-item privacy-policy__shape-item--1">
            <span></span>
          </span>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
