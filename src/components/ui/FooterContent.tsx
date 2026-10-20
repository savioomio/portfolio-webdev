import React from "react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  className?: string;
}

export const Footer = ({
  brandName = "Sávio Pessôa Afonso",
  brandDescription = "Tem um projeto em mente ou apenas quer trocar uma ideia sobre tecnologia?",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0", className)}>
      <footer className="relative font-body">
        <div className="container-base flex flex-col justify-end mx-auto h-screen relative py-10">
          <div className="flex flex-col mb-12 lg:mb-20 md:mb-0 w-full absolute lg:top-1/2 top-[55vh] -translate-y-1/2 left-1/2 transform -translate-x-1/2">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-2 flex flex-col items-center flex-1 px-6 lg:px-0">
                <div className="flex items-center gap-2">
                  <span className="text-text-primary font-heading text-2xl lg:text-3xl font-bold text-center">
                    Obrigado por chegar até aqui!
                  </span>
                </div>
                <p className="text-text-secondary font-semibold text-center w-full max-w-sm lg:w-96">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-3 gap-4">
                  {socialLinks.map((link, index) => {
                    const isMailto = link.href.startsWith("mailto:");
                    return (
                      <a
                        key={index}
                        href={link.href}
                        className="text-text-secondary hover:text-accent transition-colors"
                        target={isMailto ? undefined : "_blank"}
                        aria-label={link.label}
                        rel={isMailto ? undefined : "noopener noreferrer"}
                      >
                        <div className="w-6 h-6 hover:scale-110 duration-300">
                          {link.icon}
                        </div>
                        <span className="sr-only">{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              )}

              {navLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-text-secondary max-w-full px-4">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      className="hover:text-accent duration-300 hover:font-semibold"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className=" mt-20 lg:mt-24 flex flex-col gap-3 lg:gap-1 items-center justify-center lg:flex-row lg:items-center lg:justify-between px-4 lg:px-0">
            <p className="text-base text-text-secondary text-center lg:text-left">
              ©{new Date().getFullYear()} {brandName}. Todos os direitos reservados.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <a
                  href={creatorUrl}
                  target="_blank"
                  className="text-base text-center text-text-secondary hover:text-accent transition-all duration-300 hover:font-medium"
                >
                  Desenvolvido por {creatorName}
                </a>
              </nav>
            )}
          </div>
        </div>

        {/* Large background text */}
        <div 
          className="bg-gradient-to-b from-text-primary/10 via-text-primary/10 to-transparent bg-clip-text text-transparent leading-none absolute left-1/2 -translate-x-1/2 max-lg:top-20 lg:bottom-32 font-heading font-extrabold tracking-tighter pointer-events-none select-none text-center container-base text-[12vh] lg:text-[24vh]"
          style={{
            width: '100%'
          }}
        >
          SÁVIO <br /> PESSÔA <br /> AFONSO
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-40 lg:bottom-34 backdrop-blur-sm h-1 bg-gradient-to-r from-transparent via-glass-border to-transparent w-full left-1/2 -translate-x-1/2"></div>

        {/* Bottom shadow */}
        <div className="bg-gradient-to-t from-black via-black/80 blur-[1em] to-black/40 absolute bottom-40 lg:bottom-28 w-full h-24"></div>
      </footer>
    </section>
  );
};
