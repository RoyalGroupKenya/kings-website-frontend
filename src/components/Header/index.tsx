"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Menu, X, Phone, Sun, Moon, ChevronDown, Crown, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "../ui/utils"
import LocationsDropdown from "./locations-dropdown"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// Process locations to remove duplicates
const uniqueLocations = [
  { location: "Kilimani, Nairobi" },
  { location: "Milimani, Nakuru" },
  { location: "Bondeni Area, Nakuru" },
  { location: "Syokimau" },
  { location: "Westlands, Nairobi" },
  { location: "Hurlingham, Nairobi" },
  { location: "Upper Hill, Nairobi" },
  { location: "Ngong Road" },
  { location: "Mombasa" },
  { location: "Lavington, Nairobi" },
  { location: "Eldoret" },
  { location: "Ruiru" },
  { location: "Embakasi, Nairobi" },
  { location: "Thika Town" },
  { location: "Rongai" },
  { location: "Kileleshwa" },
  { location: "Karen, Nairobi" },
  { location: "Mlolongo, Nairobi" },
  { location: "Mombasa Road, Nairobi" },
]

// Group locations by city
const groupedLocations = uniqueLocations.reduce((acc: Record<string, string[]>, { location }) => {
  const parts = location.split(",")
  const city = parts.length > 1 ? parts[1].trim() : "Other"
  const area = parts[0].trim()

  if (!acc[city]) {
    acc[city] = []
  }

  acc[city].push(area)
  return acc
}, {})

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/aboutus" },
  {
    label: "Projects",
    href: "/projects",
    isDropdown: true,
    dropdownItems: [
      { label: "Ongoing", href: "/projects/Under-Construction" },
      { label: "All Projects", href: "/projects" },
      { label: "Commercial", href: "/type/Commercial" },
      { label: "Completed", href: "/projects/Completed" },
    ],
  },
  {
    label: "Real Estate Insights",
    href: "/blogs",
    isDropdown: true,
    dropdownItems: [
      { label: "Blogs", href: "/blogs" },
      { label: "News", href: "/news" },
      { label: "Diaspora Forum", href: "/diaspora-forum" },
      { label: "Payment Plan Calculator", href: "/investment-calculator" },
    ],
  },
  { label: "Diaspora", href: "/diaspora-investment" },
]

