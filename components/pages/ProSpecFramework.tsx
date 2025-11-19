
import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';

const CodeBlock: React.FC<{ children: React.ReactNode, language?: string, title?: string }> = ({ children, language = 'text', title }) => (
    <div className="bg-slate-900 rounded-lg my-6 overflow-hidden border border-slate-700 shadow-md">
        {(title || language) && (
            <div className="bg-slate-800 text-slate-300 text-xs font-sans px-4 py-2 flex justify-between items-center border-b border-slate-700">
                <span className="font-bold">{title || 'Code'}</span>
                <span className="uppercase opacity-70">{language}</span>
            </div>
        )}
        <pre className={`text-slate-200 p-4 overflow-x-auto text-sm font-mono leading-relaxed`}>
            <code>{children}</code>
        </pre>
    </div>
);

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">{title}</h2>
        <div className="text-slate-700 leading-relaxed space-y-4">
            {children}
        </div>
    </section>
);

const ProSpecFramework: React.FC = () => {
    usePageTitle('PRO-SPEC Framework');

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
             {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
                    <span className="material-symbols-outlined text-indigo-600 text-4xl">integration_instructions</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl mb-2">The PRO-SPEC Framework</h1>
                <p className="text-xl text-indigo-600 font-medium">Documentation that Codes Itself</p>
            </div>

            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-200">
                
                {/* 1. Definition */}
                <Section title="1. Definition">
                    <p>
                        The <strong>PRO-SPEC</strong> is a single, standardized artifact (Markdown or YAML) that acts as both the Technical Documentation for humans and the Strict Context for AI.
                    </p>
                    <p>
                        It solves the "Context Drift" problem in AI coding. Instead of chatting with an AI and losing details, you maintain a PRO-SPEC file. When you want code, you feed this file to the AI. It forces the AI to adhere to architectural, security, and performance standards defined in the spec, rather than guessing the implementation.
                    </p>
                    <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-4 bg-indigo-50 italic text-slate-800">
                        The Golden Rule: The Code is merely a compilation of the PRO-SPEC.
                    </blockquote>
                </Section>

                {/* 2. The 5-Layer Architecture */}
                <Section title="2. The 5-Layer Architecture">
                    <p>A PRO-SPEC is built on five layers. Layers 1-2 come from the X-SPEC (Documentation), and Layers 3-4 come from PROP (Engineering Constraints).</p>
                    
                    <div className="grid gap-6 mt-6">
                        <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><span className="bg-slate-200 text-slate-700 text-xs px-2 py-1 rounded">Layer 1</span> The Intent (The Product Vibe)</h3>
                            <ul className="list-disc list-inside mt-2 ml-1 text-sm space-y-1">
                                <li><strong>Purpose:</strong> Describes what and why.</li>
                                <li><strong>Components:</strong> User Stories, Business Logic, Success Metrics.</li>
                                <li><strong>Human Role:</strong> Written by PMs or Founders.</li>
                            </ul>
                        </div>

                        <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><span className="bg-slate-200 text-slate-700 text-xs px-2 py-1 rounded">Layer 2</span> The Contract (The Hard Spec)</h3>
                            <ul className="list-disc list-inside mt-2 ml-1 text-sm space-y-1">
                                <li><strong>Purpose:</strong> Defines the rigid boundaries of the system.</li>
                                <li><strong>Components:</strong> Database Schemas, API Payloads (Input/Output), Route Definitions, TypeScript Interfaces.</li>
                                <li><strong>Human Role:</strong> Written by Lead Developers/Architects.</li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-yellow-400 rounded-r-lg p-5 bg-yellow-50">
                            <h3 className="font-bold text-yellow-900 flex items-center gap-2"><span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded">Layer 3</span> The Shield (The Security PROP)</h3>
                            <ul className="list-disc list-inside mt-2 ml-1 text-sm text-yellow-800 space-y-1">
                                <li><strong>Purpose:</strong> Defensive engineering constraints.</li>
                                <li><strong>Components:</strong> Auth logic, Data sanitization rules, Access control (RBAC), Secrets management.</li>
                                <li><strong>AI Instruction:</strong> "Reject any code generation that violates these constraints."</li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-green-400 rounded-r-lg p-5 bg-green-50">
                            <h3 className="font-bold text-green-900 flex items-center gap-2"><span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">Layer 4</span> The Engine (The Perf & UX PROP)</h3>
                            <ul className="list-disc list-inside mt-2 ml-1 text-sm text-green-800 space-y-1">
                                <li><strong>Purpose:</strong> Optimization and usability standards.</li>
                                <li><strong>Components:</strong> Caching strategies, Complexity limits (Big O), Loading states, Error recovery flows, Accessibility (A11y).</li>
                            </ul>
                        </div>

                        <div className="border-l-4 border-indigo-400 rounded-r-lg p-5 bg-indigo-50">
                            <h3 className="font-bold text-indigo-900 flex items-center gap-2"><span className="bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded">Layer 5</span> The Orchestration (The Command)</h3>
                            <p className="mt-2 text-sm text-indigo-800"><strong>Purpose:</strong> The trigger that tells the AI which role to adopt and what files to output.</p>
                        </div>
                    </div>
                </Section>

                {/* 3. The PRO-SPEC Template */}
                <Section title="3. The PRO-SPEC Template (Example)">
                    <p>This is an example of a file named <code>feature-chat.prospec.md</code> that you would keep in your repository.</p>
                    
                    <CodeBlock language="markdown" title="feature-chat.prospec.md">
{`# PRO-SPEC: Real-Time Chat Module
> Version: 1.2 | Stack: Node.js (NestJS) / React / PostgreSQL / Redis

---

## [L1] PRODUCT INTENT
**User Story:** As a support agent, I want to receive messages in real-time without refreshing the page.
**Business Logic:** 
- Messages must persist in the DB.
- Unread counters must update instantly.
- Support Agents have priority in the queue.

---

## [L2] TECHNICAL CONTRACTS
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
2. **Sanitization:** All content strings must be stripped of HTML tags using sanitize-html library before DB insertion to prevent Stored XSS.
3. **Rate Limit:** Max 10 messages per second per socket ID. Implement using Redis Leaky Bucket.
4. **Authorization:** Verify senderId matches the JWT sub. User cannot send messages as someone else.

---

## [L4] THE ENGINE (Performance & UX Constraints)
1. **Optimistic UI:** Frontend must append the message to the list immediately upon sending, then update status to "Delivered" on ACK.
2. **Virtualization:** The message list component must use react-window to handle lists > 1000 items without DOM lag.
3. **Indexing:** Ensure roomId and createdAt are composite indexed in Postgres for fast history retrieval.
4. **Edge Case:** If WebSocket disconnects, queue outgoing messages in localStorage and retry automatically on reconnection.

---

## [L5] ORCHESTRATION
**Role:** Senior FullStack Engineer.
**Task:** Generate the following three files based strictly on this spec:
1. chat.gateway.ts (Backend Logic)
2. chat.service.ts (DB & Validation Logic)
3. ChatWindow.tsx (Frontend Logic)
**Format:** Return code blocks only. Add comments explaining where L3 and L4 constraints were applied.`}
                    </CodeBlock>
                </Section>

                {/* 4. The Workflow */}
                <Section title="4. The Workflow: From Vibe to Repo">
                     <ol className="space-y-4 list-decimal list-inside">
                        <li className="pl-2"><strong>Drafting:</strong> You (or an AI architect) write the <code>PRO-SPEC</code> file.</li>
                        <li className="pl-2"><strong>Review:</strong> A human reviews the Spec (Layers 2 & 3) to ensure the schema and security rules are correct. <em>This replaces code review.</em></li>
                        <li className="pl-2"><strong>Generation:</strong> You paste the <code>PRO-SPEC</code> into your IDE's AI assistant (Cursor, Copilot) or a powerful LLM (Claude 3.5 Sonnet, GPT-4o).</li>
                        <li className="pl-2"><strong>Validation:</strong> The code is generated. Because the strict constraints (Layers 3 & 4) were explicitly defined, the code is robust, secure, and matches the contract.</li>
                        <li className="pl-2"><strong>Commit:</strong> Both the <code>PRO-SPEC</code> file and the generated code are committed to the Git repository. The PRO-SPEC serves as the documentation for future developers.</li>
                    </ol>
                </Section>

                {/* 5. Why PRO-SPEC is the Future */}
                <Section title="5. Why PRO-SPEC is the Future">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <strong>It scales:</strong> You can have a PRO-SPEC for the auth module, one for payments, one for the dashboard.
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <strong>It's agnostic:</strong> You can switch AI models. The Spec remains the source of truth.
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <strong>It enforces seniority:</strong> A Junior Dev using a Senior Architect's PRO-SPEC will generate Senior-level code.
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <strong>It's self-testing:</strong> You can ask the AI: <em>"Write a Jest test suite that verifies 'L3-Rule-2' (Sanitization) from the PRO-SPEC."</em>
                        </div>
                    </div>
                </Section>

                {/* Visualizations */}
                <Section title="Visualizations">
                    <h3 className="font-bold text-lg mb-3">1. The Architecture Flow Diagram</h3>
                    <p className="mb-4 text-sm text-slate-600">This diagram illustrates the workflow: how a vague "Vibe" is hardened into a PRO-SPEC, which then restricts the AI to produce production-ready assets.</p>
                    <CodeBlock language="mermaid" title="Workflow Diagram">
{`graph TD
    %% NODES
    User([👤 Human Architect / PM])
    Vibe(💭 The Vibe / Abstract Idea)
    
    subgraph PRO_SPEC [📄 THE PRO-SPEC ARTIFACT]
        direction TB
        style PRO_SPEC fill:#f9f9f9,stroke:#333,stroke-width:2px
        
        L1[<b>Layer 1: INTENT</b><br/><i>The 'Why' & User Stories</i>]
        L2[<b>Layer 2: CONTRACTS</b><br/><i>DB Schema, API Types, Interfaces</i>]
        L3[<b>Layer 3: THE SHIELD 🛡️</b><br/><i>Security, Auth, Validation Rules</i>]
        L4[<b>Layer 4: THE ENGINE ⚙️</b><br/><i>Performance, UX, Caching</i>]
        L5[<b>Layer 5: ORCHESTRATION 🚀</b><br/><i>Role & Execution Command</i>]
        
        L1 --> L2
        L2 --> L3
        L3 --> L4
        L4 --> L5
    end

    AI_Model[🤖 AI / LLM Context Window]
    
    subgraph OUTPUT [📦 PRODUCTION ASSETS]
        Code[Source Code]
        Tests[Unit Tests]
        Docs[System Docs]
    end

    %% EDGES
    User -->|Drafts| Vibe
    Vibe -->|Structured into| L1
    User -->|Defines| L2
    User -->|Enforces| L3
    User -->|Optimizes| L4
    
    L5 -->|Feeds Strict Context| AI_Model
    AI_Model -->|Generates| Code
    AI_Model -->|Generates| Tests
    AI_Model -->|Validates against L1| Docs`}
                    </CodeBlock>

                    <h3 className="font-bold text-lg mt-8 mb-3">2. The Layered "Filter" Concept</h3>
                    <p className="mb-4 text-sm text-slate-600">This conceptual view shows how the PRO-SPEC acts as a filter. The "Vibe" enters from the top, passes through the layers of the PRO-SPEC, and clean "Code" drips out the bottom.</p>
                    <div className="bg-slate-900 text-slate-200 p-6 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre">
{`       [ INPUT: "THE VIBE" ]
    (Abstract Idea / Raw Prompt)
               ⬇
+-----------------------------------+
|  📄 PRO-SPEC (The Filter)         |
+-----------------------------------+
| [L1] INTENT (Context)             | -> "I want a chat app"
|-----------------------------------|
| [L2] CONTRACTS (Blueprint)        | -> "Use WebSocket + Postgres Schema"
|-----------------------------------|
| [L3] SHIELD (Security Constraint) | -> "BLOCK: SQL Injection, XSS"
|-----------------------------------|
| [L4] ENGINE (Performance/UX)      | -> "ENFORCE: Virtualization, Caching"
|-----------------------------------|
| [L5] ORCHESTRATION (Trigger)      | -> "ACT AS: Senior Eng. OUTPUT: Files"
+-----------------------------------+
               ⬇
       [ 🤖 AI PROCESSING ]
               ⬇
+-----------------------------------+
|  📦 OUTPUT (The Artifacts)        |
+-----------------------------------+
|  1. chat.service.ts (Secure)      |
|  2. chat.gateway.ts (Optimized)   |
|  3. ChatUI.tsx (Accessible)       |
+-----------------------------------+`}
                    </div>
                </Section>

            </div>
        </div>
    );
};

export default ProSpecFramework;
