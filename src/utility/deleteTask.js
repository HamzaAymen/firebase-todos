import { doc, collection, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const deleteTask = async (id, userId) => {
  const userRef = doc(db, "users", userId);
  const taskRef = doc(collection(userRef, "tasks"), id);
  await deleteDoc(taskRef);
};

export default deleteTask;
