import React from "react";
import Sprint from "./Sprint";

const Boards = ({ board }: { board: any }) => {
  return (
    <div className="w-full">
      <h2 className="mb-3 flex justify-center w-full">{`${board.board_name}`}</h2>
      {board.sprints.length > 0 ? (
              <div>
                {board.sprints.map((sprint: any, index: any) => (
                  <Sprint sprint={sprint} key={index}></Sprint>
                ))}
              </div>
            ) : (
              <></>
            )}
    </div>
  );
};

export default Boards;
