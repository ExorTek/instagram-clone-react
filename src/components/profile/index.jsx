import { useReducer, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./header";
import Photos from "./photos";
import { getUserPhotosByUserId } from "../../services/firebase";

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: null,
    followerCount: 0,
  };
  const [isScroll, setIsScroll] = useState(false);
  const setScroll = (value) => {
    setIsScroll(value);
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [user.username]);
  console.log(isScroll);
  return (
    <div style={{ height: isScroll && "85vh" }} className={" overflow-hidden"}>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        setScroll={setScroll}
      />
      <Photos photos={photosCollection} />
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
