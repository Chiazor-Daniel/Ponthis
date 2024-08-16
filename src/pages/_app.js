import { useEffect, useState } from "react";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import "@fortawesome/fontawesome-free/css/all.min.css";
import AOS from "aos";
import Layout from "@/components/layout/Layout";
import "@/styles/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "@/styles/css/swiper-bundle.min.css";
import "@/styles/sass/style.scss";
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);


  const [dark, setDark] = useState(false);


  //........... animation.....
  useEffect(() => {
    setLoading(true);
    AOS.init();

    setTimeout(() => {
      setLoading(false);

    }, 1500);



    if (localStorage.getItem("theme") === "dark") {
      setDark(true)
    }
    else {
      setDark(false)
    }
  }, []);



  return (
    <>
      <Head>
        <title>
          LedgerSafeAI
        </title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo2.png" type="image/png" />

      </Head>


      <Layout>
        {loading && (
          /* <!-- ===============>> Preloader start here <<================= --> */
          <div className="preloader">
            <img src="logo2.png" alt="preloader icon" style={{width: '200px'}} data-aos="fade-in"/>
          </div>
          /* <!-- ===============>> Preloader end here <<================= --> */
        )}


        <Component {...pageProps} />
      </Layout>

    </>
  );
}
