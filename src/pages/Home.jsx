import Tasks from "../components/Tasks";
import TaskInput from "../components/TaskInput";
import CompletedTasks from "../components/CompletedTasks";
import { useEffect, useState } from "react";
import checkUserLoggedIn from "../utility/checkUserLoggedIn";
import { useNavigate } from "react-router-dom";
import Signout from "../components/Signout";
import Cookies from "js-cookie";
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn(navigate);
    if (Cookies.get("loggedin") === undefined) return navigate("/signin");
    return setLoading(false);
  }, []);

  if (loading) return "";

  return (
    <div className="relative flex h-[100vh] flex-col items-center justify-center overflow-x-hidden bg-gradient-to-r from-[#D3CCE3] to-[#E9E4F0] pt-4">
      <h1 className="my-2 text-[60px] font-bold text-darkPurple">
        Welcome To Firebase Todos Project 🙌
      </h1>
      <div className="max-h-[90%] min-h-[60%] w-[350px] overflow-y-auto  rounded-md bg-darkPurple ">
        <TaskInput />
        <Tasks />
        <CompletedTasks />
      </div>
      <Signout />
    </div>
  );
};

export default Home;
