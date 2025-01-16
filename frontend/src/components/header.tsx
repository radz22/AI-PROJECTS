import React, { useEffect } from "react";
import { getUser } from "../hooks/userAuth/getUserData";
import { getFromLocalStorage } from "../services/localstorage/localStorageService";
import { userDataType } from "../types/user-data-type";
interface headerProps {
  data: userDataType | null;
}
export const Header: React.FC<headerProps> = ({ data }) => {
  return (
    <div className="w-full flex justify-between ">
      <div>
        <h1 className="text-xl text-[#777777]">CHAT BOSS</h1>
      </div>
      <div className="w-auto ">
        <div className="w-full flex item-center justify-center">
          <div className="w-[40%] ">
            <img src={data?.image} className="w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
