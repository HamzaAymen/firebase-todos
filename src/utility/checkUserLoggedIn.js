import Cookies from "js-cookie";

const checkUserLoggedIn = async (navigate) => {
  const loggedIn = Cookies.get("loggedin");
  if (loggedIn) return navigate("/");
  return;
};

export default checkUserLoggedIn;
