import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../config/firebase";
import { useState, useEffect } from "react";
import createUserInDB from "../utility/createUserInDB";
import checkUserLoggedIn from "../utility/checkUserLoggedIn";
import Cookies from "js-cookie";
import setUserInCookie from "../utility/setUserInCookie";
import { query, where, getDocs, collection } from "firebase/firestore";

const Signin = () => {
  const [noUser, setNoUser] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // Redirect if he is loggedin
  useEffect(() => {
    checkUserLoggedIn(navigate);
  }, []);

  // handling regestring email & password
  const signInWithEmail = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const q = query(collection(db, "users"), where("email", "==", email));
      const userId = (await getDocs(q)).docs[0].id;
      setUserInCookie(userId);
      Cookies.set("loggedin", true, { expires: 14 });
      navigate("/");
    } catch (error) {
      return setNoUser(true);
    }
  };

  // Signin with google
  const signInWithGoogle = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      const name = userCred.user.displayName;
      const email = userCred.user.email;
      const provider = "google";
      const password = null;

      /// If its new user - create user - set cookie - redirect home
      if (userCred._tokenResponse?.isNewUser) {
        const userRef = await createUserInDB(name, email, password, provider);
        await setUserInCookie(userRef.id);
        Cookies.set("loggedin", true, { expires: 14 });
        return navigate("/");
      }

      // If its not new user - set cookies - redirect to home
      const q = query(collection(db, "users"), where("email", "==", email));
      const id = (await getDocs(q)).docs[0].id;
      setUserInCookie(id);
      Cookies.set("loggedin", true, { expires: 14 });
      return navigate("/");
    } catch (error) {
      return setNoUser(true);
    }
  };
  return (
    <div className="flex h-[100vh] items-center justify-center bg-gradient-to-r from-[#D3CCE3] to-[#E9E4F0]">
      <div className="border- flex h-[600px] w-[400px] flex-col items-center justify-center rounded-lg bg-darkPurple shadow-md shadow-slate-600">
        <h1 className="my-2 text-center text-5xl font-bold text-white">
          Signin
        </h1>
        <form
          className="flex w-full flex-col items-center justify-center"
          onSubmit={handleSubmit(signInWithEmail)}
          noValidate
        >
          <input
            type="text"
            placeholder="Email..."
            className="my-2 w-[70%] rounded border-2 border-gray-400 px-4 py-2 focus:border-blue-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          <input
            type="password"
            placeholder="Password"
            className="my-2 w-[70%] rounded border-2 border-gray-400 px-4 py-2 focus:border-blue-500"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d).{8,}$/,
                message: "Please enter a valid password",
              },
            })}
          />
          <div className="w-[70%]">
            <p className="mt-1 text-sm text-white ">
              {noUser && "Wrong username or password"}
            </p>
          </div>

          <button className="my-2 w-[50%] rounded-md border px-4 py-2 text-white hover:bg-white hover:text-black">
            Sign In
          </button>
          <p className="text-white">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="font-bold underline">Signup</span>
            </Link>
          </p>
        </form>
        <div className="flex w-full items-center justify-center">
          <hr className="border-red mr-3 w-[25%]   border-t" />
          <span className="w-[10%] text-white">OR</span>
          <hr className="border-red mr-3 w-[25%]  border-t" />
        </div>
        <button
          className="my-1 flex items-center justify-center rounded-md border px-4 py-2 text-white hover:bg-white hover:text-black"
          onClick={signInWithGoogle}
        >
          <FcGoogle className="mr-2" />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
