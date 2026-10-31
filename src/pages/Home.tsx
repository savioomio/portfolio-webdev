import { useRef } from "react";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { GithubProjects } from "@/components/sections/GithubProjects";
import { Hero } from "@/components/sections/Hero";
import { HomeStage } from "@/components/sections/HomeStage";
import { ProjectIndex } from "@/components/sections/ProjectIndex";
import { ProjectRail, type RailHandle } from "@/components/sections/ProjectRail";
import { Storefront } from "@/components/sections/Storefront";

export default function Home() {
  const railRef = useRef<RailHandle>(null);

  return (
    <>
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
