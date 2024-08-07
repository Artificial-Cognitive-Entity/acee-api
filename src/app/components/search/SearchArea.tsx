// TODO: FORMAT SEARCH RESULTS SO IT LOOKS PRETTY
// TODO: RIGHT CLICK SEARCH RESULT -> CHATBOT QUERY
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Button from "../button";
import SearchResult from "./SearchResult";
import Loader from "@/app/lib/loader";
import NotFound from "./NotFound";
import { Transition } from "@headlessui/react";
import SearchGreeting from "./SearchGreeting";

const SearchArea = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResult] = useState<any[]>([]);
  const [asked, setAsked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  const onEnterPress = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleAsked();
      handleSubmit(e);
    }
  };

  const handleAsked = () => {
    setAsked(true);
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
      setResult(response.result);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overscroll-none">
      <form
        className="w-full inline-flex items-center justify-center gap-8 mt-12 mb-5"
        onSubmit={handleSubmit}
        onKeyDown={onEnterPress}
      >
        <TextareaAutosize
          className="w-9/12 resize-none rounded-lg text-black"
          maxRows={4}
          placeholder="enter anything"
          autoFocus
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
        ></TextareaAutosize>
        <Button
          type="submit"
          className="w-1/12 rounded-lg bg-purple-900 hover:bg-purple-700 text-white"
          onClick={handleAsked}
        >
          enter
        </Button>
      </form>
      {!asked && <SearchGreeting></SearchGreeting>}
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
        <>
          {asked ? (
            !results.length ? (
              <div className="w-full flex content-center justify-center">
                0 search results found
              </div>
            ) : results.length == 1 ? (
              <div className="w-full flex content-center justify-center">
                {results.length} search result found
              </div>
            ) : (
              <div className="w-full flex content-center justify-center">
                {results.length} search results found
              </div>
            )
          ) : (
            <></>
          )}

          <div className=" mt-12 mb-12 flex justify-center self-center overflow-y-auto w-9/12 h-screen">
            {results.length > 0 ? (
              <>
                <div className="flex flex-col content-center text-base rounded-lg w-full">
                  {results.map((root, index) => (
                    <SearchResult root={root} key={index}></SearchResult>
                    ))}
                </div>
              </>
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
                      <div className="text-3xl text-center">
                        Sorry, we could not find anything.
                        <br />
                        Try something else!
                      </div>
                    </Transition>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchArea;
