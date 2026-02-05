import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import MainLayout from "../layout/MainLayout/MainLayout";
import AuthLayout from "../pages/Auth/layout/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import NotFound from "../pages/404/NotFound";
import ForgetPass from "../pages/Auth/ForgetPass/ForgetPass";

import About from "../pages/About";

export default function Router() {
  return (
    <Routes>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPass />} />
      </Route>

      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
