import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Mail,
  FileText,
  CheckCircle,
  Terminal,
  Cpu,
  Server,
  Layers
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { profileData } from '../../data/profileData';
import { projectsData } from '../../data/projectsData';
import { skillsCategories } from '../../data/skillsData';

// Inline brand SVGs
const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const RecruiterDrawer: React.FC = () => {
  const { isRecruiterDrawerOpen, setIsRecruiterDrawerOpen } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsRecruiterDrawerOpen(false);
      }
    };
    if (isRecruiterDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecruiterDrawerOpen, setIsRecruiterDrawerOpen]);

  if (!isRecruiterDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      {/* Background click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setIsRecruiterDrawerOpen(false)}
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-2xl h-full bg-[#f6f2ec] text-[#2c2622] shadow-2xl flex flex-col z-10 overflow-hidden border-l border-[#d8cfc3]">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#e2d8cc] flex items-center justify-between bg-[#ece5dc]/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Recruiter & Engineering Dossier
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#221d1a]">{profileData.name}</h2>
            <p className="text-sm text-[#73665a] font-medium mt-0.5">{profileData.headline}</p>
          </div>

          <button
            onClick={() => setIsRecruiterDrawerOpen(false)}
            className="p-2 rounded-xl bg-[#ded5ca] hover:bg-[#d0c6b9] text-[#4a4036] transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Quick Contact & Action Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ea580c] text-white text-xs font-bold hover:bg-[#c2410c] transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Direct</span>
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#24292e] text-white text-xs font-bold hover:bg-black transition-colors shadow-sm"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0077b5] text-white text-xs font-bold hover:bg-[#005f93] transition-colors shadow-sm"
            >
              <LinkedInIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={() => {
                alert(`Resume: Download or view request sent. Direct email: ${profileData.email}`);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ded5ca] hover:bg-[#cfc4b7] text-[#332b24] text-xs font-bold transition-colors border border-[#c4b8a9]"
            >
              <FileText className="w-4 h-4 text-[#ea580c]" />
              <span>Resume PDF</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {profileData.stats.map((stat, i) => (
              <div key={i} className="bg-[#ece5dc] p-3.5 rounded-xl border border-[#d8cdbf]">
                <div className="text-lg font-black text-[#ea580c]">{stat.value}</div>
                <div className="text-xs text-[#73665a] font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* About / Executive Summary */}
          <section className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8c7b6d] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#ea580c]" />
              <span>Executive Summary</span>
            </h3>
            <p className="text-sm text-[#453d36] leading-relaxed bg-[#ece5dc]/50 p-4 rounded-xl border border-[#d8cdbf]">
              {profileData.bio}
            </p>
          </section>

          {/* Flagship Projects Breakdown */}
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8c7b6d] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#ea580c]" />
              <span>Flagship Engineered Systems</span>
            </h3>

            <div className="space-y-4">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="bg-[#ece5dc] rounded-2xl p-5 border border-[#d8cdbf] hover:border-[#ea580c]/40 transition-colors shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: project.accentColor }}
                        />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#73665a]">
                          {project.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-[#221d1a]">{project.title}</h4>
                      <p className="text-xs font-medium text-[#ea580c] mt-0.5">{project.shortDesc}</p>
                    </div>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-[#ded5ca] hover:bg-[#d0c6b9] text-[#3d332a] transition-colors"
                        title="View Source on GitHub"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-[#524941] mt-3 leading-relaxed">
                    {project.fullDesc}
                  </p>

                  {/* Highlights / Metrics */}
                  <div className="mt-3.5 space-y-1.5">
                    {project.metrics.map((metric, mi) => (
                      <div key={mi} className="flex items-center gap-2 text-xs text-[#3b322a] font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#d8cdbf]">
                    {project.tags.map((t, ti) => (
                      <span
                        key={ti}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#ded5ca] text-[#4a4036]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Core Technical Proficiencies */}
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8c7b6d] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#ea580c]" />
              <span>Technical Proficiencies</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {skillsCategories.map((cat, ci) => (
                <div key={ci} className="bg-[#ece5dc] p-4 rounded-xl border border-[#d8cdbf]">
                  <h4 className="text-xs font-bold text-[#221d1a] mb-1">{cat.name}</h4>
                  <p className="text-[11px] text-[#786c62] mb-3 leading-tight">{cat.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s, si) => (
                      <span
                        key={si}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#ded5ca] text-[#332a22]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience History */}
          <section className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#8c7b6d] flex items-center gap-2">
              <Server className="w-4 h-4 text-[#ea580c]" />
              <span>Work & Project History</span>
            </h3>

            <div className="space-y-3">
              {profileData.experience.map((exp, ei) => (
                <div key={ei} className="bg-[#ece5dc] p-4 rounded-xl border border-[#d8cdbf]">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#221d1a]">{exp.role}</h4>
                    <span className="text-xs font-semibold text-[#ea580c]">{exp.period}</span>
                  </div>
                  <div className="text-xs text-[#73665a] font-medium">{exp.organization}</div>
                  <p className="text-xs text-[#524941] mt-2 leading-relaxed">{exp.description}</p>
                  <ul className="mt-2.5 space-y-1">
                    {exp.highlights.map((h, hi) => (
                      <li key={hi} className="text-xs text-[#3b322a] flex items-start gap-1.5">
                        <span className="text-[#ea580c] font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#ece5dc]/90 border-t border-[#e2d8cc] flex items-center justify-between text-xs text-[#73665a]">
          <span>Interactive 3D Simulation Powered by R3F + Rapier</span>
          <button
            onClick={() => setIsRecruiterDrawerOpen(false)}
            className="px-4 py-1.5 font-bold rounded-lg bg-[#ded5ca] hover:bg-[#d0c6b9] text-[#2c2622] transition-colors"
          >
            Back to 3D Playground
          </button>
        </div>
      </div>
    </div>
  );
};
