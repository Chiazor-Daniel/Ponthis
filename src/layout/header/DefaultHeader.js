import Link from "next/link";
import { DaskTopMenusMenus } from "./Menus";

const DefaultHeader = () => {
  return (
    <div id="sticky-header" className="consen_nav_manu header____">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="logo">
              <Link legacyBehavior href="/">
                <a className="logo_img" title="consen">
                  <img src="apex.png" alt="logo" style={{width: '250px'}}/>
                </a>
              </Link>
              <Link legacyBehavior href="/">
                <a className="main_sticky" title="consen">
                <img src="apex.png" alt="logo" style={{width: '200px'}}/>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-9 pl-0 pr-0">
            <nav className="consen_menu">
              <DaskTopMenusMenus />
              <div className="header-button">
                <Link legacyBehavior href="https://dashboard.apextrustcapital.com" >
                  <a target="_blank">Get On Board</a>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DefaultHeader;
