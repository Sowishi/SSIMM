import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetTransaction = () => {
  const [transaction, setTransaction] = useState();
  const [loading, setLoading] = useState(false);

  const getTransaction = (id) => {
    setLoading(true);
    const usersRef = ref(db, `users/${id}/transaction`);
    onValue(usersRef, (snapshot) => {
      const output = [];
      snapshot.forEach((doc) => {
        output.push({ ...doc.val(), id: doc.key });
      });
      setTransaction(output);
    });
    setLoading(false);
  };

  return { transaction, loading, getTransaction };
};

export default useGetTransaction;
