import { useGoogleLogin } from "@react-oauth/google";
import { userType } from "../types/profile-type";
import React from "react";
import { GoogleButton } from "./reusableButton";
interface googleAuthProps {
  hook: (user: userType) => void; // Function to handle the user data
}

export const GoogleAuth: React.FC<googleAuthProps> = ({ hook }) => {
  const googleAuthButton = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`, // Use the access_token here
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          const { email, name, picture } = userData;

          const data: userType = {
            email: email,
            displayname: name,
            image: picture,
          };
          hook(data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  return (
    <>
      <GoogleButton buttonOnclick={googleAuthButton} />
    </>
  );
};
