import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userDataType } from "../../types/user-data-type";
import { getUserData } from "../../services/userAuth/userAuth-service";
import { useState } from "react";
export const getUser = () => {
  const [userData, setUserData] = useState<userDataType | null>(null);
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

  const handleGetUserData = (token: null | string) => {
    userDataMutation.mutate(token);
  };

  return { handleGetUserData, userDataMutation, userData };
};
