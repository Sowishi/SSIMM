import { push, ref } from "firebase/database";
import { db } from "../firebase";
import { useState } from "react";

const useAddUser = () => {
  const userRef = ref(db, "users");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = async (data) => {
    setLoading(true);
    if (
      data.username.length <= 0 ||
      data.password.length <= 0 ||
      data.phone.length <= 0 ||
      data.balance.length <= 0
    ) {
      setError("Fill out all the field");
      setLoading(false);
      return;
    }
    try {
      await push(userRef, {
        ...data,
        profilePic: `https://avatar.iran.liara.run/public?username=${data.username}`,
      });
      setError(false);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { addUser, error, loading };
};

export default useAddUser;
