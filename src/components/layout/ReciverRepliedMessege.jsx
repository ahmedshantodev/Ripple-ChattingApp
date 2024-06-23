import React from "react";
import Box from "./Box";
import Typography from "./Typography";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaReply } from "react-icons/fa";
import Flex from "./Flex";
import { BsEmojiSmile } from "react-icons/bs";
import moment from "moment";
import Image from "./Image";
import { useSelector } from "react-redux";
import { FaFileArchive } from "react-icons/fa";

const ReciverRepliedMessege = ({
  message,
  repliedMessage,
  repliedType,
  repliedTo,
  repliedBy,
  sentTime,
  name,
  profile,
  reactButton,
  replayButton,
  forwardButton,
}) => {
  const activeUserData = useSelector((state) => state.user.information);

  return repliedType == "text" ? (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography
            className={
              "bg-[#5a3bff] text-white inline-block pt-2.5 px-5 pb-[26px] -mb-4 ml-[2px] rounded-t-[20px] rounded-br-[20px] max-w-[45%]"
            }
          >
            {repliedMessage}
          </Typography>
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#e0e3ea] text-black/70 rounded-[20px] py-2.5 px-5 font-semibold font-open-sans text-[15px]">
            {message}
          </Typography>
          <Box className={"absolute bottom-0 -left-[17px] flex"}>
            <Box
              className={
                "w-[12px] h-[20px] bg-[#ffffff] rounded-br-[10px] translate-x-[5px]"
              }
            ></Box>
            <Box
              className={"w-[19px] h-[20px] bg-[#e0e3ea] rounded-br-[15px]"}
            ></Box>
          </Box>
          <Flex
            alignItems={"center"}
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
                <Box
                  className={
                    "w-[10px] h-[10px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                  }
                ></Box>
              </Typography>
            </Box>
            <Box className={"relative group/tooltip z-10"}>
              <FaReply
                onClick={replayButton}
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
  ) : repliedType == "gif" ? (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}
            </Typography>
          )}
        </Box>
        <Box>
          <Image
            src={repliedMessage}
            alt={"random image"}
            className={
              "max-w-[220px] rounded-[10px] border border-[#dcdcdc] -mb-6 ml-[2px]"
            }
          />
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#e0e3ea] text-black/70 rounded-[20px] py-2.5 px-5 font-semibold font-open-sans text-[15px]">
            {message}
          </Typography>
          <Box className={"absolute bottom-0 -left-[17px] flex"}>
            <Box
              className={
                "w-[12px] h-[20px] bg-[#ffffff] rounded-br-[10px] translate-x-[5px]"
              }
            ></Box>
            <Box
              className={"w-[19px] h-[20px] bg-[#e0e3ea] rounded-br-[15px]"}
            ></Box>
          </Box>
          <Flex
            alignItems={"center"}
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
                <Box
                  className={
                    "w-[10px] h-[10px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                  }
                ></Box>
              </Typography>
            </Box>
            <Box className={"relative group/tooltip z-10"}>
              <FaReply
                onClick={replayButton}
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
  ) : repliedType == "image" ? (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}
            </Typography>
          )}
        </Box>
        <Box>
          <Image
            src={repliedMessage}
            alt={"random image"}
            className={
              "max-w-[220px] rounded-[10px] border border-[#dcdcdc] -mb-6 ml-[2px]"
            }
          />
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#e0e3ea] text-black/70 rounded-[20px] py-2.5 px-5 font-semibold font-open-sans text-[15px]">
            {message}
          </Typography>
          <Box className={"absolute bottom-0 -left-[17px] flex"}>
            <Box
              className={
                "w-[12px] h-[20px] bg-[#ffffff] rounded-br-[10px] translate-x-[5px]"
              }
            ></Box>
            <Box
              className={"w-[19px] h-[20px] bg-[#e0e3ea] rounded-br-[15px]"}
            ></Box>
          </Box>
          <Flex
            alignItems={"center"}
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
                <Box
                  className={
                    "w-[10px] h-[10px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                  }
                ></Box>
              </Typography>
            </Box>
            <Box className={"relative group/tooltip z-10"}>
              <FaReply
                onClick={replayButton}
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
  ) : repliedType == "video" ? (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={profile}
          alt={name}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}
            </Typography>
          )}
        </Box>
        <Box className={"relative w-[220px] -mb-6 ml-[2px]"}>
          <video
            src={repliedMessage}
            className={"w-[220px] rounded-[10px] border border-[#dcdcdc]"}
          />
          <Box
            className={
              "w-full h-full absolute top-0 left-0 bg-white/50 flex justify-center items-center"
            }
          >
            <Image
              src={"/public/images/play-ui-icon-png.webp"}
              alt={"play ui icon"}
              className={"w-[33%]"}
            />
          </Box>
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#e0e3ea] text-black/70 rounded-[20px] py-2.5 px-5 font-semibold font-open-sans text-[15px]">
            {message}
          </Typography>
          <Box className={"absolute bottom-0 -left-[17px] flex"}>
            <Box
              className={
                "w-[12px] h-[20px] bg-[#ffffff] rounded-br-[10px] translate-x-[5px]"
              }
            ></Box>
            <Box
              className={"w-[19px] h-[20px] bg-[#e0e3ea] rounded-br-[15px]"}
            ></Box>
          </Box>
          <Flex
            alignItems={"center"}
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
                <Box
                  className={
                    "w-[10px] h-[10px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                  }
                ></Box>
              </Typography>
            </Box>
            <Box className={"relative group/tooltip z-10"}>
              <FaReply
                onClick={replayButton}
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
  ) : (
    repliedType == "file" && (
      <Box
        className={
          "mt-5 flex justify-between items-end w-full group cursor-default"
        }
      >
        <Box className={"w-[40px]"}>
          <Image
            src={profile}
            alt={name}
            className={"w-full object-cover aspect-square rounded-full"}
          />
        </Box>
        <Box className={"w-[calc(100%-55px)]"}>
          <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
            <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
            {repliedBy == repliedTo ? (
              <Typography className="text-secoundaryText text-[15px]">
                {repliedBy} replied to herself
              </Typography>
            ) : (
              <Typography className="text-secoundaryText text-[15px]">
                {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
                replied to{" "}
                {activeUserData.displayName == repliedTo ? "you" : repliedTo}
              </Typography>
            )}
          </Box>
          <Box>
            <Box className={"max-w-[35%] inline-block text-start"}>
              <Box className="w-full h-full flex items-center justify-between gap-x-3 pt-4 pb-10 px-4 -mb-6 ml-[2px] bg-[#f0f0f0] border border-primaryBorder rounded-[10px]">
                <FaFileArchive className="text-5xl box-content text-secoundaryText" />
                <Typography className="text-lg font-semibold text-[#65676b]">
                  {repliedMessage}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={"relative max-w-[70%] inline-block mb-1"}>
            <Typography className="text-start break-words bg-[#e0e3ea] text-black/70 rounded-[20px] py-2.5 px-5 font-semibold font-open-sans text-[15px]">
              {message}
            </Typography>
            <Box className={"absolute bottom-0 -left-[17px] flex"}>
              <Box
                className={
                  "w-[12px] h-[20px] bg-[#ffffff] rounded-br-[10px] translate-x-[5px]"
                }
              ></Box>
              <Box
                className={"w-[19px] h-[20px] bg-[#e0e3ea] rounded-br-[15px]"}
              ></Box>
            </Box>
            <Flex
              alignItems={"center"}
              className={
                "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
              }
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
                  <Box
                    className={
                      "w-[10px] h-[10px] bg-[#323436] rotate-45 absolute left-2/4 -translate-x-2/4 top-full -translate-y-2/4"
                    }
                  ></Box>
                </Typography>
              </Box>
              <Box className={"relative group/tooltip z-10"}>
                <FaReply
                  onClick={replayButton}
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
    )
  );
};

export default ReciverRepliedMessege;
