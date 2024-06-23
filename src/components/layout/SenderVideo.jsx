import React, { useEffect, useRef, useState } from "react";
import Box from "./Box";
import Typography from "./Typography";
import Flex from "./Flex";
import { BsFillTriangleFill } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaReply } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import Button from "./Button";
import moment from "moment";

const SenderVideo = ({
  video,
  videoType,
  sentTime,
  removeButton,
  replayButton,
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

  return videoType == "forward" ? (
    <Box className={"mt-4 text-end group"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        <Typography className="text-secoundaryText text-[15px]">
          You forwarded a video
        </Typography>
      </Box>
      <Box className={"max-w-[75%] inline-block text-start relative"}>
        <video
          src={video}
          controls
          className={"w-[300px] rounded-[10px] border border-[#dcdcdc]"}
        />
        <Flex
          alignItems={"center"}
          className={`absolute top-2/4 -translate-y-2/4 -left-[120px] ${
            menuShow ? "flex" : "hidden"
          } group-hover:flex`}
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
                  "w-[120px] bg-white rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] z-[1] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
                }
              >
                <BsFillTriangleFill className=" absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff] " />
                <Button
                  onClick={removeButton}
                  className={
                    "w-full py-2 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Remove
                </Button>
                <Button
                  onClick={forwardButton}
                  className={
                    "w-full py-2 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Forward
                </Button>
              </Box>
            )}
          </button>
          <Box className={"relative group/tooltip"}>
            <FaReply
              onClick={replayButton}
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
          <Box className={"relative group/tooltip"}>
            <BsEmojiSmile className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]" />
            <Typography
              variant="span"
              className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
            >
              React
              <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
            </Typography>
          </Box>
        </Flex>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText">
        {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  ) : (
    <Box className={"mt-4 text-end group"}>
      <Box className={"max-w-[75%] inline-block text-start relative"}>
        <video
          src={video}
          controls
          className={"w-[300px] rounded-[10px] border border-[#dcdcdc]"}
        />
        <Flex
          alignItems={"center"}
          className={`absolute top-2/4 -translate-y-2/4 -left-[120px] ${
            menuShow ? "flex" : "hidden"
          } group-hover:flex`}
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
                  "w-[120px] bg-white rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] z-[1] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
                }
              >
                <BsFillTriangleFill className=" absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff] " />
                <Button
                  onClick={removeButton}
                  className={
                    "w-full py-2 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Remove
                </Button>
                <Button
                  onClick={forwardButton}
                  className={
                    "w-full py-2 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Forward
                </Button>
              </Box>
            )}
          </button>
          <Box className={"relative group/tooltip"}>
            <FaReply
              onClick={replayButton}
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
          <Box className={"relative group/tooltip"}>
            <BsEmojiSmile className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]" />
            <Typography
              variant="span"
              className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
            >
              React
              <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
            </Typography>
          </Box>
        </Flex>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText">
        {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  );
};

export default SenderVideo;
