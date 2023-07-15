import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Signout = () => {
  const navigate = useNavigate();
  const signOutFunc = async () => {
    await signOut(auth);
    Cookies.remove("loggedin");
    Cookies.remove("userId");
    return navigate("/signin");
  };

  return (
    <button
      className="absolute bottom-10 right-10 rounded-sm bg-darkPurple p-2 font-[400] text-white"
      onClick={signOutFunc}
    >
      Log Out
    </button>
  );
};

export default Signout;
