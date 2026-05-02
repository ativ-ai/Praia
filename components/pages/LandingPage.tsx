
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';
import CookieBanner from '../shared/CookieBanner';
import Header from '../shared/Header';

const FeatureCard: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:border-indigo-400 transform hover:-translate-y-2 hover:scale-[1.02]">
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed mt-2">{children}</p>
    </div>
);

const AnimatedPromptBuilder: React.FC = () => {
    const fullText = `# PRO-SPEC: SaaS_Launch_Strategy
> Analyzing Vibe & Intent...

[L1] INTENT:  High-Impact Market Entry
[L2] ROLE:    Senior Product Architect
[L3] VIBE:    Professional, Bold, Minimalist
[L4] TASK:    Generate Landing Page Copy

> Compiling Artifact... Done.`;

    const [text, setText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let isMounted = true;
        let currentIndex = 0;
        setText(''); 

        function type() {
            if (!isMounted) return;
            
            if (currentIndex < fullText.length) {
                setText(prev => prev + fullText.charAt(currentIndex));
                currentIndex++;
                // Vary typing speed slightly for realism
                setTimeout(type, Math.random() * 30 + 30);
            } else {
                // Pause at end then restart
                setTimeout(() => {
                    if (isMounted) {
                        currentIndex = 0;
                        setText('');
                        setTimeout(type, 500);
                    }
                }, 4000);
            }
        }

        const startTimeout = setTimeout(type, 800);
        
        // Blink cursor interval
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => {
            isMounted = false;
            clearTimeout(startTimeout);
            clearInterval(cursorInterval);
        };
    }, []);

    // Simple syntax highlighter for the typed text
    const renderHighlightedText = (content: string) => {
        return content.split('\n').map((line, i) => {
            let innerContent: React.ReactNode = line;

            if (line.startsWith('#')) {
                innerContent = <span className="text-fuchsia-400 font-bold">{line}</span>;
            } else if (line.startsWith('>')) {
                innerContent = <span className="text-slate-500 italic">{line}</span>;
            } else if (line.startsWith('[')) {
                const parts = line.split(':');
                if (parts.length > 1) {
                    innerContent = (
                        <>
                            <span className="text-indigo-400 font-bold">{parts[0]}:</span>
                            <span className="text-emerald-300">{parts.slice(1).join(':')}</span>
                        </>
                    );
                }
            }

            return (
                <div key={i} className="min-h-[1.5em]">
                    {innerContent}
                </div>
            );
        });
    };

    return (
        <div className="relative max-w-2xl mx-auto mt-16 group animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {/* Glow Effect Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-slate-950 ring-1 ring-white/10 rounded-xl shadow-2xl overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-slate-900/50 backdrop-blur-md p-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">terminal</span>
                        praia-architect — v1.0
                    </div>
                    <div className="w-10"></div> {/* Spacer for alignment */}
                </div>

                {/* Terminal Body */}
                <div className="p-6 sm:p-8 font-mono text-sm sm:text-base text-slate-300 leading-relaxed text-left min-h-[260px]">
                    {renderHighlightedText(text)}
                    <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} inline-block w-2.5 h-5 bg-indigo-500 ml-1 align-middle shadow-[0_0_8px_rgba(99,102,241,0.8)]`}></span>
                </div>
            </div>
        </div>
    );
};

const TestimonialCard: React.FC<{ quote: string; author: string; role: string; avatar: string; }> = ({ quote, author, role, avatar }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg text-slate-800 border border-slate-200/80 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-1">
                                    <p className="text-6xl text-indigo-200 font-serif leading-none">"</p>
        <p className="italic text-slate-600 flex-grow -mt-4">"{quote}"</p>
        <div className="flex items-center mt-4 pt-4 border-t border-slate-200">
            <img className="h-12 w-12 rounded-full" src={avatar} alt={author} />
            <div className="ml-4">
                <p className="font-bold text-slate-900">{author}</p>
                <p className="text-indigo-600 text-sm font-semibold">{role}</p>
            </div>
        </div>
    </div>
);

const ToolsGridAnimation: React.FC = () => {
    const tools = [
        { name: 'GPT-5.5', icon: '🧠', color: 'bg-emerald-50 text-emerald-600' },
        { name: 'Claude 4', icon: '✍️', color: 'bg-orange-50 text-orange-600' },
        { name: 'Gemini 3', icon: '✨', color: 'bg-blue-50 text-blue-600' },
        { name: 'Midjourney', icon: '🎨', color: 'bg-purple-50 text-purple-600' },
        { name: 'Runway', icon: '🎥', color: 'bg-pink-50 text-pink-600' },
        { name: 'Cursor', icon: '💻', color: 'bg-slate-50 text-slate-600' },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 p-4">
            {tools.map((tool, i) => (
                <div 
                    key={tool.name} 
                    className={`flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white shadow-sm animate-float`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                >
                    <div className={`w-8 h-8 rounded-lg ${tool.color} flex items-center justify-center text-lg`}>
                        {tool.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{tool.name}</span>
                </div>
            ))}
        </div>
    );
};

const DualPathShowcase: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 mt-16 sm:mt-24">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                {/* Path 1: Prompt Design */}
                <div className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] hover:border-indigo-300 hover:-translate-y-2 hover:scale-[1.01]">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-8xl text-indigo-600">design_services</span>
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase mb-4 tracking-wider">
                            <span className="material-symbols-outlined text-sm">terminal</span> The Architect
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Prompt Design</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed max-w-md">
                            Stop chatting, start engineering. Use our <strong>PRO-SPEC</strong> framework to build rigorous, version-controlled instructions that don't hallucinate.
                        </p>
                        <div className="mb-8">
                            <AnimatedPromptBuilder />
                        </div>
                        <Link to="/prompt-studio" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-indigo-200">
                            Open Studio <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* Path 2: AI Tools Hub */}
                <div className="group relative bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 hover:-translate-y-2 hover:scale-[1.01]">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-8xl text-emerald-400">smart_toy</span>
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase mb-4 tracking-wider">
                            <span className="material-symbols-outlined text-sm">apps</span> The Ecosystem
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">AI Tools Hub</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
                            Discover the world's most powerful AI models. From <strong>LLMs</strong> to <strong>Video Gen</strong> and <strong>Agentic Workflows</strong>, curated for builders.
                        </p>
                        <div className="mb-8 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-sm min-h-[220px] flex items-center justify-center">
                            <ToolsGridAnimation />
                        </div>
                        <Link to="/tools" className="inline-flex items-center gap-2 bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-slate-900 transition-all shadow-lg shadow-emerald-500/20">
                            Explore Tools <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LandingPage: React.FC = () => {
    useSEO({
        title: 'Home',
        description: 'PRAIA is the definitive AI OS for prompt engineering and tool discovery. Master the AI conversation with PRO-SPEC and the Tools Hub.',
        keywords: ['AI OS', 'AI Tools Hub', 'Prompt Design', 'Prompt Engineering', 'PRO-SPEC', 'AI Agent Builder']
    });

    return (
        <div className="bg-slate-50 text-slate-800">
            <Header />
            {/* Hero Section */}
            <section className="relative text-center pt-20 pb-16 sm:pt-32 overflow-hidden bg-slate-50">
                 <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-10"></div>
                 <div className="relative container mx-auto px-4 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-black uppercase mb-6 tracking-widest animate-fade-in">
                         The Ultimate AI Operating System
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter animate-slide-up leading-[0.9]">
                        Master the <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-emerald-500">AI Era.</span>
                    </h1>
                    <p className="mt-8 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        The command center for the next generation of builders. Engineering the world's most powerful prompts and curating the elite ecosystem of AI tools.
                    </p>
                </div>
                <DualPathShowcase />
            </section>
            
            {/* Core Pillars Section */}
            <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 sm:text-5xl tracking-tight">The 360° AI Ecosystem</h2>
                        <p className="mt-4 text-xl text-slate-600">Everything you need to orchestrate intelligence at scale.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard icon="hub" title="The Ecosystem">
                            Access a curated directory of 100+ AI models. From multimodal giants like Gemini to niche automation agents.
                        </FeatureCard>
                        <FeatureCard icon="architecture" title="The Architect">
                            Engineer bulletproof prompts using the PRO-SPEC framework. Decouple intent from implementation.
                        </FeatureCard>
                        <FeatureCard icon="terminal" title="The Command Center">
                            Your unified workspace. Save, categorize, and version your favorite prompts and tools in one central library.
                        </FeatureCard>
                         <FeatureCard icon="psychology_alt" title="The Forge">
                            Master the mechanics of AI reasoning. Learn to build agentic workflows that solve complex, multi-step tasks.
                        </FeatureCard>
                    </div>
                </div>
            </section>
            
            {/* Before/After Section */}
             <section className="py-16 sm:py-24">
                 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Transform Vague Ideas into Precise Instructions</h2>
                    <p className="mt-4 text-lg text-slate-600">PRAIA helps you structure your thoughts, adding the necessary context and clarity that AI models need to deliver exceptional results.</p>
                     <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg">
                            <h3 className="text-xl font-bold text-red-600 mb-2">Your Idea</h3>
                            <div className="bg-slate-100 text-slate-700 p-4 rounded-lg font-mono text-sm border border-slate-200 min-h-[120px] flex items-center justify-center">
                                write a blog post about dogs
                            </div>
                        </div>
                         <div className="bg-slate-900 p-6 rounded-xl border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20">
                            <h3 className="text-xl font-bold text-indigo-400 mb-2">PRAIA's Structure</h3>
                             <div className="text-slate-200 p-4 rounded-lg font-mono text-sm space-y-2">
                                <p className="animate-reveal" style={{ animationDelay: '0.2s' }}><strong className="text-indigo-400">Act as:</strong> Professional pet blogger...</p>
                                <p className="animate-reveal" style={{ animationDelay: '0.4s' }}><strong className="text-indigo-400">Task:</strong> Write a 500-word blog post...</p>
                                <p className="animate-reveal" style={{ animationDelay: '0.6s' }}><strong className="text-indigo-400">Format:</strong> A blog post with an intro...</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

             {/* Testimonials Section */}
            <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Trusted by the Next Gen of Builders</h2>
                        <p className="mt-4 text-lg text-slate-600">See how professionals are orchestrating intelligence with PRAIA.</p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                        <TestimonialCard 
                            quote="The Ecosystem is my secret weapon. I can find the exact niche AI model for my data pipelines in seconds. It's transformed how we select our tech stack."
                            author="Elena Rodriguez"
                            role="Architect"
                            avatar="https://i.imgur.com/83dv4n8.png"
                        />
                         <TestimonialCard 
                            quote="Using The Architect's PRO-SPEC framework has eliminated hallucinations in our production code. The structured output is perfect every single time."
                            author="Ben Carter"
                            role="Lead Engineer"
                            avatar="https://i.imgur.com/pBcut2e.png"
                        />
                         <TestimonialCard 
                            quote="The Forge taught me how to actually talk to models. It's not just about prompts anymore; it's about building reasoning paths that actually work."
                            author="Aisha Khan"
                            role="AI Operations"
                            avatar="https://i.imgur.com/cZcDo4h.png"
                        />
                    </div>
                </div>
            </section>
            
            {/* Final CTA Section */}
            <section>
                <div className="max-w-4xl mx-auto text-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                     <h2 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight tracking-tighter">Ready to Command the <br/><span className="text-indigo-600">AI Era?</span></h2>
                    <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
                        Join the elite builders orchestrating the future. Access the ecosystem, engineer your specs, and scale your intelligence.
                    </p>
                    <Link
                        to="/prompts"
                        className="mt-10 inline-block bg-indigo-600 text-white font-bold text-xl px-12 py-5 rounded-2xl hover:bg-slate-900 transition-all transform hover:scale-105 shadow-2xl shadow-indigo-200"
                    >
                        Initialize Your Instance
                    </Link>
                </div>
            </section>
            <footer className="w-full text-center py-4 text-sm text-slate-500 border-t border-slate-200">
                © {new Date().getFullYear()} - <Link to="/about" className="font-medium text-indigo-600 hover:underline">PRAIA</Link>
            </footer>
            <CookieBanner />
        </div>
    );
};

export default LandingPage;
