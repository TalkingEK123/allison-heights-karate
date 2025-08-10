import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Classes", href: "/classes" },
    { name: "Calendar", href: "/calendar" },
    { name: "Karate Info", href: "/karate-info" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--steel))] bg-brand-900/80 backdrop-blur supports-[backdrop-filter]:bg-brand-900/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-[hsl(var(--crimson))]">AHK</div>
            <div className="hidden sm:block leading-tight">
              <div className="text-lg font-header tracking-tightCaps text-text-primary">
                Allison Heights
              </div>
              <div className="text-sm text-text-secondary">Karate Club</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${
                      active
                        ? "text-[hsl(var(--crimson))]"
                        : "text-text-secondary hover:text-[hsl(var(--crimson))]"
                    }`}
                >
                  {item.name}
                  {/* underline on active */}
                  <span
                    className={`absolute left-3 -bottom-0.5 h-[2px] w-0 transition-all duration-300 ${
                      active
                        ? "w-[calc(100%-1.5rem)] bg-[hsl(var(--crimson))]"
                        : "bg-[hsl(var(--steel))] group-hover:w-[calc(100%-1.5rem)]"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-[hsl(var(--crimson))]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[hsl(var(--steel))] bg-brand-900/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                      ${
                        active
                          ? "text-[hsl(var(--crimson))]"
                          : "text-text-secondary hover:text-[hsl(var(--crimson))]"
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
