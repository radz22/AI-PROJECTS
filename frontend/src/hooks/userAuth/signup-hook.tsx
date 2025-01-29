import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignUp } from "../../services/userAuth/userAuth-service";
import { userType } from "../../types/profile-type";
import { saveToLocalStorage } from "../../services/localstorage/localStorageService";
import { useNavigate } from "react-router-dom";
import { handleErrorAlert } from "../../components/alert-button";
export const UserAuthSignupHook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      saveToLocalStorage("token", data.token, 1);
      saveToLocalStorage("login", data.login, 1);
      navigate("/");
      window.location.reload();

      queryClient.invalidateQueries({ queryKey: ["userauth"] });
    },
    onError: (error: any) => {
      handleErrorAlert(error.data.message);
    },
  });

  const handleUserSignup = (user: userType) => {
    signUpMutation.mutate(user);
  };
  return { handleUserSignup, signUpMutation };
};
