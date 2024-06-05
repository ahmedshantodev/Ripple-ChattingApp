import React from "react";
import { IoMdSearch } from "react-icons/io";
import Input from "./Input";
import Box from "./Box";

const SearchBox = ({ onClick, onChange, placeholder, className }) => {
  return (
    <Box className={`relative ${className}`}>
      <IoMdSearch
        onClick={onClick}
        className="box-content text-2xl text-[#514f4f8e] absolute top-2/4 -translate-y-2/4 left-[12px] cursor-pointer hover:scale-105"
      />
      <Input
        onChange={onChange}
        placeholder={placeholder}
        className={"bg-[#f4f4f4] py-3 pr-5 pl-[40px] w-full rounded-3xl outline-[#dddcea]"}
      />
    </Box>
  );
};

export default SearchBox;
