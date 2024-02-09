import React from "react";
import Sidebar from "../navigation/sidebar/sidebar";
import RightSide from "./right_side";
import MenuIcon from "../navigation/sidebar/menu";

const Dash = () => {
  return (
    <div className=" h-full w-full drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center bg-base-200">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-red drawer-button lg:hidden self-start"
        >
         <MenuIcon/>
        </label>
        <RightSide />
      </div>
      <div className="drawer-side">
        <Sidebar></Sidebar>
      </div>
    </div>
  );
};

export default Dash;
