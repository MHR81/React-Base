import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { useLanguages } from "../../hooks/useLanguages";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { isRTL } = useLanguages();

  // هیدن سایدبار وقتی زبان عوض شه
  useEffect(() => {
    const timer = setTimeout(() => setShowSidebar(true), 100);
    return () => clearTimeout(timer);
  }, [isRTL]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        setSidebarOpen={setSidebarOpen}
        className={`bg-black/10 dark:bg-white/20 backdrop-blur-sm
          fixed z-60 top-0 right-0 left-0 h-16 border-b
          flex justify-center items-center px-5
          `}
      />

      <div className="flex flex-1 mt-16">
        {showSidebar && (
          <Sidebar
            sidebarOpen={sidebarOpen}
            className={`bg-black/10 dark:bg-white/20 backdrop-blur-sm
              fixed top-16 pt-6 -start-64 sm:-start-48 border-e z-50 h-full w-64 transition-all duration-300
              
              ${isRTL
                ? sidebarOpen
                  ? "-translate-x-64 sm:-translate-x-48 transition-all duration-300 py-6"
                  : "ps-48"
                : sidebarOpen
                  ? "translate-x-64 sm:translate-x-48 transition-all duration-300 py-6"
                  : "translate-x-0 transition-all duration-300 ps-48"
              }`}
          />
        )}

        {/* Wrapper محتوا */}
        <div className={`flex flex-col flex-1 transition-all duration-300
          ${sidebarOpen && showSidebar ? "md:ms-64" : "sm:ms-16"} min-w-0`}>
          {/* Main با overflow-x-auto */}
          <main className="flex-1 p-3 md:p-6 w-full">
            <div className="min-w-full">
              <Outlet />
            </div>
          </main>
          <Footer className="h-16 border-t" />
        </div>
      </div>
    </div>
  );
}
