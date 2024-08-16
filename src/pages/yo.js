import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";
import Partner from "@/components/modules/index/Partner";
import Hero from "../components/modules/index/Hero";
import About from "@/components/modules/index/About";
import Featured from "@/components/modules/index/Featured";
import Roadmap from "@/components/modules/index/Roadmap";
import Pricing from "@/components/modules/index/Pricing";
import Team from "@/components/modules/index/Team";
import Faq from "@/components/modules/index/FAQs";
import Newsletter from "@/components/modules/index/Newsletter";
import Blog from "@/components/modules/index/Blogs";
import Testimonial from "@/components/modules/index/Testimonials";
import Services from "@/components/modules/index/Services";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Home() {


  return (
    <>
      <Header headerClass="header-section--style2" />
      <Hero />
      <Partner />
      <About />
      <Featured />
      <Services />
      <Roadmap />
      <Pricing />
      <Team />
      <Blog />
      <Testimonial />
      <Faq />
      <Newsletter />
      <Footer />
    </>
  );
}
