"use client"

import { TechShowcase } from "@/components/ui/TechShowcase"
import { useIsMobile } from "@/hooks/useIsMobile"
import BootstrapLogo from "@/components/assets/logos/bootstrap.svg?react"
import DjangoLogo from "@/components/assets/logos/django.svg?react"
import ElectronLogo from "@/components/assets/logos/electron.svg?react"
import GitLogo from "@/components/assets/logos/git.svg?react"
import Js from "@/components/assets/logos/js.svg?react"
import MysqlLogo from "@/components/assets/logos/mysql.svg?react"
import PhpLogo from "@/components/assets/logos/php.svg?react"
import PythonLogo from "@/components/assets/logos/python.svg?react"
import ReactLogo from "@/components/assets/logos/react.svg?react"
import TailwindLogo from "@/components/assets/logos/tailwind.svg?react"
import TsLogo from "@/components/assets/logos/ts.svg?react"
import Vtex from "@/components/assets/logos/vtex.svg?react"
import WakeLogo from "@/components/assets/logos/wake.svg?react"
import WordpressLogo from "@/components/assets/logos/wordpress.svg?react"

const allLogos = [
  { name: "JavaScript", id: 1, img: Js },
  { name: "VTEX", id: 2, img: Vtex },
  { name: "React", id: 3, img: ReactLogo },
  { name: "TypeScript", id: 4, img: TsLogo },
  { name: "Tailwind CSS", id: 5, img: TailwindLogo },
  { name: "Wake", id: 6, img: WakeLogo },
  { name: "PHP", id: 7, img: PhpLogo },
  { name: "Git", id: 8, img: GitLogo },
  { name: "WordPress", id: 9, img: WordpressLogo },
  { name: "Bootstrap", id: 10, img: BootstrapLogo },
  { name: "Django", id: 11, img: DjangoLogo },
  { name: "Electron", id: 12, img: ElectronLogo },
  { name: "MySQL", id: 13, img: MysqlLogo },
  { name: "Python", id: 14, img: PythonLogo },
]

export function SkillsCarousel() {
  const isMobile = useIsMobile()
  const columnCount = isMobile ? 3 : 4

  return (
    <section id="skills" className="section-padding min-h-screen flex items-center justify-center relative z-10">
      <div className="container-base w-full flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Tech Stack
          </h2>
          <p className="font-body text-text-secondary text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto">
            Ferramentas e tecnologias que utilizo para transformar ideias em código.
          </p>
        </div>

        <TechShowcase columnCount={columnCount} logos={allLogos} /> 
      </div>
    </section>
  )
}
