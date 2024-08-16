import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
// import logo from '../../src/finlogo.png';
import logo from "../assets/finlogo.png"
import { GiHamburgerMenu } from "react-icons/gi";

const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [shownav, setShownav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const navs = [
        { title: 'Home', path: '/' },
        { title: 'Market', path: '/market' },
        { title: 'Education', path: '/education' },
        { title: 'Accounts', path: '/accounts' },
        // { title: 'News', path: '/news' },
        { title: 'About Us', path: '/about' },
        { title: 'Contact Us', path: '/contact' }
    ];

    return (
        <div className={`bg-black rounded-b-full pb-8`}>
            <div className={`bg-black w-full py-7 flex items-center justify-around shaw rounded-b-full top-0 z-10 transition-all duration-300 ${isScrolled ? 'fixed shadow-slate-500' : 'absolute'}`}>
                <Link to={'/'}>
                    <div className='flex items-center gap-4 cursor-pointer'>
                        <img src={logo} alt="Logo" width={30} height={20} />
                        <p className='text-white text-3xl font-bold'>Finnovent</p>
                    </div>
                </Link>
                <div>
                    <ul className='hidden md:flex gap-8'>
                        {navs.map((nav, index) => (
                            <li key={index} className={`text-white font-semibold cursor-pointer text-lg ${currentPath === nav.path ? 'text-orange-500' : 'hover:text-orange-500'}`}>
                                <Link to={nav.path}>
                                    {nav.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='hidden md:flex gap-4'>
                    <button className='text-white border border-orange-500 px-6 py-2 rounded-xl'>
                        <a href="https://app.finnovent.com" target="_blank" rel="noopener noreferrer">Login</a>
                    </button>
                    <button className='text-white bg-orange-500 px-6 py-2 rounded-xl'>
                        <a href="https://app.finnovent.com/register" target="_blank" rel="noopener noreferrer">Register</a>
                    </button>
                </div>
                <div className='flex md:hidden cursor-pointer' onClick={() => setShownav(!shownav)}>
                    <GiHamburgerMenu size={40} color='white' />
                </div>
            </div>
            {shownav && (
                <div className='rounded-b-full'>
                    <ul className='flex flex-col pt-[100px] gap-4 items-center justify-center '>
                        {navs.map((nav, index) => (
                            <li key={index} onClick={() => setShownav(!shownav)} className={`text-white font-semibold cursor-pointer text-xl ${currentPath === nav.path ? 'text-orange-500' : 'hover:text-orange-500'}`}>
                                <Link to={nav.path}>
                                    {nav.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='flex gap-4 w-full items-center justify-center mt-4'>
                        <button className='text-white border border-orange-500 px-6 py-2 rounded-xl'>
                            <a href="https://app.finnovent.com" target="_blank" rel="noopener noreferrer">Login</a>
                        </button>
                        <button className='text-white bg-orange-500 px-6 py-2 rounded-xl'>
                            <a href="https://app.finnovent.com/register" target="_blank" rel="noopener noreferrer">Register</a>
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Nav;
