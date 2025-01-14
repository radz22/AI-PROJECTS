import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../types/signin-zod";
import { signinType } from "../types/signin-zod";
import { Link } from "react-router-dom";
import { GoogleAuth } from "./useGoogleAuth";
import { GoogleAuthSiginHook } from "../hooks/googleAuth/signin-hook";
import { UserAuthSiginHook } from "../hooks/userAuth/signin-hook";
export const SignInForm = () => {
  const { handleGoogleSignin } = GoogleAuthSiginHook();
  const { handleUserSignin } = UserAuthSiginHook();

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
      <div className="w-[60%]">
        <div>
          <h1 className="text-4xl font-semibold text-center tracking-wide uppercase	">
            Welcome back
          </h1>
          <p className="text-[#636364] text-lg mt-2 text-center">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <h1 className="text-lg text-[#181818] font-semibold">Email</h1>
            </div>
            <div>
              <input
                {...register("email")}
                placeholder="Enter your Email"
                className="w-full  border border-[#636364] mt-2 px-2 py-3 rounded-lg "
              />
            </div>
            <div>
              {errors.email && (
                <p className="text-[#EA454C]">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h1 className="text-lg text-[#181818] font-semibold">Password</h1>
            </div>
            <div>
              <input
                {...register("password")}
                placeholder="Enter your Password"
                className="w-full  border border-[#636364] mt-2 px-2 py-3 rounded-lg "
              />
            </div>
            <div>
              {errors.password && (
                <p className="text-[#EA454C]">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex itemss-center gap-2">
              <div>
                <input type="checkbox" />
              </div>
              <div>
                <h1 className="text-[#181818]">Remember me</h1>
              </div>
            </div>
            <div>
              <h1 className="text-[#181818]">Forgot password</h1>
            </div>
          </div>
          <div className="w-full mt-8">
            <button
              className="text-[#FFFFFF] bg-[#EA454C] text-center w-full py-3 px-3 text-lg font-semibold rounded-lg"
              type="submit"
            >
              Sign in
            </button>
          </div>

          <div>
            <GoogleAuth hook={handleGoogleSignin} />
          </div>
          <div className="mt-5">
            <p className="text-[#595959] text-center font-semibold">
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
