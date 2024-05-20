import React from "react";

const Input = ({ ref, type, id, onChange, value, name, placeholder, className }) => {
  return (
    <input
      ref={ref}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      type={type ? type : "text"}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
