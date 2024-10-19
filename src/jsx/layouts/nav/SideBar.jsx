  /* eslint-disable */
  import React, { useContext, useEffect, useReducer, useState, useRef } from "react";
  import PerfectScrollbar from "react-perfect-scrollbar";
  import { Link, NavLink } from "react-router-dom";
  import { AdminMenuList, AdminMenuList2, MenuList } from './Menu';
  import { useScrollPosition } from "@n8tb1t/use-scroll-position";
  import { ThemeContext } from "../../../redux-contexts/context/ThemeContext";
  import { AdditionalMenuList } from "./Menu";
  import { Collapse } from "react-bootstrap";
  import { useResponsive } from "../../../redux-contexts/context/responsive";
  import { Navbar, Nav } from 'react-bootstrap';
  import { Overlay, Tooltip } from 'react-bootstrap';
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
              style={{
                backgroundColor: '#2a2a2a', 
              }}
          >
            <PerfectScrollbar className="deznav-scroll" style={{ backgroundColor: '#2a2a2a',}}>
              <div style={{ height: '100%', backgroundColor: '#2a2a2a', display: 'flex',flexDirection: 'column', justifyContent: 'space-between'}}>
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
  
  const MobileSideBar = ({ userType, superAdmin }) => {
    const [activeMenu, setActiveMenu] = useState("");
    const [showTooltip, setShowTooltip] = useState("");
    const menuRef = useRef(null);
    const tooltipTargets = useRef({});
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setActiveMenu("");
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const styles = {
      container: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      },
      menuBar: {
        background: 'white',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        padding: '12px 16px',
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
      },
      menuList: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        paddingRight: '60px', // Add padding to the right to avoid TawkTo icon
      },
      menuItem: {
        position: 'relative',
        flex: '1 1 0',
        display: 'flex',
        justifyContent: 'center',
      },
      menuButton: {
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#18A594',
        borderRadius: '50%',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, background-color 0.2s ease',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent',
      },
      activeMenuButton: {
        background: '#147885',
        transform: 'scale(1.1)',
      },
      submenu: {
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '10px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        padding: '8px',
        minWidth: '200px',
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
        transform: 'translateX(-50%) translateY(10px)',
      },
      activeSubmenu: {
        opacity: 1,
        visibility: 'visible',
        transform: 'translateX(-50%) translateY(0)',
      },
      submenuItem: {
        margin: '4px 0',
      },
      submenuLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        color: '#333',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'background-color 0.2s ease',
        fontSize: '14px',
        fontWeight: '500',
      },
      badge: {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        background: '#c6164f',
        color: 'white',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      customTooltip: {
        fontSize: '12px',
        padding: '6px 10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '4px',
      }
    };
  
    const handleMenuClick = (title) => {
      setActiveMenu(activeMenu === title ? "" : title);
      setShowTooltip("");
    };
  
    const renderMenuItems = (menuList) => {
      return menuList.map((data, index) => {
        const buttonId = `menu-item-${index}`;
        
        return (
          <li key={index} style={styles.menuItem}>
            {data.content && data.content.length > 0 ? (
              <>
                <button
                  id={buttonId}
                  ref={el => tooltipTargets.current[buttonId] = el}
                  style={{
                    ...styles.menuButton,
                    ...(activeMenu === data.title ? styles.activeMenuButton : {})
                  }}
                  onClick={() => handleMenuClick(data.title)}
                  onMouseEnter={() => setShowTooltip(buttonId)}
                  onMouseLeave={() => setShowTooltip("")}
                  onTouchStart={() => setShowTooltip(buttonId)}
                  onTouchEnd={() => setTimeout(() => setShowTooltip(""), 1500)}
                >
                  {data.iconStyle}
                  {data.notifications && (
                    <span style={styles.badge}>{data.notifications}</span>
                  )}
                </button>
  
                <Overlay
                  target={tooltipTargets.current[buttonId]}
                  show={showTooltip === buttonId}
                  placement="top"
                >
                  {(props) => (
                    <Tooltip {...props}>
                      <div style={styles.customTooltip}>{data.title}</div>
                    </Tooltip>
                  )}
                </Overlay>
  
                <div
                  style={{
                    ...styles.submenu,
                    ...(activeMenu === data.title ? styles.activeSubmenu : {})
                  }}
                >
                  {data.content.map((subData, subIndex) => (
                    <div key={subIndex} style={styles.submenuItem}>
                      <Link
                        to={subData.to}
                        style={{
                          ...styles.submenuLink,
                          '&:hover': {
                            backgroundColor: 'rgba(24, 165, 148, 0.1)',
                          }
                        }}
                        onClick={() => {
                          setActiveMenu("");
                          setShowTooltip("");
                        }}
                      >
                        {subData.icon && (
                          <span style={{ marginRight: '8px' }}>{subData.icon}</span>
                        )}
                        {subData.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <Link to={data.to}>
                  <button
                    id={buttonId}
                    ref={el => tooltipTargets.current[buttonId] = el}
                    style={styles.menuButton}
                    onMouseEnter={() => setShowTooltip(buttonId)}
                    onMouseLeave={() => setShowTooltip("")}
                    onTouchStart={() => setShowTooltip(buttonId)}
                    onTouchEnd={() => setTimeout(() => setShowTooltip(""), 1500)}
                  >
                    {data.iconStyle}
                    {data.notifications && (
                      <span style={styles.badge}>{data.notifications}</span>
                    )}
                  </button>
                </Link>
  
                <Overlay
                  target={tooltipTargets.current[buttonId]}
                  show={showTooltip === buttonId}
                  placement="top"
                >
                  {(props) => (
                    <Tooltip {...props}>
                      <div style={styles.customTooltip}>{data.title}</div>
                    </Tooltip>
                  )}
                </Overlay>
              </>
            )}
          </li>
        );
      });
    };
  
    return (
      <div style={styles.container} ref={menuRef}>
        <nav style={styles.menuBar}>
          <ul style={styles.menuList}>
            {userType === "user" && renderMenuItems(MenuList)}
            {userType === "admin" && superAdmin && renderMenuItems(AdminMenuList)}
            {userType === "admin" && !superAdmin && renderMenuItems(AdminMenuList2)}
            {userType === "user" && renderMenuItems(AdditionalMenuList)}
          </ul>
        </nav>
      </div>
    );
  };
  


  export default SideBar;
