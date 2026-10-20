import { FocusRail, type FocusRailItem } from "./ui/FocusRail";

export function Projects() {
  const projects: FocusRailItem[] = [
    {
      id: 0,
      title: 'Gas Master',
      description: 'Sistema Desktop para postos de gasolina: gestão de notas a prazo (fiado), controle financeiro e dashboards detalhados por cliente.',
      tech: 'Electron • SQLite • Tailwind CSS • ApexCharts • Node.js',
      meta: 'Desktop App • Financial',
      imageSrc: '/projects/gasmaster-desktop.webp',
      mobileImageSrc: '/projects/gasmaster-mobile.webp',
      href: 'https://github.com/savioomio/sistema-notas-posto'
    },
    { 
      id: 1,
      title: 'E-commerce Platform', 
      description: 'Plataforma completa de vendas online com integração de pagamentos e gestão de estoque.',
      tech: 'React • TypeScript • Stripe',
      meta: 'Full-Stack • E-commerce',
      imageSrc: '/projects/ecommerce-desktop.webp',
      mobileImageSrc: '/projects/ecommerce-mobile.webp',
      href: 'https://github.com/savioomio'
    },
    { 
      id: 2,
      title: 'Task Management App', 
      description: 'Sistema de produtividade para equipes com funcionalidades de tempo real.',
      tech: 'Next.js • Prisma • PostgreSQL',
      meta: 'Productivity • Real-time',
      imageSrc: '/projects/task-management-desktop.webp',
      mobileImageSrc: '/projects/task-management-mobile.webp',
      href: 'https://github.com/savioomio'
    },
    { 
      id: 3,
      title: '3D Portfolio Website', 
      description: 'Este site! Uma experiência imersiva combinando performance web e gráficos 3D.',
      tech: 'React Three Fiber • GSAP • Framer Motion',
      meta: 'Portfolio • 3D Graphics',
      imageSrc: '/projects/portfolio-3d-desktop.webp',
      mobileImageSrc: '/projects/portfolio-3d-mobile.webp',
      href: 'https://github.com/savioomio/meu-portfolio-3d'
    }
  ]

  return (
    <section id="projects" className="section-padding flex flex-col items-center relative z-10">
       <div className="container-base w-full mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4 flex items-center gap-4">
            <span className="w-2 h-10 bg-accent rounded-full"></span>
            Projetos Desenvolvidos 
          </h2>

          <p className="text-text-secondary font-body text-left max-w-lg">
            Alguns projetos que desenvolvi para resolver problemas reais e alguns e-commerces de grandes marcas do mercado.
          </p>
       </div>

       {/* FocusRail 3D Carousel - Full Width */}
       <FocusRail 
         items={projects} 
         autoPlay={false} 
         loop={true}
         className="w-full"
       />
    </section>
  )
}
