import { ref, update } from "firebase/database";
import { db } from "../firebase";

const useUpdateUser = () => {
  const updateUser = (data, selectedUser) => {
    const userRef = ref(db, `users/${selectedUser}`);
    if (data.username.length >= 1) {
      update(userRef, { username: data.username });
    }
    if (data.phone.length >= 1) {
      update(userRef, { phone: data.phone });
    }
    if (data.password.length >= 1) {
      update(userRef, { password: data.password });
    }
  };
  return { updateUser };
};

export default useUpdateUser;
