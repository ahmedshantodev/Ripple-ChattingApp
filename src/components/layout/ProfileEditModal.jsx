import React, { useEffect, useRef, useState } from "react";
import Box from "./Box";
import Typography from "./Typography";
import Flex from "./Flex";
import { RxCross2 } from "react-icons/rx";
import Button from "./Button";
import Image from "./Image";
import ProfileUploadModal from "./ProfileUploadModal";
import { useSelector } from "react-redux";
import Input from "./Input";
import coverphoto from "/public/images/1711471680698.jpg"

const ProfileEditModal = ({ profileEditModaClose, profileEditref }) => {
  const activeUserData = useSelector((state) => state.user.information);
  const [nestedProfileUploadModal, setNestedProfileUploadModal] = useState(false);
  const [name, setName] = useState(activeUserData?.displayName);
  const [nameEditShow, setNameEditShow] = useState(false);
  const profileUploadModalRef = useRef();
  const profileUploadModalButtonRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (profileUploadModalButtonRef.current.contains(e.target)) {
        setNestedProfileUploadModal(true);
      } else if (!profileUploadModalRef.current.contains(e.target)) {
        setNestedProfileUploadModal(false);
      }
    });
  }, []);

  return (
    <section
      className={
        "w-full h-dvh bg-white/70 absolute top-0 left-0 flex justify-center items-start overflow-y-auto py-16"
      }
    >
      <div
        ref={profileEditref}
        className={
          "bg-white w-[800px] py-5 rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative"
        }
      >
        <Typography className="pb-5 text-center font-bold text-xl border-b-[2px] border-primaryBorder">
          Edit profile
        </Typography>
        <RxCross2
          onClick={() => profileEditModaClose(false)}
          className="absolute top-4 right-4 bg-primaryBgColor box-content p-2 text-xl rounded-full cursor-pointer"
        />
        <Box>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"pt-4 px-5"}
          >
            <Typography className="text-center font-bold text-xl">
              Profile picture
            </Typography>
            <button
              ref={profileUploadModalButtonRef}
              onClick={() => setNestedProfileUploadModal(!nestedProfileUploadModal)
              }
              className={
                "py-2 px-5 bg-[#2176ff] text-white rounded-md transition-all ease-in-out duration-200 active:scale-[0.97]"
              }
            >
              Edit
            </button>
            {nestedProfileUploadModal && (
              <ProfileUploadModal
                profileUploadModalClose={setNestedProfileUploadModal}
                profileUploadref={profileUploadModalRef}
              />
            )}
          </Flex>
          <Image
            src={activeUserData?.photoURL}
            alt={"random"}
            className={"w-[220px] aspect-square rounded-full mx-auto my-6"}
          />
        </Box>
        <Box>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"pt-4 px-5"}
          >
            <Typography className="text-center font-bold text-xl">
              Cover photo
            </Typography>
            <Button
              className={
                "py-2 px-5 bg-[#2176ff] text-white rounded-md transition-all ease-in-out duration-200 active:scale-[0.97]"
              }
            >
              Edit
            </Button>
          </Flex>
          <Image
            src={coverphoto}
            alt={"random"}
            className={
              "w-[550px] align-middle object-cover rounded-lg mx-auto my-6"
            }
          />
        </Box>
        <Box>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"pt-4 px-5"}
          >
            <Typography className="text-center font-bold text-xl">
              Name
            </Typography>
            {nameEditShow ? (
              <>
                <Button
                  onClick={() => setNameEditShow(false)}
                  className={
                    "py-2 px-5 bg-[#2176ff] text-white rounded-md transition-all ease-in-out duration-200 active:scale-[0.97] mr-2.5"
                  }
                >
                  Save
                </Button>
                <Button
                  onClick={() => setNameEditShow(false)}
                  className={
                    "py-2 px-5 bg-[#2176ff] text-white rounded-md transition-all ease-in-out duration-200 active:scale-[0.97]"
                  }
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setNameEditShow(true)}
                className={
                  "py-2 px-5 bg-[#2176ff] text-white rounded-md transition-all ease-in-out duration-200 active:scale-[0.97]"
                }
              >
                Edit
              </Button>
            )}
          </Flex>
          {nameEditShow ? (
            <Box className={"text-center"}>
              <Input
                autoFocus={true}
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="font-bold outline-none text-[24px] w-[70%] text-center my-6 border-b-[2px] border-primaryBorder"
              />
            </Box>
          ) : (
            <Typography
              variant="h3"
              className="text-center text-[24px] font-bold my-6"
            >
              {activeUserData?.displayName}
            </Typography>
          )}
        </Box>
        <Box>
          <Flex
            justifyContent={"between"}
            alignItems={"center"}
            className={"pt-4 px-5"}
          >
            <Typography className="text-center font-bold text-xl">
              Bio
            </Typography>
            <Button
              className={
                "py-2 px-5 bg-[#2176ff] text-white rounded-md transition-all ease-in-out duration-200 active:scale-[0.97]"
              }
            >
              Edit
            </Button>
          </Flex>
          <Typography
            variant="h3"
            className="text-center text-[18px] text-[#65676b] my-6 w-[55%] mx-auto"
          >
            "Don't sit down and wait for the opportunities to come. Get up and
            make them." — Madam C.J. Walker
          </Typography>
        </Box>
        <Box className={"text-center mt-10"}>
          <Button
            onClick={() => profileEditModaClose(false)}
            className={
              "py-2.5 px-[200px] bg-[#2176ff] text-white text-[20px] rounded-md transition-all ease-in-out duration-200 active:scale-[0.97]"
            }
          >
            Done
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default ProfileEditModal;
