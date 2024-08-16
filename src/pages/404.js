/* eslint-disable react/no-unescaped-entities */
import PageHeader from "@/components/base/PageHeader";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const ErrorPage = () => {
  return (
    <>
      <Header />
      <PageHeader text="404" title="404" />
      <div className="error padding-top padding-bottom sec-bg-color2">
        <div className="container">
          <div className="error__wrapper">
            <div
              className="error__inner"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="error__thumb text-center">
                {/* <img src="/images/others/error.png" alt="404 image" /> */}
              </div>
              <div className="error__content text-center">
                <h2>
                  <span>ooops!</span> page not found
                </h2>
                <p>
                  Oops! It looks like you're lost. The page you were looking for
                  couldn't be found. Don't worry, it happens to the best of us.
                </p>
                <Link
                  href="/"
                  className="trk-btn trk-btn--border trk-btn--primary"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
