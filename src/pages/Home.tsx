import { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet-async'

import { Header } from '../components/Header'
import { Hero } from '../components/Hero'

// Lazy Loading Components (Deferred)
const SkillsCarousel = lazy(() => import('../components/SkillsCarousel').then(module => ({ default: module.SkillsCarousel })))
const ThreeBackground = lazy(() => import('../components/ThreeBackground'))
const Experience = lazy(() => import('../components/Experience').then(module => ({ default: module.Experience })))
const Projects = lazy(() => import('../components/Projects').then(module => ({ default: module.Projects })))
const Contact = lazy(() => import('../components/Contact').then(module => ({ default: module.Contact })))

export function Home() {
  return (
    <div className="bg-black min-h-screen text-text-primary selection:bg-accent-soft selection:text-white font-body">
      <Helmet>
        <title>Sávio Pessôa | Especialista E-commerce VTEX & Wake</title>
        <link rel="canonical" href="https://savioomiodev.com.br/" />
        <meta name="title" content="Sávio Pessôa | Especialista E-commerce VTEX & Wake" />
        <meta name="description" content="Desenvolvedor Front-End Especialista em E-commerce de Alta Performance. Experiência em projetos para grandes marcas com VTEX e Wake." />
      </Helmet>

      <Header />
      
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-black" />}>
         <ThreeBackground />
      </Suspense>

      <main className="relative z-10">
         <Hero />
         <Suspense fallback={<div className="h-screen" />}>
            <Experience />
            <SkillsCarousel />
            <Projects />
            <Contact />
         </Suspense>
      </main>

    </div>
  )
}
