import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignUp } from "../../services/userAuth/userAuth-service";
import { userType } from "../../types/profile-type";
import { saveToLocalStorage } from "../../services/localstorage/localStorageService";

export const UserAuthSignupHook = () => {
  const queryClient = useQueryClient();
  const signUpMutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      saveToLocalStorage("token", data.token, 1);
      saveToLocalStorage("login", data.login, 1);
      window.location.reload();

      queryClient.invalidateQueries({ queryKey: ["userauth"] });
    },
    onError: (error: any) => {
      console.log(error?.data?.msg || error?.data?.message);
    },
  });

  const handleUserSignup = (user: userType) => {
    signUpMutation.mutate(user);
  };
  return { handleUserSignup };
};
