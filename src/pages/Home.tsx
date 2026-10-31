import { useRef } from "react";
import { Seo } from "@/components/layout/Seo";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { GithubProjects } from "@/components/sections/GithubProjects";
import { Hero } from "@/components/sections/Hero";
import { HomeStage } from "@/components/sections/HomeStage";
import { ProjectIndex } from "@/components/sections/ProjectIndex";
import { ProjectRail, type RailHandle } from "@/components/sections/ProjectRail";
import { Storefront } from "@/components/sections/Storefront";
import { seoForHome } from "@/lib/seo";

export default function Home() {
  const railRef = useRef<RailHandle>(null);

  return (
    <>
      <Seo data={seoForHome()} />
      <HomeStage />
      <main className="relative z-[2]">
        <Hero />
        <Storefront />
        <Experience />
        <ProjectIndex onSelect={(index) => railRef.current?.goTo(index)} />
        <ProjectRail ref={railRef} />
        <GithubProjects />
        <Contact />
      </main>
    </>
  );
}
