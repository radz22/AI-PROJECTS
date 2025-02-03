import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import { ResetPasswordHook } from "../hooks/userAuth/reset-password-hook";
import {
  resetPasswordType,
  resetPasswordSchema,
} from "../types/reset-password";
export const ResetPasswordComponent = () => {
  const { handleResetPassword, resetPasswordMutation } = ResetPasswordHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: resetPasswordType) => {
    handleResetPassword(data);
    reset();
  };

  return (
    <div className="px-3 flex items-center justify-center flex-col">
      <div className="w-[60%] max-lg:w-[90%] max-md:w-[70%] max-sm:w-[90%]">
        <div>
          <h1 className="text-4xl font-semibold text-center tracking-wide uppercase max-xl:text-3xl  max-lg:text-2xl	">
            Welcome back
          </h1>
          <p className="text-[#636364] text-lg mt-2 text-center  max-xl:text-sm">
            Welcome back! Please enter your Email for Reset Password.
          </p>
        </div>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
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

          <div className="w-full mt-8">
            <button
              className="text-[#FFFFFF] bg-[#EA454C] text-center w-full py-3 px-3 text-lg font-semibold rounded-lg "
              type="submit"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? (
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
              Don’t have an account?
              <Link to="/page/signup">
                <span className="text-[#EA454C]"> Sign up fo free!</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
