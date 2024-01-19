import React, { Children, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => any;
  children: React.ReactNode;
}

const Modal = ({ showModal, setShowModal, children }: props) => {


  const handleModalClose = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!showModal) {
      return;
    }
    const escapeListen = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(!showModal);
      }
    };
    window.addEventListener("keydown", escapeListen);
    return () => window.removeEventListener("keydown", escapeListen);
  }, [showModal]);

  return (
    <>
      <div
        onClick={() => setShowModal(!showModal)}
        className=" fixed left-0 top-0 z-10 h-screen  w-screen  bg-black opacity-70"
      ></div>
      <article className="fixed  top-1/4  z-20  flex w-2/5 rounded-sm bg-white px-2 py-4">
        <FontAwesomeIcon
          onClick={handleModalClose}
          className="absolute right-0 top-0 rounded-full p-px hover:bg-red-300 "
          icon={faXmark}
        />
        {children}
      
      </article>
    </>
  );
};

export default Modal;
