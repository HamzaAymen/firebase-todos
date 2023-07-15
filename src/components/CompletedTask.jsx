import { BsTrash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import deleteTask from "../utility/deleteTask";
import changeTaskStatus from "../utility/changeTaskStatus";

const CompletedTask = ({ text, id }) => {
  const { register } = useForm();
  const userId = Cookies.get("userId");

  return (
    <div className="mx-auto my-4 flex w-[90%] items-center justify-between  bg-white p-2 shadow shadow-black">
      <p className="font-[500] text-gray-950">{text}</p>
      <form className="flex items-center justify-center">
        <input
          type="checkbox"
          className="me-2 h-[15px] w-[15px]"
          {...register("taskCompleted")}
          checked={true}
          onChange={(e) => changeTaskStatus(id, e.target.checked, userId)}
        />
        <BsTrash
          className="cursor-pointer text-lightGrey"
          size={18}
          onClick={() => deleteTask(id, userId)}
        />
      </form>
    </div>
  );
};

export default CompletedTask;
