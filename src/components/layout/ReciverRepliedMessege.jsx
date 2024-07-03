import React, { useEffect, useState } from "react";
import Box from "./Box";
import Typography from "./Typography";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaReply } from "react-icons/fa";
import Flex from "./Flex";
import { FaFaceSmile } from "react-icons/fa6";
import moment from "moment";
import Image from "./Image";
import { useSelector } from "react-redux";
import { FaFileArchive } from "react-icons/fa";
import { getDatabase, onValue, ref } from "firebase/database";

const ReciverRepliedMessege = ({
  chatType,
  edited,
  sendername,
  senderuid,
  senderprofile,
  message,
  repliedMessageId,
  repliedType,
  repliedTo,
  repliedBy,
  sentTime,
  reactButton,
  replyButton,
  forwardButton,
}) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const activeChatData = useSelector((state) => state.activeChat.information);
  const activeGroupData = useSelector((state) => state.activeGroup.information)
  const [messegeList, setMessegeList] = useState([]);
  
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
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={senderprofile}
          alt={sendername}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          )}
        </Box>
        <Box>
          {messegeList.map((item) =>
            item.type == "deleted" ? (
              item.senderuid == senderuid ? (
                <Typography className="text-start inline-block bg-white border-[2px] border-[#e0e3ea] text-secoundaryText italic rounded-[20px] pt-2.5 pb-4 -mb-4 px-5 font-open-sans text-[15px]">
                  {item.sendername} unsent a messeage
                </Typography>
              ) : (
                <Typography className="text-start inline-block bg-white border-[2px] border-[#e0e3ea] text-secoundaryText italic rounded-[20px] pt-2.5 pb-4 -mb-4 px-5 font-open-sans text-[15px]">
                  you unsent a messeage
                </Typography>
              )
            ) : (
              <Typography
                className={
                  "bg-[#077aff] text-white inline-block pt-2 px-5 pb-[18px] -mb-4 ml-[2px] rounded-t-[20px] rounded-br-[20px] max-w-[45%]"
                }
              >
                {item.text}
              </Typography>
            )
          )}
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#f0f0f0] text-black rounded-[20px] py-2.5 px-5 font-open-sans text-[15px]">
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
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
  ) : repliedType == "gif" ? (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={senderprofile}
          alt={sendername}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          )}
        </Box>
        <Box>
          {messegeList.map((item) =>
            item.type == "deleted" ? (
              <Typography className="text-start inline-block bg-white border-[2px] border-[#e0e3ea] text-secoundaryText italic rounded-[20px] pt-2.5 pb-4 -mb-4 px-5 font-open-sans text-[15px]">
                {sendername} unsent a message
              </Typography>
            ) : (
              <Image
                src={item.gif}
                alt={"random gif"}
                className={
                  "max-w-[200px] rounded-[10px] border border-[#f5f5f5] -mb-6 ml-[2px]"
                }
              />
            )
          )}
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#f0f0f0] text-black/70 rounded-[20px] py-2.5 px-5 font-open-sans text-[15px]">
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
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
  ) : repliedType == "voice" ? (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={senderprofile}
          alt={sendername}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          )}
        </Box>
        <Box>
          {messegeList.map((item) =>
            item.type == "deleted" ? (
              <Typography className="text-start inline-block bg-white border-[2px] border-[#e0e3ea] text-secoundaryText italic rounded-[20px] pt-2.5 pb-4 -mb-4 px-5 font-open-sans text-[15px]">
                {sendername} unsent a message
              </Typography>
            ) : (
              <Box>
                <audio 
                  src={item.voice}
                  controls 
                  className={"max-w-[40%] bg-[#f1f3f4] pb-5 -mb-4 rounded-3xl"}
                />
              </Box>
            )
          )}
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#f0f0f0] border border-[#dddcea] text-black/70 rounded-[20px] py-2.5 px-5 font-open-sans text-[15px]">
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
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
  ) : repliedType == "image" ? (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={senderprofile}
          alt={sendername}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          )}
        </Box>
        <Box>
          {messegeList.map((item) =>
            item.type == "deleted" ? (
              <Typography className="text-start inline-block bg-white border-[2px] border-[#e0e3ea] text-secoundaryText italic rounded-[20px] pt-2.5 pb-4 -mb-4 px-5 font-open-sans text-[15px]">
                {sendername} unsent an message
              </Typography>
            ) : (
              <Image
                src={item.image}
                alt={"random image"}
                className={
                  "max-w-[200px] rounded-[10px] border border-[#f5f5f5] -mb-6 ml-[2px]"
                }
              />
            )
          )}
        </Box>
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#f0f0f0] text-black/70 rounded-[20px] py-2.5 px-5 font-open-sans text-[15px]">
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
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
  ) : repliedType == "video" ? (
    <Box className={"mt-5 flex justify-between items-end w-full group"}>
      <Box className={"w-[40px]"}>
        <Image
          src={senderprofile}
          alt={sendername}
          className={"w-full object-cover aspect-square rounded-full"}
        />
      </Box>
      <Box className={"w-[calc(100%-55px)]"}>
        <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
          <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
          {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          )}
        </Box>
        {messegeList.map((item) =>
          item.type == "deleted" ? (
            <Box>
              <Typography className="text-start inline-block bg-white border-[2px] border-[#e0e3ea] text-secoundaryText italic rounded-[20px] pt-2.5 pb-4 -mb-4 px-5 font-open-sans text-[15px]">
                {sendername} unsent a message
              </Typography>
            </Box>
          ) : (
            <Box className={"relative w-[220px] -mb-6 ml-[2px]"}>
              {messegeList.map((item) => (
                <video
                  src={item.video}
                  className={"w-[200px] rounded-[10px] border border-[#f5f5f5]"}
                />
              ))}
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
        <Box className={"relative max-w-[70%] inline-block mb-1"}>
          <Typography className="text-start break-words bg-[#f0f0f0] text-black/70 rounded-[20px] py-2.5 px-5 font-open-sans text-[15px]">
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
            className={
              "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
            }
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
  ) : (
    repliedType == "file" && (
      <Box
        className={
          "mt-5 flex justify-between items-end w-full group cursor-default"
        }
      >
        <Box className={"w-[40px]"}>
          <Image
            src={senderprofile}
            alt={sendername}
            className={"w-full object-cover aspect-square rounded-full"}
          />
        </Box>
        <Box className={"w-[calc(100%-55px)]"}>
          <Box className={"flex items-center gap-x-1 mr-2 mb-1"}>
            <FaReply className="box-content scale-x-[-1] text-secoundaryText" />
            {repliedBy == repliedTo ? (
            <Typography className="text-secoundaryText text-[15px]">
              {repliedBy} replied to herself{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          ) : (
            <Typography className="text-secoundaryText text-[15px]">
              {activeUserData.displayName == repliedBy ? "you" : repliedBy}{" "}
              replied to{" "}
              {activeUserData.displayName == repliedTo ? "you" : repliedTo}{" "}
              {edited && <span className="text-[#077aff]"> - edited</span>}
            </Typography>
          )}
          </Box>
          <Box>
            {messegeList.map((item) =>
              item.type == "deleted" ? (
                <Typography className="text-start inline-block bg-white border-[2px] border-[#e0e3ea] text-secoundaryText italic rounded-[20px] pt-2.5 pb-4 -mb-4 px-5 font-open-sans text-[15px]">
                  {sendername} unsent a message
                </Typography>
              ) : (
                <Box className={"max-w-[35%] inline-block text-start"}>
                  <Box className="w-full h-full flex items-center justify-between gap-x-3 pt-4 pb-8 px-4 -mb-6 ml-[2px] border border-primaryBorder rounded-[10px]">
                    <FaFileArchive className="text-2xl box-content text-secoundaryText" />
                    {messegeList.map((item) => (
                      <Typography className="font-semibold text-[#65676b]">
                        {item.filename}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )
            )}
          </Box>
          <Box className={"relative max-w-[70%] inline-block mb-1"}>
            <Typography className="text-start break-words bg-[#f0f0f0] text-black/70 rounded-[20px] py-2.5 px-5 font-open-sans text-[15px]">
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
              className={
                "hidden absolute top-2/4 -translate-y-2/4 -right-[120px] group-hover:flex"
              }
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
    )
  );
};

export default ReciverRepliedMessege;
