import { push, ref, serverTimestamp, update } from "firebase/database";
import { db } from "../firebase";

const useUpdateUser = () => {
  const updateUser = (data, selectedUser, addBalance) => {
    if (addBalance !== 0) {
      const userRef = ref(db, `users/${selectedUser.id}`);
      const transactionRef = ref(db, `users/${selectedUser.id}/transaction`);
      update(userRef, {
        ...data,
        balance: parseInt(selectedUser.balance) + parseInt(addBalance),
      });

      push(transactionRef, {
        createdAt: serverTimestamp(),
        balance: parseInt(addBalance),
      });
    }
  };
  return { updateUser };
};

export default useUpdateUser;
