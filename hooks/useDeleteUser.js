import { ref, remove } from "firebase/database";
import { db } from "../firebase";

const useDeleteUser = () => {
  const deleteUser = (id) => {
    const userRef = ref(db, `users/${id}`);
    remove(userRef);
  };
  return { deleteUser };
};

export default useDeleteUser;
