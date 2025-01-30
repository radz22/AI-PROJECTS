import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPasswordType } from "../../types/reset-password";
import { resetPassword } from "../../services/userAuth/userAuth-service";
import {
  handleErrorAlert,
  handleSuccessAlert,
} from "../../components/alert-button";

export const ResetPasswordHook = () => {
  const queryClient = useQueryClient();
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userauth"] });
      handleSuccessAlert(data.message);
    },
    onError: (error: any) => {
      console.log(error?.data?.msg || error?.data?.message);
      handleErrorAlert(error.data.message);
    },
  });

  const handleResetPassword = (email: resetPasswordType) => {
    resetPasswordMutation.mutate(email);
  };
  return { handleResetPassword, resetPasswordMutation };
};
