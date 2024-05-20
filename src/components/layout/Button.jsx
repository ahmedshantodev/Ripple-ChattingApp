import React from "react";

const Button = ({ onClick, className, ref, children }) => {
  return (
    <button onClick={onClick} className={className} ref={ref}>
      {children}
    </button>
  );
};

export default Button;
