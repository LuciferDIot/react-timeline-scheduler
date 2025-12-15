import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: "home" | "examples" | "docs";
  onNavigate: (page: "home" | "examples" | "docs") => void;
}

const NavLink = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "text-white bg-white/10"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`}
  >
    {label}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: "home" | "examples" | "docs") => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate("home")}
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                R
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                React Timeline
              </span>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  label="Home"
                  isActive={currentPage === "home"}
                  onClick={() => handleNavClick("home")}
                />
                <NavLink
                  label="Examples"
                  isActive={currentPage === "examples"}
                  onClick={() => handleNavClick("examples")}
                />
                <NavLink
                  label="Documentation"
                  isActive={currentPage === "docs"}
                  onClick={() => handleNavClick("docs")}
                />
                <a
                  href="https://github.com/LuciferDIot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white px-3 py-2 rounded-md transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="flex flex-col space-y-2">
                <NavLink
                  label="Home"
                  isActive={currentPage === "home"}
                  onClick={() => handleNavClick("home")}
                />
                <NavLink
                  label="Examples"
                  isActive={currentPage === "examples"}
                  onClick={() => handleNavClick("examples")}
                />
                <NavLink
                  label="Documentation"
                  isActive={currentPage === "docs"}
                  onClick={() => handleNavClick("docs")}
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-[#030712] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                React Timeline Scheduler
              </span>
              <p className="text-gray-500 text-sm mt-2">
                MIT Licensed. Built by{" "}
                <a
                  href="https://github.com/LuciferDIot"
                  className="text-blue-400 hover:underline"
                >
                  LuciferDIot
                </a>
                .
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                NPM
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Issues
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
