import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, signupType } from "../types/signup-zod";
import { GoogleAuthSignupHook } from "../hooks/googleAuth/signup-hook";
import { Link } from "react-router-dom";
import { GoogleAuth } from "./useGoogleAuth";
import { UserAuthSignupHook } from "../hooks/userAuth/signup-hook";
import { imageUrl } from "../utils/image";
import { Atom, OrbitProgress } from "react-loading-indicators";

export const SignUpForm = () => {
  const { handleGoogleSignup } = GoogleAuthSignupHook();
  const { handleUserSignup, signUpMutation } = UserAuthSignupHook();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: signupType) => {
    const datas = {
      email: data.email,
      password: data.password,
      displayname: data.displayname,
      image: imageUrl,
    };
    handleUserSignup(datas);
  };
  return (
    <div className="px-3 flex items-center justify-center flex-col">
      <div className="w-[60%]">
        <div>
          <h1 className="text-4xl font-semibold text-center tracking-wide uppercase	">
            Welcome back
          </h1>
          <p className="text-[#636364] text-lg mt-2 text-center">
            Welcome back! Please enter your details for Sign up.
          </p>
        </div>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <h1 className="text-lg text-[#181818] font-semibold">
                Display Name
              </h1>
            </div>
            <div>
              <input
                {...register("displayname")}
                placeholder="Enter your Display Name"
                className="w-full  border border-[#636364] mt-2 px-2 py-3 rounded-lg "
              />
            </div>
            <div>
              {errors.displayname && (
                <p className="text-[#EA454C]">{errors.displayname.message}</p>
              )}
            </div>
          </div>
          <div className="mt-5">
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
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? (
                <OrbitProgress
                  variant="track-disc"
                  color="#ffffff"
                  style={{ fontSize: "5px" }}
                  textColor="#ffffff"
                />
              ) : (
                "Sign up"
              )}
            </button>
          </div>
          <div>
            <GoogleAuth hook={handleGoogleSignup} />
          </div>
          <div className="mt-5">
            <p className="text-[#595959] text-center font-semibold">
              You have an account?
              <Link to="/">
                <span className="text-[#EA454C]"> Sign In </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
