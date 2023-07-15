import { useState, useEffect } from "react";
import CompletedTask from "./CompletedTask";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {
  collection,
  getDocs,
  where,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Cookies from "js-cookie";

const CompletedTasks = () => {
  const [open, setOpen] = useState(false);
  const myId = Cookies.get("userId");
  const [userTasks, setUserTasks] = useState([]);
  // const colRef = collection(db, "tasks");

  const userDocRef = doc(db, "users", myId);
  const colRef = collection(userDocRef, "tasks");

  // Get All Tasks Where They Created By The User
  const fetchData = async () => {
    const queryTasks = query(
      colRef,
      where("userId", "==", myId),
      where("completed", "==", true)
    );
    const data = await getDocs(queryTasks);
    const tasksData = data.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setUserTasks(tasksData);
  };

  // Add Listener For Tasks, On Change Re-render UI
  useEffect(() => {
    onSnapshot(colRef, () => fetchData());
    fetchData();
  }, []);

  return (
    <div>
      <div
        className="mx-auto my-2 flex w-[70%] cursor-pointer items-center justify-center rounded-full bg-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        <p className=" p-1 text-center font-[400] text-gray-950">
          Completed Tasks
        </p>
        {open ? (
          <AiOutlineArrowDown className="text-gray-950" />
        ) : (
          <AiOutlineArrowUp className="text-gray-950" />
        )}
      </div>
      {open
        ? userTasks.map((task, idx) => {
            return <CompletedTask key={idx} text={task.task} id={task.id} />;
          })
        : ""}
    </div>
  );
};

export default CompletedTasks;
