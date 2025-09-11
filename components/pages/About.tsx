
import React from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';

const FeaturePillar: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl" role="img" aria-label={title}>{icon}</span>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 leading-relaxed">{children}</p>
    </div>
);

const About: React.FC = () => {
    usePageTitle('About Praia');
    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            {/* Hero Section */}
            <section className="text-center mb-16 animate-fade-in">
                <span className="text-7xl mb-4 inline-block" role="img" aria-label="beach with umbrella">🏖️</span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                    Go Beyond Basic Prompts.
                </h1>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-sky-600">
                    Master the AI Conversation.
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
                    Praia is your all-in-one suite for discovering, crafting, and optimizing world-class AI prompts. Stop guessing, start engineering.
                </p>
                <Link
                    to="/prompts"
                    className="mt-8 inline-block bg-sky-600 text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-sky-700 transition-transform transform hover:scale-105 shadow-lg"
                >
                    Explore the Hub
                </Link>
            </section>

            {/* Core Pillars Section */}
            <section className="mb-16">
                 <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Everything You Need in One Suite</h2>
                 <div className="grid md:grid-cols-2 gap-8">
                    <FeaturePillar icon="🧭" title="Prompt Hub & Studio">
                        Explore a vast library of expert-curated prompts for any task. Then, move to our Studio to craft your own with powerful frameworks and our AI-powered Lyra enhancer.
                    </FeaturePillar>
                    <FeaturePillar icon="🛠️" title="AI Tool Directory">
                        Discover the best AI tools for any job. Our curated directory helps you find, save, and launch the latest AI applications for writing, image generation, video, and more.
                    </FeaturePillar>
                    <FeaturePillar icon="🎓" title="Training Center">
                        Level up your skills with our integrated Training Center. From fundamental principles to advanced frameworks, our bite-sized modules make learning prompt engineering easy and accessible.
                    </FeaturePillar>
                    <FeaturePillar icon="📚" title="My Praia: Your Personal Library">
                        Organize your workflow in 'My Praia'. Save your favorite prompts, tools, and training modules. Create folders, edit your custom content, and build a personal AI toolkit that's always ready.
                    </FeaturePillar>
                 </div>
            </section>
            
            {/* "Built with" Section */}
            <section className="mb-16">
                 <div className="bg-slate-100 p-8 rounded-lg shadow-md border border-slate-200">
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                        <span className="text-6xl" role="img" aria-label="Gemini logo">✨</span>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">Built on a Foundation of Innovation</h3>
                            <p className="text-slate-700 mt-2 leading-relaxed">
                                This application was built in partnership with <strong>Google's Gemini API</strong> using the <strong>Vibe Coding</strong> methodology. It stands as a testament to the power of human-AI collaboration, showcasing how creativity and technical efficiency can merge to build rich, functional applications at speed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-sky-700 text-white p-10 rounded-lg text-center shadow-2xl">
                <h2 className="text-3xl font-extrabold mb-4">Ready to Elevate Your Prompts?</h2>
                <p className="text-sky-200 text-lg mb-6 max-w-xl mx-auto">
                    Join a growing community of creators and developers who are mastering the art of AI communication.
                </p>
                <Link
                    to="/login"
                    className="inline-block bg-white text-sky-700 font-bold text-lg px-10 py-3 rounded-lg hover:bg-sky-100 transition-all shadow-lg transform hover:scale-105"
                >
                    Get Started for Free
                </Link>
            </section>
        </div>
    );
};

export default About;
