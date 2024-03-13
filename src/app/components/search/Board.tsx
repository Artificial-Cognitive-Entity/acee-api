import React from "react";
import Sprint from "./Sprint";

const Boards = ({ board }: { board: any }) => {
  return (
    <div className="w-full">
      <h2 className="mb-3 flex justify-center w-full text-2xl text-content text-center">{board.child_title}</h2>

      {board.items.length > 0 ? (
              <div>
                {board.items.map((item: any, index: any) => (
                  <Sprint item={item} key={index} url={board.child_url}></Sprint>
                ))}
              </div>
            ) : (
              <></>
            )}
    </div>
  );
};

export default Boards;
