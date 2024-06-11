import React, { useEffect, useRef } from "react";

const Modal = ({ modalShow, modalClose, children, className }) => {
  const modalRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (modalRef.current.contains(e.target) && !boxRef.current.contains(e.target)) {
        modalClose(false)
      }
    });
  }, []);

  return (
    <section
      ref={modalRef}
      className={`${
        modalShow ? "flex" : "hidden"
      } w-full h-dvh bg-white/70 fixed top-0 left-0 justify-center items-center z-50`}
    >
      <div
        ref={boxRef}
        className={
          `bg-white rounded-lg border border-primaryBorder shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] relative ${className}`
        }
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
