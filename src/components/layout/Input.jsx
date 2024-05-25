import React from "react";

const Input = ({ ref, type, id, onChange, value, name, placeholder, className, autoFocus }) => {
  return (
    <input
      ref={ref}
      name={name}
      id={id}
      autoFocus={autoFocus ? autoFocus : false}
      value={value}
      onChange={onChange}
      type={type ? type : "text"}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
