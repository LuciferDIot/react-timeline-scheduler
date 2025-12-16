import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Github, Package } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const NavLinkItem = ({
  to,
  children,
  external = false,
}: {
  to: string;
  children: React.ReactNode;
  external?: boolean;
}) => {
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
      >
        {children}
      </a>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "text-white bg-white/10"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`
      }
    >
      {children}
    </NavLink>
  );
};
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(window.matchMedia(query).matches);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export const Layout = ({ children }: LayoutProps) => {
  /* State for mobile menu */
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  /* JS-based Media Query to bypass CSS issues */
  const isDesktop = useMediaQuery("(min-width: 769px)");

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-white selection:bg-blue-500/30">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 cursor-pointer group" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                R
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                React Timeline
              </span>
            </Link>

            {/* Desktop Navigation Links - Controlled by JS */}
            {isDesktop && (
              <div className="flex items-center space-x-4">
                <NavLinkItem to="/">Home</NavLinkItem>
                <NavLinkItem to="/examples">Examples</NavLinkItem>
                <NavLinkItem to="/docs">Documentation</NavLinkItem>
                <div className="w-px h-6 bg-white/10 mx-2" />
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.npmjs.com/package/react-timeline-scheduler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    title="NPM Package"
                  >
                    <Package size={20} />
                  </a>
                  <a
                    href="https://github.com/LuciferDIot/react-timeline-scheduler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    title="GitHub Repository"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            )}

            {/* Mobile Menu Button - Controlled by JS */}
            {!isDesktop && (
              <div className="flex">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <span className="sr-only">Open menu</span>
                  {mobileMenuOpen ? (
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  ) : (
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                     </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown - Conditional on Desktop state + Open state */}
        {!isDesktop && mobileMenuOpen && (
          <div className="block border-t border-white/10 bg-[#030712]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
              <NavLink to="/examples" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>Examples</NavLink>
              <NavLink to="/docs" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`} onClick={() => setMobileMenuOpen(false)}>Documentation</NavLink>
              <div className="pt-4 flex items-center justify-around border-t border-white/10 mt-2">
                 <a href="https://www.npmjs.com/package/react-timeline-scheduler" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2" title="NPM">
                    <Package size={24} />
                 </a>
                 <a href="https://github.com/LuciferDIot/react-timeline-scheduler" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2" title="GitHub">
                    <Github size={24} />
                 </a>
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
              <a href="https://github.com/LuciferDIot/react-timeline-scheduler" target="_blank" className="text-gray-400 hover:text-white">
                GitHub
              </a>
              <a href="https://www.npmjs.com/package/react-timeline-scheduler" target="_blank" className="text-gray-400 hover:text-white">
                NPM
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
