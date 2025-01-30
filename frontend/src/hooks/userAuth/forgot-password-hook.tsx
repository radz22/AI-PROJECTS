import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword } from "../../services/userAuth/userAuth-service";
import { forgotPasswordType } from "../../types/forgot-password";
import { useNavigate } from "react-router-dom";
import {
  handleErrorAlert,
  handleSuccessAlert,
} from "../../components/alert-button";

export const ForgotPasswordHook = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userauth"] });
      handleSuccessAlert(data.message);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: (error: any) => {
      console.log(error?.data?.msg || error?.data?.message);
      handleErrorAlert(error.data.message);
    },
  });

  const handleForgotPassword = (data: forgotPasswordType) => {
    forgotPasswordMutation.mutateAsync(data);
  };

  return { handleForgotPassword, forgotPasswordMutation };
};
