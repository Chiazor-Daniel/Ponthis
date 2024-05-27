import React, {useEffect, useState} from 'react';
import {NavLink, Link} from 'react-router-dom';

import Logo from './../assets/images/logo.png';
import LogoWhite from './../assets/atlas.png';

function Header(){

    /* for sticky header */
	const [headerFix, setheaderFix] = React.useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			setheaderFix(window.scrollY > 50);
		});
	}, []); 

    const [sidebarOpen, setSidebarOpen] = useState(false);	
    const [showMenu, setShowMenu] = useState(false);	   
    return(
        <>
            <header className="site-header mo-left header header-transparent style-1">
                <div className={`sticky-header main-bar-wraper navbar-expand-lg ${headerFix ? "is-fixed" : ""}`}>
                    <div className="main-bar clearfix">
                        <div className="container clearfix">
                            <div className="logo-header">
                                <Link to={"/"} className=""><img src={LogoWhite}  alt="" style={{height: "100px"}}/></Link>
                            </div>
                            
                            <button  type="button"
                                className={`navbar-toggler  navicon justify-content-end ${sidebarOpen ? 'open' : 'collapsed' }`} 
                                onClick={()=>setSidebarOpen(!sidebarOpen)}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>                            
                            <div className="extra-nav">
                                <div className="extra-cell">
                                    <a className="btn btn-outline-primary text-white" target="_blank" rel="noreferrer" href="http://trader.atlaswavestrader.com/">Login</a>
                                    <a className="btn btn-primary" target="_blank" rel="noreferrer" href="http://trader.atlaswavestrader.com/register">Register</a>
                                </div>
                            </div>                           
                                
                            <div className={`header-nav navbar-collapse collapse justify-content-end ${sidebarOpen ? "show" : ""}`} id="navbarNavDropdown" >
                                <div className="logo-header mostion">
                                    <NavLink to={"#"} className="logo-dark"><img src={LogoWhite} alt="" style={{width: "200px", height: "150px"}}/></NavLink>
                                </div>                            
                                <ul className="nav navbar-nav navbar">
                                    <li><NavLink to={"/"}>Home</NavLink></li>
                                    <li><NavLink to={"/about-us"}>About Us</NavLink></li>
                                    <li><NavLink to={"/pricing"}>Accounts</NavLink></li>
                                    <li><NavLink to={"/new-analysis"}>News</NavLink></li>
                                    {/* <li><NavLink to={"/new-analysis"}>Platform and Tools</NavLink></li> */}
                                    <li className={`sub-menu-down ${showMenu ? "open" : ""}`} id="menushow"
                                       onClick={()=>setShowMenu(!showMenu)}>
                                    </li>
                                    <li><NavLink to={"/contact-us"}>Contact Us</NavLink></li>
                                    {
                                        sidebarOpen && (
                                            <>
                                            <a className="btn btn-primary text-white col-12" target="_blank" rel="noreferrer" href="http://trader.atlaswavestrader.com/">Login</a>
                                            <a className="btn btn-primary col-12 mt-4" target="_blank" rel="noreferrer" href="http://trader.atlaswavestrader.com/">Register</a>
                                            </>
                                        )
                                    }
                                </ul>                               
                            
                                <div className="header-bottom">
                                  
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>

                </div>
            </header>
        </>
    )
}
export default Header;