import { CgDarkMode } from "react-icons/cg";

export default function ToggleTheme() {
  const html = document.documentElement;

  const toggleTheme = () => {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      html.classList.add("dark");
      localStorage.theme = "dark";
    }
  };


  return (
    <div className="flex gap-2">
      <button onClick={toggleTheme} className="p-2">
        <CgDarkMode size={20} />
      </button>

    </div>
  );
}
