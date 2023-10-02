import React from 'react';
import { Link } from 'react-router-dom';
// abberaviatenumber i.e 4100 = 4.1k 
import { abbreviateNumber } from 'js-abbreviation-number';

// video length i.e 60s to 0:01:00 format
import VideoLength from '../Common/VideoLength';

// verified channel icon
import { BsFillCheckCircleFill } from 'react-icons/bs';

// imported video from feed
const VideoCard = ({video}) => {
  return (

    // navigate to videoID
    <Link to={`/video/${video.videoId}`}>
      <div className="flex flex-col mb-8">
        {/* thumbnail with video duration */}
        <div className="relative h-50 md:h-40 md:rounded-xl overflow-hidden">
          <img className='h-full w-full object-cover ' src={video?.thumbnails?.[0].url} alt="" />
          <VideoLength time={video?.lengthSeconds}/>
        </div>
        
        <div className="text-white flex mt-3">
          <div className="flex items-start">
            {/* channel logo  */}
            <div className="flex h-9 w-9 rounded-full overflow-hidden text-white">
                <img src={video?.author?.avatar?.[0]?.url} alt="avatar" className='object-cover h-full w-full'   />
               
                
            </div>
            <div className="flex flex-col overflow-hidden text-white ml-3">
              {/* video title */}
              <span className='text-sm font-bold line-clamp-2'>
                {video?.title}
              </span>
              {/* video channel name and verified badge  */}
              <span className='text-[12px] mt-2 font-semibold text-white/[0.7] flex items-center '>
                {video?.author?.title}
                {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className='text-white/[0.6] text-[15px] ml-1'/>
                )} 
              </span>
              <div className="flex text-white/[0.7] font-semibold text-[12px] trucate overflow-hidden">
                {/* view on video */}
                <span className="flex">
                  {`${abbreviateNumber(video?.stats?.views, 2)}`} views
                </span>
                {/* seperator dot */}
                <span className='flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-9px] mx-3'>
                  .
                </span>
                  {/* publish time of video */}
                <span className='truncate'>
                {video.publishedTimeText}
                </span>
              </div>
              </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard