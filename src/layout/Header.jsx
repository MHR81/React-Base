import { Link } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import { useLanguages } from "../hooks/useLanguages";
import ToggleTheme from "../components/ui/ToggleTheme/ToggleTheme";
import ToggleLanguage from "../components/ui/ToggleLanguage/ToggleLanguage";

export default function Header({ className, setSidebarOpen }) {
  const { t } = useLanguages();

  return (
    <header className={`${className}`}>
      {/* <h1 className="">ProKit</h1> */}
      <button onClick={() => setSidebarOpen(prev => !prev)} className="">
        <MdMenuOpen size={25} />
      </button>
      <nav className="container mx-auto px-6 py-4 flex gap-4">
        <ul className="flex gap-5">
          <li>
            <Link to="/" className="font-medium hover:underline">
              {t('common.home')}
            </Link>
          </li>
          <li>
            <Link to="/about" className="font-medium hover:underline">
              {t('common.about')}
            </Link>
          </li>
        </ul>
      </nav>
      <ToggleTheme />
      <ToggleLanguage />
    </header>
  );
}
