'use client';

import { motion } from "framer-motion";
import Header from "@/components/ui/Header";
import Iridescence from "@/components/shared/Iridescence";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="w-48 h-48 rounded-full overflow-hidden ring-2 ring-white/20 ring-offset-2 ring-offset-black"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Iridescence
                color={[1, 1, 1]}
                mouseReact={true}
                amplitude={0.1}
                speed={0.5}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="text-4xl font-bold text-white mb-4">About Me</h1>
              <p className="text-gray-400 mb-4">
                I'm a Full Stack Developer passionate about creating beautiful and functional web experiences. With expertise in modern web technologies, I bring ideas to life through clean code and intuitive design.
              </p>
              <p className="text-gray-400">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="p-6 rounded-2xl bg-white/5">
              <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS", "GraphQL"].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5">
              <h2 className="text-xl font-bold text-white mb-4">Experience</h2>
              <ul className="space-y-4 text-gray-400">
                <li>• COX</li>
                <li>• CRM Engineer at North Point Ministries</li>
                <li>• Software Engineer Intern at Echelon Fitness</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}