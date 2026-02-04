import { useLanguages } from "../hooks/useLanguages";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../services/api/auth";
import { useDispatch } from "react-redux";
import { clearToken } from "../redux/slices/authSlice";

export default function Sidebar({ className, sidebarOpen }) {
  const { t } = useLanguages();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.profile);

  const SIDEBAR = [
    { label: t('sidebar.home'), icon: <IoIosHome />, path: '/' },
    { label: t('sidebar.users'), icon: <FaUsers />, path: '/users' },
    { label: t('sidebar.admins'), icon: <HiMiniUsers />, path: '/admins' },
  ];

  const LOGOUT = [
    { label: t('sidebar.logout'), icon: <AiOutlineLogout />, path: '/logout' },
  ];

  const handleLogout = async () => {
    try {
      const res = await authService.logout();
      console.log("Logout response:", res);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(clearToken());
    }
  }


  return (
    <aside className={`${className} flex flex-col`}>
      <div className="flex gap-5 flex-col items-center justify-center">
        <img src="/defaultUser.jpg" alt="Logo" className={`${sidebarOpen ? "w-10 h-10" : "w-8 h-8"} mx-auto rounded-full`} />
        {sidebarOpen &&
          <h2 className="text-sm text-center font-bold mb-4">mahdi rahimi</h2>
        }
      </div>

      <ul className={`${sidebarOpen ? "mt-2" : "mt-8"} flex-1 space-y-1`}>
        {SIDEBAR.map((item, index) => (
          <li key={index}
            onClick={() => navigate(item.path)}
            className={`w-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 p-2 ${sidebarOpen ? "text-end flex justify-start" : "text-center flex justify-center"}`}
          >

            {sidebarOpen ? (
              <span
                className=" flex  ps-5 items-center justify-center gap-3 rounded-lg  transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            ) : (

              <span
                className="relative group flex items-center justify-center rounded-lg  transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className="absolute ms-2 start-6 top-1/2 -translate-y-1/2
                whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded-md
                opacity-0 group-hover:opacity-100  pointer-events-none"
                >
                  {item.label}
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>

      <ul className={`space-y-3 h-20 ${sidebarOpen ? "mb-[38px]" : "mb-[60px]"}`}>
        <li
          onClick={() => handleLogout()}
          className={`w-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 p-2 ${sidebarOpen ? "text-end flex justify-start" : "text-center flex justify-center"}`}
        >

          {sidebarOpen ? (
            <span
              className=" flex  ps-5 items-center justify-center gap-3 rounded-lg  transition"
            >
              <span className="text-xl"><AiOutlineLogout /></span>
              <span>{t('sidebar.logout')}</span>
            </span>
          ) : (

            <span
              className="relative group flex items-center justify-center rounded-lg  transition"
            >
              <span className="text-xl"><AiOutlineLogout /></span>
              <span
                className="absolute ms-2 start-6 top-1/2 -translate-y-1/2
                whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded-md
                opacity-0 group-hover:opacity-100  pointer-events-none"
              >
                {t('sidebar.logout')}
              </span>
            </span>
          )}
        </li>
        {/* {LOGOUT.map((item, index) => (
          <li key={index}
            onClick={() => navigate(item.path)}
            className={`w-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 p-2 ${sidebarOpen ? "text-end flex justify-start" : "text-center flex justify-center"}`}
          >
            {sidebarOpen ? (
              <span

                className="flex ps-5 items-center justify-center gap-3 rounded-lg  transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            ) : (
              <span
                className="relative group flex items-center justify-center rounded-lg  transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className="absolute ms-2 start-6 top-1/2 -translate-y-1/2
                whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded-md
                opacity-0 group-hover:opacity-100 pointer-events-none"
                >
                  {item.label}
                </span>
              </span>
            )}
          </li>
        ))} */}
      </ul>
    </aside>
  );
}
