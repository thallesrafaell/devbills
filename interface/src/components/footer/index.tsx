const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p className="bg-gray-800 text-sm font-medium text-center text-gray-400 py-2 flex justify-center items-center flex-col gap-2 border-t border-gray-400 boder-solid md:flex-row">
        <span className="text-gray-400">
          <span className="font-bold text-primary-500">DevBills</span> ©{' '}
          {currentYear}
        </span>{' '}
        <span className="hidden md:inline">—</span>
        <span className="text-gray-400">
          Desenvolvido com React, TypeScript e Tailwind CSS
        </span>
      </p>
    </footer>
  );
};

export default Footer;
