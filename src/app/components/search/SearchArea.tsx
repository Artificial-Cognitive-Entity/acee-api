import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const SearchArea = () => {
  return (
    <div className="flex  h-screen w-full flex-col">
      <div className=" mt-12 flex justify-center">
        <TextareaAutosize
          className="w-7/12 resize-none rounded-lg"
          maxRows={4}
          placeholder="enter anything"
          autoFocus
          id="usermsg"
        ></TextareaAutosize>
      </div>
      <div className=" mt-12 flex justify-center">result</div>
    </div>
  );
};

export default SearchArea;
