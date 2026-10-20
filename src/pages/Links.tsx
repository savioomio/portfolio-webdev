import { Suspense, lazy } from 'react'
import { Linkedin, Github, Instagram, Mail, Globe, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ThreeBackground = lazy(() => import('../components/ThreeBackground'))

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.355-5.294 9.88 9.88 0 019.869-9.868c2.654 0 5.149 1.041 7.028 2.919a9.865 9.865 0 012.918 7.027c-.001 5.463-4.444 9.904-9.916 9.904" />
  </svg>
);

interface LinkItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    primary?: boolean;
    internal?: boolean;
}

export function Links() {
  const links: LinkItem[] = [
    {
      label: "Meu Portfólio",
      href: "/",
      icon: <Globe className="w-5 h-5" />,
      primary: true,
      internal: true
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/5577991599090?text=Ol%C3%A1%20S%C3%A1vio!%20Vi%20seu%20link%20na%20bio.",
      icon: <WhatsAppIcon className="w-5 h-5" />
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/savioomio",
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      label: "GitHub",
      href: "https://github.com/savioomio",
      icon: <Github className="w-5 h-5" />
    },
    {
      label: "Instagram",
      href: "https://instagram.com/savioomio",
      icon: <Instagram className="w-5 h-5" />
    },
    {
      label: "Email",
      href: "mailto:saviopessaafonso@gmail.com",
      icon: <Mail className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-black min-h-screen text-text-primary font-body relative overflow-hidden">
      <Helmet>
        <title>Sávio Pessôa | Links Úteis</title>
        <link rel="canonical" href="https://savioomiodev.com.br/links" />
        <meta name="title" content="Sávio Pessôa | Links Úteis" />
        <meta name="description" content="Conecte-se comigo! Acesse meu portfólio completo, redes sociais e entre em contato direto pelo WhatsApp." />
      </Helmet>

      <Suspense fallback={<div className="fixed inset-0 z-0 bg-black" />}>
         <ThreeBackground />
      </Suspense>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" aria-label="Voltar para Home" className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 flex items-center justify-center">
            <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4 mb-8 text-center animate-fade-in-up">
            <div className="relative group">
                <div className="relative w-52 h-52">
                    {/* Main Image */}
                    <div className="relative z-10 overflow-hidden">
                      <picture>
                          <source 
                              media="(max-width: 768px)" 
                              srcSet="/capa_portifolio_mob.webp" 
                              type="image/webp"
                              width="500"
                              height="500"
                          />
                          <source 
                              media="(min-width: 769px)" 
                              srcSet="/capa_portifolio_desk.webp" 
                              type="image/webp"
                              width="800"
                              height="800"
                          />
                          <img 
                              src="/capa_portifolio_desk.webp" 
                              alt="Sávio Profile" 
                              width={800}
                              height={800}
                              loading="eager"
                              className="w-full h-full object-contain"
                          />
                      </picture>
                      <div 
                          className="block absolute inset-0 pointer-events-none"
                          style={{
                              background: `
                                  linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 15%),
                                  linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 15%),
                                  linear-gradient(to right, rgba(0,0,0,1) 0%, transparent 15%),
                                  linear-gradient(to left, rgba(0,0,0,1) 0%, transparent 15%)
                              `
                          }}
                      />
                  </div>
                </div>
            </div>
            
            <div className="space-y-2">
                <h1 className="text-2xl font-heading font-bold text-white">Desenvolvedor Front-End</h1>
            </div>
        </div>

        {/* Links Section */}
        <div className="w-full max-w-md space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {links.map((link, index) => {
                const buttonClasses = `
                    flex items-center justify-between px-6 py-4 rounded-xl
                    backdrop-blur-md border border-glass transition-all duration-300
                    group hover:scale-[1.02] active:scale-[0.98] w-full
                    ${link.primary 
                        ? 'bg-accent/10 border-accent/30 hover:bg-accent/20 hover:border-accent/50 box-shadow-glow-accent' 
                        : 'bg-glass-secondary hover:bg-glass-primary hover:border-white/20'
                    }
                `;

                const content = (
                    <>
                        <span className="flex items-center gap-4 text-text-primary font-medium group-hover:text-white transition-colors">
                            <span className={`${link.primary ? 'text-accent' : 'text-text-secondary'} group-hover:text-accent transition-colors`}>
                                {link.icon}
                            </span>
                            {link.label}
                        </span>
                        
                        {/* Arrow for external links */}
                        {(!link.internal) && (
                            <svg className="w-4 h-4 text-text-secondary group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </>
                );

                if (link.internal) {
                    return (
                        <Link key={index} to={link.href} className={buttonClasses}>
                            {content}
                        </Link>
                    )
                }

                return (
                    <a
                        key={index}
                        href={link.href}
                        target={link.href.startsWith('mailto') ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className={buttonClasses}
                    >
                        {content}
                    </a>
                )
            })}
        </div>

        {/* Footer info */}
        <footer className="mt-12 text-center text-xs text-text-disabled animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p>© {new Date().getFullYear()} Sávio Pessôa Afonso. Todos os direitos reservados.</p>
        </footer>

      </div>
    </div>
  )
}
