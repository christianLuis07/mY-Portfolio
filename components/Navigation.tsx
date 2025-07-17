"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, Moon, Sun, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass backdrop-blur-xl shadow-glow" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="text-2xl font-bold gradient-text hover:scale-105 transition-transform cursor-pointer"
          >
            AC
          </a>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setDarkMode(!darkMode)}
              className="neon-glow"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <div className="hidden lg:block">
              <Button variant="default" size="lg">
                Contact Me
              </Button>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden neon-glow"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass backdrop-blur-xl border-t border-glass-border">
            <div className="py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="block px-6 py-3 text-muted-foreground hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
                >
                  {item.name}
                </a>
              ))}

              <div className="px-6 pt-4">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    handleNavClick("#contact");
                  }}
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
