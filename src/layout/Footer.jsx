export default function Footer({className}) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`${className} bg-black/5 dark:bg-white/5 flex items-center justify-center`}>
      <small className="text-sm text-gray-600 dark:text-gray-400">
        © {currentYear} All rights reserved.
      </small>
    </footer>
  );
}
