
import React, { useEffect, useRef } from 'react';
import { useSEO } from '../../hooks/useSEO';
import mermaid from 'mermaid';

// Reusing existing CodeBlock, Section, ConceptCard components
const CodeBlock: React.FC<{ children: React.ReactNode, language?: string, title?: string }> = ({ children, language = 'text', title }) => (
    <div className="bg-slate-900 rounded-lg my-6 overflow-hidden border border-slate-700 shadow-md group relative">
        {(title || language) && (
            <div className="bg-slate-800 text-slate-300 text-xs font-sans px-4 py-2 flex justify-between items-center border-b border-slate-700">
                <span className="font-bold">{title || 'Code'}</span>
                <span className="uppercase opacity-70">{language}</span>
            </div>
        )}
        <pre className={`text-slate-200 p-4 overflow-x-auto text-sm font-mono leading-relaxed`}>
            <code>{children}</code>
        </pre>
        <button 
            onClick={() => navigator.clipboard.writeText(children?.toString() || '')}
            className="absolute top-10 right-4 text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copy to clipboard"
        >
            <span className="material-symbols-outlined text-lg">content_copy</span>
        </button>
    </div>
);

const Section: React.FC<{ title: string, children: React.ReactNode, id?: string }> = ({ title, children, id }) => (
    <section className="mb-20 scroll-mt-28" id={id}>
        <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3 relative">
            <span className="absolute -left-8 top-1.5 w-4 h-4 bg-indigo-600 rounded-full hidden lg:block"></span>
            {title}
        </h2>
        <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
            {children}
        </div>
    </section>
);

const ConceptCard: React.FC<{ title: string, icon: string, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow hover:border-indigo-200">
        <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{children}</p>
    </div>
);

const MermaidDiagram: React.FC<{ chart: string }> = ({ chart }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif',
            themeVariables: {
                primaryColor: '#4f46e5', // indigo-600
                primaryTextColor: '#fff',
                primaryBorderColor: '#4338ca',
                lineColor: '#94a3b8', // slate-400
                secondaryColor: '#f0fdf4', // emerald-50
                tertiaryColor: '#fff',
            }
        });

        const renderChart = async () => {
            if (elementRef.current) {
                try {
                    const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart);
                    elementRef.current.innerHTML = svg;
                } catch (error) {
                    console.error('Failed to render mermaid chart', error);
                    elementRef.current.innerHTML = '<p class="text-red-500">Failed to render diagram.</p>';
                }
            }
        };

        renderChart();
    }, [chart]);

    return (
        <div className="flex justify-center my-8">
            <div ref={elementRef} className="w-full overflow-x-auto flex justify-center bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner" />
        </div>
    );
};

