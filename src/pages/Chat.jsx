import React, { useEffect, useState } from "react";
import Box from "../components/layout/Box";
import Typography from "../components/layout/Typography";
import Flex from "../components/layout/Flex";
import Input from "../components/layout/Input";
import Image from "../components/layout/Image";
import ChatItem from "../components/layout/ChatItem";
import { IoCall } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus, FaRegImage, FaFile } from "react-icons/fa6";
import { BsEmojiSmileFill } from "react-icons/bs";
import { MdThumbUpAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../components/layout/SearchBox";
import { activeChat } from "./../slices/activeChatSlice";
import noGroupPHoto from "/public/images/no chat image.jpg";
import ReciverMessege from "../components/layout/ReciverMessege";
import SenderMessege from "../components/layout/SenderMessege";
import { IoSend } from "react-icons/io5";
import SenderImage from "../components/layout/SenderImage";
import ReciverImage from "../components/layout/ReciverImage";

const Chat = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information);
  const activeChatData = useSelector((state) => state.activeChat.information);
  const [friendsProfileOpen, setFriendsProfileOpen] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [messege, setMessege] = useState("");

  useEffect(() => {
    const friendListRef = ref(db, "friends");
    onValue(friendListRef, (snapshot) => {
      const FriendListArray = [];
      snapshot.forEach((item) => {
        if (activeUserData.uid == item.val().reciveruid || activeUserData.uid == item.val().senderuid) {
          FriendListArray.push(item.val());
        }
      });
      setFriendList(FriendListArray);
    });
  }, []);

  const handleActiveChatOpen = (item) => {
    dispatch(
      activeChat({
        uid: activeUserData.uid == item.senderuid ? item.reciveuid : item.senderuid,
        name: activeUserData.uid == item.senderuid ? item.recivername : item.sendername,
        profile: activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile,
      })
    );
    localStorage.setItem(
      "activeChat",
      JSON.stringify({
        uid: activeUserData.uid == item.senderuid ? item.reciveuid : item.senderuid,
        name: activeUserData.uid == item.senderuid ? item.recivername : item.sendername,
        profile: activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile,
      })
    );
  };

  return (
    <section className="w-full h-dvh bg-[#dddcea] p-4 flex">
      <Box
        className={"w-1/4 h-full bg-white rounded-2xl pt-6 pr-2.5 pb-5 pl-2.5"}
      >
        <Box className={"px-2.5  h-[15%]"}>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"px-2"}
          >
            <Typography variant="h4" className="font-bold text-[28px]">
              Chats
            </Typography>
            <BsThreeDotsVertical className=" box-content bg-[#dedede] text-xl p-2 rounded-full transition-all ease duration-300 cursor-pointer hover:bg-[#32375c] hover:text-white" />
          </Flex>
          <SearchBox
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"Search messenger"}
            className={"mt-4"}
          />
        </Box>
        <Box className={"h-[85%] overflow-y-auto"}>
          {friendList.filter((item) => {
              let name =activeUserData.uid == item.senderuid ? item.recivername : item.sendername;
              return searchValue == "" ? item : name.toLowerCase().includes(searchValue.toLowerCase());
            }).map((item) => (
              <ChatItem
                activeItem={activeChatData?.name}
                onClick={() => handleActiveChatOpen(item)}
                profile={activeUserData.uid == item.senderuid ? item.reciverprofile : item.senderprofile}
                userName={activeUserData.uid == item.senderuid ? item.recivername : item.sendername}
                lastMessege={"random messege...."}
                lastMessegeSentTime={"30 min"}
              />
            ))}
        </Box>
      </Box>
      {activeChatData == null ? (
        <Box
          className={
            "w-[75%] ml-4 h-full bg-white rounded-2xl flex justify-center items-center"
          }
        >
          <Box>
            <Image
              src={noGroupPHoto}
              alt={"no chat image"}
              className={"w-[400px]"}
            />
            <Typography
              variant="h3"
              className="font-mono text-3xl text-center mt-1"
            >
              No Chat Selected
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box className={"w-[75%] ml-4 flex"}>
          <Box
            className={`${
              friendsProfileOpen ? "w-[70%]" : "w-full"
            } h-full bg-white rounded-2xl relative overflow-hidden transition-all ease-in-out duration-100`}
          >
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={" h-[10%] py-3 px-3 border-b-[2px] border-b-[#dedede]"}
            >
              <Box
                className={
                  "flex items-center px-2.5 py-[5px]  rounded-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dddcea]"
                }
              >
                <Image
                  src={activeChatData?.profile}
                  alt={activeChatData?.name}
                  className={"w-12 h-12 rounded-full"}
                />
                <Typography variant="h3" className="ml-3 text-lg font-semibold">
                  {activeChatData?.name}
                </Typography>
              </Box>
              <Flex alignItems={"center"}>
                <IoCall className="box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                <IoVideocam className="box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                <HiDotsVertical
                  onClick={() => setFriendsProfileOpen(!friendsProfileOpen)}
                  className={`box-content text-[25px] ml-2.5 p-2.5 rounded-full cursor-pointer text-[#007bf5] transition-all ease-in-out duration-300 ${
                    friendsProfileOpen ? "bg-[#dedede]" : "hover:bg-[#dedede]"
                  }`}
                />
              </Flex>
            </Flex>
            <Box className={"h-[81%] bg-white px-6 overflow-y-auto"}>
              <ReciverMessege
                messege={"hi"}
                messegeSentTime={"Today, 2:02pm"}
              />
              <SenderMessege
                messege={"hello"}
                messegeSentTime={"Today, 2:02pm"}
              />
              <ReciverMessege
                messege={"How are you doing?"}
                messegeSentTime={"Today, 2:02pm"}
              />
              <SenderMessege
                messege={"I am good  and hoew about you?"}
                messegeSentTime={"Today, 2:02pm"}
              />
              <ReciverMessege
                messege={"I am doing well. Can we meet up tomorrow?"}
                messegeSentTime={"Today, 2:02pm"}
              />
              <SenderMessege
                messege={"Sure!"}
                messegeSentTime={"Today, 2:02pm"}
              />
              <SenderImage
                src={"/public/images/registretion bg image.png"}
                alt={"random image"}
                messegeSentTime={"Today, 2:02pm"}
              />
              <ReciverMessege
                messege={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati magnam labore, sed fugit quod cum beatae perferendis? Tempore doloremque sequi, voluptas blanditiis pariatur minus ab aperiam adipisci ipsa! Soluta nihil excepturi perspiciatis accusamus nemo rerum explicabo, eligendi ab reiciendis, eos minima architecto rem error fuga. Quia minus veritatis veniam nihil fugit atque eius provident debitis magnam eum maxime in eos a, impedit modi deserunt dolor culpa ipsam vel rerum placeat doloribus ratione labore? Error veniam omnis minima magni facere, iusto eos quibusdam ut natus dolorum, distinctio sunt rerum. Fuga temporibus ipsam exercitationem, error laboriosam reiciendis rerum voluptatem dolores accusamus repellendus."
                }
                messegeSentTime={"Today, 2:02pm"}
              />
              <SenderMessege
                messege={
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati magnam labore, sed fugit quod cum beatae perferendis? Tempore doloremque sequi, voluptas blanditiis pariatur minus ab aperiam adipisci ipsa! Soluta nihil excepturi perspiciatis accusamus nemo rerum explicabo, eligendi ab reiciendis, eos minima architecto rem error fuga. Quia minus veritatis veniam nihil fugit atque eius provident debitis magnam eum maxime in eos a, impedit modi deserunt dolor culpa ipsam vel rerum placeat doloribus ratione labore? Error veniam omnis minima magni facere, iusto eos quibusdam ut natus dolorum, distinctio sunt rerum. Fuga temporibus ipsam exercitationem, error laboriosam reiciendis rerum voluptatem dolores accusamus repellendus.!"
                }
                messegeSentTime={"Today, 2:02pm"}
              />
              <ReciverImage
                src={"/public/images/registretion bg image.png"}
                alt={"random image"}
                messegeSentTime={"Today, 2:02pm"}
              />
              <SenderImage
                src={"/public/images/email verification image.jpg"}
                alt={"random image"}
                messegeSentTime={"Today, 2:02pm"}
              />
            </Box>
            <Flex
              justifyContent={"between"}
              alignItems={"center"}
              className={
                "h-[9%] bg-white absolute bottom-0 left-0 w-full py-2.5 pr-[5px] pl-5"
              }
            >
              <Flex>
                <FaPlus className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] mr-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                <FaRegImage className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] mr-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                <FaFile className="box-content text-[#007bf5] text-[25px] p-2.5 rounded-[20%] mr-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
              </Flex>
              <Flex alignItems={"center"} className={"w-[80%]"}>
                <Flex
                  alignItems={"center"}
                  className={
                    "w-full bg-[#f3f3f3] overflow-hidden rounded-[25px] border border-[#dedede]"
                  }
                >
                  <Input
                    onChange={(e) => setMessege(e.target.value)}
                    placeholder={"enter your messege"}
                    className={
                      "bg-[#f3f3f3] py-3 pr-0 pl-5 w-full outline-none"
                    }
                  />
                  <BsEmojiSmileFill className="box-content text-[#007bf5] text-[20px] p-3 rounded-[50%] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                </Flex>
                {messege == "" ? (
                  <MdThumbUpAlt className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] mb-[2px] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                ) : (
                  <IoSend className="box-content text-[#007bf5] text-[24px] p-2.5 rounded-[20%] mb-[2px] ml-[5px] cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#dedede]" />
                )}
              </Flex>
            </Flex>
          </Box>
          <Box
            className={`${
              friendsProfileOpen ? "w-[30%]" : "w-0"
            } h-full bg-white rounded-2xl overflow-hidden text-center ${
              friendsProfileOpen ? "ml-4" : "ml-0"
            }`}
          >
            <Image
              src={activeChatData?.profile}
              alt={activeChatData?.name}
              className={
                "w-[130px] h-[130px] rounded-full object-cover mx-auto mt-14 border border-[#dedede]"
              }
            />
            <Typography
              variant="h3"
              className="font-poppins font-semibold text-[22px] mt-[15px]"
            >
              {activeChatData?.name}
            </Typography>
          </Box>
        </Box>
      )}
    </section>
  );
};

export default Chat;
