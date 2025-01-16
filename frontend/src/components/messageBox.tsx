import React, { useState } from "react";
import { userDataType } from "../types/user-data-type";

export const MessageBox = () => {
  const [data, setData] = useState<any>([
    {
      name: "radz",
      text: "hello mo",
    },
    {
      name: "SANTY-AI",
      text: "hello ano gagawin natin? hello ano gagawin natin? hello ano gagawin eqweqwe wqe wqnatin? hello ano gagawin natin? hello ano gagawin natin?hello ano gagawin natin? hello ano gagawin natin? hello ano gagawin natin? hello ano gagawin natin? hello ano gagawin natin?w",
    },
  ]);
  return (
    <div className="flex items-center justify-center mt-20 w-full">
      <div className="w-[60%]">
        <div className="bg-[#408fec] w-full px-3 py-3 rounded-t-lg">
          <div className="w-full flex items-center  gap-2">
            <div>
              <img
                src="https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg "
                className="w-[40px] h-[40px] rounded-full object-center"
              />
            </div>
            <div>
              <h1 className="text-2xl text-white">SANTY-AI</h1>
            </div>
          </div>
        </div>
        <div className="bg-[#ffffff] w-full px-3 py-3 max-h-[50vh] overflow-y-auto overflow-x-auto ">
          <div className="w-full mt-5 pb-10 ">
            {data.map((item) => (
              <div className="w-full">
                <div className="mt-2">
                  {item.name == "SANTY-AI" ? (
                    <div className="flex items-center justify-start gap-2">
                      <div className="w-[20%]">
                        <img
                          src="https://incubator.ucf.edu/wp-content/uploads/2023/07/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai-scaled-1-1500x1000.jpg"
                          className="w-[30px] h-[30px] rounded-full"
                        />
                      </div>
                      <div>
                        <h1 className=" text-lg italic">{item.text}</h1>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end justify-end ">
                      <h1 className="text-lg italic ">{item.text}</h1>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" border-t-4 border-[#eeeeee] bg-[#ffffff] w-full px-3 py-3  overflow-x-auto  shadow-lg shadow-[#dbdbdb] rounded-b-lg	">
          <div className="flex  justify-center gap-5 w-full   py-3">
            <div className="w-[90%]">
              <div className="w-full">
                <input
                  type="text"
                  className="w-full px-3 py-3 bg-[#f0f0f0] text-[#4e4e4e]  placeholder-[#4e4e4e] rounded-lg"
                  placeholder="Message SANTY-AI"
                />
              </div>
            </div>
            <div className="w-[10%] bg-[#408fec] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
