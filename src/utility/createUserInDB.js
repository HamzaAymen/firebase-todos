import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import Cookies from "js-cookie";
import checkUserLoggedIn from "./checkUserLoggedIn";

const createUser = async (name, email, password, provider) => {
  await checkUserLoggedIn();
  const userRef = await addDoc(collection(db, "users"), {
    provider,
    name,
    email,
    password,
  });
  Cookies.set("loggedin", true, { expires: 14 });
  return userRef;
};
export default createUser;
