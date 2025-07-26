"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import Link from "next/link"
import { Car } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">RickshawX</span>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
