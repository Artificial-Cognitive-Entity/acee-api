import React from "react";
import SearchIcon from "./SearchIcon";

// greeting for search page
const SearchGreeting = () => {
  return (
    <div className="w-full h-full gap-6 inline-flex flex-col items-center justify-center">
      <SearchIcon></SearchIcon>
      <div className="text-3xl">Search with ACEE</div>
    </div>
  );
};

export default SearchGreeting;
