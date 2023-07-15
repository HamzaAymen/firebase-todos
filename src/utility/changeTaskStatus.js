import { doc, collection, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const changeTaskStatus = async (id, completed, userId) => {
  const userRef = doc(db, "users", userId);
  const taskRef = doc(collection(userRef, "tasks"), id);
  await updateDoc(taskRef, { completed });
};

export default changeTaskStatus;
