import React from 'react';
import { ExternalLink, Code } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  refCode: string;
  iconName: string; // Material symbol icon name
  imageUrl?: string;
  demoUrl?: string;
  sourceUrl?: string;
  colSpan?: string; // e.g. "md:col-span-8" or "md:col-span-4"
}

interface ProjectCardProps {
  project: ProjectData;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={`glass-panel glow-border p-lg relative group flex flex-col justify-between ${project.colSpan || 'md:col-span-6'}`}>
      {/* Structural corner styling decoration */}
      <div className="corner-decor"></div>
      
      <div>
        {/* CRT Monitor Mock Frame */}
        <div className="monitor-frame aspect-video w-full mb-lg group-hover:border-[#00f0ff]/40 transition-colors relative">
          <div className="absolute inset-0 bg-surface-container-highest/40 flex justify-center items-center z-10">
            <span className="material-symbols-outlined text-[#00f0ff]/30 text-5xl group-hover:scale-110 transition-transform duration-300">
              {project.iconName}
            </span>
          </div>

          {project.imageUrl ? (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" 
              style={{ backgroundImage: `url('${project.imageUrl}')` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#131315] to-[#201f21] opacity-60" />
          )}

          {/* Glitch Overlay Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20" />
        </div>

        {/* Info & Tech Stack */}
        <div className="flex justify-between items-start mb-sm">
          <div>
            <div className="flex flex-wrap gap-xs mb-sm">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="bg-[#00f0ff]/10 text-[#00f0ff] px-2 py-0.5 font-label-caps text-[9px] rounded border border-[#00f0ff]/10 tracking-tight"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-headline-sm text-lg text-primary-container font-semibold group-hover:text-[#00f0ff] transition-colors">
              {project.title}
            </h3>
          </div>
          <span className="font-code-md text-xs text-outline/40 select-none">{project.refCode}</span>
        </div>

        <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-lg mt-2">
          {project.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-md mt-lg border-t border-[#3b494b]/20 pt-lg">
        {project.demoUrl && (
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#00f0ff] text-[#00363a] px-md py-2 font-label-caps text-xs rounded-lg hover:opacity-90 active:scale-95 transition-all"
          >
            <ExternalLink size={12} />
            LAUNCH_MODULE
          </a>
        )}
        {project.sourceUrl && (
          <a 
            href={project.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-outline/40 text-outline px-md py-2 font-label-caps text-xs rounded-lg hover:border-[#00f0ff] hover:text-[#00f0ff] active:scale-95 transition-all"
          >
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            SOURCE_CODE
          </a>
        )}
        {!project.demoUrl && !project.sourceUrl && (
          <span className="flex items-center gap-2 font-label-caps text-[10px] text-surface-tint">
            <Code size={12} />
            SYSTEMS_INTEGRATED
          </span>
        )}
      </div>
    </div>
  );
};
