import React from 'react'

const LeftNavBarMenuItems = ({text,icon,className,action}) => {
  return (
    // getting name, icons, className, action "LeftnavBar" componant 
    <div className={"text-white h-10 flex text-sm cursor-pointer items-center  px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " + className} onClick={action}>
        <span className='text-2xl mr-5 items-center'>{icon}</span>
        {text}
    </div>
  )
}

export default LeftNavBarMenuItems