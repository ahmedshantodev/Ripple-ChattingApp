import React from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import ModalImage from "react-modal-image";
import Flex from "../layout/Flex";
import { BsFillTriangleFill } from "react-icons/bs";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaReply } from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";
import Image from "../layout/Image";
import moment from "moment";

const ReciverGif = ({
  name,
  profile,
  gif,
  gifName,
  gifType,
  sentTime,
  replyButton,
  forwardButton,
}) => {
  return gifType == "forward" ? (
    <Box className={"mt-4 group flex justify-between items-end"}>
      <Box className={"w-[40px] mb-1"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-48px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          <Typography className="text-secoundaryText text-[15px]">
            {name} forwarded a gif
          </Typography>
        </Box>
        <Box className={"max-w-[75%] inline-block text-start relative"}>
          <ModalImage
            small={gif}
            large={gif}
            alt={gifName}
            className={"w-[300px] rounded-[10px] border border-[#dcdcdc]"}
          />
          <Flex
            alignItems={"center"}
            className={"hidden absolute top-2/4 -translate-y-2/4 -right-[75px] group-hover:flex"}
            // className={
            //   "absolute top-2/4 -translate-y-2/4 -right-[120px] hidden group-hover:flex"
            // }
          >
            {/* <Box className={"relative group/tooltip"}>
              <FaFaceSmile className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]" />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                React
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
              </Typography>
            </Box> */}

            <Box className={"relative group/tooltip"}>
              <FaReply
                onClick={replyButton}
                className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                Reply
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
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
        <Typography className="font-poppins text-xs font-medium text-secoundaryText ml-1">
          {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box className={"mt-4 group flex justify-between items-end"}>
      <Box className={"w-[40px] mb-1"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-48px)]"}>
        <Box className={"max-w-[75%] inline-block text-start relative"}>
          <ModalImage
            small={gif}
            large={gif}
            alt={gifName}
            className={"w-[300px] rounded-[10px] border border-[#dcdcdc]"}
          />
          <Flex
            alignItems={"center"}
            className={"hidden absolute top-2/4 -translate-y-2/4 -right-[75px] group-hover:flex"}
            // className={
            //   "absolute top-2/4 -translate-y-2/4 -right-[120px] hidden group-hover:flex"
            // }
          >
            {/* <Box className={"relative group/tooltip"}>
              <FaFaceSmile className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]" />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                React
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
              </Typography>
            </Box> */}

            <Box className={"relative group/tooltip"}>
              <FaReply
                onClick={replyButton}
                className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                Reply
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
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
        <Typography className="font-poppins text-xs font-medium text-secoundaryText ml-1">
          {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReciverGif;
