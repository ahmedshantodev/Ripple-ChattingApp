import React from "react";

const Flex = ({ justifyContent, alignItems, className, children }) => {
  return (
    <div
      className={`flex justify-${justifyContent} items-${alignItems} ${className}`}
    >
      {children}
    </div>
  );
};

export default Flex;
