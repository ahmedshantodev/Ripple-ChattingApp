import React from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import moment from "moment";
import Image from "../layout/Image";

const ReciverDeletedMessage = ({ senderName, senderProfile, sentTime }) => {
  return (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={senderProfile}
          alt={senderName}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-white border-[2px] border-[#e0e3ea] text-secoundaryText italic rounded-[20px] py-2.5 px-5 font-open-sans text-[15px] relative z-10">
            {senderName} unsent a messeage
          </Typography>
          <Box className={"absolute bottom-0 -left-[17px] flex z-0"}>
            <Box
              className={
                "w-[12px] h-[20px] bg-[#ffffff] rounded-br-[10px] translate-x-[5px]"
              }
            ></Box>
            <Box
              className={"w-[19px] h-[20px] bg-[#e0e3ea] rounded-br-[15px]"}
            ></Box>
          </Box>
        </Box>
        <Typography className="font-poppins text-xs font-medium text-secoundaryText -ml-1">
          {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReciverDeletedMessage;
