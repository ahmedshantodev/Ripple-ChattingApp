import React from "react";

const Link = ({ href, target, className, children }) => {
  return (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  );
};

export default Link;
