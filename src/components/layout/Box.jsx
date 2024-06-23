import React from "react";

const Box = ({ index, onClick, className, children }) => {
  return (
    <div key={index} onClick={onClick} className={className}>
      {children}
    </div>
  );
};

export default Box;
