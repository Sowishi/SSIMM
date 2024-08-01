import { ref, update } from "firebase/database";
import { db } from "../firebase";

const useUpdateUser = () => {
  const updateUser = (data, selectedUser) => {
    const userRef = ref(db, `users/${selectedUser}`);
    update(userRef, data);
  };
  return { updateUser };
};

export default useUpdateUser;
