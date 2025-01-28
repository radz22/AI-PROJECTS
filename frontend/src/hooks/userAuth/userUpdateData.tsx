import React from "react";
import { userDataType } from "../../types/user-data-type";
import { updateUserData } from "../../services/userAuth/userAuth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const UserUpdateData = () => {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ["userauth"] });
    },
    onError: (error: any) => {
      console.log(error?.data?.msg || error?.data?.message);
    },
  });

  const handleUpdateUser = (data: userDataType) => {
    updateUserMutation.mutateAsync(data);
  };
  return { handleUpdateUser, updateUserMutation };
};
