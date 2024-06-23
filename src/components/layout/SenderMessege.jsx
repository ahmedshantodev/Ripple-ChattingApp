import React, { useEffect, useRef, useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import Box from "./Box";
import Typography from "./Typography";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaReply } from "react-icons/fa";
import Flex from "./Flex";
import { BsFillTriangleFill } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import Button from "./Button";
import moment from "moment";
import { useSelector } from "react-redux";

const SenderMessege = ({
  messege,
  messegeType,
  repliedtomessege,
  repliedtoname,
  repliedbyname,
  time,
  reactButton,
  replyButton,
  removeButton,
  forwardButton,
  editButton,
}) => {
  const activeUserData = useSelector((state) => state.user.information)
  const [menuShow, setMenuShow] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!buttonRef.current.contains(e.target)) {
        setMenuShow(false);
      }
    });
  }, []);

  return messegeType == "text/normal" ? (
    <Box className={"mt-4 group text-end"}>
      <Box className={"max-w-[67%] inline-block relative mb-2 ml-2.5"}>
        <TbTriangleFilled className="text-[22px] text-[#5a3bff] absolute -bottom-[3px] right-[2px] translate-x-2/4" />
        <Typography className="text-start py-2.5 px-5 rounded-[10px] bg-[#5a3bff] text-white break-words">
          {messege}
        </Typography>
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
              } z-20 relative`}
            />
            {menuShow && (
              <Box
                className={
                  "w-[110px] rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white"
                }
              >
                <BsFillTriangleFill className="absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff]" />
                <Button
                  onClick={editButton}
                  className={
                    "w-full py-1 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Edit
                </Button>
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
              className="box-content text-lg p-2 scale-x-[-1] text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
            />
            <Typography
              variant="span"
              className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
            >
              Reply
              <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
            </Typography>
          </Box>
          <div className={"relative"}>
            <Box className={"relative group/tooltip z-10"}>
              <BsEmojiSmile
                className={"box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2] z-20 relative"}
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                React
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
              </Typography>
            </Box>
          </div>
        </Flex>
      </Box>
      <Typography className="font-poppins text-xs font-medium text-secoundaryText">
        {moment(time, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  ) : messegeType == "text/reply" ? (
    <Box className={"mt-4 group text-end"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        <Typography className="text-secoundaryText text-[15px]">
          {activeUserData.displayName == repliedbyname ? "you" : repliedbyname} replied to {activeUserData.displayName == repliedtoname ? "yourself" : repliedtoname}
        </Typography>
      </Box>
      <Box>
        <Typography
          className={"bg-[#f5f5f5] text-[#65676b] inline-block pt-2 px-5 pb-5 -mb-3 rounded-t-[10px] rounded-bl-[10px] max-w-[45%] text-start"}
        >
          {repliedtomessege}
        </Typography>
      </Box>
      <Box className={"max-w-[67%] inline-block relative mb-2 ml-2.5"}>
        <TbTriangleFilled className="text-[22px] text-[#5a3bff] absolute -bottom-[3px] right-[2px] translate-x-2/4" />
        <Typography
          className="text-start py-3 px-6 rounded-[10px] bg-[#5a3bff] text-white break-words border-l border-red-400"
        >
          {messege}
        </Typography>
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
              } z-20 relative`}
            />
            {menuShow && (
              <Box
                className={
                  "w-[110px] rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white"
                }
              >
                <BsFillTriangleFill className="absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff]" />
                <Button
                  onClick={editButton}
                  className={
                    "w-full py-1 font-semibold rounded-lg hover:bg-[#f2f2f2] text-[#6a6b6d]"
                  }
                >
                  Edit
                </Button>
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
              className="box-content text-lg p-2 scale-x-[-1] text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
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
            <BsEmojiSmile
              onClick={reactButton}
              className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2] z-20 relative"
            />
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
        {moment(time, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  ) : (
    <Box className={"mt-4 group text-end"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        <Typography className="text-secoundaryText text-[15px]">
          You forwarded a message
        </Typography>
      </Box>
      <Box className={"max-w-[67%] inline-block relative mb-2 ml-2.5"}>
        <TbTriangleFilled className="text-[22px] text-[#5a3bff] absolute -bottom-[3px] right-[2px] translate-x-2/4" />
        <Typography className="text-start py-3 pr-6 pl-8 rounded-[10px] bg-[#5a3bff] text-white break-words border-l border-red-400 relative after:content-[''] after:w-[3px] after:h-[calc(100%-24px)] after:bg-[#d0c3ff] after:absolute after:left-4 after:top-2/4 after:-translate-y-2/4 after:rounded-[30px]">
          {messege}
        </Typography>
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
              } z-20 relative`}
            />
            {menuShow && (
              <Box
                className={
                  "w-[110px] rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white"
                }
              >
                <BsFillTriangleFill className="absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff]" />
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
              className="box-content text-lg p-2 scale-x-[-1] text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
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
            <BsEmojiSmile
              onClick={reactButton}
              className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2] z-20 relative"
            />
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
        {moment(time, "YYYYMMDDh:mm").fromNow()}
      </Typography>
    </Box>
  );
};

export default SenderMessege;
