import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

const ActivityLog = () => {
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".image_load", {
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => setFilterKey(key);
  const activeBtn = (value) => (value === filterKey ? "current_menu_item" : "");

  const categories = [
    { key: "*", label: "All Activities" },
    { key: "standard", label: "Standard" },
    { key: "digital", label: "Digital" },
    { key: "processing", label: "Processing" },
  ];

  const activities = [
    { id: 1, category: "standard", title: "Monthly Allocation", amount: "2500.00", unit: "Units", date: "2024-08-01", image: "https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 2, category: "standard", title: "Service Payment", amount: "150.00", unit: "Units", date: "2024-08-02", image: "https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 3, category: "processing", title: "Online Acquisition", amount: "75.50", unit: "Units", date: "2024-08-03", image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 4, category: "digital", title: "Digital Asset A", amount: "0.05", unit: "DA", date: "2024-08-04", image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 5, category: "digital", title: "Digital Asset B", amount: "1.5", unit: "DB", date: "2024-08-05", image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 6, category: "processing", title: "Digital Withdrawal", amount: "0.1", unit: "DA", date: "2024-08-06", image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ];

  return (
    <Fragment>
      <div className="row case-study-bg">
        <div className="col-lg-12">
          <div className="consen-section-title upper text-center pb-50">
            <h5> Activity Log </h5>
            <h2> We Track Every Action </h2>
            <h2>
              View <span> Recent Activities </span>
            </h2>
          </div>
        </div>
        <div className="portfolio-shape">
          <div className="port-shape-thumb rotateme">
            <img src="assets/images/resource/red-dot.png" alt="" />
          </div>
          <div className="port-shape-thumb2 bounce-animate2">
            <img src="assets/images/resource/all-shape6.png" alt="" />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="portfolio_nav">
            <div className="portfolio_menu">
              <ul className="menu-filtering">
                {categories.map((cat) => (
                  <li
                    key={cat.key}
                    className={`c-pointer ${activeBtn(cat.key)}`}
                    onClick={handleFilterKeyChange(cat.key)}
                  >
                    {cat.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row image_load">
        {activities.map((activity) => (
          <div key={activity.id} className={`col-lg-4 col-md-6 grid-item ${activity.category}`}>
            <div className="case-study-single-box">
              <div className="case-study-thumb2">
                <img src={activity.image} alt={activity.title} style={{height: "200px", width: "100%", objectFit: "cover"}} />
                <div className="case-study-content">
                  <div className="case-study-content-inner">
                    <div className="case-study-title" style={{textAlign: "center"}}>
                      <h6 style={{color: "#fff"}}> {activity.category.toUpperCase()} </h6>
                      <h3>
                        {/* <Link legacyBehavior href={`/activity-details/${activity.id}`}> */}
                          <a style={{color: "#fff"}}> {activity.title} </a>
                        {/* </Link> */}
                      </h3>
                      <p style={{color: "#fff", marginTop: "10px"}}>Value: {activity.amount} {activity.unit}</p>
                      <p style={{color: "#fff"}}>Date: {activity.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ActivityLog;