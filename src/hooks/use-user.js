import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      //we need a function that we can call (firebase service) that gets the user based on the id
      const [response] = await getUserByUserId(user?.uid);
      setActiveUser(response);
    }

    if (user?.uid) {
      getUserObjByUserId().then((r) => console.log());
    }
  }, [user]);
  return { user: activeUser };
}
