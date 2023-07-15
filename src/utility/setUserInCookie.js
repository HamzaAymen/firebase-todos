import Cookies from "js-cookie";
const setUserInCookie = async (userId) => {
  Cookies.set("userId", userId, { expires: 14 });
};

export default setUserInCookie;
