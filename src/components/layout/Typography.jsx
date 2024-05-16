import React from "react";

const Typography = (props) => {
  return props.variant ? (
    <props.variant className={props.className}>{props.text}</props.variant>
  ) : (
    <p className={props.className}>{props.text}</p>
  );
};

export default Typography;
