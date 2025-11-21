
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';

const FeaturePillar: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 transform hover:-translate-y-1">
        <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl" role="img" aria-label={title}>{icon}</span>
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
    usePageTitle('About PRAIA');
    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <span className="text-7xl mb-4 inline-block" role="img" aria-label="beach with umbrella">🏖️</span>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
                    Go Beyond Basic Prompts.
                </h1>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-indigo-600">
                    Master the AI Conversation.
                </h2>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
                    PRAIA (Prompt Research & AI Architect) is your all-in-one suite for discovering, crafting, and optimizing world-class AI prompts. Stop guessing, start engineering.
                </p>
                <Link
                    to="/prompts"
                    className="mt-8 inline-block bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg shadow-indigo-500/30"
                >
                    Explore the Hub
                </Link>
            </section>

            {/* Core Pillars Section */}
            <section className="mb-20">
                 <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-12">Everything You Need in One Suite</h2>
                 <div className="grid md:grid-cols-2 gap-8">
                    <FeaturePillar icon="🧭" title="Prompt Hub & Studio">
                        Explore a vast library of expert-curated prompts. Then, move to our Studio to craft your own with powerful frameworks and our AI-powered Lyra enhancer.
                    </FeaturePillar>
                    <FeaturePillar icon="🛠️" title="AI Tool Directory">
                        Discover the best AI tools for any job. Our curated directory helps you find, save, and launch the latest AI applications for writing, image generation, and more.
                    </FeaturePillar>
                    <FeaturePillar icon="🎓" title="Training Center">
                        Level up with our integrated Training Center. From fundamental principles to advanced frameworks, our bite-sized modules make learning prompt engineering easy.
                    </FeaturePillar>
                    <FeaturePillar icon="📚" title="My PRAIA: Your Library">
                        Organize your workflow in 'My PRAIA'. Save your favorite prompts, tools, and training modules. Create folders and build a personal AI toolkit that's always ready.
                    </FeaturePillar>
                 </div>
            </section>

            {/* PRO-SPEC Methodology Section */}
            <section className="mb-20">
                <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                    {/* Abstract decorative background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-fuchsia-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <span className="bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                                The Methodology
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                                Stop Chatting. <br className="hidden md:block" />Start Architecting.
                            </h2>
                            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                                PRAIA introduces <strong>PRO-SPEC</strong>, a rigorous 5-layer framework designed to eliminate AI context drift. It turns vague ideas into production-grade software artifacts.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-5 gap-4 mb-10">
                            {[
                                { id: 'L1', title: 'Intent', desc: 'The Soul & Vibe', color: 'border-slate-500' },
                                { id: 'L2', title: 'Contracts', desc: 'DB & API Schema', color: 'border-slate-400' },
                                { id: 'L3', title: 'Shield', desc: 'Security Rules', color: 'border-amber-500' },
                                { id: 'L4', title: 'Engine', desc: 'Performance', color: 'border-emerald-500' },
                                { id: 'L5', title: 'Command', desc: 'Orchestration', color: 'border-indigo-500' },
                            ].map((layer, i) => (
                                <div key={layer.id} className={`bg-slate-800/50 backdrop-blur-sm border-t-4 ${layer.color} p-4 rounded-lg text-center hover:bg-slate-800 transition-colors`}>
                                    <div className="text-xs font-mono text-slate-400 mb-1">Layer {i+1}</div>
                                    <div className="font-bold text-lg text-white">{layer.title}</div>
                                    <div className="text-xs text-slate-300">{layer.desc}</div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link 
                                to="/pro-spec" 
                                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-all transform hover:scale-105"
                            >
                                <span className="material-symbols-outlined">integration_instructions</span>
                                Read the Full PRO-SPEC Guide
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-12">Frequently Asked Questions</h2>
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
                    <FAQItem question="What is PRAIA?">
                        <p>PRAIA stands for <strong>Prompt Research & AI Architect</strong>. It is a comprehensive AI suite designed to help users of all skill levels master prompt engineering. It provides tools to discover, create, save, and optimize AI prompts for models like Google's Gemini.</p>
                    </FAQItem>
                    <FAQItem question="Who is PRAIA for?">
                        <p>PRAIA is for anyone who interacts with AI models. This includes:</p>
                        <ul>
                            <li><strong>Developers</strong> who want to build reliable, structured prompts for their applications.</li>
                            <li><strong>Marketers & Copywriters</strong> looking for creative inspiration and high-converting copy frameworks.</li>
                            <li><strong>Students & Researchers</strong> who need to efficiently summarize text, brainstorm ideas, or learn complex topics.</li>
                            <li><strong>Business Professionals</strong> aiming to improve productivity, draft emails, or create reports.</li>
                            <li><strong>Creative Individuals</strong> exploring AI for writing, art, and ideation.</li>
                        </ul>
                    </FAQItem>
                    <FAQItem question="How is PRAIA different from just using an AI chatbot directly?">
                        <p>While chatbots are powerful, PRAIA provides a structured workflow around them. Key differences include:</p>
                        <ul>
                            <li><strong>Structure & Frameworks:</strong> PRAIA offers proven frameworks (like R-T-F, B-A-B) that add precision and consistency to your prompts, reducing the "guesswork" of getting a good response.</li>
                            <li><strong>Optimization:</strong> Our Lyra enhancer acts as an AI specialist, refining your prompts to be clearer and more effective for the target AI model.</li>
                            <li><strong>Organization:</strong> "My PRAIA" allows you to build a personal, reusable library of prompts, tools, and training, saving you time and effort.</li>
                            <li><strong>Discovery:</strong> The Community Hub provides a curated collection of high-quality prompts and tools, so you don't have to start from scratch.</li>
                        </ul>
                    </FAQItem>
                     <FAQItem question="What is the Lyra Prompt Enhancer?">
                        <p>Lyra is a specialized AI persona built into the Prompt Studio. It uses a "meta-prompt" (a prompt about prompting) to analyze your input and automatically apply prompt engineering best practices. It deconstructs your intent, enhances clarity, adds structure, and delivers an optimized prompt designed for better performance on models like Gemini.</p>
                    </FAQItem>
                    <FAQItem question="How does PRAIA handle my data and API keys?">
                        <p>This version of PRAIA is a demonstration app and operates entirely within your browser session.</p>
                        <ul>
                            <li><strong>No Database:</strong> Your saved prompts, tools, and folders are stored locally for your current session and are cleared when you close the tab. No user data is saved on a server.</li>
                            <li><strong>API Key Security:</strong> The Lyra Prompt Enhancer requires a Google Gemini API key. For security, this application is designed to source the API key exclusively from a pre-configured environment variable (`process.env.API_KEY`). The application will never ask you to enter your API key in the user interface.</li>
                        </ul>
                    </FAQItem>
                </div>
            </section>
            
            {/* "Built with" Section */}
            <section className="mb-20">
                 <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg border border-slate-700">
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                        <span className="text-6xl" role="img" aria-label="Gemini logo">✨</span>
                        <div>
                            <h3 className="text-2xl font-bold">Built on a Foundation of Innovation</h3>
                            <p className="text-slate-300 mt-2 leading-relaxed">
                                This application was built in partnership with <strong>Google's Gemini API</strong> using the <strong>Vibe Coding</strong> methodology. It stands as a testament to the power of human-AI collaboration, showcasing how creativity and technical efficiency can merge to build rich, functional applications at speed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-indigo-700 text-white p-10 rounded-xl text-center shadow-2xl bg-gradient-to-br from-indigo-600 to-indigo-800">
                <h2 className="text-3xl font-extrabold mb-4">Ready to Elevate Your Prompts?</h2>
                <p className="text-indigo-200 text-lg mb-6 max-w-xl mx-auto">
                    Join a growing community of creators and developers who are mastering the art of AI communication.
                </p>
                <Link
                    to="/login"
                    className="inline-block bg-white text-indigo-700 font-bold text-lg px-10 py-4 rounded-lg hover:bg-indigo-100 transition-all shadow-lg transform hover:scale-105"
                >
                    Get Started for Free
                </Link>
            </section>
        </div>
    );
};

export default About;
