import Header from '@/components/Header'
import PageHeader from "@/components/base/PageHeader";
import ContactCard from "./../components/modules/contact/ContactCard";
import Footer from '@/components/modules/Home-2/Footer';
import HeaderTwo from '@/components/HeaderTwo';
const Contact = () => {
  return (
    <>
      <HeaderTwo />
      <PageHeader title="Contact Us" text="Contact Us" />
      <ContactCard />
      <Footer />
    </>
  );
};

export default Contact;
