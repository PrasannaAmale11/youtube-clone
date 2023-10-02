import React,{useContext,useEffect} from 'react'

import { Context } from '../context/contextApi';
// components
import LeftNavBar from '../components/LeftNavBar';
import VideoCard from '../components/VideoCard';


const Feed = () => {
    // useEffect to remove class
  useEffect(()=>{
    document.getElementById('root').classList.remove('custom-h')
  },[])

//   importing obj from context
  const {loading,searchResults} = useContext(Context);
  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
        {/* leftNavbar */}
        
       
            <LeftNavBar />

           
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {!loading && searchResults &&
                        searchResults.map((item,index) => {
                            if (item.type !== "video") return false;
                            return (
                                // videocard
                                <VideoCard
                                key={`${item.video.videoId}-${index}`}
                                    video={item?.video}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
  )
}

export default Feed