
import React from 'react';
import { useSEO } from '../../hooks/useSEO';

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
    <section className="mb-16 scroll-mt-24" id={id}>
        <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
            {title}
        </h2>
        <div className="text-slate-700 leading-relaxed space-y-6 text-lg">
            {children}
        </div>
    </section>
);

const ConceptCard: React.FC<{ title: string, icon: string, children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-indigo-600 text-3xl">{icon}</span>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600">{children}</p>
    </div>
);

const ProSpecFramework: React.FC = () => {
    useSEO({
        title: 'PRO-SPEC Framework',
        description: 'Stop chatting, start architecting. The PRO-SPEC framework eliminates AI context drift by using a 5-layer "Source of Truth" artifact for production-grade code generation.',
        keywords: ['PRO-SPEC', 'AI Framework', 'Vibe Coding', 'Software Architecture', 'Prompt Engineering', 'AI Code Generation']
    });

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
             {/* Hero Section */}
            <div className="text-center py-16 border-b border-slate-200 mb-16">
                <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-2xl mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <span className="material-symbols-outlined text-indigo-600 text-5xl">integration_instructions</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
                    Stop Chatting. <br/><span className="text-indigo-600">Start Architecting.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    The <strong>PRO-SPEC</strong> is the "Source of Truth" artifact that eliminates context drift and forces AI to build production-grade software.
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-12">
                {/* Sidebar Navigation */}
                <div className="hidden lg:block col-span-1">
                    <div className="sticky top-32 space-y-2">
                        <a href="#manifesto" className="block text-slate-600 hover:text-indigo-600 font-medium text-sm py-1">The Manifesto</a>
                        <a href="#context-drift" className="block text-slate-600 hover:text-indigo-600 font-medium text-sm py-1">The Problem: Context Drift</a>
                        <a href="#layers" className="block text-slate-600 hover:text-indigo-600 font-medium text-sm py-1">The 5-Layer Architecture</a>
                        <a href="#template" className="block text-slate-600 hover:text-indigo-600 font-medium text-sm py-1">The Artifact Template</a>
                        <a href="#workflow" className="block text-slate-600 hover:text-indigo-600 font-medium text-sm py-1">Workflow</a>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-3">
                    
                    {/* 1. The Manifesto */}
                    <Section title="The Vibe Architect Manifesto" id="manifesto">
                        <div className="grid md:grid-cols-3 gap-4">
                            <ConceptCard title="Spec = Code" icon="description">
                                The code is merely a compilation of the Spec. If the Spec is perfect, the AI's output is deterministic.
                            </ConceptCard>
                            <ConceptCard title="No More Chat" icon="chat_off">
                                Chatting with AI leads to "Context Drift." We don't chat; we iterate on the Artifact.
                            </ConceptCard>
                            <ConceptCard title="Human intent" icon="psychology">
                                Humans provide the <em>Intent</em> (The Vibe). AI handles the <em>Implementation</em> (The Syntax).
                            </ConceptCard>
                        </div>
                    </Section>

                    {/* 2. The Problem */}
                    <Section title="The Problem: Context Drift" id="context-drift">
                        <p>
                            When you code with AI via chat, you are playing a game of "Telephone."
                        </p>
                        <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-red-400 my-4">
                            <h4 className="font-bold text-red-800 mb-2">Traditional Chat Workflow (Flawed)</h4>
                            <p className="font-mono text-sm text-slate-700">
                                User: "Make a button." <br/>
                                AI: *Makes button* <br/>
                                User: "Make it blue." <br/>
                                AI: *Makes it blue, forgets accessibility* <br/>
                                User: "Connect it to the API." <br/>
                                AI: *Connects API, forgets it was blue* <br/>
                            </p>
                            <p className="mt-2 text-red-600 font-bold text-sm uppercase tracking-wider">Result: Spaghetti Code</p>
                        </div>
                        <p>
                            The <strong>PRO-SPEC</strong> solves this by freezing the entire context into a single file. You update the file, not the chat history.
                        </p>
                    </Section>

                    {/* 3. The 5-Layer Architecture */}
                    <Section title="The 5-Layer Architecture" id="layers">
                        <p className="mb-6">A PRO-SPEC is built on five layers. It moves from abstract "Vibe" to concrete "Execution".</p>
                        
                        <div className="space-y-6">
                            <div className="relative pl-8 border-l-4 border-slate-300">
                                <div className="absolute -left-3 top-0 bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</div>
                                <h3 className="text-xl font-bold text-slate-900">Layer 1: The Intent (The Soul)</h3>
                                <p className="text-slate-600 text-sm mt-1">
                                    <strong>Components:</strong> User Stories, "The Vibe" (Look & Feel), Core Value Metric.<br/>
                                    <strong>Owner:</strong> Human (PM/Founder).
                                </p>
                            </div>

                            <div className="relative pl-8 border-l-4 border-slate-300">
                                <div className="absolute -left-3 top-0 bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</div>
                                <h3 className="text-xl font-bold text-slate-900">Layer 2: The Contract (The Skeleton)</h3>
                                <p className="text-slate-600 text-sm mt-1">
                                    <strong>Components:</strong> Database Schemas (Prisma/SQL), API Interfaces, Route Structure.<br/>
                                    <strong>Owner:</strong> Lead Architect.
                                </p>
                            </div>

                            <div className="relative pl-8 border-l-4 border-amber-400 bg-amber-50/50 p-4 rounded-r-xl -ml-4">
                                <div className="absolute -left-3 top-4 bg-amber-400 text-amber-900 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</div>
                                <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                                    Layer 3: The Shield (Security Constraints)
                                    <span className="bg-amber-200 text-amber-800 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">Critical</span>
                                </h3>
                                <p className="text-amber-800 text-sm mt-2">
                                    <strong>Purpose:</strong> Defensive engineering. AI often prioritizes functionality over security. This layer acts as a firewall for generated code.<br/>
                                    <strong>Components:</strong> Auth Logic, Sanitization (Zod), RBAC, Secrets Management.<br/>
                                    <strong>AI Instruction:</strong> "Reject any code generation that violates these constraints."
                                </p>
                            </div>

                            <div className="relative pl-8 border-l-4 border-emerald-400 bg-emerald-50/50 p-4 rounded-r-xl -ml-4">
                                <div className="absolute -left-3 top-4 bg-emerald-400 text-emerald-900 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">4</div>
                                <h3 className="text-xl font-bold text-emerald-900">Layer 4: The Engine (Performance & UX)</h3>
                                <p className="text-emerald-800 text-sm mt-2">
                                    <strong>Components:</strong> Caching Strategies, Optimistic UI, Loading States, Complexity Limits.<br/>
                                    <strong>Purpose:</strong> Ensures the app feels fast and professional, not just "functional."
                                </p>
                            </div>

                            <div className="relative pl-8 border-l-4 border-indigo-500">
                                <div className="absolute -left-3 top-0 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">5</div>
                                <h3 className="text-xl font-bold text-indigo-900">Layer 5: The Orchestration (The Command)</h3>
                                <p className="text-slate-600 text-sm mt-1">
                                    <strong>Components:</strong> The specific Prompt/Command trigger. The Role definition.<br/>
                                    <strong>Purpose:</strong> The trigger that tells the AI to consume L1-L4 and output code.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* 4. The Template */}
                    <Section title="The Artifact Template" id="template">
                        <p>Copy this markdown template to <code>feature-name.prospec.md</code> and use it as your single source of truth.</p>
                        
                        <CodeBlock language="markdown" title="feature-chat.prospec.md">
{`# PRO-SPEC: Real-Time Chat Module
> Version: 1.2 | Stack: Node.js (NestJS) / React / PostgreSQL / Redis

---

## [L1] PRODUCT INTENT (The Soul)
**User Story:** As a support agent, I want to receive messages in real-time without refreshing the page.
**The Vibe:** Professional, snappy, "WhatsApp-for-business" feel.
**Core Value:** Time-to-response reduced by 40%.

---

## [L2] TECHNICAL CONTRACTS (The Skeleton)
**Database Model (Prisma Syntax):**
\`\`\`prisma
model Message {
  id        String   @id @default(uuid())
  content   String   @db.VarChar(500)
  senderId  String
  roomId    String
  createdAt DateTime @default(now())
  isRead    Boolean  @default(false)
}
\`\`\`

**API Interface (WS Event):**
Event: client:send_message
Payload: { roomId: string, content: string }
Response: server:message_ack or server:error

---

## [L3] THE SHIELD (Security Constraints)
Instruction to AI: Apply these rules strictly. Fail generation if violated.
1. **Socket Auth:** Handshake must validate JWT token from Authorization header. Disconnect immediately if invalid.
2. **Sanitization:** All content strings must be stripped of HTML tags using sanitize-html library before DB insertion.
3. **Rate Limit:** Max 10 messages per second per socket ID.
4. **Authorization:** Verify senderId matches the JWT sub.

---

## [L4] THE ENGINE (Performance & UX Constraints)
1. **Optimistic UI:** Frontend must append the message to the list immediately upon sending.
2. **Virtualization:** The message list component must use react-window to handle lists > 1000 items.
3. **Indexing:** Ensure roomId and createdAt are composite indexed in Postgres.

---

## [L5] ORCHESTRATION (The Command)
**Role:** Senior FullStack Engineer.
**Task:** Generate the following three files based strictly on this spec:
1. chat.gateway.ts (Backend Logic)
2. chat.service.ts (DB & Validation Logic)
3. ChatWindow.tsx (Frontend Logic)
**Constraint:** Do not add comments unless explaining a security decision.`}
                        </CodeBlock>
                    </Section>

                    {/* 5. The Workflow */}
                    <Section title="The Architect's Workflow" id="workflow">
                        <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-2xl">
                            <ol className="space-y-6 relative border-l border-indigo-700 ml-4">
                                <li className="pl-8 relative">
                                    <span className="absolute -left-[9px] top-1 w-4 h-4 bg-indigo-400 rounded-full"></span>
                                    <strong className="text-indigo-200 block text-sm uppercase tracking-wider mb-1">Step 1: Draft</strong>
                                    <p>You write the <code>PRO-SPEC</code> file. You define the vibe, the schema, and the rules.</p>
                                </li>
                                <li className="pl-8 relative">
                                    <span className="absolute -left-[9px] top-1 w-4 h-4 bg-indigo-400 rounded-full"></span>
                                    <strong className="text-indigo-200 block text-sm uppercase tracking-wider mb-1">Step 2: Generate</strong>
                                    <p>Paste the PRO-SPEC into your IDE's AI assistant (Cursor, Copilot) or Gemini.</p>
                                </li>
                                <li className="pl-8 relative">
                                    <span className="absolute -left-[9px] top-1 w-4 h-4 bg-indigo-400 rounded-full"></span>
                                    <strong className="text-indigo-200 block text-sm uppercase tracking-wider mb-1">Step 3: Validate</strong>
                                    <p>The code is generated. It is secure by default because of Layer 3.</p>
                                </li>
                                <li className="pl-8 relative">
                                    <span className="absolute -left-[9px] top-1 w-4 h-4 bg-indigo-400 rounded-full"></span>
                                    <strong className="text-indigo-200 block text-sm uppercase tracking-wider mb-1">Step 4: Iterate</strong>
                                    <p>Want to change something? <strong>Do not edit the code.</strong> Edit the PRO-SPEC and re-generate.</p>
                                </li>
                            </ol>
                        </div>
                    </Section>

                </div>
            </div>
        </div>
    );
};

export default ProSpecFramework;
