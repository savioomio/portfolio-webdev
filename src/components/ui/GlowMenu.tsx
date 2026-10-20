"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export interface MenuItem {
  icon: LucideIcon | React.FC
  label: string
  href: string
  gradient: string
  iconColor: string
}

interface MenuBarProps extends HTMLMotionProps<"nav"> {
  items: MenuItem[]
  activeItem?: string
  onItemClick?: (label: string) => void
  orientation?: "horizontal" | "vertical"
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export const MenuBar = React.forwardRef<HTMLElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick, orientation = "horizontal", ...props }, ref) => {
    return (
      <motion.nav
        ref={ref}
        className={cn(
          "px-2 py-6 lg:p-2 rounded-2xl lg:backdrop-blur-lg shadow-lg relative overflow-hidden border border-glass lg:[background:var(--glass-primary)]",
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <motion.div
          className="absolute bg-gradient-radial from-transparent via-accent/20 to-transparent rounded-3xl z-0 pointer-events-none"
          variants={navGlowVariants}
        />
        <ul className={cn("flex items-center relative z-10", orientation === "vertical" ? "flex-col gap-6" : "flex-row gap-2")}>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.label === activeItem

            return (
              <motion.li key={item.label} className="relative">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    onItemClick?.(item.label)
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="block w-full !text-inherit !no-underline"
                >
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="absolute inset-0 z-0 pointer-events-none"
                      variants={glowVariants}
                      animate={isActive ? "hover" : "initial"}
                      style={{
                        background: item.gradient,
                        opacity: isActive ? 1 : 0,
                        borderRadius: "16px",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                      variants={itemVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-foreground",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                      variants={backVariants}
                      transition={sharedTransition}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          isActive ? item.iconColor : "text-foreground",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                  </motion.div>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </motion.nav>
    )
  },
)

MenuBar.displayName = "MenuBar"
