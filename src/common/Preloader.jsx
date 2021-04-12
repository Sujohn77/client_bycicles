import preloadImg from "../assets/imgs/preload.svg";
import React from "react";

const Preloader = () => {
  return (
    // eslint-disable-next-line react/style-prop-object
    <div className="preloader" style={{ textAlign: "center" }}>
      {<img src={preloadImg} alt="" />}
    </div>
  );
};
export default Preloader;
