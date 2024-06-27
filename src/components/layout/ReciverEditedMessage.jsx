import React from "react";
import Typography from "./Typography";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaReply } from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";
import moment from "moment";
import Box from "./Box";
import Image from "./Image";
import Flex from "./Flex";

const ReciverEditedMessage = ({
  message,
  sentTime,
  name,
  profile,
  reactButton,
  replyButton,
  forwardButton,
}) => {
  return (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          title={name}  
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1"}>
          <Typography className="text-secoundaryText text-[15px]">
            Edited
          </Typography>
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#f0f0f0] rounded-[20px] py-2.5 px-5 text-black font-open-sans text-[15px]">
            {message}
          </Typography>
          <Box className={"absolute bottom-0 -left-[17px] flex"}>
            <Box
              className={
                "w-[12px] h-[20px] bg-[#ffffff] rounded-br-[10px] translate-x-[5px]"
              }
            ></Box>
            <Box
              className={"w-[19px] h-[20px] bg-[#f0f0f0] rounded-br-[15px]"}
            ></Box>
          </Box>
          <Flex
            alignItems={"center"}
            className={"hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"}
          >
            <Box className={"relative group/tooltip z-10"}>
              <FaFaceSmile
                onClick={reactButton}
                className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                React
                <Box
                  className={
                    "w-[10px] h-[10px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                  }
                ></Box>
              </Typography>
            </Box>
            <Box className={"relative group/tooltip z-10"}>
              <FaReply
                onClick={replyButton}
                className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                Reply
                <Box
                  className={
                    "w-[10px] h-[10px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                  }
                ></Box>
              </Typography>
            </Box>
            <Box className={"relative group/tooltip z-10"}>
              <IoShareSocialSharp
                onClick={forwardButton}
                className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                Forward
                <Box
                  className={
                    "w-[10px] h-[10px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                  }
                ></Box>
              </Typography>
            </Box>
          </Flex>
        </Box>
        <Typography className="font-poppins text-xs font-medium text-secoundaryText -ml-1">
          {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReciverEditedMessage;
