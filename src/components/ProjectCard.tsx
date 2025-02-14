'use client';

import Image from 'next/image';
import { useState } from 'react';
import SpotlightCard from './ui/SpotlightCard';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export default function ProjectCard({ title, description, image, tags, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SpotlightCard 
      className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
      spotlightColor="rgba(124, 58, 237, 0.2)"
    >
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transform transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </SpotlightCard>
  );
} 