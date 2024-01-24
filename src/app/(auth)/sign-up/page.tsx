import { Metadata } from "next";
import SignUpFormView from "@/view/auth/SignUpFormView";

export const metadata: Metadata = {
  title: "sign-up",
};

const SignUpPage = () => {
  return <SignUpFormView />;
};

export default SignUpPage;
