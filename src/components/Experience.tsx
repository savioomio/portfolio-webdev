
import { Timeline, type TimelineEntry } from "./ui/Timeline";
import { Rocket, Zap, Cpu, Database, Globe } from "lucide-react";

const VideoPlayer = ({ videoSrc, title }: { videoSrc: string; title: string }) => {
  return (
    <div className="w-full max-w-[355px] h-[200px] rounded-lg overflow-hidden relative shadow-lg glass-card group">
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform z-20">
        {title}
      </div>
    </div>
  );
};

export const Experience = () => {
  const data: TimelineEntry[] = [
    {
      title: "2021/22",
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-heading text-xl lg:text-2xl font-semibold text-text-primary mb-2">
                Técnico em Informática para Internet
              </h4>
              <p className="text-accent text-sm lg:text-base font-medium mb-3">
                IF Baiano • Primeiro contato com tecnologia
              </p>
            </div>
          </div>

          <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
            Em 2021, comecei meu ensino médio integrado com o curso Técnico em Informática para Internet 
            no Instituto Federal de Educação, Ciência e Tecnologia Baiano. Foi lá que tive meu primeiro 
            contato significativo com tecnologia, descobrindo minha paixão por desenvolvimento.
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Lógica de Programação</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Webdesign</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Fundamentos de Informática</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Fundamentos de Sistemas Operacionais</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "2022/23",
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Cpu className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-heading text-xl lg:text-2xl font-semibold text-text-primary mb-2">
                Robótica & Desenvolvimento Web
              </h4>
              <p className="text-accent text-sm lg:text-base font-medium mb-3">
                Projetos Integradores • Estágio
              </p>
            </div>
          </div>

          <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
            Já no segundo ano do ensino médio, tive contato com robótica através da disciplina de "Projeto Integrador I",
            onde desenvolvemos projetos fascinantes como uma aranha robô e um sistema de detecção de vazamento de gás.
          </p>

          <div className="flex flex-row flex-wrap gap-3 mt-6">
            <VideoPlayer videoSrc="https://savioomiodev.com.br/assets/videos/aranha-robo.mp4" title="Aranha Robô - Projeto Integrador" />
            <div className="aspect-square sm:max-h-[200px] relative overflow-hidden rounded-lg group">
              <img
                src="/timeline/control_aranha.webp"
                alt="Controle da Aranha Robô"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                Controle da Aranha Robô
              </div>
            </div>
            <div className="aspect-square sm:max-h-[200px] relative overflow-hidden rounded-lg group">
              <img
                src="/timeline/sistema_reconhecimento_gas.webp"
                alt="Sistema de detecção de vazamento de gás"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                Sistema de detecção de vazamento de gás
              </div>
            </div>
          </div>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Projeto Integrador I</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Análise de Sistemas para Web</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Banco de Dados</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Programação de Sistemas para Web I</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Redes de Computadores</span>
            </li>
          </ul>

          <div className="mt-4">
            <p className="text-text-primary font-medium text-sm lg:text-base mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-accent" /> Projeto Integrado
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              As disciplinas de Análise, Banco de Dados e Programação se uniram para um grande trabalho integrado.
              Tivemos a experiência de desenvolver um protótipo de sistema completo, desde o levantamento de requisitos
              e abstração do banco de dados até o sistema documentado.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              O resultado foi um <strong>Sistema de Gerenciamento de Tarefas</strong> com ranking da turma,
              projetado para causar competitividade e estimular a produtividade.
            </p>
            <div className="rounded-lg overflow-hidden group relative w-fit sm:h-[200px] ">
              <img 
                src="/timeline/jsor_projeto_integrado.webp" 
                alt="Sistema de Gerenciamento de Tarefas" 
                className="w-auto h-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                Sistema de Gerenciamento de Tarefas
              </div>
            </div>
          </div>

          <div className="mt-6 p-5 glass-card rounded-lg backdrop-blur-sm">
            <h5 className="font-heading text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" /> Estágio no CETEIA
            </h5>
            <p className="text-text-secondary text-sm lg:text-base leading-relaxed mb-4">
              Realizei meu estágio obrigatório do IF Baiano (não remunerado) desenvolvendo um site institucional para o <a href="https://www.instagram.com/ceteia_ifbaiano/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors" title="Visitar o perfil do CETEIA no Instagram">CETEIA</a>,
              garantindo experiência prática com WordPress.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-3">
              <div className="aspect-video max-h-[200px] relative overflow-hidden rounded-lg group ">
                <img 
                  src="/timeline/build_site_ceteia.webp" 
                  alt="Construção do site CETEIA" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Construção do site CETEIA
                </div>
              </div>
              <div className="aspect-square sm:max-h-[200px] relative overflow-hidden rounded-lg group">
                <img 
                  src="/timeline/present_site_ceteia.webp" 
                  alt="Apresentação do site CETEIA" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Apresentação do site CETEIA
                </div>
              </div>
            </div>
            
            <a 
              href="https://www.instagram.com/p/CuZ90PeguEZ/?img_index=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent text-sm underline underline-offset-2 hover:text-accent-hover transition-colors"
              title="Ver publicação original no Instagram"
            >
              Ver post no Instagram <Zap className="w-3 h-3" />
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "2023/24",
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Rocket className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-heading text-xl lg:text-2xl font-semibold text-text-primary mb-2">
                Trabalho em equipe & Projetos práticos
              </h4>
              <p className="text-accent text-sm lg:text-base font-medium mb-3">
                IF Baiano • Drones Guanambi • CETEIA
              </p>
            </div>
          </div>
          
          <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
            No final de 2023 eu comecei o último ano do ensino médio que iria acabar em 2024, consolidei minha formação técnica com disciplinas avançadas e projetos práticos,
            preparando-me para os desafios profissionais.
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Projeto de Conclusão de Curso (PCC)</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Projeto Integrador II</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Programação de Sistemas para Web II</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Instalação e Configuração de Servidores</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Orientação de Prática Profissional</span>
            </li>
          </ul>

          <div className="mt-6">
            <h5 className="font-heading text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-accent" /> Drones Guanambi
            </h5>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Um grande marco na minha vida foi a entrada na equipe de drones do IF Baiano: <a href="https://www.instagram.com/dronesguanambi/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors" title="Visitar o perfil do Drones Guanambi no Instagram">"Drones Guanambi"</a>.
              Foi uma oportunidade incrível de explorar novas tecnologias e trabalhar em equipe.
            </p>
            <div className="flex flex-wrap gap-4 mb-3"> 
              <div className="rounded-lg overflow-hidden relative group w-fit sm:h-[200px] ">
                <img
                  src="/timeline/drone_used_ifsc.webp"
                  alt="Drone usado na competição de drones do IFSC 2023"
                  className="w-auto h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Drone usado na competição de drones do IFSC 2023
                </div>
              </div>
              <div className="rounded-lg overflow-hidden relative group w-fit sm:h-[200px] ">
                <img
                  src="/timeline/ajustes_drone_ifsc.webp"
                  alt="Pit stop no drone usado na competição"
                  className="w-auto h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Pit stop no drone usado na competição
                </div>
              </div>
              <div className="rounded-lg overflow-hidden relative group w-fit sm:h-[200px] ">
                <img
                  src="/timeline/first_place.webp"
                  alt="Primeiro lugar na competição de drones do IFSC 2023"
                  className="w-auto h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Minha primeira competição de drones
                </div>
              </div>
              <div className="rounded-lg overflow-hidden relative group w-fit sm:h-[200px] ">
                <img
                  src="/timeline/first_ifsc.webp"
                  alt="Primeira competição de drones do IFSC 2023"
                  className="w-auto h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Primeiro lugar na competição de drones do IFSC 2023
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 p-5 glass-card rounded-lg backdrop-blur-sm">
            <h5 className="font-heading text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-accent" /> Estágio Agro Callidos
            </h5>
            <p className="text-text-secondary text-sm lg:text-base leading-relaxed mb-4">
              Em paralelo, fui aprovado no processo seletivo para bolsista de estágio técnico em informática 
              no projeto "Agro Callidos" do CETEIA.
            </p>
            
             <div className="flex flex-row flex-wrap gap-4 mb-3">
              <div className="aspect-video relative overflow-hidden rounded-lg group sm:max-h-[200px]">
                <img 
                  src="/timeline/estagio_ceteia_meeting.webp" 
                  alt="Reunião do estágio na Agro Callidos no CETEIA" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Reunião do estágio na Agro Callidos no CETEIA
                </div>
              </div>
              <div className="aspect-square relative overflow-hidden rounded-lg group sm:max-h-[200px]">
                <img 
                  src="/timeline/present_estagio_tenda_ciencia.jfif" 
                  alt="Apresentação na Tenda da Ciência 2024" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                 <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Apresentação na Tenda da Ciência 2024
                </div>
              </div>
              <div className="aspect-square relative overflow-hidden rounded-lg group sm:max-h-[200px]">
                <img 
                  src="/timeline/setup_estagio_caliduslink.jfif" 
                  alt="Setup do estágio na Agro Callidos no CETEIA" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                 <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-accent text-center backdrop-blur-sm transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform">
                  Setup do estágio na Agro Callidos no CETEIA
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Rocket className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-heading text-xl lg:text-2xl font-semibold text-text-primary mb-2">
                Sed Do Eiusmod Tempor
              </h4>
              <p className="text-accent text-sm lg:text-base font-medium mb-3">
                Lorem Ipsum Dolor • Adipiscing & Elit
              </p>
            </div>
          </div>
          
          <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
            laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore.
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Nemo enim ipsam voluptatem quia voluptas</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Aspernatur aut odit aut fugit sed quia</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Consequuntur magni dolores eos qui ratione</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Neque porro quisquam est qui dolorem</span>
            </li>
          </ul>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">+40%</p>
              <p className="text-text-secondary text-xs mt-1">Lorem Ipsum</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">-60%</p>
              <p className="text-text-secondary text-xs mt-1">Dolor Sit</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">95+</p>
              <p className="text-text-secondary text-xs mt-1">Amet</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">100%</p>
              <p className="text-text-secondary text-xs mt-1">Consectetur</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Rocket className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-heading text-xl lg:text-2xl font-semibold text-text-primary mb-2">
                Sed Do Eiusmod Tempor
              </h4>
              <p className="text-accent text-sm lg:text-base font-medium mb-3">
                Lorem Ipsum Dolor • Adipiscing & Elit
              </p>
            </div>
          </div>
          
          <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
            laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore.
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Nemo enim ipsam voluptatem quia voluptas</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Aspernatur aut odit aut fugit sed quia</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Consequuntur magni dolores eos qui ratione</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Neque porro quisquam est qui dolorem</span>
            </li>
          </ul>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">+40%</p>
              <p className="text-text-secondary text-xs mt-1">Lorem Ipsum</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">-60%</p>
              <p className="text-text-secondary text-xs mt-1">Dolor Sit</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">95+</p>
              <p className="text-text-secondary text-xs mt-1">Amet</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">100%</p>
              <p className="text-text-secondary text-xs mt-1">Consectetur</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2026...",
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Rocket className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-heading text-xl lg:text-2xl font-semibold text-text-primary mb-2">
                Sed Do Eiusmod Tempor
              </h4>
              <p className="text-accent text-sm lg:text-base font-medium mb-3">
                Lorem Ipsum Dolor • Adipiscing & Elit
              </p>
            </div>
          </div>
          
          <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
            laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore.
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Nemo enim ipsam voluptatem quia voluptas</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Aspernatur aut odit aut fugit sed quia</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Consequuntur magni dolores eos qui ratione</span>
            </li>
            <li className="flex items-start gap-2 text-text-secondary text-xs lg:text-sm">
              <span className="text-accent" aria-hidden="true">✓</span>
              <span>Neque porro quisquam est qui dolorem</span>
            </li>
          </ul>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">+40%</p>
              <p className="text-text-secondary text-xs mt-1">Lorem Ipsum</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">-60%</p>
              <p className="text-text-secondary text-xs mt-1">Dolor Sit</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">95+</p>
              <p className="text-text-secondary text-xs mt-1">Amet</p>
            </div>
            <div className="glass-card p-4 text-center rounded-lg backdrop-blur-sm">
              <p className="text-accent text-2xl font-bold font-heading">100%</p>
              <p className="text-text-secondary text-xs mt-1">Consectetur</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="min-h-screen w-full section-padding">
      <Timeline data={data} />
    </section>
  );
};
