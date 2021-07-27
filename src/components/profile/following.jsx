import React, { useState } from "react";
import { DEFAULT_IMAGE_PATH } from "../../constants/path";
import { Link } from "react-router-dom";

export const Following = ({ following }) => {
  const { fullName, username } = following;
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <ul className={"flex flex-row justify-between w-full mx-auto"}>
      <li className={"flex flex-row justify-between w-full"}>
        <img
          className="rounded-full h-10 w-10 flex mb-4"
          alt={`${fullName} profile picture`}
          src={`/images/avatars/${username}.jpg`}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
        <div className={"flex pl-5 flex-col w-full"}>
          <Link className={"font-medium"}>{username}</Link>
          <p className={"text-base font-normal"} style={{ color: "#8e8e8e" }}>
            {fullName}
          </p>
        </div>
        <button
          onMouseDown={toggleHover}
          onMouseUp={toggleHover}
          style={{ border: "1px solid #dbdbdb", color: "#262626" }}
          className={`ont-medium text-sm rounded text-gray-base w-36 h-8 ${
            hovered && "opacity-50"
          }`}
          type="button"
        >
          Remove
          {/*//     onClick={handleToggleFollow}*/}
          {/*//     onKeyDown={(event) => {*/}
          {/*//         if (event.key === "Enter") {*/}
          {/*//             handleToggleFollow();*/}
          {/*//         }*/}
          {/*//     }}*/}
          {/*// >*/}
          {/*//     {isFollowingProfile ? "Unfollow" : "Follow"}*/}
        </button>
      </li>
    </ul>
  );
};
