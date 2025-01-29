import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleSignup } from "../../services/googleAuth/googleAuth-service";
import { userType } from "../../types/profile-type";
import { saveToLocalStorage } from "../../services/localstorage/localStorageService";
import { useNavigate } from "react-router-dom";
import { handleErrorAlert } from "../../components/alert-button";
export const GoogleAuthSignupHook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signUpMutation = useMutation({
    mutationFn: googleSignup,
    onSuccess: (data) => {
      saveToLocalStorage("token", data.token, 1);
      saveToLocalStorage("login", data.login, 1);
      navigate("/");
      window.location.reload();
      queryClient.invalidateQueries({ queryKey: ["google"] });
    },
    onError: (error: any) => {
      handleErrorAlert(error.data.message);
    },
  });

  const handleGoogleSignup = (user: userType) => {
    signUpMutation.mutate(user);
  };
  return { handleGoogleSignup };
};
