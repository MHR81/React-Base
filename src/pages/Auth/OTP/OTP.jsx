import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import authService from "../../../services/api/auth";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";


export default function OTP({ registerStep, setRegisterStep }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const token = localStorage.getItem("token");
    if (isAuth && token) {
        return <Navigate to="/" replace />;
    }

    const handleChange = (index, value) => {
        // فقط اعداد قبول کنیم
        if (!/^\d*$/.test(value)) return;

        // حد اکثر یک رقم
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        // اگر مقدار وارد شد، به بعدی برو
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // اگر Backspace زد و خانه خالی است، به قبلی برو
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // اگر فلش راست زد، به بعدی برو
        if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // اگر فلش چپ زد، به قبلی برو
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const validateOTP = () => {
        const otpString = otp.join("");

        if (otpString.length !== 6) {
            setError("لطفاً تمام 6 رقم را وارد کنید");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpCode = otp.join("");
        if (validateOTP()) {
            handleVerify(otpCode);
        }
    };

    const handleVerify = async (otpCode) => {
        const body = {
            phone: registerStep.formData.phone,
            code: otpCode
        };
        console.log("Verifying OTP with body:", body);
        try {
            const res = await authService.verifyOTP(body);
            if (res?.data?.success) {
                setRegisterStep({ step: 1, formData: {} });
                navigate("/login");
            }
            console.log("OTP Verification response:", res);
        } catch (error) {
            console.error("OTP Verification error:", error);
        }
    }

    const handleSendAgain = async () => {
        try {
            const res = await authService.register(registerStep.formData);
            console.log("Resend OTP response:", res);
        } catch (error) {
            console.error("Resend OTP error:", error);
        }
    }


    return (
        <section>
            <div className="w-full flex justify-end">
                <button
                    onClick={() => setRegisterStep({ step: 1, formData: {} })}
                    className="flex mb-4 text-gray-400 hover:text-gray-600"
                >
                    بازگشت
                    <IoChevronBackOutline size={24} />
                </button>
            </div>
            <h1 className="text-center text-2xl font-bold mb-4">تایید کد یکبار مصرف</h1>
            <p className="text-gray-700 text-xs text-center mb-6">
                کد تایید شش رقمی را که دریافت کردید وارد کنید.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
                {/* OTP Input Fields */}
                <div
                    dir="ltr"
                    className="flex gap-2 mb-6 justify-center">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={`w-10 h-10 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none transition-colors ${digit
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 bg-white"
                                } focus:border-blue-500 focus:bg-blue-50`}
                            required
                        />
                    ))}
                </div>

                {/* Error Message */}
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-1/2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors font-semibold"
                >
                    تایید
                </button>

                {/* Resend OTP */}
                <p className="text-gray-600 text-xs mt-6">
                    کد را دریافت نکردید؟{" "}
                    <button
                        onClick={() => handleSendAgain()}
                        type="button"
                        className="text-blue-500 hover:underline font-semibold"
                    >
                        دوباره ارسال کنید
                    </button>
                </p>
            </form>
        </section>
    );
}
