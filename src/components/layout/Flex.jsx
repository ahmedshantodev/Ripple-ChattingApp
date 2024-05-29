import React from "react";

const Flex = ({ onClick, justifyContent, alignItems, className, children }) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-${
        justifyContent ? justifyContent : "start"
      } items-${alignItems ? alignItems : "start"} ${className}`}
    >
      {children}
    </div>
  );
};

export default Flex;
