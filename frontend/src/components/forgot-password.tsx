import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useParams } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import { ForgotPasswordHook } from "../hooks/userAuth/forgot-password-hook";
import {
  forgotPasswordSchema,
  forgotPasswordType,
} from "../types/forgot-password";
export const ForgotPasswordComponent = () => {
  const { handleForgotPassword, forgotPasswordMutation } = ForgotPasswordHook();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: forgotPasswordType) => {
    const datas = {
      id: id,
      password: data.password,
    };
    handleForgotPassword(datas);
  };

  return (
    <div className="px-3 flex items-center justify-center flex-col">
      <div className="w-[60%] max-lg:w-[90%] max-md:w-[70%] max-sm:w-[90%]">
        <div>
          <h1 className="text-4xl font-semibold text-center tracking-wide uppercase max-xl:text-3xl	 max-lg:text-2xl	">
            Welcome back
          </h1>
          <p className="text-[#636364] text-lg mt-2 text-center  max-xl:text-sm">
            Welcome back! Please enter your Password
          </p>
        </div>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <h1 className="text-lg text-[#181818] font-semibold  max-xl:text-base max-lg:text-sm">
                Password
              </h1>
            </div>
            <div>
              <input
                {...register("password")}
                placeholder="Enter your New Password"
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

          <div className="w-full mt-8">
            <button
              className="text-[#FFFFFF] bg-[#EA454C] text-center w-full py-3 px-3 text-lg font-semibold rounded-lg "
              type="submit"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? (
                <OrbitProgress
                  variant="track-disc"
                  color="#ffffff"
                  style={{ fontSize: "5px" }}
                  textColor="#ffffff"
                />
              ) : (
                "Submit "
              )}
            </button>
          </div>

          <div className="mt-5">
            <p className="text-[#595959] text-center font-semibold max-lg:text-sm">
              have an account?
              <Link to="/">
                <span className="text-[#EA454C]">Sign in!</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
