import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import authService from "../../../services/api/auth";
import OtpInput from "../OTP/components/OtpInput";
import { IoChevronBackOutline } from "react-icons/io5";


export default function ForgetPass() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState("");
    const [formData, setFormData] = useState({
        code: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState({
        code: "",
        newPassword: "",
        confirmPassword: ""
    });

    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const token = localStorage.getItem("token");
    if (isAuth && token) {
        return <Navigate to="/" replace />;
    }

    const handleChange = (e) => {
        if (e.target.name === "phone") {
            setPhone(e.target.value);
            return;
        }
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        validateForm(updatedFormData);
    };

    const validateForm = (data = formData) => {
        const { code, newPassword, confirmPassword } = data;

        const errors = {
            code: "",
            newPassword: "",
            confirmPassword: ""
        };

        let isValid = true;

        if (code.length !== 6) {
            errors.code = "لطفاً کد تایید را وارد کنید";
            isValid = false;
        }

        if (newPassword.length < 6) {
            errors.newPassword = "رمز عبور باید حداقل 6 کاراکتر باشد";
            isValid = false;
        }

        if (newPassword !== confirmPassword) {
            errors.confirmPassword = "رمزهای عبور مطابقت ندارند";
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            handleSendCode();
            return;
        }
        if (step === 2 && validateForm()) {
            handleResetPass();
        }
    };

    const handleSendCode = async () => {
        try {
            const res = await authService.forgotPassword({ phone });
            console.log("Send Reset Code response:", res);
            if (res?.data?.success) {
                setStep(2);
            }
        } catch (error) {
            console.error("Send Reset Code error:", error);
        }
    };

    console.log("Form Data:", formData);

    const handleResetPass = async () => {
        const body = {
            phone: phone,
            code: formData.code,
            newPassword: formData.newPassword
        };
        try {
            const res = await authService.resetPassword(body);
            if (res?.data?.success) {
                navigate("/login");
            }
            console.log("Reset Password response:", res);
        } catch (error) {
            console.error("Reset Password error:", error);
        }
    }

    return (
        <section>
            <div className="w-full flex justify-end">
                <button
                    onClick={() => navigate("/login")}
                    className="flex mb-4 text-gray-400 hover:text-gray-600"
                >
                    بازگشت
                    <IoChevronBackOutline size={24} />
                </button>
            </div>
            <h1 className="text-center text-2xl font-bold mb-4">فراموشی رمز</h1>
            {step === 1 ? (
                <p className="text-gray-700 text-xs">لطفا شماره موبایل خود را وارد کنید.</p>
            ) : (
                <p className="text-gray-700 text-xs">لطفا کد تایید و رمز عبور جدید خود را وارد کنید.</p>
            )}
            <form onSubmit={handleSubmit} className="mt-6 gap-5 px-5 flex flex-col items-center" >
                <div className="mb-4 w-full">
                    {step === 1 && (
                        <label className="block text-gray-700 mb-2" htmlFor="phone">
                            موبایل
                        </label>
                    )}
                    <input
                        disabled={step === 2}
                        onChange={handleChange}
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        className="w-full px-3 py-2 border disabled:bg-gray-200 border-gray-300 rounded"
                        placeholder="09xxxxxxxxx"
                        required
                    />
                    {error.phone && <div className="text-red-500 text-xs mt-1">{error.phone}</div>}
                </div>
                {step === 2 && (
                    <>
                        <OtpInput
                            length={6}
                            value={formData.code}
                            onChange={(value) => setFormData({ ...formData, code: value })}
                        />
                        {error.code && <div className="text-red-500 text-xs mt-1">{error.code}</div>}

                        <div className="flex flex-col mb-4">
                            <div className="w-full flex gap-5">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                                        رمز عبور جدید
                                    </label>
                                    <input
                                        onChange={(e) => handleChange(e)}
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        placeholder="******"
                                        required
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                                        تکرار رمز عبور
                                    </label>
                                    <input
                                        onChange={(e) => handleChange(e)}
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="w-full px-3 py-2 border border-gray-300 rounded"
                                        placeholder="******"
                                        required
                                    />
                                </div>
                            </div>
                            {error.newPassword && <div className="text-start text-red-500 text-xs mt-1">{error.newPassword}</div>}
                            {error.confirmPassword && <div className="text-red-500 text-xs mt-1">{error.confirmPassword}</div>}
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    className="w-1/2 bg-slate-500 text-white py-2 px-4 rounded hover:bg-slate-600 transition-colors"
                >
                    {step === 1 ? "ارسال کد تایید" : "بازیابی رمز عبور"}
                </button>

            </form >
        </section>
    );
}
