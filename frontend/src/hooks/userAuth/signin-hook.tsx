import { userType } from "../../types/profile-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignin } from "../../services/userAuth/userAuth-service";
import { saveToLocalStorage } from "../../services/localstorage/localStorageService";
export const UserAuthSiginHook = () => {
  const queryClient = useQueryClient();
  const signinMutation = useMutation({
    mutationFn: userSignin,
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

  const handleUserSignin = (user: userType) => {
    signinMutation.mutate(user);
  };
  return { handleUserSignin };
};
