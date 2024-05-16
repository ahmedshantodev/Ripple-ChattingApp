import React from "react";

const Button = ({ onclick, className, ref, children }) => {
  return (
    <button onClick={onclick} className={className} ref={ref}>
      {children}
    </button>
  );
};

export default Button;
