import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googleSignIn } from "../../services/googleAuth/googleAuth-service";
import { userType } from "../../types/profile-type";
import { saveToLocalStorage } from "../../services/localstorage/localStorageService";

export const GoogleAuthSiginHook = () => {
  const queryClient = useQueryClient();
  const signinMutation = useMutation({
    mutationFn: googleSignIn,
    onSuccess: (data) => {
      saveToLocalStorage("token", data.token, 1);
      saveToLocalStorage("login", data.login, 1);
      window.location.reload();

      queryClient.invalidateQueries({ queryKey: ["google"] });
    },
    onError: (error: any) => {
      console.log(error?.data?.msg || error?.data?.message);
    },
  });

  const handleGoogleSignin = (user: userType) => {
    signinMutation.mutate(user);
  };
  return { handleGoogleSignin };
};