const ProSpecFramework: React.FC = () => {
    useSEO({
        title: 'PRO-SPEC Framework',
        description: 'The PRO-SPEC framework eliminates AI context drift by using a 5-layer "Source of Truth" artifact for production-grade code generation.',
        keywords: ['PRO-SPEC', 'AI Framework', 'Vibe Coding', 'Software Architecture', 'Prompt Engineering', 'AI Code Generation']
    });

    const workflowDiagram = `
    graph TD
      A[💡 Raw Idea / The Vibe] -->|Input| B(Prompt Studio);
      B -->|Select Tool| C{PRO-SPEC Builder};
      
      %% Corrected order: Define L1 first to ensure it renders on the Left (for Top-Down graphs, siblings often render Left-to-Right)
      C --> D[L1: Intent & Vibe];
      C --> E[L2: Contracts];
      C --> F[L3: Security];
      C --> G[L4: Engine];
      C --> H[L5: Command];
      
      D & E & F & G & H --> I[Artifact: .prospec.md];
      
      I -->|Feed to AI| J[🤖 AI Code Generator];
      J -->|Output| K[🚀 Production Code];
      K -->|Review| L{Matches Spec?};
      L -->|No| M[Update Spec Layers];
      M --> I;
      L -->|Yes| N[Commit];
      
      style A fill:#fef3c7,stroke:#d97706,color:#92400e
      style I fill:#ecfdf5,stroke:#059669,color:#065f46,stroke-width:2px
      style K fill:#eff6ff,stroke:#3b82f6,color:#1e40af
    `;

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
             {/* Hero Section */}
            <div className="text-center py-20 border-b border-slate-200 mb-16 bg-gradient-to-b from-white to-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-600 text-white rounded-2xl mb-8 shadow-lg shadow-indigo-500/30">
                    <span className="material-symbols-outlined text-4xl">integration_instructions</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
                    Architect. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Don't Just Chat.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    PRO-SPEC is the <strong>Artifact-First</strong> methodology for Vibe Coding. It turns abstract intent into deterministic software.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <a href="#template" className="bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition-transform transform hover:scale-105 shadow-xl">
                        Get the Template
                    </a>
                    <a href="#layers" className="bg-white text-slate-700 border border-slate-300 font-bold py-3 px-8 rounded-full hover:bg-slate-50 transition-colors">
                        Explore Layers
                    </a>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Sidebar Navigation */}
                <div className="hidden lg:block col-span-3">
                    <div className="sticky top-32 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contents</h3>
                        <nav className="space-y-1">
                            <a href="#manifesto" className="block text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors">The 3 Laws</a>
                            <a href="#chat-trap" className="block text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors">The Chat Trap</a>
                            <a href="#workflow" className="block text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors">The Workflow</a>
                            <a href="#layers" className="block text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors">5-Layer Architecture</a>
                            <a href="#template" className="block text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors">The Template</a>
                        </nav>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-9">
                    
                    {/* 1. The Manifesto */}
                    <Section title="The 3 Laws of Vibe Architecture" id="manifesto">
                        <div className="grid md:grid-cols-3 gap-4">
                            <ConceptCard title="Law I: The Artifact is Sovereign" icon="description">
                                The Markdown file is the single source of truth. If it's not in the Spec, it doesn't exist. We iterate on the file, never on the chat history.
                            </ConceptCard>
                            <ConceptCard title="Law II: Vibe is the Interface" icon="water_drop">
                                We use natural language to define "The Vibe"—the emotional and aesthetic intent. The AI's job is to translate that Vibe into syntax.
                            </ConceptCard>
                            <ConceptCard title="Law III: Code is a Byproduct" icon="code_off">
                                We do not write code. We architect specifications. The code is merely the compiled output of a high-quality PRO-SPEC.
                            </ConceptCard>
                        </div>
                    </Section>

                    {/* 2. The Problem */}
                    <Section title="Escaping The Chat Trap" id="chat-trap">
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                                <div className="p-8 bg-slate-50">
                                    <h3 className="text-red-600 font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">chat_error</span>
                                        The Chat Loop (Fragile)
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-600">
                                        <li className="flex gap-3">
                                            <span className="text-red-400 font-mono">01.</span>
                                            <span>You ask for a button. AI builds it.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-400 font-mono">02.</span>
                                            <span>You ask to make it blue. AI builds it blue, but forgets it needed to be accessible.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-400 font-mono">03.</span>
                                            <span>You ask for an icon. AI adds an icon, but reverts it to the default color.</span>
                                        </li>
                                        <li className="mt-4 pt-4 border-t border-slate-200 font-bold text-red-700">
                                            Result: Context Drift & Regression.
                                        </li>
                                    </ul>
                                </div>
                                <div className="p-8 bg-indigo-50/50">
                                    <h3 className="text-indigo-600 font-bold mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined">file_present</span>
                                        The Artifact Loop (Robust)
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-700">
                                        <li className="flex gap-3">
                                            <span className="text-indigo-400 font-mono">01.</span>
                                            <span>You define the button in <strong>L2</strong> and its style in <strong>L1</strong> (The Vibe).</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-indigo-400 font-mono">02.</span>
                                            <span>You generate the component.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-indigo-400 font-mono">03.</span>
                                            <span>You want it blue? You update <strong>L1</strong> in the Spec and re-generate.</span>
                                        </li>
                                        <li className="mt-4 pt-4 border-t border-indigo-200 font-bold text-indigo-700">
                                            Result: Deterministic Evolution.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* 3. The Workflow Diagram */}
                    <Section title="The Workflow" id="workflow">
                        <p className="mb-6">
                            This diagram illustrates the iterative cycle of using PRO-SPEC. Notice how the "Source of Truth" (the Artifact) sits at the center, isolating the AI's memory from the final code output.
                        </p>
                        <MermaidDiagram chart={workflowDiagram} />
                    </Section>

                    {/* 4. The 5-Layer Architecture */}
                    <Section title="The 5-Layer Architecture" id="layers">
                        <p className="mb-8 text-xl text-slate-600">
                            A PRO-SPEC acts as a contract between your intent and the AI's capabilities. It enforces discipline through structure.
                        </p>
                        
                        <div className="space-y-8">
                            {/* L1 */}
                            <div className="relative pl-8 border-l-4 border-slate-200 hover:border-fuchsia-500 transition-colors group">
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-white border-2 border-slate-300 group-hover:border-fuchsia-500 rounded-full z-10"></div>
                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-fuchsia-600 transition-colors">
                                    L1: The Soul (Product Intent)
                                </h3>
                                <p className="text-slate-600 mt-2">
                                    This is the "Vibe Check." It defines the user story and the emotional response of the product.
                                </p>
                                <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm font-mono text-slate-600">
                                    **The Vibe:** Minimalist, Swiss-design, high-contrast, "Linear-like" speed.
                                </div>
                            </div>

                            {/* L2 */}
                            <div className="relative pl-8 border-l-4 border-slate-200 hover:border-sky-500 transition-colors group">
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-white border-2 border-slate-300 group-hover:border-sky-500 rounded-full z-10"></div>
                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                                    L2: The Skeleton (Contracts)
                                </h3>
                                <p className="text-slate-600 mt-2">
                                    Hard technical constraints. Database schemas, API interfaces, and Tech Stack definitions. This prevents the AI from hallucinating imaginary libraries.
                                </p>
                            </div>

                            {/* L3 */}
                            <div className="relative pl-8 border-l-4 border-slate-200 hover:border-amber-500 transition-colors group">
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-white border-2 border-slate-300 group-hover:border-amber-500 rounded-full z-10"></div>
                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors flex items-center gap-3">
                                    L3: The Shield (Security)
                                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Critical</span>
                                </h3>
                                <p className="text-slate-600 mt-2">
                                    The Firewall. AI optimizes for functionality, often sacrificing security. This layer explicitly forbids insecure patterns (e.g., "No client-side validation only").
                                </p>
                            </div>

                            {/* L4 */}
                            <div className="relative pl-8 border-l-4 border-slate-200 hover:border-emerald-500 transition-colors group">
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-white border-2 border-slate-300 group-hover:border-emerald-500 rounded-full z-10"></div>
                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                    L4: The Engine (UX & Perf)
                                </h3>
                                <p className="text-slate-600 mt-2">
                                    Non-functional requirements. Optimistic UI updates, loading skeletons, error boundaries, and edge-case handling.
                                </p>
                            </div>

                            {/* L5 */}
                            <div className="relative pl-8 border-l-4 border-slate-200 hover:border-indigo-500 transition-colors group">
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-white border-2 border-slate-300 group-hover:border-indigo-500 rounded-full z-10"></div>
                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    L5: The Command (Orchestration)
                                </h3>
                                <p className="text-slate-600 mt-2">
                                    The trigger. This instructs the AI on which persona to adopt and how to execute the previous 4 layers.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* 5. The Template */}
                    <Section title="The Artifact Template" id="template">
                        <p>
                            Copy this template. Paste it into your prompt editor. Fill in the blanks. This is your new codebase.
                        </p>
                        
                        <CodeBlock language="markdown" title="feature-name.prospec.md">
{`# PRO-SPEC: [Feature Name]
> Version: 1.0 | Stack: [e.g. React, Tailwind, Node, Prisma]

---

## [L1] PRODUCT INTENT (The Soul)
**User Story:** As a [User Persona], I want [Action] so that [Benefit].
**The Vibe:** [e.g. Professional, Playful, "Apple-like", "Hacker-terminal"]
**Core Value:** [e.g. Speed, Accuracy, Delight]

---

## [L2] TECHNICAL CONTRACTS (The Skeleton)
**Database Model (Pseudo-code or Prisma):**
\`\`\`prisma
model Resource {
  id        String   @id @default(uuid())
  // Add fields...
}
\`\`\`

**API Routes:**
- \`GET /api/resource\`: Returns list.
- \`POST /api/resource\`: Creates new.

---

## [L3] THE SHIELD (Security Constraints)
*AI Constraint: Reject any code that violates these rules.*
1. **Auth:** All write routes must require a valid session.
2. **Validation:** Use Zod schemas for all inputs.
3. **Access:** Users can only see their own data (Row Level Security).

---

## [L4] THE ENGINE (Performance & UX)
1. **Optimistic UI:** Update the UI immediately on mutation, revert on error.
2. **Loading:** Use Skeleton loaders, no spinning wheels for main content.
3. **Errors:** Show toast notifications for server errors.

---

## [L5] ORCHESTRATION (The Command)
**Role:** Senior FullStack Engineer.
**Task:** Implement the features described in L1-L4.
**Output:** Return the full code for the required files. Do not skip sections.`}
                        </CodeBlock>
                        
                        <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl mt-8">
                            <h3 className="text-2xl font-bold mb-4">Ready to Architect?</h3>
                            <p className="mb-6 text-indigo-200">
                                Go to the Prompt Studio and select the <strong>PRO-SPEC</strong> tool to start building your artifact with AI assistance.
                            </p>
                            <a href="/#/prompt-studio" className="inline-block bg-white text-indigo-900 font-bold py-3 px-8 rounded-lg hover:bg-indigo-50 transition-colors">
                                Open Prompt Studio
                            </a>
                        </div>
                    </Section>

                </div>
            </div>
        </div>
    );
};

export default ProSpecFramework;
