import { Header } from "../components/header";
import { MessageBox } from "../components/messageBox";
import { getUser } from "../hooks/userAuth/getUserData";
import { useEffect } from "react";
import { getFromLocalStorage } from "../services/localstorage/localStorageService";
export const Home = () => {
  const token = getFromLocalStorage("token");
  const { handleGetUserData, userData } = getUser();

  useEffect(() => {
    handleGetUserData(token);
  }, [token]);

  return (
    <div className="w-full px-10 py-5 h-screen bg-[#f5f5f5]">
      <Header data={userData} />
      <MessageBox />
    </div>
  );
};
