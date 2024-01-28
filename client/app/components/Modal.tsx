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
      <article className="fade-in fixed top-1/4 z-20 flex scale-75 transform rounded-sm bg-base-100 p-4 opacity-0 transition-all duration-300">
        <FontAwesomeIcon
          onClick={handleModalClose}
          className="absolute right-0 top-0 scale-95  transform rounded-sm  p-1  transition-all duration-300 hover:scale-100 hover:bg-red-400 "
          icon={faXmark}
        />

        {children}
      </article>
      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fade-in {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default Modal;
