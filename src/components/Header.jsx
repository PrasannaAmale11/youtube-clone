import React, { useContext, useState } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Common/Loader';

// YouTube Logo
  import desktopLogo from '../assets/yt-logo.png';
  import mobileLogo from '../assets/yt-logo-mobile.png';

// React-Icons
import {SlMenu} from 'react-icons/sl';
import {IoIosSearch} from 'react-icons/io/index';
import {BsMicFill} from 'react-icons/bs';
import {RiVideoAddLine} from 'react-icons/ri';
import {FiBell} from 'react-icons/fi';
import {CgClose} from 'react-icons/cg';

// import Data 
import { Context } from '../context/contextApi';


const Header = () => {

  // Voice recognition Function (only supported in crome )
  const voiceInputHandler = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      navigation(`/searchResult/${transcript}`);
    };
    recognition.start();
  };
  
  // search Query state
  const [searchQuery, setSearchQuery] = useState('');

  // importing from context
  const {loading,setMobileMenu,mobileMenu} = useContext(Context);

  // nagivate to searched query 
  const navigation = useNavigate();

  // Search query
  const searchQueryHandler = (event) =>{
    if((event?.key === 'Enter' || event=== "searchButton")&& searchQuery.length > 0){
      navigation(`/searchResult/${searchQuery}`);
    }
  }

// Clear search query inside input field
  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  // Mobile view Toggle to hide and show with respect to screen size
  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
};

  const{pathName} = useLocation();
  const pageName = pathName?.split('/')?.filter(Boolean)?.[0]

  return (
    <div className='sticky top-0 z-10 flex flex-row h-16 items-center justify-between  px-4 md:px-5 bg-white dark:bg-black'>
      {/* multi color loader at top */}
      {loading && <Loader/>}

              {/*  Toggle  "icon" for opening and closing left nav   */}
      <div className="flex h-4 item-center justify-center " >
        {pageName !== 'video' && (
          <div className="flex md:hidden md:mr-6 cursur-pointer items-center justify-center h-8 w-8 rounded-full hover:bg[#303030]/[0.6]" onClick={mobileMenuToggle}>
            {mobileMenu ? (<CgClose className='text-white text-xl' />) : (<SlMenu className='text-white text-xl'/>) }
          </div>
        )}

        {/* Clickable Logo which will navigate to "/" i.e "home"   */}

        <Link to='/' className='flex h-5 items-center justify-center'>
          {/* Desktop logo hidden in small screens */}
        <img src={desktopLogo} alt="logo" className='h-full hidden dark:md:block text-center ml-1' />
        {/* Mobile logo hidden in large screens */}
        <img src={mobileLogo} alt="logo" className='h-full md:hidden text-center ml-1 mt-2' />
        </Link>
        </div>

        {/* Search bar begains here */}
        <div className="group flex items-center">
          <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
            <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
              <IoIosSearch className="text-white text-xl"/>
            </div>
                    
              {/* Search bar */}
                    
              <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-[120px] md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
              />
                    {/* Close icon to clear input text appear  only when text is enter */}
                    {searchQuery &&
                        <button className="relative top-0 right-0 h-full px-2" onClick={clearSearchQuery}>
                        <CgClose className="text-white text-xl" />
                        </button>
                     }
          </div>
                     {/* Search button */}
                <button className='w-[20px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-[white]/[0.1]' onClick={() => searchQueryHandler("searchButton")}>
                  <IoIosSearch className="text-white text-xl submit" />
                </button>

                {/* Voice recognistion (webkitSpeechRecognition)  only supported in crome ;( */}
                <button className="w-[30px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-full ml-1 bg-[white]/[0.1]">
                  <BsMicFill className="text-white text-xl" onClick={voiceInputHandler} />
                </button>
                
        </div>

            {/* Bell, UploadVideo and Avatar Icon hidden in small screens  */}
        <div className="flex items-center justify-center">
          <div className="hidden md:flex">
            <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
              <RiVideoAddLine className='text-white text-xl cursor-pointer ' />
            </div>
            <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6] ml-3">
              <FiBell className='text-white text-xl cursor-pointer ' />
            </div>
            
          </div>
          <div className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-[#303030]/[0.6] ml-1 xl:w-10 xl:h-10" >
             <img src="https://i.pravatar.cc/50" alt="" className='rounded-full cursor-pointer' />
            </div>
        </div>

    </div>  
  )
}

export default Header