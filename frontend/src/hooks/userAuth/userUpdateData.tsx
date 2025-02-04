import { userDataType } from "../../types/user-data-type";
import { updateUserData } from "../../services/userAuth/userAuth-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleErrorAlert,
  handleSuccessAlert,
} from "../../components/alert-button";
export const UserUpdateData = () => {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: (data) => {
      handleSuccessAlert("User data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userauth"] });
    },
    onError: (error: any) => {
      console.log(error?.data?.msg || error?.data?.message);
      handleErrorAlert(error.data.message);
    },
  });

  const handleUpdateUser = (data: userDataType) => {
    updateUserMutation.mutateAsync(data);
  };
  return { handleUpdateUser, updateUserMutation };
};
