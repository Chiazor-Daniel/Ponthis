import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/finlogo.png';

const Footer = () => {
  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "Market", href: "/market" },
    { title: "Education", href: "/education" },
    { title: "Accounts", href: "/accounts" },
    // { title: "News", href: "#" },
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" }
  ];

  const contactInfo = [
    { label: "Email", value: "support@finnovent.com" },
    { label: "Phone", value: "+44 151946 0857" },
    { label: "Address", value: "123 Oxford Street, London, W1D 1BT, United Kingdom" }
  ];

  const socialLinks = [
    { icon: <FaFacebook size={24} />, href: "#" },
    { icon: <FaTwitter size={24} />, href: "#" },
    { icon: <FaInstagram size={24} />, href: "#" },
    { icon: <FaLinkedin size={24} />, href: "#" }
  ];

  return (
    <div className="w-full bg-black p-8 flex flex-col md:flex-row justify-between items-center text-white px-4 md:px-16">
      <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
        <div className='flex gap-4 items-center'>
          <img src={logo} width={100} alt="Finnovent logo" />
          <h1 className="text-4xl font-bold">Finnovent</h1>
        </div>
        <p className="mt-2 text-gray-400 text-center md:text-left">Your trusted partner in trading.</p>
      </div>

      <div className="mb-8 md:mb-0">
        <h2 className="text-lg font-semibold mb-2 text-gray-500 text-center md:text-left">Quick Links</h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-4 text-center md:text-left">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="hover:text-orange-500 text-xl">{link.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
        <h2 className="text-lg font-semibold mb-2 text-gray-500 text-center md:text-left">Contact Us</h2>
        {contactInfo.map((info, index) => (
          <p key={index} className='text-xl text-center md:text-left'>{info.label}: {info.value}</p>
        ))}
      </div>

      
    </div>
  );
};

export default Footer;
