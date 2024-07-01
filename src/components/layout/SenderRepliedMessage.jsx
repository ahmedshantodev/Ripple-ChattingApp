import React, { useEffect, useRef, useState } from "react";
import Box from "./Box";
import Typography from "./Typography";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaReply } from "react-icons/fa";
import Flex from "./Flex";
import { FaFaceSmile } from "react-icons/fa6";
import Button from "./Button";
import moment from "moment";
import Image from "./Image";
import { useSelector } from "react-redux";
import { FaFileArchive } from "react-icons/fa";
import { getDatabase, onValue, ref } from "firebase/database";

const SenderRepliedMessage = ({
  chatType,
  edited,
  message,
  repliedType,
  repliedMessageId,
  repliedTo,
  sentTime,
  reactButton,
  replyButton,
  editButton,
  removeButton,
  forwardButton,
}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const activeChatData = useSelector((state) => state.activeChat.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information)
  const [messegeList, setMessegeList] = useState([]);
  const [menuShow, setMenuShow] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!buttonRef.current?.contains(e.target)) {
        setMenuShow(false);
      }
    });
  }, []);

  useEffect(() => {
    if (chatType == "friend") {
    let messegeRef = ref(db, "singlemessege/");
    onValue(messegeRef, (snapshot) => {
      let messegeArray = [];
      snapshot.forEach((item) => {
        if (
          ((activeUserData?.uid == item.val().senderuid && activeChatData?.uid == item.val().reciveruid) ||
          (activeUserData?.uid == item.val().reciveruid && activeChatData?.uid == item.val().senderuid)) &&
          item.key == repliedMessageId
        ) {
          messegeArray.push(item.val());
        }
      });
      setMessegeList(messegeArray);
    });
  } else if (chatType == "group") {
    let messageREf = ref(db, "groupmessege");
    onValue(messageREf, (snapshot) => {
      const messageArray = [];
      snapshot.forEach((item) => {
        if ((activeGroupData.groupuid == item.val().groupuid) && (item.key == repliedMessageId)) {
          messageArray.push({ ...item.val(), messageId: item.key });
        }
      });
      setMessegeList(messageArray);
    });
  }
  }, []);

  return repliedType == "text" ? (
    <Box className={"mt-5 group text-end"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        {activeUserData.displayName == repliedTo ? (
          <Typography className="text-secoundaryText text-[15px]">
            you replied to yourself {edited && <span className="text-[#077aff]"> - edited</span>}
          </Typography>
        ) : (
          <Typography className="text-secoundaryText text-[15px]">
            you replied to {repliedTo} {edited && <span className="text-[#077aff]"> - edited</span>}
          </Typography>
        )}
      </Box>
      <Box>
        {messegeList.map((item) =>
          item.type == "deleted" ? (
            item.senderuid == activeUserData.uid ? (
              <Typography className="inline-block break-words bg-[#e0e3ea] text-secoundaryText rounded-[20px] pt-2.5 pb-4 -mb-2.5 px-5 font-open-sans text-[15px] italic">
                you unsent a message
              </Typography>
            ) : (
              <Typography className="inline-block break-words bg-[#e0e3ea] text-secoundaryText rounded-[20px] pt-2.5 pb-4 -mb-2.5 px-5 font-open-sans text-[15px] italic">
                {item.sendername} unsent a message
              </Typography>
            )
          ) : (
            <Typography
              className={
                "bg-[#e0e3ea] text-secoundaryText pt-2 px-5 pb-[18px] -mb-4 mr-[2px] inline-block rounded-t-[20px] rounded-bl-[20px] max-w-[45%] text-start"
              }
            >
              {item.text}
            </Typography>
          )
        )}
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
                menuShow && "bg-[#f2f2f2]"
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
  ) : repliedType == "gif" ? (
    <Box className={"mt-5 group text-end"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        {activeUserData.displayName == repliedTo ? (
          <Typography className="text-secoundaryText text-[15px]">
            you replied to yourself {edited && <span className="text-[#077aff]"> - edited</span>}
          </Typography>
        ) : (
          <Typography className="text-secoundaryText text-[15px]">
            you replied to {repliedTo} {edited && <span className="text-[#077aff]"> - edited</span>}
          </Typography>
        )}
      </Box>
      <Box>
        {messegeList.map((item) =>
          item.type == "deleted" ? (
            <Typography className="inline-block break-words bg-[#e0e3ea] text-secoundaryText rounded-[20px] pt-2.5 pb-4 -mb-2.5 px-5 font-open-sans text-[15px] italic">
              you unsent a message
            </Typography>
          ) : (
            <Image
              src={item.gif}
              alt={"random gif"}
              className={
                "max-w-[220px] ml-auto mr-[2px] rounded-[10px] border border-[#dcdcdc] -mb-6"
              }
            />
          )
        )}
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
                menuShow && "bg-[#f2f2f2]"
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
  ) : repliedType == "image" ? (
    <Box className={"mt-5 group text-end"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        {activeUserData.displayName == repliedTo ? (
          <Typography className="text-secoundaryText text-[15px]">
            you replied to yourself {edited && <span className="text-[#077aff]"> - edited</span>}
          </Typography>
        ) : (
          <Typography className="text-secoundaryText text-[15px]">
            you replied to {repliedTo} {edited && <span className="text-[#077aff]"> - edited</span>}
          </Typography>
        )}
      </Box>
      <Box>
        {messegeList.map((item) =>
          item.type == "deleted" ? (
            <Typography className="inline-block break-words bg-[#e0e3ea] text-secoundaryText rounded-[20px] pt-2.5 pb-4 -mb-2.5 px-5 font-open-sans text-[15px] italic">
              you unsent a message
            </Typography>
          ) : (
            <Image
              src={item.image}
              alt={"random gif"}
              className={
                "max-w-[220px] ml-auto mr-[2px] rounded-[10px] border border-[#dcdcdc] -mb-6"
              }
            />
          )
        )}
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
                menuShow && "bg-[#f2f2f2]"
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
  ) : repliedType == "video" ? (
    <Box className={"mt-5 group text-end"}>
      <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
        <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
        {activeUserData.displayName == repliedTo ? (
          <Typography className="text-secoundaryText text-[15px]">
            you replied to yourself {edited && <span className="text-[#077aff]"> - edited</span>}
          </Typography>
        ) : (
          <Typography className="text-secoundaryText text-[15px]">
            you replied to {repliedTo} {edited && <span className="text-[#077aff]"> - edited</span>}
          </Typography>
        )}
      </Box>
      {messegeList.map((item) =>
        item.type == "deleted" ? (
          <Box>
            <Typography className="inline-block break-words bg-[#e0e3ea] text-secoundaryText rounded-[20px] pt-2.5 pb-4 -mb-2.5 px-5 font-open-sans text-[15px] italic">
              you unsent a message
            </Typography>
          </Box>
        ) : (
          <Box className={"relative w-[220px] ml-auto -mb-6 mr-[2px]"}>
            <video
              src={item.video}
              className={"w-[200px] rounded-[10px] border border-[#dcdcdc]"}
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
        )
      )}
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
                menuShow && "bg-[#f2f2f2]"
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
  ) : (
    repliedType == "file" && (
      <Box className={"mt-5 group text-end"}>
        <Box className={"flex justify-end items-center gap-x-2 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {activeUserData.displayName == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              you replied to yourself {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              you replied to {repliedTo} {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          )}
        </Box>
        <Box>
          {messegeList.map((item) =>
            item.type == "deleted" ? (
              <Typography className="inline-block break-words bg-[#e0e3ea] text-secoundaryText rounded-[20px] pt-2.5 pb-4 -mb-2.5 px-5 font-open-sans text-[15px] italic">
                you unsent a message
              </Typography>
            ) : (
              <Box className={"max-w-[35%] inline-block text-start"}>
                <Box className="w-full h-full flex items-center justify-between gap-x-3 pt-4 pb-7 px-4 -mb-6 ml-[2px] bg-[#f0f0f0] border border-primaryBorder rounded-[10px]">
                  <FaFileArchive className="text-2xl box-content text-secoundaryText" />
                  <Typography className="font-semibold text-[#65676b]">
                    {item.filename}
                  </Typography>
                </Box>
              </Box>
            )
          )}
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
                  menuShow && "bg-[#f2f2f2]"
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
    )
  );
};

export default SenderRepliedMessage;
