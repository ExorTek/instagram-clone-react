import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { useContext, useEffect, useState } from "react";
import * as ROUTES from "../constants/routes";
import Firebase from "firebase/app";
import { toast } from "react-toastify";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
  const facebookFire = Firebase;
  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  let provider = new facebookFire.auth.FacebookAuthProvider();

  const handleFacebookLogin = () => {
    facebookFire
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem("Profile", JSON.stringify(result.user));
      })
      .catch((error) => {
        setError(error.message);
        toast.error(setError);
      });
  };

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        // firebase user collection (create a document)
        await firebase.firestore().collection("users").add({
          serId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: ['2'],
          followers: [],
          dateCreated: Date.now()
        });
        history.push(ROUTES.LOGIN);
      } catch (error) {
        setFullName();
        setEmailAddress();
        setPassword();
        setError(error.message);
      }
    } else {
      setError("That username is already taken, please try another.");
    }
  };
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="images/login-page.png" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          <h1
            className={"text-center text-gray-head"}
            style={{ marginBottom: "1em" }}
          >
            Sign up to see photos and videos from your friends.
          </h1>
          <button
            onClick={handleFacebookLogin}
            style={{ backgroundColor: "#0095F6" }}
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold mb-5`}
          >
            <h1 className={"flex justify-center w-full"}>
              <img
                className={"h-4 w-4 mt-1 mr-1"}
                src={"images/facebook.png"}
                alt={"Instagram"}
              />
              Log in with Facebook
            </h1>
          </button>
          <div
            style={{
              margin: "10px 40px 18px",
              alignItems: "center",
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
            className={"text-gray-head text-sm text-center"}
          >
            <hr
              style={{
                width: "6em",
                borderColor: "#dbdbdb",
                display: "inline-flex",
                marginRight: "1em",
              }}
            />
            OR
            <hr
              style={{
                width: "6em",
                borderColor: "#dbdbdb",
                display: "inline-flex",
                marginLeft: "1em",
              }}
            />
          </div>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
