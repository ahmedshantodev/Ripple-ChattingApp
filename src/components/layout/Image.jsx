import React from "react";

const Image = ({ src, alt, className, onClick,title }) => {
  return <img src={src} alt={alt} className={className} onClick={onClick} title={title}/>;
};

export default Image;
