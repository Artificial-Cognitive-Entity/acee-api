import React from "react";
import SearchIcon from "./SearchIcon";

// greeting for search page
const SearchGreeting = () => {
  return (
    <div className="w-full h-full gap-6 inline-flex flex-col items-center justify-center mt-36">
      <SearchIcon></SearchIcon>
      <div className="text-3xl text-white">Search your company database</div>
    </div>
  );
};

export default SearchGreeting;
