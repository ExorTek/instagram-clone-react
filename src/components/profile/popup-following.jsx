import React from "react";
import { Following } from "./following";

export default function PopupFollowing({ showModal, setShowModal, following }) {
  return (
    <>
      <>
        <div
          style={{ transform: "rotate(-50%,-50%)" }}
          className="fixed z-10 bg-gray-modal bg-opacity-80 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0  outline-none focus:outline-none"
        >
          <div className="relative w-auto my-5 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div
                className="flex w-full "
                style={{ borderBottomWidth: "1px solid #8e8e8e" }}
              >
                <h3 className="mx-auto py-2 w-full text-center  text-1xl font-medium">
                  Following
                </h3>
                <button onClick={() => setShowModal(false)} className={"py-1"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-16 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="max-h-96 relative p-6 flex-auto overflow-y-scroll">
                {following &&
                  following.map((isFollowingProfile) => (
                    <div className={"justify-between"}>
                      <Following following={isFollowingProfile} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
