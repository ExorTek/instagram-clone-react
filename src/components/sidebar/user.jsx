import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function User({ username, fullName }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className={"grid grid-cols-4 mb-6 items-center"}
    >
      <div className={"flex items-center justify-between col-span-1"}>
        <img
          className={"rounded-full m-16 flex mr-3"}
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
      </div>
      <div className={"col-span-3"}>
        <p className={"font-bold text-sm"}>{username}</p>
        <p className={"text-sm"}>{fullName}</p>
      </div>
    </Link>
  );
}
User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
