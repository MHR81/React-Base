import { Outlet } from "react-router-dom";
import { useState } from "react";
import OTP from "../OTP/OTP";

export default function AuthLayout() {
  const [registerStep, setRegisterStep] = useState({
    step: 1,
    formData: {}
  });

  console.log("OTP data:", registerStep);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex justify-center items-center w-full h-full my-auto p-6">
        <div className="border border-gray-300 rounded-lg p-8 w-full max-w-md shadow-lg">
          {registerStep.step === 2 ? <OTP registerStep={registerStep} setRegisterStep={setRegisterStep} /> :
            <Outlet context={{ registerStep, setRegisterStep }} />
          }
        </div>
      </main>
    </div>
  );
}
