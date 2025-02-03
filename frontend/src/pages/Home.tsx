import { Header } from "../components/header";
import { MessageBox } from "../components/messageBox";
import { getUser } from "../hooks/userAuth/getUserData-hook";

export const Home = () => {
  const { userData } = getUser();

  return (
    <div className="w-full px-10 py-5 h-screen bg-[#f5f5f5]">
      <Header data={userData} />
      <MessageBox data={userData} />
    </div>
  );
};
