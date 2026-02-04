import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import authService from "../../../services/api/auth";
import { useOutletContext } from "react-router-dom";


export default function Register() {

  const { setRegisterStep } = useOutletContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const [error, seterror] = useState({
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const token = localStorage.getItem("token");
    if (isAuth && token) {
      return <Navigate to="/" replace />;
    }
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

  const validateForm = (formData) => {
    const { phone, email, password, confirmPassword } = formData;
    const phoneRegex = /^09\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    let isValid = true;

    if (!phoneRegex.test(phone)) {
      errors.phone = "شماره موبایل نامعتبر است";
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      errors.email = "ایمیل نامعتبر است";
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = "رمز عبور باید حداقل 6 کاراکتر باشد";
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "رمزهای عبور مطابقت ندارند";
      isValid = false;
    }

    seterror(errors);
    return isValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const res = await authService.register(formData);
      if (res?.data?.success) {
        setRegisterStep({
          step: 2,
          formData: formData
        });
      }
      console.log("Register response:", res);
    } catch (error) {
      console.error("Register error:", error);
    }
  }

  return (
    <section>
      <h1 className="text-center text-2xl font-bold mb-4">ثبت نام</h1>
      <p className="text-gray-700 text-xs">لطفاً اطلاعات خود را برای ثبت نام وارد کنید.</p>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col items-center" >
        <div className="mb-4 w-full">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            موبایل
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="09xxxxxxxxx"
            required
          />
          {error.phone && <div className="text-red-500 text-xs mt-1">{error.phone}</div>}
        </div>
        <div className="mb-4 w-full">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            ایمیل
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="ایمیل خود را وارد کنید"
            required
          />
          {error.email && <div className="text-red-500 text-xs mt-1">{error.email}</div>}
        </div>
        <div className="flex flex-col">
          <div className="w-full flex gap-5">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                رمز عبور
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="password"
                id="password"
                name="password"
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
          {error.password && <div className="text-start text-red-500 text-xs mt-1">{error.password}</div>}
          {error.confirmPassword && <div className="text-red-500 text-xs mt-1">{error.confirmPassword}</div>}
        </div>

        <button
          type="submit"
          className={`w-1/2 mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors`}
        >
          ثبت نام
        </button>

        <span
          className="mt-4 text-gray-600 text-xs">
          قبلاً ثبت نام کرده اید؟{" "}
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="text-blue-500 hover:underline font-semibold"
          >
            وارد شوید
          </button>
        </span>
      </form >
    </section>
  );
}
