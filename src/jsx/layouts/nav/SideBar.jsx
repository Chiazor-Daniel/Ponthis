  /* eslint-disable */
  import React, { useContext, useEffect, useReducer, useState } from "react";
  import PerfectScrollbar from "react-perfect-scrollbar";
  import { Link, NavLink } from "react-router-dom";
  import { AdminMenuList, AdminMenuList2, MenuList } from './Menu';
  import { useScrollPosition } from "@n8tb1t/use-scroll-position";
  import { ThemeContext } from "../../../redux-contexts/context/ThemeContext";
  import { AdditionalMenuList } from "./Menu";
  import { Collapse } from "react-bootstrap";
  import { useResponsive } from "../../../redux-contexts/context/responsive";
  import { GiHamburgerMenu } from "react-icons/gi";
  const reducer = (previousState, updatedState) => ({
    ...previousState,
    ...updatedState,
  });

  const initialState = {
    active: "",
    activeSubmenu: "",
  }

  const SideBar = ({ userType, superAdmin }) => {
    const {
      iconHover,
      sidebarposition,
      headerposition,
      sidebarLayout,
    } = useContext(ThemeContext);

    const [state, setState] = useReducer(reducer, initialState);
  const{isMobile} = useResponsive()
    const [hideOnScroll, setHideOnScroll] = useState(true)
    useScrollPosition(
      ({ prevPos, currPos }) => {
        const isShow = currPos.y > prevPos.y
        if (isShow !== hideOnScroll) setHideOnScroll(isShow)
      },
      [hideOnScroll]
    )

    useEffect(() => {
      // Your effect code here
    }, []);

    useEffect(() => {
      // Check if path matches any menu item and update active state
      let path = window.location.pathname;
      path = path.split("/");
      path = path[path.length - 1];

      MenuList.forEach((data) => {
        if (data.to === path && state.active !== data.title) {
          setState({ active: data.title });
        }
      });
    }, [state.active]);

    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    const handleMenuActive = (status) => {
      setState({ active: status });
      if (state.active === status) {
        setState({ active: "" });
      }
    }

    return (
      <>
      
      {
        isMobile ? (
          <MobileSideBar userType={userType} superAdmin={superAdmin} />
        ) : (
          <div
            className={`deznav ${iconHover} ${sidebarposition.value === "fixed" &&
              sidebarLayout.value === "horizontal" &&
              headerposition.value === "static"
              ? hideOnScroll > 120
                ? "fixed"
                : ""
              : ""
              }`}
          >
            <PerfectScrollbar className="deznav-scroll">
              <div style={{background: '', height: '100%', display: 'flex',flexDirection: 'column', justifyContent: 'space-between'}}>
                <ul className="metismenu" id="menu">
                  {
                    userType == "user" &&
                    MenuList.map((data, index) => {
                      let menuClass = data.classsChange;
                      if (menuClass === "menu-title") {
                        return (
                          <Link to={data.to} key={index}>
                            <li className={menuClass}>{data.title}</li>
                          </Link>
                        )
                      } else {
                        return (
                          <li className={` ${state.active === data.title ? 'mm-active' : ''}`}
                            key={index}
                            style={{ backgroundColor: path === data.to ? 'black' : '' }}
                            onClick={() => handleMenuActive(data.title)} // Added onClick handler
                          >
                            {data.content && data.content.length > 0 ?
                              <>
                                <Link to={"#"} className="has-arrow">
                                  {data.iconStyle}
                                  <span className="nav-text">{data.title}</span>
                                </Link>
                                <Collapse in={state.active === data.title ? true : false}>
                                  <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                    {data.content && data.content.map((data, index) => {
                                      return (
                                        <li key={index}
                                          className={`${state.activeSubmenu === data.title ? "mm-active" : ""}`}
                                        >
                                          {data.content && data.content.length > 0 ?
                                            <>
                                              <NavLink to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                              >
                                                {data.title}
                                              </NavLink>
                                              <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                                <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                  {data.content && data.content.map((data, index) => {
                                                    return (
                                                      <>
                                                        <li key={index}>
                                                          <Link className={`${path === data.to ? "mm-active" : ""}`} to={`data.to/:${data.content.p}`}>{data.title}</Link>
                                                        </li>
                                                      </>
                                                    )
                                                  })}
                                                </ul>
                                              </Collapse>
                                            </>
                                            :
                                            <Link to={data.to}>
                                              {data.title}
                                            </Link>
                                          }
      
                                        </li>
      
                                      )
                                    })}
                                  </ul>
                                </Collapse>
                              </>
                              :
                              <NavLink to={data.to}>
                                {data.iconStyle}
                                <span className="nav-text">{data.title}</span>
                              </NavLink>
                            }
                          </li>
                        )
                      }
                    })
      
                  }
                  {userType === "admin" && superAdmin && (
                    AdminMenuList.map((data, index) => {
                      let menuClass = data.classsChange;
                      if (menuClass === "menu-title") {
                        return (
                          <Link to={data.to} key={index}>
                            <li className={menuClass}>{data.title}</li>
                          </Link>
                        )
                      } else {
                        return (
                          <li className={` ${state.active === data.title ? 'mm-active' : ''}`}
                            key={index}
                            style={{ backgroundColor: path === data.to ? 'black' : '' }}
                            onClick={() => handleMenuActive(data.title)}
                          >
                            {data.content && data.content.length > 0 ?
                              <>
                                <Link to={"#"} className="has-arrow">
                                  {data.iconStyle}
                                  <span className="nav-text">{data.title}</span>
                                </Link>
                                <Collapse in={state.active === data.title}>
                                  <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                    {data.content.map((subData, subIndex) => (
                                      <li key={subIndex} className={`${state.activeSubmenu === subData.title ? "mm-active" : ""}`}>
                                        {subData.content && subData.content.length > 0 ?
                                          <>
                                            <NavLink to={subData.to} className={subData.hasMenu ? 'has-arrow' : ''}>
                                              {subData.title}
                                            </NavLink>
                                            <Collapse in={state.activeSubmenu === subData.title}>
                                              <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                {subData.content.map((innerData, innerIndex) => (
                                                  <li key={innerIndex}>
                                                    <Link className={`${path === innerData.to ? "mm-active" : ""}`} to={`data.to/:${innerData.content.p}`}>{innerData.title}</Link>
                                                  </li>
                                                ))}
                                              </ul>
                                            </Collapse>
                                          </>
                                          :
                                          <Link to={subData.to}>{subData.title}</Link>
                                        }
                                      </li>
                                    ))}
                                  </ul>
                                </Collapse>
                              </>
                              :
                              <NavLink to={data.to}>
                                {data.iconStyle}
                                <span className="nav-text">{data.title}</span>
                              </NavLink>
                            }
                          </li>
                        )
                      }
                    })
                  )}
                  {(!superAdmin && userType === "admin") && (
                    AdminMenuList2.map((data, index) => {
                      let menuClass = data.classsChange;
                      if (menuClass === "menu-title") {
                        return (
                          <Link to={data.to} key={index}>
                            <li className={menuClass}>{data.title}</li>
                          </Link>
                        )
                      } else {
                        return (
                          <li className={` ${state.active === data.title ? 'mm-active' : ''}`}
                            key={index}
                            style={{ backgroundColor: path === data.to ? 'black' : '' }}
                            onClick={() => handleMenuActive(data.title)}
                          >
                            {data.content && data.content.length > 0 ?
                              <>
                                <Link to={"#"} className="has-arrow">
                                  {data.iconStyle}
                                  <span className="nav-text">{data.title}</span>
                                </Link>
                                <Collapse in={state.active === data.title}>
                                  <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                    {data.content.map((subData, subIndex) => (
                                      <li key={subIndex} className={`${state.activeSubmenu === subData.title ? "mm-active" : ""}`}>
                                        {subData.content && subData.content.length > 0 ?
                                          <>
                                            <NavLink to={subData.to} className={subData.hasMenu ? 'has-arrow' : ''}>
                                              {subData.title}
                                            </NavLink>
                                            <Collapse in={state.activeSubmenu === subData.title}>
                                              <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                {subData.content.map((innerData, innerIndex) => (
                                                  <li key={innerIndex}>
                                                    <Link className={`${path === innerData.to ? "mm-active" : ""}`} to={`data.to/:${innerData.content.p}`}>{innerData.title}</Link>
                                                  </li>
                                                ))}
                                              </ul>
                                            </Collapse>
                                          </>
                                          :
                                          <Link to={subData.to}>{subData.title}</Link>
                                        }
                                      </li>
                                    ))}
                                  </ul>
                                </Collapse>
                              </>
                              :
                              <NavLink to={data.to}>
                                {data.iconStyle}
                                <span className="nav-text">{data.title}</span>
                              </NavLink>
                            }
                          </li>
                        )
                      }
                    })
                  )}
                </ul>
                <ul>
                <ul className="metismenu" id="menu">
                  {
                    AdditionalMenuList.map((data, index) => {
                      let menuClass = data.classsChange;
                      if (menuClass === "menu-title") {
                        return (
                          <Link to={data.to} key={index}>
                            <li className={menuClass}>{data.title}</li>
                          </Link>
                        )
                      } else {
                        return (
                          <li className={` ${state.active === data.title ? 'mm-active' : ''}`}
                            key={index}
                            style={{ backgroundColor: path === data.to ? 'black' : '' }}
                            onClick={() => handleMenuActive(data.title)} // Added onClick handler
                          >
                            {data.content && data.content.length > 0 ?
                              <>
                                <Link to={"#"} className="has-arrow">
                                  {data.iconStyle}
                                  <span className="nav-text">{data.title}</span>
                                </Link>
                                <Collapse in={state.active === data.title ? true : false}>
                                  <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                    {data.content && data.content.map((data, index) => {
                                      return (
                                        <li key={index}
                                          className={`${state.activeSubmenu === data.title ? "mm-active" : ""}`}
                                        >
                                          {data.content && data.content.length > 0 ?
                                            <>
                                              <NavLink to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                              >
                                                {data.title}
                                              </NavLink>
                                              <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                                <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                                  {data.content && data.content.map((data, index) => {
                                                    return (
                                                      <>
                                                        <li key={index}>
                                                          <Link className={`${path === data.to ? "mm-active" : ""}`} to={`data.to/:${data.content.p}`}>{data.title}</Link>
                                                        </li>
                                                      </>
                                                    )
                                                  })}
                                                </ul>
                                              </Collapse>
                                            </>
                                            :
                                            <Link to={data.to}>
                                              {data.title}
                                            </Link>
                                          }
      
                                        </li>
      
                                      )
                                    })}
                                  </ul>
                                </Collapse>
                              </>
                              :
                              <NavLink to={data.to}>
                                {data.iconStyle}
                                <span className="nav-text">{data.title}</span>
                              </NavLink>
                            }
                          </li>
                        )
                      }
                    })
                  }
                </ul>
      
                </ul>
              </div>
            </PerfectScrollbar>
          </div>

        )
      }
      </>
    );
  };

  const renderMenuItems = (menuList) => {
    return menuList.map((data, index) => (
      <li key={index}>
        {data.content && data.content.length > 0 ? (
          <>
            <div onClick={() => handleMenuClick(data.title)}>
              {data.iconStyle}
              <span>{data.title}</span>
            </div>
            {activeMenu === data.title && (
              <ul>
                {data.content.map((subData, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subData.to} onClick={toggleMenu}>
                      {subData.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <Link to={data.to} onClick={toggleMenu}>
            {data.iconStyle}
            <span>{data.title}</span>
          </Link>
        )}
      </li>
    ));
  };
  const MobileSideBar = ({ userType, superAdmin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("");

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleMenuClick = (title) => {
      setActiveMenu(activeMenu === title ? "" : title);
    };

    const renderMenuItems = (menuList) => {
      return menuList.map((data, index) => (
        <li key={index} className="mt-3">
          {data.content && data.content.length > 0 ? (
            <>
              <div style={{position: 'relative',display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', background: '#c6164f', padding: '15px', borderRadius: '50%', color: 'white', width: '40px', height: '40px'}} onClick={() => handleMenuClick(data.title)}>
                <span>
                  {data.iconStyle}
                </span>
                {/* <span>{data.title}</span> */}
              </div>
              {activeMenu === data.title && (
                <ul className="" style={{position: 'absolute', right: '200px', top: '-140px', height: 'auto', padding: '10px', background: 'white', borderRadius: '20px'}}>
                  {data.content.map((subData, subIndex) => (
                    <li key={subIndex} style={{marginTop: '10px', padding: '10px', background: '#c6164f', color: 'white', borderRadius: '10px'}}>
                      <Link to={subData.to} onClick={toggleMenu} style={{color: 'white'}}>
                        {subData.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <Link to={data.to} onClick={toggleMenu}  style={{width: '40px', height: '40px', position: 'relative',display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', background: '#c6164f', padding: '15px', borderRadius: '50%', color: 'white'}}>
              {data.iconStyle}
              {/* <span>{data.title}</span> */}
            </Link>
          )}
        </li>
      ));
    };

    return (
      <>
        {/* <button
          onClick={toggleMenu}
          style={{
            position: 'fixed',
            bottom: '120px',
            left: '20px',
            zIndex: 1000,
            padding: '10px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          <GiHamburgerMenu size={30}/>
        </button> */}
        {/* {isOpen && ( */}
          <div
            style={{
              position: 'fixed',
              // top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '300px',
              backgroundColor: 'transparent',
              zIndex: 10,
              overflowY: 'auto',
              padding: '20px',
            }}
          >
            {/* <button
              onClick={toggleMenu}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
              }}
            >
              ×
            </button> */}
            <ul className="" style={{ zIndex: 999999, borderTopLeftRadius: '50px', borderTopRightRadius: '50px', background: 'white', display: 'flex', justifyContent: 'space-around', gap: '3px', flexDirection: 'row', listStyle: 'none', padding: 0, position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'auto', padding: '10px', paddingRight: '56px', paddingBottom: '20px' }}>
              {userType === "user" && renderMenuItems(MenuList)}
              {userType === "admin" && superAdmin && renderMenuItems(AdminMenuList)}
              {userType === "admin" && !superAdmin && renderMenuItems(AdminMenuList2)}
              { userType === "user" && renderMenuItems(AdditionalMenuList)}
            </ul>
          </div>
        {/* )} */}
      </>
    );
  };

  export default SideBar;
