"use client";
// TODO: FORMAT SEARCH RESULTS SO IT LOOKS PRETTY
//       RIGHT CLICK SEARCH RESULT -> CHATBOT QUERY
//       SUBMIT FORM ON ENTER
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../button";
import SearchResult from "./SearchResult";
import Loader from "@/app/lib/loader";
import NotFound from "./NotFound";
import { Transition } from "@headlessui/react";

interface resultObject {
  project_title: string;
  project_info: any;
}

const SearchArea = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResult] = useState<any[]>([]);
  const [asked, setAsked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (searchTerm.trim() === "") {
      console.log("empty search term!");
    } else {
      const semanticSearch = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          searchTerm: searchTerm,
        }),
      });

      const response = await semanticSearch.json();
      setAsked(true);
      setResult(response.result);
      setLoading(false);
    }
  };


  return (
    <div className="flex h-screen w-full flex-col overscroll-none">
      <form
        className=" mt-12 w-full flex justify-center items-center gap-1"
        onSubmit={handleSubmit}
      >
        <TextareaAutosize
          className="w-9/12 resize-none rounded-lg text-black"
          maxRows={4}
          placeholder="enter anything"
          autoFocus
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
        ></TextareaAutosize>
        <Button type="submit" className="w-1/12 rounded-lg">
          enter
        </Button>
      </form>

      {isLoading ? (
        <div className="flex h-full justify-center items-center">
          <Transition
            appear={true}
            show={isLoading}
            enter="transition-all ease-in-out duration-500 delay-[200ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="inline-flex justify-center items-center flex-col"
          >
            <Loader></Loader>
          </Transition>
        </div>
      ) : (
        <div className=" mt-12 mb-12 flex justify-center self-center overflow-y-auto w-9/12 h-screen">
          {results.length > 0 ? (
            <div className="flex flex-col content-center text-base rounded-lg w-full">
              {results.map((project, index) => (
                <SearchResult project={project} key={index}></SearchResult>
              ))}
            </div>
          ) : (
            <div>
              {asked ? (
                <div>
                  <Transition
                    appear={true}
                    show={!isLoading}
                    enter="transition-all ease-in-out duration-500 delay-[200ms]"
                    enterFrom="opacity-0 translate-y-9"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition-all ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="inline-flex justify-center items-center flex-col"
                  >
                    <NotFound />
                    <p>Sorry, we could not find anything.</p>
                  </Transition>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchArea;
