import React, { useEffect, useRef, useState } from "react";
import Box from "../layout/Box";
import Typography from "../layout/Typography";
import Flex from "../layout/Flex";
import { BsFillTriangleFill } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaReply } from "react-icons/fa";
import { FaFaceSmile } from "react-icons/fa6";
import Button from "../layout/Button";
import moment from "moment";
import { FaFileArchive } from "react-icons/fa";

const SenderFile = ({
  file,
  fileName,
  fileType,
  sentTime,
  replyButton,
  removeButton,
  forwardButton,
}) => {
  const [menuShow, setMenuShow] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!buttonRef.current?.contains(e.target)) {
        setMenuShow(false);
      }
    });
  }, []);

  return fileType == "forward" ? (
    <Box className={"mt-4 text-end group"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        <Typography className="text-secoundaryText text-[15px]">
          You forwarded a file
        </Typography>
      </Box>
      <Box className={"max-w-[35%] inline-block text-start relative mb-1"}>
        <a
          href={file}
          target="_blank"
          className="w-full h-full flex items-center justify-between gap-x-3 py-4 px-4 bg-[#f0f0f0] border border-primaryBorder rounded-[10px]"
        >
          <FaFileArchive className="text-5xl box-content text-secoundaryText" />
          <Typography className="text-lg font-semibold text-[#65676b]">
            {fileName}
          </Typography>
        </a>
        <Flex
          alignItems={"center"}
          className={
            menuShow
              ? "flex absolute top-2/4 -translate-y-2/4 -left-[80px]"
              : "hidden absolute top-2/4 -translate-y-2/4 -left-[80px] group-hover:flex"
          }
          // className={
          //   menuShow
          //     ? "flex absolute top-2/4 -translate-y-2/4 -left-[120px]"
          //     : "hidden absolute top-2/4 -translate-y-2/4 -left-[120px] group-hover:flex"
          // }
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
        </Flex>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText">
        {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  ) : (
    <Box className={"mt-4 text-end group"}>
      <Box className={"max-w-[35%] inline-block text-start relative mb-1"}>
        <a
          href={file}
          target="_blank"
          className="w-full h-full flex items-center justify-between gap-x-3 py-4 px-4 bg-[#f0f0f0] border border-primaryBorder rounded-[10px]"
        >
          <FaFileArchive className="text-5xl box-content text-secoundaryText" />
          <Typography className="text-lg font-semibold text-[#65676b]">
            {fileName}
          </Typography>
        </a>
        <Flex
          alignItems={"center"}
          className={
            menuShow
              ? "flex absolute top-2/4 -translate-y-2/4 -left-[80px]"
              : "hidden absolute top-2/4 -translate-y-2/4 -left-[80px] group-hover:flex"
          }
          // className={
          //   menuShow
          //     ? "flex absolute top-2/4 -translate-y-2/4 -left-[120px]"
          //     : "hidden absolute top-2/4 -translate-y-2/4 -left-[120px] group-hover:flex"
          // }
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
        </Flex>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText">
        {moment(sentTime, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  );
};

export default SenderFile;
