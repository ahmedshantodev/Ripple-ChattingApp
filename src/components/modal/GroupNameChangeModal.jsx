import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Typography from "../layout/Typography";
import Box from "../layout/Box";
import Input from "../layout/Input";
import Button from "../layout/Button";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import { activeGroup } from "../../slices/activeGroupSlice";

const GroupNameChangeModal = ({ modalShow, modalClose }) => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const activeUserData = useSelector((state) => state.user.information)
  const activeGroupData = useSelector((state) => state.activeGroup.information);
  const [groupList, setGroupList] = useState([])
  const [loadingButton, setLoadingButton] = useState(false);
  const [newGroupName, setNewGroupName] = useState(activeGroupData?.groupname);
  const [error, setError] = useState("");
  const modalRef = useRef();
  const boxRef = useRef();

  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  useEffect(() => {
    let groupRef = ref(db, "groupmembers");
    onValue(groupRef, (snapshot) => {
      let groupListArray = [];
      snapshot.forEach((item) => {
        if (activeGroupData.groupuid == item.val().groupuid) {
          groupListArray.push({...item.val() , gid: item.key});
        }
      });
      setGroupList(groupListArray);
    });
  }, [activeGroupData]);

  const handleInputValue = (e) => {
    setNewGroupName(e.target.value);
    setError("");
  };

  const handleCreateGroup = () => {
    if (!newGroupName) {
      setError("Please enter group name");
    } else {
      setLoadingButton(true);
      set(ref(db, "groups/" + activeGroupData?.groupuid), {
        groupuid: activeGroupData.groupuid,
        groupname: newGroupName,
        groupphoto: activeGroupData.groupphoto,
        groupadminuid: activeGroupData.groupadminuid,
        groupadminname: activeGroupData.groupadminname,
        groupadminprofile: activeGroupData.groupadminprofile,
        lastmessagesent: Date.now(),
      }).then(() => {
        groupList.map((item) => {
          set(ref(db, "groupmembers/" + item.gid), {
            groupuid: item.groupuid,
            groupname: newGroupName,
            groupphoto: item.groupphoto,
            groupadminuid: item.groupadminuid,
            groupadminname: item.groupadminname,
            groupadminprofile: item.groupadminprofile,
            memberuid: item.memberuid,
            membername: item.membername,
            memberprofile: item.memberprofile,
            addedbyuid: item.addedbyuid,
            addedbyname: item.addedbyname,
            addedbyprofile: item.addedbyprofile,
            lastmessagesent: Date.now(),
          });
        });
        set(push(ref(db , "groupmessege/")) , {
          type: "groupmanagment/groupname-changed",
          groupuid: activeGroupData.groupuid,
          whochanged: activeUserData.displayName,
          oldgroupname: activeGroupData.groupname,
          newgroupname: newGroupName,
          senttime: `${year}/${month}/${date}/${hours}:${minutes}`,
        })
      }).then(() => {
        toast.success(
          `Your group name has been changed from ${activeGroupData?.groupname} to ${newGroupName}`,
          { position: "bottom-center", autoClose: 2500 }
        );
        localStorage.setItem(
          "activeGroup",
          JSON.stringify({ ...activeGroupData, groupname: newGroupName })
        );
        dispatch(activeGroup({ ...activeGroupData, groupname: newGroupName }));
        setNewGroupName("");
        setLoadingButton(false);
        modalClose(false);
      });
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (
        modalRef.current?.contains(e.target) && !boxRef.current?.contains(e.target)
      ) {
        modalClose(false);
      }
    });
  }, []);

  return (
    <section
      ref={modalRef}
      className={`w-full h-dvh bg-white/70 fixed   top-0 left-0 z-20 ${
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
          Change Group Name
        </Typography>
        <RxCross2
          onClick={() => modalClose(false)}
          className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer transition-all ease-in-out duration-200 active:scale-[0.97]"
        />
        <Box className={"pt-8 px-6"}>
          <Box className={"mb-6 relative"}>
            <Input
              autoFocus={true}
              value={newGroupName}
              type={"text"}
              name={"groupname"}
              onChange={handleInputValue}
              placeholder={"Enter New Group Name"}
              className={`w-full border ${
                error ? "border-red-600" : "border-primaryBorder"
              } ${
                error ? "focus:outline-red-600" : "focus:outline-[#141975]"
              } ${
                error
                  ? "placeholder:text-red-600"
                  : "placeholder:text-secoundaryText"
              } placeholder:text-[13px]  sm:placeholder:text-[14px] lg:placeholder:text-[15px] xl:placeholder:text-[16px] py-[6px] sm:py-2.5 md:py-3 lg:py-4 px-2.5 sm:px-4 md:px-5 rounded-[40px]`}
            />
            {error && (
              <Typography className="absolute -bottom-[20px] left-[20px] text-red-600 text-[8px] sm:text-[11px] md:text-[10px] lg:text-[14px]">
                Please enter new group name
              </Typography>
            )}
          </Box>
          {loadingButton ? (
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
              Change Group Name
            </Button>
          )}
        </Box>
      </div>
    </section>
  );
};

export default GroupNameChangeModal;
