import React ,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import LeftNavBarMenuItems from './LeftNavBarMenuItems';

// import Data
import {categories} from '../utils/constants';
import { Context } from '../context/contextApi';

const LeftNavBar = () => {
  const navigate = useNavigate();
  // import objects from context
  const {selectCategories,setSelectCategories,mobileMenu} = useContext(Context);

    // switch cases to Set-selected category
  const clickHandler = (name,type) =>{
    switch (type) {
      case "category":
        return setSelectCategories(name);
      case "home":
        return setSelectCategories(name);
      case "menu":
        return false;
        
        
    
      default:
        break;
    }
  }
  return (
    // display the LeftNav respect to screen size
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
      mobileMenu ? "translate-x-1" : "traslate-x-0"
  }`} >
      <div className="flex px-5 flex-col"> 
        {categories.map((item)=>{
          return (
            <React.Fragment key={item.name}>
              {/* importing and giving name , icons to categories from constants.js */}
                <LeftNavBarMenuItems
                // name of category
                  text={item.type === 'home' ? "Home" : item.name}
                  // icon of category
                  icon ={ item.icon}
                  
                  // onclick navigate
                  action ={()=>{
                    clickHandler(item.name, item.type);
                    navigate("/")}}
                    // changing backgrounds of selected categories
                  className ={`${selectCategories=== item.name ? "bg-white/[0.15]": ""}`}
                  
                />
                {/* Horizontal Line */}
                {item.divider && (
                  <hr className="my-5 border-white/[0.2]"/>
                )}
            </React.Fragment>
          )
        })}
        {/* horizontal line */}
         <hr className="my-5 border-white/[0.2]"/>
         <div className="text-white/[0.5] text-[12px]">YouTubeClone</div>
      </div>

    </div>
  )
}

export default LeftNavBar