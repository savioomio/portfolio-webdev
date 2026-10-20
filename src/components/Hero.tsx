export function Hero() {
  const stats = [
    { label: "Anos de experiência", value: "+2" },
    { label: "Total de projetos entregues", value: "+22" },
    { label: "Projetos com participação ativa", value: "+15" },
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative z-10 section-padding overflow-hidden">
      
      <div className="container-base w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left space-y-8">
            
            <div className="space-y-4">
              <h1 className="text-text-primary font-heading text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Desenvolvedor Front-End com experiência real em
                <span className="text-accent text-glow"> E-commerce!</span>
              </h1>

              <p className="text-text-secondary font-body text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Já desenvolvi e-commerces, sistemas desktop, blogs em WordPress e sites profissionais, sempre com foco em performance e resultado de negócio.
              </p>
            </div>

            <div className="mt-12 w-full max-w-lg mx-auto lg:mx-0 pt-8">
              <div className="flex justify-between lg:items-start items-center lg:gap-6 gap-2">
                {stats.map((stat, index) => (
                  <div key={index} className="flex-1 flex flex-col lg:items-start items-center lg:px-2 first:pl-0 lg:pl-6">
                    <span className="text-accent font-heading font-bold text-3xl lg:text-4xl mb-1">
                      {stat.value}
                    </span>
                    <span className="text-text-secondary text-sm font-medium leading-tight lg:text-left text-center">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
        </div>
        
        {/* Image & Stats */}
        <div className="order-1 lg:order-2 flex justify-center relative">
            
            <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
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
      </div>
    </section>
  )
}
