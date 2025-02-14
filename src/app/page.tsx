'use client';

import BlurText from "@/components/shared/BlurText";
import Header from "@/components/ui/Header";
import Iridescence from "@/components/shared/Iridescence";
import ProjectCard from "@/components/ProjectCard";

// Example projects data
const projects = [
  {
    title: "Project One",
    description: "A beautiful, interactive web application built with Next.js and Three.js",
    image: "/project1.jpg", // Add your project images to public folder
    tags: ["Next.js", "Three.js", "TailwindCSS"],
    link: "https://project1.com"
  },
  {
    title: "Project Two",
    description: "Full-stack application with real-time updates and modern UI",
    image: "/project2.jpg",
    tags: ["React", "Node.js", "WebSocket"],
    link: "https://project2.com"
  },
  {
    title: "Project Three",
    description: "Mobile-first responsive design with smooth animations",
    image: "/project3.jpg",
    tags: ["React Native", "TypeScript", "Firebase"],
    link: "https://project3.com"
  }
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="h-screen flex flex-col items-center justify-center relative px-4">
          {/* Background subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/20" />
          
          <div className="flex flex-col items-center gap-8 z-10">
            {/* Logo/Avatar */}
            <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-white/20 ring-offset-2 ring-offset-black">
              <Iridescence
                color={[1, 1, 1]}
                mouseReact={true}
                amplitude={0.1}
                speed={0.5}
              />
            </div>

            {/* Main Title */}
            <BlurText
              text="Andy T"
              delay={100}
              className="text-5xl font-bold text-white"
            />

            {/* Subtitle */}
            <BlurText
              text="Full Stack Developer"
              delay={50}
              className="text-xl text-gray-400"
            />

            {/* Description */}
            <BlurText
              text="Building beautiful, interactive experiences for the web"
              delay={75}
              className="text-gray-500 max-w-md text-center"
            />

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-8">
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
              >
                View Projects
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <BlurText
                text="Featured Projects"
                className="text-4xl font-bold text-white mb-4"
              />
              <p className="text-gray-400 max-w-2xl mx-auto">
                Here are some of my recent works. Each project is crafted with attention to detail and modern technologies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.title}
                  {...project}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
