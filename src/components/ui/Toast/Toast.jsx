import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../../../redux/slices/toastSlice";
import { motion, AnimatePresence } from "framer-motion"; //eslint-disable-line no-unused-vars

export default function Toast() {
  const { message, type, visible } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";

  // موبایل: از پایین بیا و برگرد پایین
  const mobileVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  };

  // دسکتاپ: از چپ بیا
  const desktopVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  };

  // تعیین حالت بر اساس اندازه صفحه
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const variants = isMobile ? mobileVariants : desktopVariants;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.9
          }}
          className={`${bgColor} fixed left-1/2 md:left-6 bottom-20 md:bottom-auto md:top-20 text-white px-6 py-3 rounded-lg shadow-2xl z-60 transform -translate-x-1/2 md:translate-x-0 max-w-xs md:max-w-sm`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
