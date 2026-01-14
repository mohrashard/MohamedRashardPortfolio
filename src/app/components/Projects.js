import React from "react";
import { projectsData } from "../digital-assets/data";

export default function Projects() {
    return (
        <section id="projects" className="py-24 px-6 md:px-12 bg-[#080808]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                    <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6"></div>
                    <p className="text-slate-400 text-lg">A collection of my latest work in software development and AI.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, idx) => (
                        <div key={idx} className="group flex flex-col bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2">
                            <div className="p-8 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                        <i className="fas fa-folder-open text-xl"></i>
                                    </div>
                                    <div className="flex gap-4">
                                        {project.github && project.github !== "#" && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-xl">
                                                <i className="fab fa-github"></i>
                                            </a>
                                        )}
                                        {project.liveDemo && (
                                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors text-xl">
                                                <i className="fas fa-external-link-alt"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                <p className="text-xs font-semibold text-blue-400/80 uppercase tracking-widest mb-4">{project.subtitle}</p>

                                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-3 py-1 text-[11px] uppercase font-bold tracking-wider rounded-lg bg-white/5 text-slate-300 border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
