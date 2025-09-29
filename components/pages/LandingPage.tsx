import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import CookieBanner from '../shared/CookieBanner';
import Header from '../shared/Header';

const FeatureCard: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                <span className="text-3xl" role="img" aria-label={title}>{icon}</span>
            </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed mt-2">{children}</p>
    </div>
);

const AnimatedPromptBuilder: React.FC = () => {
    const fullText = `  Act as a: World-class copywriter
  Task: Write 3 ad headlines for a new sustainable headphone brand
  Format: A JSON object with a key 'headlines' containing an array of strings`;
    const [text, setText] = useState('');

    useEffect(() => {
        let isMounted = true;
        let currentIndex = 0;
        setText(''); // Reset text when animation should restart

        // Use a recursive setTimeout for a more robust typing animation
        // that is less prone to issues with React's component lifecycle (e.g., Strict Mode).
        function type() {
            if (!isMounted || currentIndex >= fullText.length) {
                return;
            }
            setText(prevText => prevText + fullText.charAt(currentIndex));
            currentIndex++;
            setTimeout(type, 25);
        }

        // Delay starting the animation for a smoother entry effect
        const startTimeout = setTimeout(type, 500);

        // Cleanup function to prevent state updates on an unmounted component
        return () => {
            isMounted = false;
            clearTimeout(startTimeout);
        };
    }, [fullText]);

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl max-w-2xl mx-auto mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="p-2 border-b border-slate-700 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-4 sm:p-6">
                <pre className="text-indigo-300 text-sm sm:text-base whitespace-pre-wrap animate-typing">
                    <code>{text}</code>
                </pre>
            </div>
        </div>
    );
};

const TestimonialCard: React.FC<{ quote: string; author: string; role: string; avatar: string; }> = ({ quote, author, role, avatar }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg text-slate-800 border border-slate-200/80 h-full flex flex-col">
         <p className="text-6xl text-indigo-200 font-serif leading-none">“</p>
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

const LandingPage: React.FC = () => {
    usePageTitle('Your All-in-One AI Suite');

    return (
        <div className="bg-slate-50 text-slate-800">
            <Header />
            {/* Hero Section */}
            <section className="relative text-center py-20 sm:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 border-b border-slate-200">
                 <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-10"></div>
                 <div className="relative container mx-auto px-4 z-10">
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700">
                        Build with AI.
                    </h1>
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-indigo-600 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Guided by Intelligence.
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Praia is the all-in-one suite for discovering, crafting, and mastering world-class AI prompts. Stop guessing, start engineering.
                    </p>
                    <div className="mt-8 flex justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                         <Link
                            to="/prompts"
                            className="inline-block bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-xl shadow-indigo-500/30"
                        >
                            Get Started - It's Free
                        </Link>
                    </div>
                    <AnimatedPromptBuilder />
                </div>
            </section>
            
            {/* Core Pillars Section */}
            <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">The Complete Prompt Engineering Workflow</h2>
                        <p className="mt-4 text-lg text-slate-600">Everything you need to go from beginner to expert, all in one place.</p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard icon="🧭" title="Discover">
                            Explore a vast library of expert-curated prompts, tools, and training modules. Find the perfect starting point for any task.
                        </FeatureCard>
                        <FeatureCard icon="✨" title="Create & Refine">
                            Craft prompts with powerful frameworks and our AI-powered Lyra enhancer to ensure perfect, consistent results every time.
                        </FeatureCard>
                        <FeatureCard icon="📚" title="Organize">
                            Build your personal toolkit. Save, categorize, and edit your favorite prompts, tools, and training in one central library.
                        </FeatureCard>
                         <FeatureCard icon="🎓" title="Master">
                            Level up your skills with our integrated Training Center. Our bite-sized modules make learning prompt engineering easy and accessible.
                        </FeatureCard>
                    </div>
                </div>
            </section>
            
            {/* Before/After Section */}
             <section className="py-16 sm:py-24">
                 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Transform Vague Ideas into Precise Instructions</h2>
                    <p className="mt-4 text-lg text-slate-600">Praia helps you structure your thoughts, adding the necessary context and clarity that AI models need to deliver exceptional results.</p>
                     <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg">
                            <h3 className="text-xl font-bold text-red-600 mb-2">Your Idea</h3>
                            <div className="bg-slate-100 text-slate-700 p-4 rounded-lg font-mono text-sm border border-slate-200 h-full flex items-center">
                                write a blog post about dogs
                            </div>
                        </div>
                         <div className="bg-slate-900 p-6 rounded-xl border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20">
                            <h3 className="text-xl font-bold text-indigo-400 mb-2">Praia's Structure</h3>
                             <div className="text-slate-200 p-4 rounded-lg font-mono text-sm h-full space-y-2">
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
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Loved by Creators and Developers</h2>
                        <p className="mt-4 text-lg text-slate-600">See how professionals are using Praia to accelerate their workflows.</p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                        <TestimonialCard 
                            quote="Praia's Prompt Hub is my secret weapon for marketing campaigns. I can find proven ad copy and social media ideas in seconds. It's cut my content creation time in half."
                            author="Elena Rodriguez"
                            role="Marketing Manager"
                            avatar="https://i.imgur.com/83dv4n8.png"
                        />
                         <TestimonialCard 
                            quote="The Studio's framework feature is a game-changer for building reliable prompts for my code. The consistency is incredible, and the Lyra enhancer catches issues I would have missed."
                            author="Ben Carter"
                            role="Full-Stack Developer"
                            avatar="https://i.imgur.com/pBcut2e.png"
                        />
                         <TestimonialCard 
                            quote="As a writer, getting the tone right is everything. The training modules on persona and tone helped me understand how to talk to the AI. Now, my first drafts are 90% of the way there."
                            author="Aisha Khan"
                            role="Content Creator"
                            avatar="https://i.imgur.com/cZcDo4h.png"
                        />
                    </div>
                </div>
            </section>
            
            {/* Final CTA Section */}
            <section>
                <div className="max-w-4xl mx-auto text-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                     <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">Ready to Master the AI Conversation?</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Join a growing community of creators and developers who are building the future with AI. Get started for free, no credit card required.
                    </p>
                    <Link
                        to="/prompts"
                        className="mt-8 inline-block bg-indigo-600 text-white font-bold text-lg px-10 py-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-xl shadow-indigo-500/30"
                    >
                        Start Building for Free
                    </Link>
                </div>
            </section>
            <footer className="w-full text-center py-4 text-sm text-slate-500 border-t border-slate-200">
                © {new Date().getFullYear()} - Praia by{' '}
                <a href="https://ativ.ai" target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:underline">
                  ativ.ai
                </a>
            </footer>
            <CookieBanner />
        </div>
    );
};

export default LandingPage;
