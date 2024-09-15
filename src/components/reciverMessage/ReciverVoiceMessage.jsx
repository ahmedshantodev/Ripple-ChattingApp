import React from "react";
import Typography from "../layout/Typography";
import { FaReply } from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";
import moment from "moment";
import Box from "../layout/Box";
import Image from "../layout/Image";
import Flex from "../layout/Flex";

const ReciverVoiceMessage = ({
  name,
  profile,
  voiceType,
  voice,
  sentTime,
  // reactButton,
  replyButton,
  forwardButton,
}) => {
  return voiceType == "forward" ? (
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
      <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          <Typography className="text-secoundaryText text-[15px]">
            {name} forwarded a voice message
          </Typography>
        </Box>
        <Box className={"relative max-w-[70%] inline-block"}>
          <audio src={voice} controls />
          <Flex
            alignItems={"center"}
            className={"hidden absolute top-2/4 -translate-y-2/4 -right-[75px] group-hover:flex"}
            // className={
            //   "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            // }
          >
            {/* <Box className={"relative group/tooltip z-10"}>
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
            </Box> */}

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
        <Typography className="font-poppins text-xs font-medium text-secoundaryText">
          {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  ) : (
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
        <Box className={"relative max-w-[70%] inline-block"}>
          <audio src={voice} controls />
          <Flex
            alignItems={"center"}
            className={"hidden absolute top-2/4 -translate-y-2/4 -right-[75px] group-hover:flex"}
            // className={
            //   "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            // }
          >
            {/* <Box className={"relative group/tooltip z-10"}>
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
            </Box> */}

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
        <Typography className="font-poppins text-xs font-medium text-secoundaryText">
          {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReciverVoiceMessage;
