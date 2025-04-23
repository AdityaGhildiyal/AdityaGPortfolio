"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-scroll"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import NextLink from "next/link"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
    { name: "PESE 400", to: "/pese" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
          isScrolled ? "bg-slate-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) =>
            link.to === "/pese" ? (
              <NextLink
                key={link.name}
                href={link.to}
                className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {link.name}
              </NextLink>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                duration={1000}
                offset={-70}
                className="text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
                easing="easeInOutQuart"
                activeClass="text-emerald-400"
              >
                {link.name}
              </Link>
            ),
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-300 hover:text-emerald-400"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </motion.nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/95 z-50 flex flex-col items-center justify-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-slate-300 hover:text-emerald-400"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) =>
              link.to === "/pese" ? (
                <NextLink
                  key={link.name}
                  href={link.to}
                  className="text-xl text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </NextLink>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={1000}
                  offset={-70}
                  className="text-xl text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
                  easing="easeInOutQuart"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>
        </motion.div>
      )}
    </>
  )
}
