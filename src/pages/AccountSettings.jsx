import React, { useEffect, useRef, useState } from "react";
import Box from "../components/layout/Box";
import Image from "../components/layout/Image";
import Typography from "../components/layout/Typography";
import Button from "../components/layout/Button";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../slices/activeUserSlice";
import { useNavigate } from "react-router-dom";
import coverphoto from "/public/images/1711471680698.jpg";
import { MdModeEdit } from "react-icons/md";
import { BsCameraFill } from "react-icons/bs";
import ProfileEditModal from "../components/layout/ProfileEditModal";
import ProfileUploadModal from "../components/layout/ProfileUploadModal";
import Input from "../components/layout/Input";

const AccountSettings = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeUserData = useSelector((state) => state.user.information);
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [profileUploadModal, setProfileUploadModal] = useState(false);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(activeUser(null));
        navigate("/registration");
      })
      .catch((error) => {});
  };

  const profileEditModalRef = useRef();
  const profileEditModalButtonRef = useRef();

  const profileUploadModalRef = useRef();
  const profileUploadModalButtonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (profileEditModalButtonRef.current.contains(e.target)) {
        setProfileEditModal(true);
      } else if (!profileEditModalRef.current.contains(e.target)) {
        setProfileEditModal(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (profileUploadModalButtonRef.current.contains(e.target)) {
        setProfileUploadModal(true);
      } else if (!profileUploadModalRef.current.contains(e.target)) {
        setProfileUploadModal(false);
      }
    });
  }, []);

  return (
    <>
      <section>
        <Box
          className={
            "w-[75%] rounded-lg overflow-hidden mx-auto mt-[20px] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
          }
        >
          <Box className={"relative"}>
            <Image
              src={coverphoto}
              alt={"random image"}
              className={"w-full align-middle object-cover"}
            />
            <img
              src={activeUserData?.photoURL}
              ref={profileUploadModalButtonRef}
              onClick={() => setProfileUploadModal(!profileUploadModal)}
              alt={"random image"}
              className={
                "w-[200px] h-[200px] rounded-full align-middle object-cover border-[5px] border-white absolute left-10 -bottom-[80px] cursor-pointer"
              }
            />
            <Box className={"absolute bottom-4 right-4"}>
              <label
                for="cover-photo"
                className="bg-white flex items-center gap-x-2 py-2.5 px-4 rounded-md font-semibold font-open-sans transition-all ease-in-out duration-200 active:scale-[0.97] cursor-pointer"
              >
                <BsCameraFill className="text-xl" /> Upload Cover Photo
              </label>
              <Input id={"cover-photo"} type={"file"} className={"hidden"} />
            </Box>
          </Box>
          <Box className={"pt-20 px-11 pb-7 flex items-start justify-between"}>
            <Box>
              <Typography
                variant="h3"
                className="text-[30px] font-inter font-semibold"
              >
                {activeUserData?.displayName}
              </Typography>
              <Typography className="font-poppins mt-1 text-secoundaryText w-[435px]">
                "Don't sit down and wait for the opportunities to come. Get up
                and make them." — Madam C.J. Walker
              </Typography>
            </Box>
            <button
              ref={profileEditModalButtonRef}
              onClick={() => setProfileEditModal(true)}
              className={
                "flex items-center gap-x-2 bg-[#2176ff] text-white py-2.5 px-5 rounded-md text-[20px] transition-all ease-in-out duration-200 active:scale-[0.97]"
              }
            >
              <MdModeEdit className="text-[20px]" /> Edit Profile
            </button>
          </Box>
        </Box>
        {profileEditModal && (
          <ProfileEditModal
            profileEditModaClose={setProfileEditModal}
            profileEditref={profileEditModalRef}
          />
        )}
      </section>
      {profileUploadModal && (
        <ProfileUploadModal
          profileUploadModalClose={setProfileUploadModal}
          profileUploadref={profileUploadModalRef}
        />
      )}
    </>
  );
};

export default AccountSettings;
