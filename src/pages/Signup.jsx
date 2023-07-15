import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../config/firebase";
import { useEffect, useState } from "react";
import createUserInDB from "../utility/createUserInDB";
import checkUserLoggedIn from "../utility/checkUserLoggedIn";
import setUserInCookie from "../utility/setUserInCookie";
import Cookies from "js-cookie";
import { query, collection, where, getDocs } from "firebase/firestore";

const Signup = () => {
  const [emailInUse, setEmailInUse] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if he is loggedin
  useEffect(() => {
    checkUserLoggedIn(navigate);
  }, []);

  // handling regestring email & password
  const signUpWithEmail = async ({ name, email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const provider = "email";
      const userRef = await createUserInDB(name, email, password, provider);
      await setUserInCookie(userRef.id);
      navigate("/");
    } catch (error) {
      return setEmailInUse(true);
    }
  };

  // Signup with google
  const signUpWithGoogle = async () => {
    const userCred = await signInWithPopup(auth, googleProvider);
    const name = userCred.user.displayName;
    const email = userCred.user.email;
    const provider = "google";
    const password = null;

    // If its new user - set cookies - redirect to home
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
  };
  return (
    <div className="flex h-[100vh] items-center justify-center bg-gradient-to-r from-[#D3CCE3] to-[#E9E4F0]">
      <div className="border- flex h-[600px] w-[400px] flex-col items-center justify-center rounded-lg bg-darkPurple shadow-md shadow-slate-600">
        <h1 className="my-2 text-center text-5xl font-bold text-white">
          Signup
        </h1>
        <form
          className="flex w-full flex-col items-center justify-center"
          onSubmit={handleSubmit(signUpWithEmail)}
          noValidate
        >
          <input
            type="text"
            placeholder="Name..."
            className="my-2 w-[70%] rounded border-2 border-gray-400 px-4 py-2 focus:border-blue-500"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Name should contain letters only!",
              },
            })}
          />
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
            <p className="mt-1 text-sm text-white">
              {errors.username ? "*" : ""} {errors.username?.message}
            </p>
            <p className="mt-1 text-sm text-white">
              {errors.email ? "*" : ""} {errors.email?.message}
            </p>
            <p className="mt-1 text-sm text-white ">
              {errors.password ? "*" : ""} {errors.password?.message}
            </p>
            <p className="mt-1 text-sm text-white ">
              {emailInUse && "This email is already registered!"}
            </p>
          </div>

          <button className="my-2 w-[50%] rounded-md border px-4 py-2 text-white hover:bg-white hover:text-black">
            Sign up
          </button>
          <p className="text-white">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="font-bold underline">Signin</span>
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
          onClick={signUpWithGoogle}
        >
          <FcGoogle className="mr-2" />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
