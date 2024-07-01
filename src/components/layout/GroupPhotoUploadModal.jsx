import React, { createRef, useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Box from "./Box";
import { RxCross2 } from "react-icons/rx";
import Typography from "./Typography";
import Button from "./Button";
import Input from "./Input";
import { RiUploadLine } from "react-icons/ri";
import { ColorRing } from "react-loader-spinner";
import {
  getStorage,
  ref as storageRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  getDatabase,
  set,
  ref as databaseRef,
  onValue,
  push,
} from "firebase/database";
import { toast } from "react-toastify";
import { activeGroup } from "../../slices/activeGroupSlice";

const GroupPhotoUploadModal = ({ modalShow, modalClose }) => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const storage = getStorage();
  const activeUserData = useSelector((state) => state.user.information)
  const activeGroupData = useSelector((state) => state.activeGroup.information);
  const [groupList, setGroupList] = useState([])
  const [uploadLoadingButton, setUploadLoadingButton] = useState(false);
  const [image, setImage] = useState("");
  const cropperRef = createRef();
  const modalRef = useRef();
  const boxRef = useRef();
  
  useEffect(() => {
    let groupRef = databaseRef(db, "groupmembers");
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


  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handlePhotoUpload = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setUploadLoadingButton(true);
      const groupPhoto = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      const groupPhotoRef = storageRef(storage, "group photo/" + `groupphoto-${activeGroupData.groupuid}`);
      uploadString(groupPhotoRef, groupPhoto, "data_url").then((snapshot) => {
        getDownloadURL(groupPhotoRef).then((downloadURL) => {
          set(databaseRef(db, "groups/" + activeGroupData.groupuid), {
            groupuid: activeGroupData.groupuid,
            groupname: activeGroupData.groupname,
            groupphoto: downloadURL,
            groupadminuid: activeGroupData.groupadminuid,
            groupadminname: activeGroupData.groupadminname,
            groupadminprofile: activeGroupData.groupadminprofile,
          }).then(() => {
            groupList.map((item) => {
              set(databaseRef(db, "groupmembers/" + item.gid), {
                groupuid: item.groupuid,
                groupname: item.groupname,
                groupphoto: downloadURL,
                groupadminuid: item.groupadminuid,
                groupadminname: item.groupadminname,
                groupadminprofile: item.groupadminprofile,
                memberuid: item.memberuid,
                membername: item.membername,
                memberprofile: item.memberprofile,
                addedbyuid: item.addedbyuid,
                addedbyname: item.addedbyname,
                addedbyprofile: item.addedbyprofile,
              });
            });
            set(push(databaseRef(db , "groupmessege/")) , {
              type: "groupmanagment/groupphoto-changed",
              groupuid: activeGroupData.groupuid,
              whochanged: activeUserData.displayName,
            })
          }).then(() => {
            localStorage.setItem("activeGroup", JSON.stringify({ ...activeGroupData, groupphoto: downloadURL }));
            dispatch(activeGroup({ ...activeGroupData, groupphoto: downloadURL }));
            toast.success("Group profile picture has been uploaded successfully",{
              position: "bottom-center",
              autoClose: 2500,
            });
            setUploadLoadingButton(false);
            setImage("");
            modalClose(false);
          })
        });
      });
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (modalRef.current?.contains(e.target) && !boxRef.current?.contains(e.target)) {
        modalClose(false);
      }
    });
  }, []);

  return (
    <section
      ref={modalRef}
      className={`w-full h-dvh bg-white/70 fixed z-50 top-0 left-0 ${
        modalShow ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div
        ref={boxRef}
        className={
          "bg-white pt-[50px] pb-6 pr-[70px] pl-[30px] rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative"
        }
      >
        <RxCross2
          onClick={() => modalClose(false)}
          className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer"
        />
        {!image ? (
          <Box className={"ml-[40px]"}>
            <Typography className="text-lg text-center font-bold mb-3">
              Choose Group Photo
            </Typography>
            <Box className={"w-[300px] mx-auto"}>
              <label
                htmlFor="file-upload"
                class="bg-[#dfe9f2] text-[#005fc6] flex items-center justify-center gap-x-2.5 text-[20px] py-2.5 rounded-md cursor-pointer font-bold"
              >
                <RiUploadLine className="font-bold text-[22px]" /> Upload Photo
              </label>
              <Input
                id={"file-upload"}
                type="file"
                onChange={onChange}
                className="hidden"
              />
            </Box>
          </Box>
        ) : (
          <>
            <Typography className="text-lg text-center font-bold mb-3">
              Upload New Photo As Group Photo
            </Typography>
            <Box className={"flex items-center"}>
              <Box className="box w-[350px] mr-[15px]">
                <div className="img-preview overflow-hidden mx-auto max-w-[300px] min-w-[300px] max-h-[300px] min-h-[300px]  aspect-square rounded-full" />
              </Box>
              <Box>
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: 600 }}
                  zoomTo={0.1}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
              </Box>
            </Box>
            <Box className={"text-center"}>
              {uploadLoadingButton ? (
                <Button
                  className={
                    "bg-[#5f6770] text-white text-center w-[350px] font-bold text-lg rounded-md mt-8 flex justify-center mx-auto cursor-default"
                  }
                >
                  <ColorRing
                    visible={true}
                    height="52"
                    width="52"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                      "#ffffff",
                    ]}
                  />
                </Button>
              ) : (
                <Button
                  onClick={handlePhotoUpload}
                  className={
                    "bg-[#1565c0] text-white text-center w-[350px] py-3 font-bold text-lg rounded-md mt-8"
                  }
                >
                  Upload Photo
                </Button>
              )}
            </Box>
          </>
        )}
      </div>
    </section>
  );
};

export default GroupPhotoUploadModal;
