// import { useState, useContext, createContext } from "react";

// const SearchContext = createContext();
// const SearchProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     keyword: "",
//     results: [],
//   });

//   return (
//     <SearchContext.Provider value={[auth, setAuth]}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

// // custom hook
// const useSearch = () => useContext(SearchContext);

// export { useSearch, SearchProvider };

import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const updateSearchQuery = (query) => {
    console.log("New Search Query:", query);
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
