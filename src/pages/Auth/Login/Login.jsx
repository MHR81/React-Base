import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import authService from "../../../services/api/auth";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/slices/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const [error, setError] = useState({
    phone: "",
    password: ""
  });

  // console.log("Captcha Token:", captchaToken);

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  if (isAuth && token) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);
    validateForm(updatedFormData);
  };

  const validateForm = (data = formData) => {
    const { phone, password } = data;
    const phoneRegex = /^09\d{9}$/;

    const errors = {
      phone: "",
      password: ""
    };

    let isValid = true;

    if (!phoneRegex.test(phone)) {
      errors.phone = "شماره موبایل نامعتبر است";
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = "رمز عبور باید حداقل 6 کاراکتر باشد";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin();
    }
  };

  const handleLogin = async () => {


    try {
      const loginData = {
        ...formData,
      };
      const res = await authService.login(loginData);
      const token = res?.data?.data?.accessToken;
      if (token) {
        dispatch(setToken(token));
      }
      console.log("Login response:", res);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <section>
      <h1 className="text-center text-2xl font-bold mb-4">ورود</h1>
      <p className="text-gray-700 text-xs">لطفاً اطلاعات خود را وارد کنید تا وارد شوید.</p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center" >
        <div className="mb-4 w-full">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            موبایل
          </label>
          <input
            onChange={handleChange}
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="09xxxxxxxxx"
            required
          />
          {error.phone && <div className="text-red-500 text-xs mt-1">{error.phone}</div>}
        </div>
        <div className="mb-6 w-full">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            رمز عبور
          </label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="رمز عبور خود را وارد کنید"
            required
          />
          {error.password && <div className="text-red-500 text-xs mt-1">{error.password}</div>}
        </div>

        <span
          className="self-start mb-4 text-blue-500 hover:underline text-xs cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          رمز عبور خود را فراموش کرده اید؟

        </span>

        {error.captcha && <div className="text-red-500 text-xs mb-4">{error.captcha}</div>}

        <button
          type="submit"
          className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          ورود
        </button>
        <span
          className="mt-4 text-gray-600 text-xs">
          حساب کاربری ندارید؟{" "}
          <button
            onClick={() => navigate("/register")}
            type="button"
            className="text-green-500 hover:underline font-semibold"
          >
            ثبت نام کنید
          </button>
        </span>
      </form >
    </section>
  );
}
