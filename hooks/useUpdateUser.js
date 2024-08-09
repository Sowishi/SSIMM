import { push, ref, serverTimestamp, update } from "firebase/database";
import { db } from "../firebase";

const useUpdateUser = () => {
  const updateUser = (data, selectedUser, addBalance, addType) => {
    console.log(addBalance, data);
    const userRef = ref(db, `users/${selectedUser.id}`);
    const transactionRef = ref(db, `users/${selectedUser.id}/transaction`);

    const calculatedBalance =
      addType == "add"
        ? parseInt(selectedUser.balance) + parseInt(addBalance)
        : parseInt(selectedUser.balance) - parseInt(addBalance);

    update(userRef, {
      ...data,
      balance: parseInt(addBalance) == 0 ? data.balance : calculatedBalance,
    });

    if (parseInt(addBalance) !== 0) {
      push(transactionRef, {
        createdAt: serverTimestamp(),
        balance: parseInt(addBalance),
        type: addType,
      });
    }
  };
  return { updateUser };
};

export default useUpdateUser;
