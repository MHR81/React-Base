import { motion } from "framer-motion"; //eslint-disable-line
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  if (!totalPages || totalPages <= 1) return null;

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  const getVisiblePages = () => {
    const groupStart = Math.floor((currentPage - 1) / 3) * 3 + 1;
    const groupEnd = Math.min(groupStart + 2, totalPages);
    const pages = [];
    for (let i = groupStart; i <= groupEnd; i++) pages.push(i);
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div dir="rtl" className="flex items-center justify-center gap-2 select-none mt-4">

      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-xl bg-blue-500 text-white
                   flex justify-center items-center h-10 w-10
                   disabled:opacity-50 transition-all duration-200 hover:translate-x-2"
      >
        <AiOutlineRight size={18} />
      </button>


      <div className="flex items-center gap-1">
        {visiblePages.map((num) => (
          <motion.button
            key={num}
            onClick={() => goToPage(num)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`rounded-xl border border-blue-500 shadow-sm transition-all 
                        ${num === currentPage
                ? "bg-blue-300 text-blue-500 font-semibold w-10 h-10"
                : "text-blue-400 bg-blue-200 opacity-70 hover:opacity-100 w-9 h-9"
              }`}
          >
            {num}
          </motion.button>
        ))}
      </div>


      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-xl bg-blue-500 text-white
                   flex justify-center items-center h-10 w-10
                   disabled:opacity-50 transition-all duration-200 hover:-translate-x-2"
      >
        <AiOutlineLeft size={18} />
      </button>
    </div>
  );
}
