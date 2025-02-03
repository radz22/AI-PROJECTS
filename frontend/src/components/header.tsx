import React, { useState } from "react";
import { deleteFromLocalStorage } from "../services/localstorage/localStorageService";
import { userDataType } from "../types/user-data-type";
import { Link } from "react-router-dom";
interface headerProps {
  data: userDataType | null;
}
export const Header: React.FC<headerProps> = ({ data }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => {
    setShow(!show);
  };
  const handleLogout = () => {
    deleteFromLocalStorage("login");
    deleteFromLocalStorage("token");
    window.location.reload();
  };
  return (
    <div className="relative w-full">
      <div className="w-full flex justify-between ">
        <div>
          <h1 className="text-xl text-[#777777] max-md:text-lg">CHAT BOSS</h1>
        </div>
        <div className="w-auto ">
          <div className="w-full flex item-center justify-center">
            <div onClick={handleShow}>
              <img
                src={data?.image}
                className="h-[40px] w-[40px] rounded-full cursor-pointer object-cover max-md:h-[30px] max-md:w-[30px]"
              />
            </div>
          </div>
        </div>
      </div>
      {show && (
        <div
          className={`absolute top-12 right-0 z-10 w-[auto] ${
            show
              ? "animate-fadeInUp"
              : "animate-fadeOutDown pointer-events-none"
          }`}
        >
          <div className="bg-[#ffffff] py-3 px-3 w-[290px] shadow-xl	 shadow-[#c1c1c1]">
            <div className="flex items-center justify-center flex-col">
              <div>
                <img
                  src={data?.image}
                  className="w-[35px] h-[35px] rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-medium	 mt-2">
                  {data?.displayname}
                </h1>
              </div>
            </div>
            <Link to="/page/settings">
              <div className="flex items-center justify-between mt-8 cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="bg-[#e4e4e4] px-1 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="m10.135 21l-.362-2.892q-.479-.145-1.035-.454q-.557-.31-.947-.664l-2.668 1.135l-1.865-3.25l2.306-1.739q-.045-.27-.073-.558q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626L3.258 9.126l1.865-3.212L7.771 7.03q.448-.373.97-.673q.52-.3 1.013-.464L10.134 3h3.732l.361 2.912q.575.202 1.016.463t.909.654l2.725-1.115l1.865 3.211l-2.382 1.796q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l2.344 1.758l-1.865 3.25l-2.681-1.154q-.467.393-.94.673t-.985.445L13.866 21zm1.838-6.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-lg font-medium">Settings</h1>
                  </div>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#9d9d9d"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="m7 4l8.33 6.04c2.226 1.615 2.226 2.306 0 3.92L7 20"
                      color="#00"
                    />
                  </svg>
                </div>
              </div>
            </Link>

            <div
              className="flex items-center gap-2 mt-6 cursor-pointer"
              onClick={handleLogout}
            >
              <div className="bg-[#e4e4e4] px-1 py-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    fill-rule="evenodd"
                    d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73s-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-medium">Log Out</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
