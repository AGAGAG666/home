'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-6 md:mb-8 flex items-center justify-between">
      <div>
        <Link
          href="/"
          className="text-xl md:text-2xl font-medium text-black dark:text-white animate-fade-in-delayed"
        >
          AGAGAG666
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-sm md:text-lg text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          学生
        </TextEffect>
      </div>
    </header>
  )
}