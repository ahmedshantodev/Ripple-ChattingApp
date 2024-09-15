import React, { useEffect, useRef, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import moment from "moment";
import { MdThumbUpAlt } from "react-icons/md";

const SenderLike = ({ sentTime }) => {
  return (
    <Box className={"mt-5 group flex justify-end"}>
      <MdThumbUpAlt
        className="text-[#007bf5] text-[55px]"
        title={
          <Typography className="font-poppins text-xs font-medium text-secoundaryText -ml-1">
            {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
          </Typography>
        }
      />
    </Box>
  );
};

export default SenderLike;