export default function LuxuryHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  // Handle sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setExpandedSection(null)
  }, [pathname])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      {/* Top Bar - Highly Responsive */}
      <div className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-gold-800 to-gold-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Mobile Top Bar */}
          <div className="flex sm:hidden items-center justify-between py-2 text-xs">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <Crown className="w-3 h-3 text-gold-200 flex-shrink-0" />
              <span className="font-medium truncate">Kenya's Premier Developer</span>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <a href="tel:+254700090060" className="hover:text-gold-200 transition-colors font-medium text-xs">
                Call Us
              </a>
            </div>
          </div>

          {/* Tablet Top Bar */}
          <div className="hidden sm:flex md:hidden items-center justify-between py-2 text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Crown className="w-3 h-3 text-gold-200" />
                <span className="font-medium">Kenya's Premier Real Estate Developer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-3 h-3 text-gold-200" />
                <span className="font-medium">21+ Years</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <a href="tel:+254700090060" className="hover:text-gold-200 transition-colors font-medium">
                +254 700 090 060
              </a>
            </div>
          </div>

          {/* Desktop Top Bar */}
          <div className="hidden md:flex items-center justify-between py-2 text-xs">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Crown className="w-3 h-3 text-gold-200" />
                <span className="font-medium">Kenya's Premier Real Estate Developer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-3 h-3 text-gold-200" />
                <span className="font-medium">21+ Years of Excellence</span>
              </div>
              <div className="hidden lg:flex items-center space-x-2">
                <Clock className="w-3 h-3 text-gold-200" />
                <span className="font-medium">45+ Projects Delivered</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="tel:+254700090060" className="hover:text-gold-200 transition-colors font-medium">
                +254 700 090 060
              </a>
              <span className="text-gold-300/60">|</span>
              <a
                href="mailto:info@kingsdevelopers.co.ke"
                className="hover:text-gold-200 transition-colors font-medium"
              >
                info@kingsdevelopers.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        ref={headerRef}
        className={cn(
          "w-full fixed left-0 z-40 transition-all duration-300",
          "top-8 sm:top-8 md:top-8",
          isSticky
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl py-3 sm:py-4"
            : "bg-transparent py-4 sm:py-6",
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <Image
                  src="/kings.png"
                  loader={imageLoader}
                  alt="Kings Developers"
                  width={120}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNavItems.map((item) =>
                item.isDropdown ? (
                  <DropdownMenu key={item.href}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1 hover:shadow-md",
                          pathname.startsWith(item.href)
                            ? "text-gold-800 bg-gold-100 dark:text-gold-300 dark:bg-gold-900/20 shadow-sm"
                            : "text-gray-700 hover:text-gold-800 hover:bg-gold-50 dark:text-gray-200 dark:hover:text-gold-300 dark:hover:bg-gold-900/10",
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-200" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-gold-200/50 dark:border-gold-800/50 w-48 p-2"
                    >
                      {item.dropdownItems.map((dropdownItem) => (
                        <DropdownMenuItem
                          key={dropdownItem.href}
                          asChild
                          className="focus:bg-gold-50 dark:focus:bg-gold-900/20 rounded-lg mx-0"
                        >
                          <Link
                            href={dropdownItem.href}
                            className={cn(
                              "w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                              pathname === dropdownItem.href
                                ? "text-gold-800 bg-gold-100 dark:text-gold-300 dark:bg-gold-900/20"
                                : "text-gray-700 hover:text-gold-800 hover:bg-gold-50 dark:text-gray-200 dark:hover:text-gold-300 dark:hover:bg-gold-900/10",
                            )}
                          >
                            {dropdownItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-md",
                      pathname === item.href
                        ? "text-gold-800 bg-gold-100 dark:text-gold-300 dark:bg-gold-900/20 shadow-sm"
                        : "text-gray-700 hover:text-gold-800 hover:bg-gold-50 dark:text-gray-200 dark:hover:text-gold-300 dark:hover:bg-gold-900/10",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}

              {/* Locations Dropdown */}
              <LocationsDropdown groupedLocations={groupedLocations} />
            </nav>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-700 hover:text-gold-800 hover:bg-gold-50 dark:text-gray-200 dark:hover:text-gold-300 dark:hover:bg-gold-900/10 transition-all duration-300"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                asChild
                className="bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                <Link href="/contact">
                  <Phone className="h-4 w-4 mr-2" />
                  Book Appointment
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 dark:text-gray-200 hover:text-gold-800 hover:bg-gold-50 dark:hover:text-gold-300 dark:hover:bg-gold-900/10 rounded-full transition-all duration-300"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 dark:text-gray-200 hover:text-gold-800 hover:bg-gold-50 dark:hover:text-gold-300 dark:hover:bg-gold-900/10 rounded-full transition-all duration-300"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsMenuOpen(false)} />}

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 z-50 lg:hidden transition-transform duration-300 ease-in-out shadow-2xl",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gold-50 to-gold-100 dark:from-gold-900/20 dark:to-gold-800/20">

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-full hover:bg-gold-100 dark:hover:bg-gold-900/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-2">
              {mainNavItems.map((item) =>
                item.isDropdown ? (
                  <div key={item.href} className="space-y-1">
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gold-50 dark:hover:bg-gold-900/10 rounded-lg transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          expandedSection === item.label ? "rotate-180" : "",
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-200 ease-in-out",
                        expandedSection === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                      )}
                    >
                      <div className="pl-4 space-y-1 py-2">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className={cn(
                              "block px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                              pathname === dropdownItem.href
                                ? "bg-gold-100 text-gold-800 dark:bg-gold-900/20 dark:text-gold-300"
                                : "text-gray-600 hover:bg-gold-50 hover:text-gold-800 dark:text-gray-300 dark:hover:bg-gold-900/10 dark:hover:text-gold-300",
                            )}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-semibold rounded-lg transition-colors",
                      pathname === item.href
                        ? "bg-gold-100 text-gold-800 dark:bg-gold-900/20 dark:text-gold-300"
                        : "text-gray-700 hover:bg-gold-50 hover:text-gold-800 dark:text-gray-200 dark:hover:bg-gold-900/10 dark:hover:text-gold-300",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>

            {/* Locations section */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <button
                onClick={() => toggleSection("locations")}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-base font-semibold text-gold-600 dark:text-gold-400 hover:bg-gold-50 dark:hover:bg-gold-900/10 rounded-lg transition-colors"
              >
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Our Locations
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    expandedSection === "locations" ? "rotate-180" : "",
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200 ease-in-out",
                  expandedSection === "locations" ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="pl-4 space-y-3 py-2">
                  {Object.entries(groupedLocations)
                    .slice(0, 4)
                    .map(([city, areas]) => (
                      <div key={city} className="space-y-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm px-4">{city}</p>
                        <ul className="space-y-1">
                          {(areas as string[]).slice(0, 3).map((area) => {
                            const fullLocation = city === "Other" ? area : `${area}, ${city}`
                            return (
                              <li key={area}>
                                <Link
                                  href={`/location/${fullLocation
                                    .replace(/[^a-zA-Z0-9\s]/g, "")
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}`}
                                  className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gold-800 dark:hover:text-gold-300 hover:bg-gold-50 dark:hover:bg-gold-900/10 rounded-lg transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  <MapPin className="h-3 w-3 mr-2 text-gold-500" />
                                  {area}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3 bg-gray-50 dark:bg-gray-800/50">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white rounded-full shadow-lg font-semibold"
            >
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Phone className="h-4 w-4 mr-2" />
                Book Appointment
              </Link>
            </Button>

            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <a href="tel:+254700090060" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                +254 700 090 060
              </a>
              <span>•</span>
              <a
                href="mailto:info@kingsdevelopers.co.ke"
                className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
