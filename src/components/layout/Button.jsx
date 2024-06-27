import React from "react";

const Button = ({ id, onClick,onKeyDown, className, ref, children }) => {
  return (
    <button id={id} onClick={onClick} onKeyDown={onKeyDown} className={className} ref={ref}>
      {children}
    </button>
  );
};

export default Button;
