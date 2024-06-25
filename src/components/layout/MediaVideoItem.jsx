import React from "react";
import Box from "./Box";

const MediaVideoItem = ({video, className}) => {
  return (
    <Box className={className}>
      <video
        src={video}
        controls
        className={"w-full rounded aspect-square object-cover border border-[#f2f2f2] cursor-pointer"}
      />
    </Box>
  );
};

export default MediaVideoItem;
