import React, { createContext,useState,useEffect } from 'react';

import {fetchDataFromApi} from '../utils/api';
// exporting context
export const Context = createContext();

// exporting AppContext
export const AppContext = (props) => {
   
    const [searchResults , setSearchResults] = useState([]);
    const [loading , setLoading] = useState(false);
    const [selectCategories , setSelectCategories] = useState("New");
    const [mobileMenu , setMobileMenu] = useState(false);

    // selecte categories
    useEffect(() =>{
        fetchSelectedCategoriesData(selectCategories)
    },[selectCategories])

    // fetching categories from API
    const fetchSelectedCategoriesData = (query) => {
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then(({contents})=>{
            // console.log(contents);
            setSearchResults(contents);
            setLoading(false);
        })
        
    }

    return (
        // to export as obj 
        <Context.Provider value={{
            loading,
            setLoading,
            searchResults,
            setSelectCategories,
            selectCategories,
            mobileMenu,
            setMobileMenu
        }}>
            {props.children}
        </Context.Provider>
    )
}

