import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between h-24 bg-white shadow-md z-50 px-10">
      <img src="/assets/logo.png" alt="logo" className="w-[120px]"/>

      {/* Mobile Menu Icon */}
      <div className='space-y-1 cursor-pointer z-50 h-auto  md:hidden' onClick={toggleMenu}>
        <div className={`w-5 h-[0.1rem] bg-btnDark transition-all duration-300 ${openMenu ? 'transform rotate-45 translate-y-[0.4rem]' : ''}`}></div>
        <div className={`w-5 h-[0.1rem] bg-btnDark transition-all duration-300 ${openMenu ? 'opacity-0' : ''}`}></div>
        <div className={`w-5 h-[0.1rem] bg-btnDark transition-all duration-300 ${openMenu ? 'transform -rotate-45 -translate-y-[0.3rem]' : ''}`}></div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="text-btnDark text-sm hover:text-black active:text-sky-800">Home</Link>
        <Link to="#" className="text-btnDark text-sm hover:text-black active:text-sky-800">Careers</Link>
        <Link to="#" className="text-btnDark text-sm hover:text-black active:text-sky-800">Blog</Link>
        <Link to="#" className="text-btnDark text-sm hover:text-black active:text-sky-800">About Us</Link>
        <Link to="#" className="text-btnDark text-sm hover:text-black active:text-sky-800">Onboarding</Link>
        <button className="bg-btnDark text-white rounded text-sm p-2 transition-colors hover:bg-sky-800 duration-500">ENROLL NOW</button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out ${openMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link to="/" className="text-btnDark text-sm hover:text-black active:text-sky-800 transition-colors duration-500" onClick={toggleMenu}>Home</Link>
          <Link to="#" className="text-btnDark text-sm hover:text-black active:text-sky-800 transition-colors duration-500" onClick={toggleMenu}>Careers</Link>
          <Link to="#" className="text-btnDark text-sm hover:text-black active:text-sky-800 transition-colors duration-500" onClick={toggleMenu}>Blog</Link>
          <Link to="#" className="text-btnDark text-sm hover:text-black active:text-sky-800 transition-colors duration-500" onClick={toggleMenu}>About Us</Link>
          <Link to="#" className="text-btnDark text-sm hover:text-black active:text-sky-800 transition-colors duration-500" onClick={toggleMenu}>Onboarding</Link>
          <button className="bg-btnDark text-white rounded text-sm p-2 transition-colors hover:bg-sky-800 duration-500 " onClick={toggleMenu}>ENROLL NOW</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
