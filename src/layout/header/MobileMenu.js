import Link from "next/link";
import { Fragment, useState } from "react";

const menuItems = [
  {
    title: "Home",
    subMenu: [
      { href: "/", label: "Personal Banking" },
      { href: "/business-banking", label: "Business Banking" },
      { href: "/loans", label: "Loans" },
    ],
  },
  {
    title: "Transactions",
    subMenu: [{ href: "/portfolio", label: "Our Transactions" }],
  },
  {
    title: "Cards",
    subMenu: [{ href: "/team", label: "Cards Management" }],
  },
  {
    title: "Services",
    subMenu: [
      { href: "/service", label: "Our Services" },
      { href: "/service-details", label: "Service Details" },
    ],
  },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const MobileMenu = () => {
  const [toggle, setToggle] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  const handleToggle = () => setToggle(!toggle);
  const handleActiveMenu = (menu) =>
    setActiveMenu(activeMenu === menu ? "" : menu);

  const renderSubMenu = (subMenuItems) => {
    return subMenuItems.map((item, index) => (
      <li key={index}>
        <Link href={item.href}>
          <>{item.label}</>
        </Link>
      </li>
    ));
  };

  return (
    <div className="mobile-menu-area d-sm-block d-md-block d-lg-none header____">
      <div style={{position: 'absolute', padding: '10px', top: 0, zIndex: 9999}}>
        <img src="apex.png" style={{width: '200px', }}/>
      </div>
      <div className="mobile-menu mean-container">
        <div className="mean-bar">
          <a
            href="#nav"
            className={`meanmenu-reveal ${toggle ? "meanclose" : ""}`}
            onClick={handleToggle}
          >
            {toggle ? (
              "X"
            ) : (
              <Fragment>
                <span /> <span /> <span />
              </Fragment>
            )}
          </a>
          <nav className="mean-nav">
            <ul
              className="nav_scroll"
              style={{ display: toggle ? "block" : "none" }}
            >
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.subMenu ? (
                    <>
                      <a href="#">
                        {item.title}{" "}
                        <span>
                          <i className="fas fa-angle-down" />
                        </span>
                      </a>
                      <ul
                        className="sub-menu"
                        style={{
                          display: activeMenu === item.title ? "block" : "none",
                        }}
                      >
                        {renderSubMenu(item.subMenu)}
                      </ul>
                      <a
                        className="mean-expand"
                        href="#"
                        onClick={() => handleActiveMenu(item.title)}
                        style={{ fontSize: 18 }}
                      >
                        {activeMenu === item.title ? "-" : "+"}
                      </a>
                    </>
                  ) : (
                    <Link href={item.href}>
                      <>{item.label}</>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mean-push" />
      </div>
    </div>
  );
};

export default MobileMenu;
