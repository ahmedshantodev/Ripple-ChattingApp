import React from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import moment from "moment";

const SenderDeletedMessage = ({ sentTime }) => {
  return (
    <Box className={"mt-5 group text-end"}>
      <Box className={"max-w-[67%] inline-block relative mb-1 ml-2.5 "}>
        <Typography className="inline-block bg-[#e0e3ea] text-secoundaryText rounded-[20px] py-2.5 px-5 font-open-sans text-[15px] italic">
          you unsent a message
        </Typography>
        <Box className={"absolute bottom-0 -right-[17px] flex z-0"}>
          <Box
            className={"w-[19px] h-[20px] bg-[#e0e3ea] rounded-bl-[15px]"}
          ></Box>
          <Box
            className={
              "w-[12px] h-[20px] bg-[#ffffff] rounded-bl-[10px] -translate-x-[5px]"
            }
          ></Box>
        </Box>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText -ml-1">
        {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  );
};

export default SenderDeletedMessage;
