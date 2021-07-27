import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { useContext, useEffect, useState } from "react";
import * as ROUTES from "../constants/routes";
import Firebase from "firebase";
import { toast } from "react-toastify";

export default function Login() {
  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const facebookFire = Firebase;
  const provider = new facebookFire.auth.FacebookAuthProvider();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };
  return (
    <div
      className={"container flex mx-auto items-center h-screen max-w-screen-md"}
    >
      <div className={"flex w-3/5 "}>
        <img src={"images/login-page.png"} alt={"iphone-login"} />
      </div>
      <div className={"flex flex-col w-2/5"}>
        <div
          className={
            "flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded"
          }
        >
          <h1 className={"flex justify-center w-full"}>
            <img
              className={"mt-2 w-6/12 mb-4"}
              src={"images/logo.png"}
              alt={"Instagram"}
            />
          </h1>
          {error && <p className={"mb-4 text-xs text-red-primary"}>{error}</p>}
          <form onSubmit={handleLogin} method={"POST"}>
            <input
              className={
                "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              }
              aria-label={"Enter your email address"}
              type={"text"}
              placeholder={" Email address"}
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              className={
                "input-outline text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              }
              aria-label={"Enter your password"}
              type={"password"}
              placeholder={" Password"}
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              style={{ backgroundColor: "#0095F6" }}
              disabled={isInvalid}
              type={"submit"}
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Log In
            </button>
            <button
              onClick={handleFacebookLogin}
              className={`text-blue-500 w-full rounded h-8 font-bold mb-5 mt-2`}
            >
              <h1 className={"flex justify-center w-full"}>
                <img
                  className={"h-4 w-4 mt-1 mr-1"}
                  src={"images/facebook-blue.png"}
                  alt={"Instagram"}
                />
                Log in with Facebook
              </h1>
            </button>
          </form>
        </div>
        <div
          className={
            "flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary"
          }
        >
          <p className={"text-sm"}>
            Don't have an account?{` `}
            <Link className={"font-bold text-blue-500"} to={ROUTES.SIGN_UP}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
