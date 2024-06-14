import React from "react";

const Button = ({ id, onClick, className, ref, children }) => {
  return (
    <button id={id} onClick={onClick} className={className} ref={ref}>
      {children}
    </button>
  );
};

export default Button;
