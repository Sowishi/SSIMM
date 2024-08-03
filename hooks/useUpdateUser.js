import { push, ref, serverTimestamp, update } from "firebase/database";
import { db } from "../firebase";

const useUpdateUser = () => {
  const updateUser = (data, selectedUser, addBalance) => {
    console.log(addBalance, data);
    const userRef = ref(db, `users/${selectedUser.id}`);
    const transactionRef = ref(db, `users/${selectedUser.id}/transaction`);
    update(userRef, {
      ...data,
      balance:
        parseInt(addBalance) == 0
          ? data.balance
          : parseInt(selectedUser.balance) + parseInt(addBalance),
    });

    if (parseInt(addBalance) !== 0) {
      push(transactionRef, {
        createdAt: serverTimestamp(),
        balance: parseInt(addBalance),
      });
    }
  };
  return { updateUser };
};

export default useUpdateUser;
