import React, { createRef, useState } from "react";
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
import { getDatabase, set, ref as databaseRef } from "firebase/database";
import { activeUser } from "../../slices/activeUserSlice";
import { toast } from "react-toastify";
import { getAuth, updateProfile } from "firebase/auth";

const ProfileUploadModal = ({ profileUploadModalClose, profileUploadref }) => {
  const auth = getAuth();
  const db = getDatabase();
  const storage = getStorage();
  const activeUserData = useSelector((state) => state?.user?.information);
  const dispatch = useDispatch();
  const [uploadLoadingButton, setUploadLoadingButton] = useState(false);
  const [image, setImage] = useState("");
  const cropperRef = createRef();

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
    setUploadLoadingButton(true);
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const profileImage = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      const profileRef = storageRef(storage, "profile/" + `profile-${activeUserData.uid}`);
      uploadString(profileRef, profileImage, "data_url").then((snapshot) => {
        getDownloadURL(profileRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(() => {
            set(databaseRef(db, "users/" + activeUserData.uid), {
              userid: activeUserData.uid,
              username: activeUserData.displayName,
              useremail: activeUserData.email,
              userprofile: downloadURL,
            });
            localStorage.setItem(
              "user",
              JSON.stringify({ ...activeUserData, photoURL: downloadURL })
            );
            dispatch(activeUser({ ...activeUserData, photoURL: downloadURL }));
            toast.success("Your profile picture has been uploaded successfully", {
              position: "bottom-center",
              autoClose: 2500,
            });
            setUploadLoadingButton(false);
            setImage("");
            profileUploadModalClose(false);
          }).catch((error) => {});
        });
      });
    }
  };

  return (
    <section
      className={
        "w-full h-dvh bg-white/70 absolute top-0 left-0 flex justify-center items-center "
      }
    >
      <div
        ref={profileUploadref}
        className={
          "bg-white pt-[50px] pb-6 pr-[70px] pl-[30px] rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative"
        }
      >
        <RxCross2
          onClick={() => profileUploadModalClose(false)}
          className="absolute top-3 right-3 bg-primaryBgColor box-content p-2 text-lg rounded-full cursor-pointer"
        />
        {!image ? (
          <Box className={"ml-[40px]"}>
            <Typography className="text-lg text-center font-bold mb-3">
              Choose profile picture
            </Typography>
            <Box className={"w-[300px] mx-auto"}>
              <label
                for="file-upload"
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
              Upload New Photo As Profile Picture
            </Typography>
            <Box className={"flex items-center"}>
              <Box className="box w-[350px] mr-[15px]">
                <div className="img-preview overflow-hidden mx-auto max-w-[300px] min-w-[300px] aspect-square rounded-full" />
              </Box>
              <Box className={""}>
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

export default ProfileUploadModal;
