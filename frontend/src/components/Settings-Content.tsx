import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserType, updateData } from "../types/signup-zod";
import { getUser } from "../hooks/userAuth/getUserData-hook";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserUpdateData } from "../hooks/userAuth/userUpdateData";
export const SettingsContent = () => {
  const { userData } = getUser();
  const [image, setImage] = useState<string>("");
  const { handleUpdateUser, updateUserMutation } = UserUpdateData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateUserType>({
    resolver: zodResolver(updateData),
    defaultValues: {
      displayname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: updateUserType) => {
    const dataUser: any = {
      _id: userData?._id,
      email: data.email,
      displayname: data.displayname,
      password: data.password,
      cloudinaryid: userData?.cloudinaryid,
      image: image,
    };

    handleUpdateUser(dataUser);
  };

  useEffect(() => {
    if (userData) {
      setImage(userData.image);
      reset({
        displayname: userData.displayname,
        email: userData.email,
      });
    }
  }, [userData, reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] flex items-center justify-center h-screen max-lg:w-full max-lg:mt-10">
      <div className="w-[90%] bg-[#ffffff] px-5 py-5 rounded-md pb-10  max-md:w-full">
        <div className="flex items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 16 9"
            >
              <path
                fill="#000"
                d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"
              />
              <path
                fill="#000"
                d="M6 8.5a.47.47 0 0 1-.35-.15l-3.5-3.5c-.2-.2-.2-.51 0-.71L5.65.65c.2-.2.51-.2.71 0s.2.51 0 .71L3.21 4.51l3.15 3.15c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-medium tracking-wide">Setting</h1>
          </div>
        </div>
        <div className="mt-10 bg-[#ffffff] shadow-xl shadow-[#c1c1c1] w-full rounded-md">
          <div className="w-full bg-[#408fec] rounded-md">
            <div className="py-5 px-5">
              <h1 className="text-xl text-[#ffffff] font-medium  max-md:text-lg">
                Accounting Setting
              </h1>
            </div>
          </div>
          <div className="py-3 px-10 mt-5 pb-10 flex items-center gap-10 max-md:flex-col">
            <div className="w-[70%] max-md:w-full max-md:order-2">
              <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div>
                    <h1 className="text-lg text-[#181818] font-semibold  max-xl:text-base max-lg:text-sm">
                      Display Name
                    </h1>
                  </div>
                  <div>
                    <input
                      {...register("displayname")}
                      placeholder="Enter your Display Name"
                      className="w-full  border border-[#636364] mt-2 px-2 py-3 rounded-lg  max-xl:text-base  max-lg:text-sm"
                    />
                  </div>
                  <div>
                    {errors.displayname && (
                      <p className="text-[#EA454C]  max-xl:text-base  max-lg:text-sm">
                        {errors.displayname.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <div>
                    <h1 className="text-lg text-[#181818] font-semibold  max-xl:text-base max-lg:text-sm">
                      Email
                    </h1>
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      placeholder="Enter your Email"
                      className="w-full  border border-[#636364] mt-2 px-2 py-3 rounded-lg  max-xl:text-base  max-lg:text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    {errors.email && (
                      <p className="text-[#EA454C]  max-xl:text-base  max-lg:text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <div>
                    <h1 className="text-lg text-[#181818] font-semibold  max-xl:text-base max-lg:text-sm">
                      Password
                    </h1>
                  </div>
                  <div>
                    <input
                      {...register("password")}
                      type="password"
                      placeholder="Enter your Password"
                      className="w-full  border border-[#636364] mt-2 px-2 py-3 rounded-lg  max-xl:text-base  max-lg:text-sm"
                    />
                  </div>
                  <div>
                    {errors.password && (
                      <p className="text-[#EA454C]  max-xl:text-base  max-lg:text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-evenly mt-10 w-full">
                  <div className="w-[30%]">
                    <Link to="/">
                      <button className="flex items-center justify-center bg-gray-300 text-black px-3 py-3 w-full rounded-lg">
                        Cancel
                      </button>
                    </Link>
                  </div>
                  <div className="w-[30%]">
                    <button
                      type="submit"
                      disabled={updateUserMutation.isPending}
                      className="flex items-center justify-center text-white bg-[#408fec] px-3 py-3 w-full rounded-lg"
                    >
                      {updateUserMutation.isPending ? "Loading" : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="w-[30%] max-md:w-full max-md:order-1">
              <div className="w-full flex items-center justify-center">
                <img
                  src={image}
                  className="w-[120px] h-[120px] rounded-full"
                  alt="Uploaded"
                />
              </div>
              <div className="w-full flex items-center justify-center mt-5">
                <label
                  htmlFor="fileInput"
                  className="bg-[#408fec] px-3 py-3 w-[100%] text-[#ffffff] font-medium rounded-lg text-center cursor-pointer"
                >
                  Upload a Picture
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
