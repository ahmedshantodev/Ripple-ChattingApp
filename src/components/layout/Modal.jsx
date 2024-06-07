import React from "react";

const Modal = ({ modalShow }) => {
  const [show, setShow] = useState(modalShow);
  return (
    <section
      className={`${
        show ? "block" : "hidden"
      } w-full h-dvh bg-white/70 absolute top-0 left-0 flex justify-center items-center z-50`}
    >
      <div
        ref={profileUploadref}
        className={
          "bg-white pt-[50px] pb-6 pr-[70px] pl-[30px] rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative"
        }
      >
        lasjdljf;sdl
      </div>
    </section>
  );
};

export default Modal;
