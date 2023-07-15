import Task from "./Task";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  where,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Tasks = () => {
  const myId = Cookies.get("userId");
  const [userTasks, setUserTasks] = useState([]);
  const userDocRef = doc(db, "users", myId);
  const colRef = collection(userDocRef, "tasks");

  // Get All Tasks Where They Created By The User
  const fetchData = async () => {
    const queryTasks = query(
      colRef,
      where("userId", "==", myId),
      where("completed", "!=", true)
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

  return userTasks.length > 0 ? (
    <div className="max-h-[75%] w-full overflow-y-auto">
      {userTasks.map((task, idx) => (
        <Task key={idx} text={task.task} id={task.id} />
      ))}
    </div>
  ) : (
    <div className="mx-auto my-3 w-[80%] bg-white text-center font-bold text-gray-900">
      There Is No Tasks !
    </div>
  );
};
export default Tasks;
