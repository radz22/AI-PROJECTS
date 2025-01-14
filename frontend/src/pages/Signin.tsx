import { SignInForm } from "../components/signin-form";

export const Signin = () => {
  return (
    <div className="bg-[#F8F8F8] w-full h-screen flex items-center justify-center">
      <div className="w-2/4 ">
        <SignInForm />
      </div>
      <div className="w-2/4">
        <img
          src="https://cdn.dribbble.com/users/1446559/screenshots/5453050/97e3bc07ac5ca76150df36be8e142336.gif"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};
