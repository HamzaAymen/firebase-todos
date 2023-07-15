import { useForm } from "react-hook-form";
import { db } from "../config/firebase";
import { collection, addDoc, doc } from "firebase/firestore";
import Cookies from "js-cookie";

const TaskInput = () => {
  const { register, handleSubmit, reset } = useForm();

  const addNewTask = async ({ task }) => {
    const userId = Cookies.get("userId");
    const userDocRef = doc(db, "users", userId);
    const data = {
      task,
      userId,
      completed: false,
    };
    addDoc(collection(userDocRef, "tasks"), data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(addNewTask)}
      className="flex justify-center rounded-md "
    >
      <input
        type="text"
        className=" my-2 w-[90%] rounded-md p-2 text-gray-950"
        placeholder="Type Your Task..."
        {...register("task", {
          required: "Task is required",
        })}
      />
    </form>
  );
};

export default TaskInput;
