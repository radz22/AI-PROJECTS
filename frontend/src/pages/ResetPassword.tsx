import { ResetPasswordComponent } from "../components/reset-password";
export const ResetPassword = () => {
  return (
    <div className="bg-[#F8F8F8] w-full h-screen flex items-center justify-center max-md:flex-col">
      <div className="w-2/4 max-md:w-full ">
        <ResetPasswordComponent />
      </div>
      <div className="w-2/4 max-md:hidden">
        <img
          src="https://cdn.dribbble.com/users/1446559/screenshots/5453050/97e3bc07ac5ca76150df36be8e142336.gif"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};
