import React, { useState } from "react";
import AccordionProject from "./AccordionProject";
import { Transition } from "@headlessui/react";
import { TruckFlatbed } from "@styled-icons/bootstrap";

const SearchResult = ({ root }: { root: any }) => {
  return (
    // whole container
    <div className="flex items-center justify-between mb-5">
      {/* text */}

      <div className="inline-flex flex-col items-start justify-center text-left text-2xl gap-6 w-full ">
          <AccordionProject root={root}></AccordionProject>
      </div>
    </div>
  );
};

export default SearchResult;
