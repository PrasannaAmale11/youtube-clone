import React,{useState,useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';

// import data
import { Context } from '../context/contextApi';
import {fetchDataFromApi}  from '../utils/api';
// components
import LeftNavBar from '../components/LeftNavBar';
import SearchResultsVideoCard from '../components/SearchResultsVideoCard';


const SearchResults = () => {
  // importing loading objects from context 
  const {setLoading} = useContext(Context);
  // setting state for results
  const[result , setResult] = useState();
  // searchQuery params
  const {searchQuery} = useParams();

  // useEffect hook
  useEffect(() =>{
    document.getElementById("root").classList.remove('custom-h');
    fearchSearchResults()
  },[searchQuery])

  // fetching data from utils/api.js
  const fearchSearchResults = () =>{
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) =>{
      // console.log(res);
      setResult(res?.contents);
      setLoading(false);
    })
  }
  return (
    <div className="flex flex-row h-[calc(100%-64px)] ">
      {/* leftnavbar component */}
        <LeftNavBar/>
        {/* fetched videos  */}
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black ">
          <div className="grid grid-cols-1 p-5 gap-2">
            {result?.map((item)=>{
              if(item.type!== "video") return false;
              let video = item?.video;
              return(
                // to searchResultsVideoCard
                <SearchResultsVideoCard key={video?.videoId} 
                video={video}
                />
              )
            })}
          </div>
        </div>
    </div>
  )
}

export default SearchResults