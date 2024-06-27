import React, { useEffect, useRef, useState } from "react";
import Box from "./Box";
import Typography from "./Typography";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaReply } from "react-icons/fa";
import Flex from "./Flex";
import { FaFaceSmile } from "react-icons/fa6";
import Button from "./Button";
import moment from "moment";

const SenderForwardMessage = ({
  message,
  sentTime,
  reactButton,
  replyButton,
  removeButton,
  forwardButton,
}) => {
  const [menuShow, setMenuShow] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!buttonRef.current.contains(e.target)) {
        setMenuShow(false);
      }
    });
  }, []);

  return (
    <Box className={"mt-5 group text-end"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        <Typography className="text-secoundaryText text-[15px]">
          You forwarded a message
        </Typography>
      </Box>
      <Box className={"max-w-[67%] inline-block relative mb-1 "}>
        <Typography className="text-start break-words bg-[#077aff] text-white rounded-[20px] py-2.5 px-5 font-open-sans text-[15px]">
          {message}
        </Typography>
        <Box className={"absolute bottom-0 -right-[17px] flex"}>
          <Box
            className={"w-[19px] h-[20px] bg-[#077aff] rounded-bl-[15px]"}
          ></Box>
          <Box
            className={
              "w-[12px] h-[20px] bg-[#ffffff] rounded-bl-[10px] -translate-x-[5px]"
            }
          ></Box>
        </Box>
        <Flex
          alignItems={"center"}
          className={
            menuShow
              ? "flex absolute top-2/4 -translate-y-2/4 -left-[120px]"
              : "hidden absolute top-2/4 -translate-y-2/4 -left-[120px] group-hover:flex"
          }
        >
          <button ref={buttonRef} className={"relative"}>
            <PiDotsThreeOutlineVerticalFill
              onClick={() => setMenuShow(!menuShow)}
              className={`box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2] ${
                menuShow ? "bg-[#f2f2f2]" : "bg-white"
              }`}
            />
            {menuShow && (
              <Box
                className={
                  "w-[110px] rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[45px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white"
                }
              >
                <Box
                  className={
                    "w-[12px] h-[12px] bg-white rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                  }
                ></Box>
                <Button
                  onClick={removeButton}
                  className={
                    "w-full py-1 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Remove
                </Button>
                <Button
                  onClick={forwardButton}
                  className={
                    "w-full py-1 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Forward
                </Button>
              </Box>
            )}
          </button>
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
        </Flex>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText -ml-1">
        {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  );
};

export default SenderForwardMessage;
