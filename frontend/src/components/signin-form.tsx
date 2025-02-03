import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../types/signin-zod";
import { signinType } from "../types/signin-zod";
import { Link } from "react-router-dom";
import { GoogleAuth } from "./useGoogleAuth";
import { GoogleAuthSiginHook } from "../hooks/googleAuth/signin-hook";
import { UserAuthSiginHook } from "../hooks/userAuth/signin-hook";
import { OrbitProgress } from "react-loading-indicators";

export const SignInForm = () => {
  const { handleGoogleSignin } = GoogleAuthSiginHook();
  const { handleUserSignin, signinMutation } = UserAuthSiginHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signinType>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: signinType) => {
    handleUserSignin(data);
  };

  return (
    <div className="px-3 flex items-center justify-center flex-col">
      <div className="w-[60%] max-lg:w-[90%] max-md:w-[70%] max-sm:w-[90%]">
        <div>
          <h1 className="text-4xl font-semibold text-center tracking-wide uppercase max-xl:text-3xl max-lg:text-2xl	">
            Welcome back
          </h1>
          <p className="text-[#636364] text-lg mt-2 text-center  max-xl:text-sm">
            Welcome back! Please enter your details.
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
          <div className="mt-5">
            <div>
              <h1 className="text-lg text-[#181818] font-semibold  max-xl:text-base">
                Password
              </h1>
            </div>
            <div>
              <input
                {...register("password")}
                placeholder="Enter your Password"
                type="Password"
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

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <input type="checkbox" />
              </div>
              <div>
                <h1 className="text-[#181818]  max-lg:text-sm">Remember me</h1>
              </div>
            </div>
            <div>
              <Link to="page/resetpassword">
                <h1 className="text-[#181818] max-lg:text-sm">
                  Forgot password
                </h1>
              </Link>
            </div>
          </div>
          <div className="w-full mt-8">
            <button
              className="text-[#FFFFFF] bg-[#EA454C] text-center w-full py-3 px-3 text-lg font-semibold rounded-lg "
              type="submit"
              disabled={signinMutation.isPending}
            >
              {signinMutation.isPending ? (
                <OrbitProgress
                  variant="track-disc"
                  color="#ffffff"
                  style={{ fontSize: "5px" }}
                  textColor="#ffffff"
                />
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <div>
            <GoogleAuth hook={handleGoogleSignin} />
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
