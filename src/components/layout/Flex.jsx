import React from "react";

const Flex = ({ justifyContent, alignItems, className, children }) => {
  return (
    <div
      className={`flex justify-${justifyContent ? justifyContent : "start"} items-${alignItems ? alignItems : "start"} ${className}`}
    >
      {children}
    </div>
  );
};

export default Flex;
