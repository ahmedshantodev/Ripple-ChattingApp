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
import Image from "./Image";
import { useSelector } from "react-redux";

const ReciverMessege = ({
  name,
  profile,
  messege,
  messegeType,
  repliedtomessege,
  time,
  reactButton,
  replyButton,
  forwardButton,
  repliedtoname,
  repliedbyname,
}) => {
  const activeUserData = useSelector((state) => state.user.information);
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
    <Box className={"mt-4 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-58px)]"}>
        <Box className={"relative max-w-[70%] inline-block mb-2 "}>
          <TbTriangleFilled className="text-[22px] text-[#f0f0f0] absolute -bottom-[3px] left-[2px] -translate-x-2/4" />
          <Typography className="py-3 px-6 rounded-[10px] bg-[#f0f0f0] break-words">
            {messege}
          </Typography>
          <Flex
            alignItems={"center"}
            className={`absolute top-2/4 -translate-y-2/4 -right-[120px] ${
              menuShow ? "flex" : "hidden"
            } group-hover:flex`}
          >
            <Box className={"relative group/tooltip z-10"}>
              <BsEmojiSmile
                onClick={reactButton}
                className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                React
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
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
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
              </Typography>
            </Box>
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
                    "w-[110px] rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white"
                  }
                >
                  <BsFillTriangleFill className="absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff]" />
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
          </Flex>
        </Box>
        <Typography className="font-poppins text-xs font-medium text-secoundaryText mb-1 -ml-2">
          {moment(time, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  ) : messegeType == "text/reply" ? (
    <Box className={"mt-4 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-58px)] w-[95%]s bg-red-300s"}>
        <Box className={"flex items-center gap-x-2 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedbyname == repliedtoname ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedbyname} replied to herself
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedbyname ? "you" : repliedbyname}
              {" "} replied to {" "}
              {activeUserData.displayName == repliedtoname ? "you" : repliedtoname}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography
            className={
              "bg-[#4a40dd] text-white inline-block pt-2 px-5 pb-5 -mb-3 rounded-t-[10px] rounded-br-[10px] max-w-[45%]"
            }
          >
            {repliedtomessege}
          </Typography>
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-2 "}>
          <TbTriangleFilled className="text-[22px] text-[#f0f0f0] absolute -bottom-[3px] left-[2px] -translate-x-2/4" />
          <Typography className="py-3 px-6 rounded-[10px] bg-[#f0f0f0] break-words">
            {messege}
          </Typography>
          <Flex
            alignItems={"center"}
            className={`absolute top-2/4 -translate-y-2/4 -right-[120px] ${
              menuShow ? "flex" : "hidden"
            } group-hover:flex`}
          >
            <Box className={"relative group/tooltip z-10"}>
              <BsEmojiSmile
                onClick={reactButton}
                className="box-content text-lg p-2 bg-white text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                React
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
              </Typography>
            </Box>
            <Box className={"relative group/tooltip z-10"}>
              <FaReply
                onClick={replyButton}
                className="box-content text-lg p-2 bg-white text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                Reply
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
              </Typography>
            </Box>
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
                    "w-[110px] rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white"
                  }
                >
                  <BsFillTriangleFill className="absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff]" />
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
          </Flex>
        </Box>
        <Typography className="font-poppins text-xs font-medium text-secoundaryText mb-1 -ml-2">
          {moment(time, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box className={"mt-4 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-58px)]"}>
        <Box className={"flex items-center gap-x-2 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          <Typography className="text-secoundaryText text-[15px]">
            {name} forwarded a message
          </Typography>
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-2 "}>
          <TbTriangleFilled className="text-[22px] text-[#f0f0f0] absolute -bottom-[3px] left-[2px] -translate-x-2/4" />
          <Typography className="py-3 pr-6 pl-8 rounded-[10px] bg-[#f0f0f0] relative after:content-[''] after:w-[3px] after:h-[calc(100%-24px)] after:bg-[#4a40dd] after:absolute after:left-4 after:top-2/4 after:-translate-y-2/4 after:rounded-[30px]">
            {messege}
          </Typography>
          <Flex
            alignItems={"center"}
            className={`absolute top-2/4 -translate-y-2/4 -right-[120px] ${
              menuShow ? "flex" : "hidden"
            } group-hover:flex`}
          >
            <Box className={"relative group/tooltip z-10"}>
              <BsEmojiSmile
                onClick={reactButton}
                className="box-content text-lg p-2 text-[#9f9f9f] rounded-full cursor-pointer hover:bg-[#f2f2f2]"
              />
              <Typography
                variant="span"
                className="bg-[#323436] text-white py-1 px-3 rounded-lg absolute left-2/4 -translate-x-2/4 bottom-[42px] hidden group-hover/tooltip:block"
              >
                React
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
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
                <BsFillTriangleFill className="text-[#323436] rotate-180 absolute left-2/4 -translate-x-2/4 top-[75%] " />
              </Typography>
            </Box>
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
                    "w-[110px] rounded-md p-1 absolute left-2/4 -translate-x-2/4 bottom-[50px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] bg-white"
                  }
                >
                  <BsFillTriangleFill className="absolute left-2/4 -translate-x-2/4 top-[99%] rotate-180 text-[#ffffff]" />
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
          </Flex>
        </Box>
        <Typography className="font-poppins text-xs font-medium text-secoundaryText mb-1 -ml-2">
          {moment(time, "YYYYMMDDh:mm").fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReciverMessege;
