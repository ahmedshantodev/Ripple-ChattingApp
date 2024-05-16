import React from "react";

const Input = ({ ref, type, id, name, placeholder, className }) => {
  return (
    <input
      ref={ref}
      name={name}
      id={id}
      type={type ? type : "text"}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
