import React from 'react'
// abberaviatenumber i.e 4100 = 4.1k 
import { abbreviateNumber } from 'js-abbreviation-number';
import { Link } from 'react-router-dom';
// verified channel icon
import { BsFillCheckCircleFill } from 'react-icons/bs';
// video length i.e 60s to 0:01:00 format
import VideoLength from '../Common/VideoLength';

const SearchResultsVideoCard = ({video}) => {
  return (

    <Link to={`/video/${video.videoId}`}>
      <div className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-4">
        <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
          {/* thumbnail and video duration */}
        <img className='h-full w-full object-cover ' src={video?.thumbnails?.[0].url} alt="thumbnails" />
          <VideoLength time={video?.lengthSeconds}/>
        </div>

        <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          {/* video title  */}
          <span className='text-lg md:text-2xl font-semibold line-clamp-2 text-white'>
            {video?.title}
          </span>
          <div className="flex text-sm text-white/[0.7] font-semibold truncate overflow-hidden  mt-1">
            {/* views on video */}
              <span className="flex">
                  {`${abbreviateNumber(video?.stats?.views, 2)}`} views
                </span>
                <span className='flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-9px] mx-3'>
                  .
                </span>
                {/* publish time of video */}
                <span className='truncate'>
                {video.publishedTimeText}
                </span>
              </div>
          
          <div className="md:flex hidden items-center">
            <div className="flex items-start mr-3">
              <div className="flex h-9 w-9 overflow-hidden rounded-full">
                {/* channel logo */}
                <img src={video?.author?.avatar?.[0]?.url} alt="channel-logo" className='h-full w-full object-cover' />
              </div>
            </div>
            <div className="flex flex-col ">
              <span className=" flex text-sm font-semibold text-white/[0.7] mt-2 items-center">
                {/* channel name with verified badge */}
              {video?.author?.title}
                {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className='text-white/[0.6] text-[15px] ml-1'/>
                )} 
              </span>
              
              
            </div>
            
          </div>
          <span className='empty:hidden line-clamp-1 text-sm md:line-clamp-2 text-white/[0.7] md:pr-4 md:my-4'>
            {/* video description */}
            {video?.descriptionSnippet}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default SearchResultsVideoCard