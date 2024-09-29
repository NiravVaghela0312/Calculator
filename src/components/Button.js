import React from "react";

const Button = ({btnTxt,clickFunc,sqr,isFullScreen}) => {
  return (
    <>
      <div
        className="cal-btn" 
        onClick={!isFullScreen? clickFunc : undefined}
      >
        {btnTxt}{sqr && <sup className="sup">2</sup>}
      </div>
    </>
  );
};

export default Button;
