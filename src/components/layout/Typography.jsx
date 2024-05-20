import React from "react";

const Typography = (props) => {
  return props.variant ? (
    <props.variant className={props.className}>{props.children}</props.variant>
  ) : (
    <p className={props.className}>{props.children}</p>
  );
};

export default Typography;
