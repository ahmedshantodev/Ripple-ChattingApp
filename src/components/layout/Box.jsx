import React from "react";

const Box = ({ onClick, className, children }) => {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};

export default Box;
