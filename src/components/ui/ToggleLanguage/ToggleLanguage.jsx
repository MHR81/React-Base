import { useLanguages } from '../../../hooks/useLanguages';
import { FaLanguage } from "react-icons/fa6";

export default function ToggleLanguage({className}) {
    const { changeLanguage, currentLanguage } = useLanguages();

    const toggleLanguage = () => {
        const newLang = currentLanguage === 'en' ? 'fa' : 'en';
        changeLanguage(newLang);
    };

    return (
        <button onClick={toggleLanguage} className={`p-2 ${className}`}>
            {currentLanguage === 'en' ? <FaLanguage size={22} /> : <FaLanguage size={22} />}
        </button>
    );
}