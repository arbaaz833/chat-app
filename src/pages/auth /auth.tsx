import { Button } from "antd";
import { FC, useState } from "react";
import { Login } from "./components/login";
import { Signup } from "./components/signup";

interface IProps {}

export const Auth: FC<IProps> = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };
  return (
    <div className="relative grid h-screen w-screen place-items-center overflow-hidden">
      <div className="-z-1 absolute h-[300%] w-[300%] -rotate-45 bg-[url('/chatting.png')] bg-[length:50px_50px] bg-repeat opacity-15"></div>
      <div className="shadow-[0 4px 30px rgba(0, 0, 0, 0.1)] border-[rgba(255, 255, 255, 0.3)] w-[50vw] max-w-[600px] rounded-2xl p-5 backdrop-blur-sm border border-solid border-purple-200">
        <div className="my-6 flex items-center justify-center">
          <div className="text-3xl font-bold bg-gradient-to-r text-center  from-primary-300 to-primary-800 bg-clip-text text-transparent">
            CHAT APP
          </div>
        </div>
        {isSignup ? <Signup toggleForm={toggleSignup} /> : <Login />}

        <div className="text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <Button type="text" onClick={toggleSignup}>
            {isSignup ? "Login" : "Signup"}
          </Button>
        </div>
      </div>
    </div>
  );
};
