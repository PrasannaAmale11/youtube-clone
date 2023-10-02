import React,{useState,useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';
// Video player
import ReactPlayer from 'react-player';
// Icons
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { abbreviateNumber } from 'js-abbreviation-number';

// Components

import SuggestionVideoCard from '../components/SuggestionVideoCard';

// importing data
import { fetchDataFromApi } from '../utils/api';
import { Context } from '../context/contextApi';



const VideoDetails = () => {
  // importing obj from context
  const {setLoading} = useContext(Context);

  // settingUp states
  const[video,setVideo] = useState();
  const [relatedVideos,setRelatedVideos] = useState();
  // id of each video
  const{id} = useParams()
  
  useEffect(()=>{
    document.getElementById('root').classList.add('custom-h');
    fetchCurrentVideoDetails();
    fetchRelatedVideos();
  },[id])

  const fetchCurrentVideoDetails = () =>{
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) =>{
      // console.log(res);
      setVideo(res);
      setLoading(false);
    });
  }

  const fetchRelatedVideos = () =>{
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) =>{
      // console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    });
  }

  return (
    <>
    
   
    <div className="flex justify-center flex-row h-[calc 100%-64px] bg-black ">
    
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        
      
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto ">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            {/* Video Player */}
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "#000000" }}
                            playing={true}
                        />
            </div>
            {/* Video title */}
            <div className="text-white font-bold text-sm md:text-xl  mt-4 line-clamp-2">
              {video?.title}
            </div>

            <div className="flex justify-between flex-col md:flex-row mt-4">
              <div className="flex">
                {/* channel logo */}
                <div className="flex items-start h-11 w-11 rounded-full overflow-hidden">
                    <img src={video?.author?.avatar?.[0]?.url} alt="channel_logo" className='h-full object-cover' />
                </div>
                <div className="flex flex-col ml-3">
                  <div className="text-white text-md font-semibold flex items-center">
                    {/* channel name and verified badge */}
                    {video?.author?.title}
                    {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className='text-white/[0.6] text-[15px] ml-1'/>
                    )} 
                  </div>
                  {/* subscribers count */}
                  <div className="text-white/[0.5] text-sm ">
                    {video?.author?.stats?.subscribersText}
                  </div>
                </div>
              </div>
              <div className="flex text-white md:mt-4 mt-4">
                <div className="flex items-center justify-center mr-2 h-11 px-6 rounded-3xl  bg-white/[0.15] ">
                  {/* Like icon */}
                  <AiOutlineLike className='text-xl text-white'/>
                  <span className="flex">
                    {/* Likes on video */}
                    {`${abbreviateNumber(video?.stats?.likes, 2)}`} Likes
                  </span>
                </div>
                <div className="flex items-center justify-center h-11 rounded-3xl px-6 bg-white/[0.15] ml-2 ">
                 {/* Views on video */}
                  <span className="flex">
                    {`${abbreviateNumber(video?.stats?.views, 2)}`} Views
                  </span>
                </div>
              </div>
            </div>
        </div>
        {/* Related or video suggestions  */}
        <div className="text-white flex flex-col py-6 px-4  overflow-y-auto lg:w-[350px] xl:w-[400px] ">
            {relatedVideos && relatedVideos.contents && relatedVideos.contents.map((item,index)=>{
              if(item.type !== 'video') return false;
              return(
                // suggestion video card
                 <SuggestionVideoCard key={index} video={item.video} />
                )
            })}
        </div>
      </div>
    </div>
    </>
  )
}

export default VideoDetails