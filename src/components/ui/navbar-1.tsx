"use client"

import * as React from "react"
import Link from "next/link"
import Image from 'next/image'
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-5 z-50 w-auto transition-all duration-300 self-center rounded-full px-3",
        isScrolled
          ? "bg-white/70 backdrop-blur-lg dark:bg-gray-950/80"
          : "bg-white/30 backdrop-blur-sm dark:bg-gray-950/50",
      )}
    >
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo1.png" alt="Produkto Elyukal" width={40} height={40} className="rounded-full"/>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex mx-5">
          <div className="hidden md:flex items-center space-x-5">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/services">How it works</NavLink>
            <NavLink href="/portfolio">Testimonials</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="backdrop-blur-lg bg-white/80 dark:bg-gray-950/80">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/docs" className="text-lg font-medium">
                  Documentation
                </Link>
                <Link href="/components" className="text-lg font-medium">
                  Components
                </Link>
                <Link href="/examples" className="text-lg font-medium">
                  Examples
                </Link>
                <Link href="/pricing" className="text-lg font-medium">
                  Pricing
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </div>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
}
const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href="/" className="relative text-base font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200 hover:text-gray-900 dark:hover:text-white group">
      {children}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-rose-500 to-indigo-600 transform scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"/>
    </Link>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
