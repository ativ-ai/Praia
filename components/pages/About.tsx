
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

const FeaturePillar: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 transform hover:-translate-y-1">
        <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-4xl text-indigo-600">{icon}</span>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed">{children}</p>
    </div>
);

const FAQItem: React.FC<{ question: string; children: React.ReactNode; }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200 py-5">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left gap-4">
                <h4 className="text-lg font-semibold text-slate-800">{question}</h4>
                <span className="material-symbols-outlined transition-transform transform text-indigo-600">{isOpen ? 'remove' : 'add'}</span>
            </button>
            {isOpen && (
                <div className="mt-4 text-slate-600 leading-relaxed animate-fade-in prose prose-slate max-w-none">
                    {children}
                </div>
            )}
        </div>
    );
};

const About: React.FC = () => {
    useSEO({
        title: 'About PRAIA',
        description: 'PRAIA is the definitive AI Operating System for prompt engineering and tool discovery. Master the AI Era with PRO-SPEC and our curated Ecosystem.',
        keywords: ['AI OS', 'AI Orchestration', 'Prompt Engineering', 'PRO-SPEC', 'AI Tools Hub', 'AI Agent Builder']
    });

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            {/* Hero Section */}
            <section className="text-center mb-16 pt-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase mb-6 tracking-widest">
                    The Ultimate AI Operating System
                </div>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 leading-tight">
                    Engineering the <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-emerald-500">AI Command Center.</span>
                </h1>
                <p className="mt-8 max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
                    PRAIA (Prompt Research & AI Architect) is the definitive platform for orchestrating intelligence at scale. We provide the elite tools and frameworks required to command the next generation of AI agents.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        to="/prompt-studio"
                        className="bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-indigo-200"
                    >
                        Initialize Studio
                    </Link>
                    <Link
                        to="/tools"
                        className="bg-white text-slate-900 border border-slate-200 font-bold text-lg px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
                    >
                        Explore Ecosystem
                    </Link>
                </div>
            </section>

             {/* The Perfect Pitch Section */}
            <section className="mb-20 max-w-4xl mx-auto">
                 <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500"></div>
                    <p className="text-xl md:text-2xl font-medium text-slate-300 leading-relaxed italic">
                        "Most developers fall into the 'Chat Loop'—an endless cycle of requesting tweaks that eventually causes the AI to forget previous instructions. PRAIA solves this by acting as a package of high-level engineering protocols, allowing you to transform vague vibes into production-ready specs and deterministic code instantly."
                    </p>
                </div>
            </section>

            {/* Core Pillars Section */}
            <section className="mb-24">
                 <h2 className="text-4xl font-black text-center text-slate-900 mb-12 tracking-tight">The Four Pillars of Orchestration</h2>
                 <div className="grid md:grid-cols-2 gap-8">
                    <FeaturePillar icon="hub" title="The Ecosystem">
                        A curated directory of 100+ AI models and specialized agents. From multimodal giants like Gemini to niche automation tools, we map the entire intelligence frontier.
                    </FeaturePillar>
                    <FeaturePillar icon="architecture" title="The Architect">
                        Our world-class Prompt Studio. Use the PRO-SPEC framework to build rigorous, version-controlled instructions that eliminate hallucinations and enforce system constraints.
                    </FeaturePillar>
                    <FeaturePillar icon="terminal" title="The Command Center">
                        Your unified workspace (My PRAIA). Save, categorize, and version-control your favorite prompts, tools, and specifications in one central library.
                    </FeaturePillar>
                    <FeaturePillar icon="psychology_alt" title="The Forge">
                        Our integrated Training Center. Master the deep mechanics of AI reasoning, RAG architectures, and agentic workflows through bite-sized, practical modules.
                    </FeaturePillar>
                 </div>
            </section>

            {/* PRO-SPEC Methodology Section */}
            <section className="mb-24">
                <div className="bg-white rounded-3xl p-8 md:p-16 border border-slate-200 shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                                The Hard Core Protocol
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6">
                                PRO-SPEC™ Methodology
                            </h2>
                            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
                                Architecture is the antidote to hallucination. PRO-SPEC is a 5-layer framework designed to harden the boundary between human intent and AI execution.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-5 gap-4 mb-12">
                            {[
                                { id: 'L1', title: 'Intent', desc: "The 'why' and user-centric vibes.", color: 'bg-indigo-50 border-indigo-200' },
                                { id: 'L2', title: 'Contracts', desc: 'Hard schemas, types, and API specs.', color: 'bg-slate-50 border-slate-200' },
                                { id: 'L3', title: 'Shield', desc: 'Auth, security, and safety logic.', color: 'bg-red-50 border-red-200' },
                                { id: 'L4', title: 'Engine', desc: 'Performance and Big O constraints.', color: 'bg-emerald-50 border-emerald-200' },
                                { id: 'L5', title: 'Command', desc: 'The orchestration and trigger.', color: 'bg-blue-50 border-blue-200' },
                            ].map((layer, i) => (
                                <div key={layer.id} className={`border p-5 rounded-2xl transition-all hover:shadow-lg ${layer.color}`}>
                                    <div className="text-xs font-black text-slate-400 mb-2 uppercase">Layer {i+1}</div>
                                    <div className="font-black text-xl text-slate-900 mb-2">{layer.title}</div>
                                    <div className="text-sm text-slate-600 leading-snug">{layer.desc}</div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link 
                                to="/pro-spec" 
                                className="group inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-600 transition-all shadow-lg"
                            >
                                <span className="material-symbols-outlined">integration_instructions</span>
                                Deploy Documentation
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-24">
                <h2 className="text-4xl font-black text-center text-slate-900 mb-12 tracking-tight">System FAQ</h2>
                <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
                    <FAQItem question="What defines PRAIA as an AI OS?">
                        <p>Unlike simple chat interfaces, an <strong>Operating System</strong> provides a kernel of standards (PRO-SPEC), a file system for persistence (My PRAIA), and a registry of capabilities (The Ecosystem). PRAIA is the environment where you manage the complexity of AI apps rather than just asking questions.</p>
                    </FAQItem>
                    <FAQItem question="Who are 'The Next Gen Builders'?">
                         <p>They are "AI Orchestrators"—developers, founders, and creators who understand that the future of work isn't just knowing how to write; it's knowing how to <strong>instruct and coordinate</strong> collections of intelligence to solve high-order problems.</p>
                    </FAQItem>
                    <FAQItem question="How does PRO-SPEC eliminate hallucinations?">
                        <p>By forcing the AI into a "Contract-First" mode. When you provide an L2 (Technical Contract) and L3 (Security Shield), the AI's creativity is bounded by your specifications. It cannot guess a database schema if the schema is already defined in the Spec.</p>
                    </FAQItem>
                    <FAQItem question="What is the Forge?">
                        <p>The Forge is where you learn the mechanics of <strong>Agentic Workflows</strong>. We don't just teach you how to write "Act as a pirate" prompts; we teach you how to build chain-of-thought protocols and multi-agent systems.</p>
                    </FAQItem>
                    <FAQItem question="Is this a production-ready system?">
                        <p>This application is a <strong>Preview Edition</strong> built using Vibe Coding. It demonstrates the architecture and UI/UX patterns of a professional AI suite. Currently, data persists locally in your session (browser-only).</p>
                    </FAQItem>
                </div>
            </section>
            
            {/* "Built with" Section */}
            <section className="mb-24">
                 <div className="bg-slate-50 text-slate-900 p-10 rounded-3xl border border-slate-200 relative overflow-hidden group">
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 group-hover:bg-indigo-200 transition-colors"></div>
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8 relative z-10">
                        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center rotate-3 shadow-xl">
                            <span className="material-symbols-outlined text-4xl text-white">auto_awesome</span>
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-3xl font-black tracking-tight">The Vibe Coding Genesis</h3>
                            <p className="text-slate-600 mt-3 text-lg leading-relaxed max-w-3xl">
                                This platform was architected using **Google's Gemini API** and the **Vibe Coding** methodology. It represents a paradigm shift where natural language becomes the compiler, and human intent is the only limiting factor.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="relative overflow-hidden bg-indigo-600 rounded-[3rem] p-12 sm:p-20 text-center shadow-2xl">
                <div className="absolute inset-0 bg-grid-slate-800 opacity-20 [mask-image:radial-gradient(white,transparent)]"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl sm:text-7xl font-black text-white leading-none tracking-tighter mb-8">
                        Ready to Command <br/>the <span className="text-indigo-200">AI Era?</span>
                    </h2>
                    <p className="text-indigo-100 text-xl mb-12 max-w-2xl mx-auto font-medium">
                        Join the elite builders orchestrating the future. Access the ecosystem, engineer your specs, and scale your intelligence.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block bg-white text-indigo-700 font-bold text-xl px-12 py-5 rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl transform hover:scale-105"
                    >
                        Initialize Your Instance
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
