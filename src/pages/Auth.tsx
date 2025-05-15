import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = () => {
  const [authpage, setAuthpage] = useState("signin");
  if (authpage === "signin") {
    return <SignIn setAuthpage={setAuthpage} />;
  }
  return <SignUp setAuthpage={setAuthpage} />;
};

export default Auth;
