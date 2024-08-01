import { push, ref, serverTimestamp, update } from "firebase/database";
import { db } from "../firebase";

const useUpdateUser = () => {
  const updateUser = (data, selectedUser) => {
    const userRef = ref(db, `users/${selectedUser.id}`);
    const transactionRef = ref(db, `users/${selectedUser.id}/transaction`);
    update(userRef, {
      ...data,
      balance: parseInt(selectedUser.balance) + parseInt(data.balance),
    });

    push(transactionRef, {
      createdAt: serverTimestamp(),
      balance: data.balance,
    });
  };
  return { updateUser };
};

export default useUpdateUser;
