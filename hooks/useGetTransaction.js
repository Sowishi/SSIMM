import {
  limitToLast,
  onValue,
  orderByChild,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetTransaction = () => {
  const [transaction, setTransaction] = useState();
  const [loading, setLoading] = useState(false);

  const getTransaction = (id) => {
    setLoading(true);
    const usersRef = ref(db, `users/${id}/transaction`);
    const queryRef = query(usersRef, orderByChild("createdAt"));
    onValue(queryRef, (snapshot) => {
      const output = [];
      snapshot.forEach((doc) => {
        output.push({ ...doc.val(), id: doc.key });
      });
      setTransaction(output.reverse());
    });
    setLoading(false);
  };

  return { transaction, loading, getTransaction };
};

export default useGetTransaction;
