import React from "react";
import Box from "./Box";
import { FaFileArchive } from "react-icons/fa";
import Typography from "./Typography";

const MediaFileItem = ({ file, fileName, className }) => {
  return (
    <Box className={`mb-2 ${className}`}>
      <a
        href={file}
        target="_blank"
        className="w-full h-full flex items-center gap-x-3 py-4 px-4 bg-[#f0f0f0] border border-primaryBorder rounded-[10px]"
      >
        <FaFileArchive className="text-4xl box-content text-secoundaryText" />
        <Typography className="text-lg font-semibold text-[#65676b] whitespace-nowrap overflow-hidden text-ellipsis w-[80%]">
          {fileName}
        </Typography>
      </a>
    </Box>
  );
};

export default MediaFileItem;
