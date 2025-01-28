import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../services/userAuth/userAuth-service";
import { useAtom } from "jotai";
import { userAtom } from "../../atom/userAtom";
import { getFromLocalStorage } from "../../services/localstorage/localStorageService";
import geminiAiHook from "../gemini/geminiAi-hook";
export const getUser = () => {
  const { setChatAi } = geminiAiHook();
  const [userData, setUserData] = useAtom(userAtom);
  const token = getFromLocalStorage("token");
  const queryClient = useQueryClient();
  const userDataMutation = useMutation({
    mutationFn: getUserData,
    onSuccess: (data) => {
      setUserData(data.data);
      queryClient.invalidateQueries({ queryKey: ["userauth"] });
    },
    onError: (error: any) => {
      console.log(error?.data?.msg || error?.data?.message);
    },
  });

  const handleGetUserData = () => {
    userDataMutation.mutate(token);
  };
  useEffect(() => {
    handleGetUserData();
  }, [token]);

  return { userData };
};
