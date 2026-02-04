import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "./redux/slices/authSlice";
import Router from "./Routes/Router";

// import notificationPush from "./services/push/notificationPush";

export default function App() {
  const dispatch = useDispatch();

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(clearToken());
    }
  };

  const checkTheme = () => {
    if (localStorage.theme ? (localStorage.theme === "dark") : (window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    checkTokenValidity();
    checkTheme();

    // notificationPush.init();
  }, []);

  return <Router />;
}
