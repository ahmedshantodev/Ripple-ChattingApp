import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Typography from "./Typography";
import Box from "./Box";
import Input from "./Input";
import Button from "./Button";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";

const GroupCreateModal = ({ modalShow, modalClose }) => {
  const db = getDatabase();
  const activeUserData = useSelector((state) => state.user.information);
  const [groupCreateLoadingButton, setGroupCreateLoadingButton] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupCreateError, setGroupCreateError] = useState("");
  const defaultGroupPhoto = "https://firebasestorage.googleapis.com/v0/b/ripple-6421f.appspot.com/o/defualt%20group%20%20photo%2Fimages.png?alt=media&token=80080876-e462-4459-88a3-ceebb4b83a61";
  const modalRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (modalRef.current?.contains(e.target) && !boxRef.current?.contains(e.target)) {
        modalClose(false);
      }
    });
  }, []);

  const handleInputValue = (e) => {
    setGroupName(e.target.value);
    setGroupCreateError("");
  };

  const handleCreateGroup = () => {
    if (!setGroupName) {
      setGroupCreateError("Please enter group name");
    } else {
      let groupId = Date.now();
      setGroupCreateLoadingButton(true);
      set(ref(db, "groups/" + groupId), {
        groupuid: groupId,
        groupname: groupName,
        groupphoto: defaultGroupPhoto,
        groupadminuid: activeUserData.uid,
        groupadminname: activeUserData.displayName,
        groupadminprofile: activeUserData.photoURL,
        lastmessagesent: Date.now(),
      }).then(() => {
        set(push(ref(db, "groupmembers/")), {
          groupuid: groupId,
          groupname: groupName,
          groupphoto: defaultGroupPhoto,
          groupadminuid: activeUserData.uid,
          groupadminname: activeUserData.displayName,
          groupadminprofile: activeUserData.photoURL,
          memberuid: activeUserData.uid,
          membername: activeUserData.displayName,
          memberprofile: activeUserData.photoURL,
          addedbyuid: activeUserData.uid,
          addedbyname: activeUserData.displayName,
          addedbyprofile: activeUserData.photoURL,
          lastmessagesent: Date.now(),
        })
      }).then(() => {
        toast.success(
          `Your group ${groupName} has been created. Join the conversation now!`,
          { position: "bottom-center", autoClose: 2500 }
        );
        setGroupName("");
        setGroupCreateLoadingButton(false);
        modalClose(false);
      });
    }
  };

  return (
    <section
      ref={modalRef}
      className={`w-full h-dvh bg-white/70 fixed top-0 left-0 z-50 ${
        modalShow ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div
        ref={boxRef}
        className={
          "bg-white w-[600px] py-5 rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative"
        }
      >
        <Typography className="pb-5 text-center font-bold text-xl border-b-[2px] border-primaryBorder">
          Create Group
        </Typography>
        <RxCross2
          onClick={() => modalClose(false)}
          className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer transition-all ease-in-out duration-200 active:scale-[0.97]"
        />
        <Box className={"pt-8 px-6"}>
          <Box className={"mb-6 relative"}>
            <Input
              autoFocus={true}
              value={groupName}
              type={"text"}
              name={"groupname"}
              onChange={handleInputValue}
              placeholder={"Group Name"}
              className={
                groupCreateError
                  ? "w-full border border-red-600 focus:outline-red-600 placeholder:text-red-600 placeholder:text-[13px] sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] py-[6px] sm:py-2.5 md:py-3 lg:py-4 px-2.5 sm:px-4 md:px-5 rounded-[40px]"
                  : "w-full border border-primaryBorder focus:outline-[#141975] placeholder:text-secoundaryText placeholder:text-[13px]  sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] py-[6px] sm:py-2.5 md:py-3 lg:py-4 px-2.5 sm:px-4 md:px-5 rounded-[40px]"
              }
            />
            {groupCreateError && (
              <Typography className="absolute -bottom-[20px] left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]">
                Please enter Group Name
              </Typography>
            )}
          </Box>
          {groupCreateLoadingButton ? (
            <Button
              onClick={handleCreateGroup}
              className={
                "w-full mt-1 text-white font-poppins py-[7px] sm:py-[12px] md:py-[14px] lg:py-2 rounded-[30px] flex justify-center cursor-default bg-gray-300"
              }
            >
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
              />
            </Button>
          ) : (
            <Button
              onClick={handleCreateGroup}
              className={
                "w-full bg-[#141975] text-white font-poppins py-[7px] sm:py-[12px] md:py-[14px] lg:py-4 rounded-[30px]"
              }
            >
              Create Group
            </Button>
          )}
        </Box>
      </div>
    </section>
  );
};

export default GroupCreateModal;
