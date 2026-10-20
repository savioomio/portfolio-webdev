import { useState, useEffect } from 'react';
import { Home, Clock, Cpu, Briefcase, Mail } from 'lucide-react';
import { MenuBar } from '@/components/ui/GlowMenu';
import type { MenuItem } from '@/components/ui/GlowMenu';

import logoSrc from '@/components/assets/logo.png';

import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  const menuItems: MenuItem[] = [
    {
      icon: Home,
      label: 'Home',
      href: '#home',
      gradient: "radial-gradient(circle, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.06) 50%, rgba(97,218,251,0) 100%)",
      iconColor: "text-accent",
    },
    {
      icon: Clock,
      label: 'Experiência',
      href: '#experience',
      gradient: "radial-gradient(circle, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.06) 50%, rgba(97,218,251,0) 100%)",
      iconColor: "text-accent",
    },
    {
      icon: Cpu,
      label: 'Skills',
      href: '#skills',
      gradient: "radial-gradient(circle, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.06) 50%, rgba(97,218,251,0) 100%)",
      iconColor: "text-accent",
    },
    {
      icon: Briefcase,
      label: 'Projetos',
      href: '#projects',
      gradient: "radial-gradient(circle, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.06) 50%, rgba(97,218,251,0) 100%)",
      iconColor: "text-accent",
    },
    {
      icon: Mail,
      label: 'Contato',
      href: '#contact',
      gradient: "radial-gradient(circle, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.06) 50%, rgba(97,218,251,0) 100%)",
      iconColor: "text-accent",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = menuItems.map(item => ({ id: item.href.substring(1), label: item.label }));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 py-6 pointer-events-none transition-all duration-300"
    >
      <div className="container-base flex justify-between items-center pointer-events-auto">
        {/* Logo with Bubble Style */}
        <a href="#home" className="group relative z-50">
           <div 
             className={cn(
               "rounded-2xl backdrop-blur-lg border border-glass shadow-lg relative overflow-hidden transition-transform duration-300 hover:scale-105",
               isScrolled ? "[background:var(--glass-primary)]" : "bg-transparent"
             )
           }>
             <div className={`absolute bg-gradient-radial from-transparent via-accent/20 to-transparent rounded-3xl z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
             
                <img src={logoSrc} alt="Logo" className="h-14 w-14" />
           </div>
        </a>

        {/* Desktop Navigation - Glow Menu */}
        <div className="hidden lg:block">
          <MenuBar 
            items={menuItems} 
            activeItem={activeSection} 
            onItemClick={(label) => {
               setActiveSection(label);
               // Also scroll to section if needed, but anchor tag in MenuBar handles it naturally if href is correct?
               // MenuBar uses <a> tag so it should work.
            }}
            className={isScrolled ? "bg-background/80" : ""}
          />
        </div>

        {/* Mobile Menu Button */}
         <button 
           onClick={toggleMenu}
           className="lg:hidden text-white z-50 focus:outline-none p-2 rounded-2xl backdrop-blur-lg border border-glass min-w-14 min-h-14 flex items-center justify-center [background:var(--glass-primary)]"
           aria-label="Toggle menu"
         >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Navigation Overlay */}
         <div className={`fixed inset-0 flex flex-col items-center justify-center gap-8 transition-all duration-300 lg:hidden pointer-events-auto ${
           isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
         }`}>
           <div className="w-full px-4 py-20 h-screen backdrop-blur-lg shadow-lg border-r border-glass [background:var(--glass-primary)]">
            <MenuBar 
              items={menuItems} 
              activeItem={activeSection} 
              onItemClick={(label) => {
                 setActiveSection(label);
                 setIsMobileMenuOpen(false);
              }}
              orientation="vertical"
              className="bg-transparent border-none shadow-none w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
