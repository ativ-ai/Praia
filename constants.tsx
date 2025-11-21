
import {
  Prompt,
  PromptFramework,
  TrainingModule,
  PromptCategory,
  AITool,
  AIToolCategory,
  PromptFrameworkDefinition,
  TrainingCategory,
} from './types';
import { lyraPromptText } from './data/lyraPromptText';

export const PROMPT_CATEGORIES: PromptCategory[] = [
  "Marketing", "Code Generation", "Copywriting", "Ideation", "Image Generation",
  "Productivity", "Data Analysis", "Personal Development", "Sales", "Business",
  "Role-Playing", "Advertising", "Content Creation", "Creative Writing",
  "E-Commerce", "Editing & Proofreading", "Goal Setting", "Graphic Design",
  "Personal Finance", "Persuasion & Influence", "Social Media", "Frameworks",
  "Learning", "Career", "Self Help", "Education", "Research", "Fundamentals",
  "Advanced Techniques"
];

export const TRAINING_CATEGORIES: TrainingCategory[] = [
  "Fundamentals", "Advanced Techniques", "Business & Marketing",
  "Frameworks & Patterns", "Education", "Creative & Media", "Career"
];

export const AI_TOOL_CATEGORIES: AIToolCategory[] = [
  "Image Generation", "Video Generation", "Writing", "Code Assistant",
  "Productivity", "Audio & Music", "Chatbot", "Marketing", "Design",
  "Social Media", "Research", "Presentations", "Data Analysis", "3D & VR",
  "Sales", "Website", "Meeting", "SEO", "Automation", "Prompts", "UI/UX",
  "Logo Generator"
];

export const PROMPT_CATEGORY_COLORS: Record<string, string> = {
  "Marketing": "bg-pink-100 text-pink-800",
  "Code Generation": "bg-slate-100 text-slate-800",
  "Copywriting": "bg-purple-100 text-purple-800",
  "Ideation": "bg-yellow-100 text-yellow-800",
  "Image Generation": "bg-indigo-100 text-indigo-800",
  "Productivity": "bg-green-100 text-green-800",
  "Frameworks": "bg-blue-100 text-blue-800",
  "Data Analysis": "bg-cyan-100 text-cyan-800",
  "Personal Development": "bg-teal-100 text-teal-800",
  "Sales": "bg-emerald-100 text-emerald-800",
  "Business": "bg-gray-100 text-gray-800",
  "Role-Playing": "bg-orange-100 text-orange-800",
  "Advertising": "bg-red-100 text-red-800",
  "Content Creation": "bg-violet-100 text-violet-800",
  "Creative Writing": "bg-fuchsia-100 text-fuchsia-800",
  "E-Commerce": "bg-lime-100 text-lime-800",
  "Editing & Proofreading": "bg-rose-100 text-rose-800",
  "Goal Setting": "bg-sky-100 text-sky-800",
  "Graphic Design": "bg-amber-100 text-amber-800",
  "Personal Finance": "bg-green-50 text-green-900",
  "Persuasion & Influence": "bg-indigo-50 text-indigo-900",
  "Social Media": "bg-blue-50 text-blue-900",
  "Learning": "bg-yellow-50 text-yellow-900",
  "Career": "bg-slate-200 text-slate-900",
  "Self Help": "bg-teal-50 text-teal-900",
  "Education": "bg-orange-50 text-orange-900",
  "Research": "bg-zinc-100 text-zinc-800",
  "Fundamentals": "bg-stone-100 text-stone-800",
  "Advanced Techniques": "bg-red-50 text-red-900"
};

export const PROMPT_FRAMEWORK_COLORS: Record<string, string> = {
  [PromptFramework.RTF]: "bg-sky-100 text-sky-800",
  [PromptFramework.TAG]: "bg-emerald-100 text-emerald-800",
  [PromptFramework.BAB]: "bg-amber-100 text-amber-800",
  [PromptFramework.CARE]: "bg-rose-100 text-rose-800",
  [PromptFramework.RISE]: "bg-violet-100 text-violet-800",
  [PromptFramework.SCOPE]: "bg-indigo-100 text-indigo-800",
  [PromptFramework.PACEF]: "bg-fuchsia-100 text-fuchsia-800",
  [PromptFramework.CURATE]: "bg-cyan-100 text-cyan-800",
  [PromptFramework.PARLA]: "bg-lime-100 text-lime-800",
  [PromptFramework.FACTS]: "bg-orange-100 text-orange-800",
  [PromptFramework.BRIDGE]: "bg-teal-100 text-teal-800",
  [PromptFramework.CREATE]: "bg-pink-100 text-pink-800",
  [PromptFramework.CRAFT]: "bg-purple-100 text-purple-800",
};

export const ITEM_TYPE_COLORS = {
  prompt: "bg-amber-100 text-amber-800",
  tool: "bg-sky-100 text-sky-800",
  training: "bg-emerald-100 text-emerald-800"
};

export const AI_TOOL_CATEGORY_COLORS: Record<string, string> = {
  "Image Generation": "bg-purple-100 text-purple-800",
  "Writing": "bg-blue-100 text-blue-800",
  "Productivity": "bg-green-100 text-green-800",
  "Video Generation": "bg-red-100 text-red-800",
  "Code Assistant": "bg-slate-100 text-slate-800",
  "Audio & Music": "bg-orange-100 text-orange-800",
  "Chatbot": "bg-indigo-100 text-indigo-800",
  "Marketing": "bg-pink-100 text-pink-800",
  "Design": "bg-teal-100 text-teal-800",
  "Social Media": "bg-cyan-100 text-cyan-800",
  "Research": "bg-yellow-100 text-yellow-800",
  "Presentations": "bg-rose-100 text-rose-800",
  "Data Analysis": "bg-sky-100 text-sky-800",
  "3D & VR": "bg-violet-100 text-violet-800",
  "Sales": "bg-emerald-100 text-emerald-800",
  "Website": "bg-gray-100 text-gray-800",
  "Meeting": "bg-lime-100 text-lime-800",
  "SEO": "bg-amber-100 text-amber-800",
  "Automation": "bg-fuchsia-100 text-fuchsia-800",
  "Prompts": "bg-zinc-100 text-zinc-800",
  "UI/UX": "bg-blue-50 text-blue-900",
  "Logo Generator": "bg-red-50 text-red-900"
};

export const TRAINING_CATEGORY_COLORS: Record<string, string> = {
  "Fundamentals": "bg-blue-100 text-blue-800",
  "Advanced Techniques": "bg-purple-100 text-purple-800",
  "Business & Marketing": "bg-green-100 text-green-800",
  "Frameworks & Patterns": "bg-orange-100 text-orange-800",
  "Education": "bg-yellow-100 text-yellow-800",
  "Creative & Media": "bg-pink-100 text-pink-800",
  "Career": "bg-slate-100 text-slate-800"
};

export const PROMPT_ICONS: Record<string, string> = {
  "lyra-prompt-optimizer": "✨",
  "awesome-prompt-0": "🐧",
  "awesome-prompt-1": "🌍",
  "awesome-prompt-2": "👔",
  "awesome-prompt-3": "💻",
  "awesome-prompt-4": "📊",
  "awesome-prompt-5": "🗣️",
  "awesome-prompt-6": "🎓",
  "awesome-prompt-7": "🗺️",
  "awesome-prompt-8": "📖",
  "awesome-prompt-9": "✍️",
};

export const PROMPT_FRAMEWORKS: Record<PromptFramework, PromptFrameworkDefinition> = {
  [PromptFramework.RTF]: {
    name: "R-T-F",
    description: "Role, Task, Format. A classic structure for clear instructions.",
    fields: [
      { key: "role", label: "Role", placeholder: "e.g., Expert Copywriter" },
      { key: "task", label: "Task", placeholder: "e.g., Write a blog post" },
      { key: "format", label: "Format", placeholder: "e.g., Markdown with bullet points" }
    ]
  },
  [PromptFramework.TAG]: {
    name: "T-A-G",
    description: "Task, Action, Goal. Focuses on the objective.",
    fields: [
      { key: "task", label: "Task", placeholder: "e.g. Analyze this dataset" },
      { key: "action", label: "Action", placeholder: "e.g. Summarize key trends" },
      { key: "goal", label: "Goal", placeholder: "e.g. To inform the Q3 strategy" }
    ]
  },
  [PromptFramework.BAB]: {
      name: "B-A-B",
      description: "Before, After, Bridge. Great for storytelling and marketing copy.",
      fields: [
        { key: "before", label: "Before", placeholder: "Describe the current problem state" },
        { key: "after", label: "After", placeholder: "Describe the ideal future state" },
        { key: "bridge", label: "Bridge", placeholder: "How the solution connects them" }
      ]
  },
  [PromptFramework.CARE]: {
      name: "C-A-R-E",
      description: "Context, Action, Result, Example. Useful for professional content.",
      fields: [
          { key: "context", label: "Context", placeholder: "The situation or background" },
          { key: "action", label: "Action", placeholder: "What needs to be done" },
          { key: "result", label: "Result", placeholder: "The desired outcome" },
          { key: "example", label: "Example", placeholder: "A reference or sample" }
      ]
  },
  [PromptFramework.RISE]: {
      name: "R-I-S-E",
      description: "Role, Input, Steps, Expectation. Highly detailed instructions.",
      fields: [
          { key: "role", label: "Role", placeholder: "The persona" },
          { key: "input", label: "Input", placeholder: "Data or context provided" },
          { key: "steps", label: "Steps", placeholder: "Specific instructions to follow" },
          { key: "expectation", label: "Expectation", placeholder: "Desired output format" }
      ]
  },
  [PromptFramework.SCOPE]: {
      name: "S.C.O.P.E.",
      description: "Situation, Complication, Objective, Proposal, Evaluation.",
      fields: []
  },
  [PromptFramework.PACEF]: {
      name: "P.A.C.E.F.",
      description: "Purpose, Audience, Context, Examples, Format.",
      fields: []
  },
  [PromptFramework.CURATE]: {
      name: "C.U.R.A.T.E.",
      description: "Context, User, Request, Action, Tone, Example.",
      fields: []
  },
  [PromptFramework.PARLA]: {
      name: "P.A.R.L.A.",
      description: "Problem, Action, Result, Learning, Application.",
      fields: []
  },
  [PromptFramework.FACTS]: {
      name: "F.A.C.T.S.",
      description: "Format, Audience, Context, Tone, Scope.",
      fields: []
  },
  [PromptFramework.BRIDGE]: {
      name: "B.R.I.D.G.E.",
      description: "Background, Role, Intent, Details, Goal, End-result.",
      fields: []
  },
  [PromptFramework.CREATE]: {
      name: "C.R.E.A.T.E.",
      description: "Character, Request, Examples, Adjustments, Type, Extras.",
      fields: []
  },
  [PromptFramework.CRAFT]: {
      name: "C.R.A.F.T.",
      description: "Context, Role, Audience, Format, Tone.",
      fields: []
  }
};

const lyraPrompt: Prompt[] = [
    { 
        id: 'lyra-prompt-optimizer', 
        historyId: 'lyra-prompt-optimizer',
        version: 1,
        isLatest: true,
        title: 'Lyra, the Prompt Optimizer', 
        promptText: lyraPromptText, 
        description: 'A master-level AI prompt optimization specialist that transforms any user input into precision-crafted prompts using the 4-D methodology.', 
        category: 'Frameworks', 
        createdAt: Date.now() - 1500,
        framework: PromptFramework.RTF
    }
];

const awesomePrompts: Prompt[] = ([
    { title: 'Linux Terminal', promptText: 'Act as a: Linux terminal.\n\nTask: I will type commands and you will reply with what the terminal should show. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}.\n\nFormat: Only reply with the terminal output inside one unique code block.', description: 'Acts as a Linux terminal, showing command outputs.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: 'English Translator and Improver', promptText: 'Act as a: English translator, spelling corrector, and improver.\n\nTask: I will speak to you in any language. You will detect the language, translate it, and answer in the corrected and improved version of my text, in English. Replace my simplified A0-level words and sentences with more beautiful and elegant, upper-level English words and sentences. Keep the meaning the same, but make them more literary.\n\nFormat: Reply only with the correction and improvements, without explanations. My first sentence is "istanbulu cok seviyom ama cok kalabalik".', description: 'Translates and improves text to a higher level of English.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: '`position` Interviewer', promptText: 'Act as a: Interviewer for the `position` position.\n\nTask: I will be the candidate. You will ask me the interview questions for the specified position. Ask me the questions one by one and wait for my answers.\n\nFormat: Only reply as the interviewer. Do not write the entire conversation at once. Do not write explanations. My first sentence is "Hi".', description: 'Simulates a job interview for a specified position.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: 'JavaScript Console', promptText: 'Act as a: JavaScript console.\n\nTask: I will type commands and you will reply with what the JavaScript console should show. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}.\n\nFormat: Only reply with the terminal output inside one unique code block.', description: 'Acts as a JavaScript console, executing commands and showing output.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: 'Excel Sheet', promptText: 'Act as a: Text-based Excel sheet.\n\nTask: You will function as a 10-row Excel sheet with columns A to L. I will provide data and formulas for the cells. You will execute the formulas and update the table accordingly.\n\nFormat: Reply only with the text-based Excel table. Do not provide explanations. Start by replying with an empty sheet.', description: 'Acts as a text-based Excel sheet, processing formulas and data.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: 'English Pronunciation Helper', promptText: 'Act as a: English pronunciation helper for Turkish-speaking people.\n\nTask: I will write sentences in English, and you will provide their pronunciation using Turkish Latin letters for phonetics.\n\nFormat: Reply only with the pronunciation, and nothing else. Do not write explanations. My first sentence is "how the weather is in istanbul?".', description: 'Helps Turkish speakers with English pronunciation.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: 'Spoken English Teacher', promptText: 'Act as a: Spoken English teacher and improver.\n\nTask: I will speak to you in English. You will reply to me in English to practice my spoken English. You must strictly correct my grammar mistakes, typos, and factual errors, and ask me a question in your reply.\n\nFormat: Keep your reply neat, limiting it to 100 words. Let\'s start practicing, you can ask me a question first.', description: 'Acts as a spoken English teacher, correcting mistakes and asking questions.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: 'Travel Guide', promptText: 'Act as a: Travel guide.\n\nTask: I will provide my location and you will suggest a place to visit near me. If I provide a type of place, suggest similar places nearby as well.\n\nFormat: Provide a list of suggested places with brief descriptions. My first request is "I am in Istanbul/Beyoğlu and I want to visit only museums."', description: 'Acts as a travel guide, suggesting places to visit.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: 'Storyteller', promptText: 'Act as a: Storyteller.\n\nTask: Come up with an entertaining story that is engaging, imaginative, and captivating for the target audience. Choose a theme or topic based on the audience (e.g., animals for children, history for adults).\n\nFormat: A well-structured story. My first request is "I need an interesting story on perseverance."', description: 'Tells engaging stories tailored to a specific audience.', category: 'Role-Playing', framework: PromptFramework.RTF },
    { title: 'Novelist', promptText: 'Act as a: Novelist.\n\nTask: You will come up with a creative and captivating story in a chosen genre (e.g., fantasy, romance, historical fiction). The story must have an outstanding plotline, engaging characters, and unexpected climaxes.\n\nFormat: A detailed story concept. My first request is "I need to write a fantasy novel, set in a world of magical creatures and ancient secrets."', description: 'Helps create a novel with an engaging plot and characters.', category: 'Role-Playing', framework: PromptFramework.RTF },
] as const).map((p, i) => {
    const id = `awesome-prompt-${i}`;
    return ({
      ...p, 
      id, 
      historyId: id, 
      version: 1, 
      isLatest: true, 
      createdAt: Date.now() - (25000 + i*100)
    } as Prompt);
});

const handbookPrompts: Prompt[] = [
    // --- Business Prompts ---
    { id: 'handbook-business-1a', historyId: 'handbook-business-1a', version: 1, isLatest: true, title: 'SWOT Analysis', promptText: 'Act as a: Business Strategist.\n\nTask: Conduct a SWOT analysis for a [Company/Product] in the [Industry].\n\nFormat: Present the analysis in four distinct sections: Strengths, Weaknesses, Opportunities, and Threats.', description: 'Performs a SWOT analysis to identify key strategic factors.', category: 'Business', createdAt: Date.now() - 30000, framework: PromptFramework.RTF },
    { id: 'handbook-business-2a', historyId: 'handbook-business-2a', version: 1, isLatest: true, title: 'Elevator Pitch Creation', promptText: 'Act as a: Marketing Expert.\n\nTask: Craft a compelling 30-second elevator pitch for a [Product/Service] targeting [Audience].\n\nFormat: A single, persuasive paragraph.', description: 'Creates a concise and persuasive elevator pitch.', category: 'Business', createdAt: Date.now() - 30100, framework: PromptFramework.RTF },
    // --- Career Prompts ---
    { id: 'handbook-career-1a', historyId: 'handbook-career-1a', version: 1, isLatest: true, title: 'Resume Bullet Points', promptText: 'Act as a: Professional Resume Writer.\n\nTask: Rewrite the following job responsibility into three impactful resume bullet points using the STAR method.\n\nFormat: A bulleted list of three points.\n\nResponsibility: [Responsibility]', description: 'Transforms job duties into strong, achievement-oriented resume points.', category: 'Career', createdAt: Date.now() - 31000, framework: PromptFramework.RTF },
    { id: 'handbook-career-2a', historyId: 'handbook-career-2a', version: 1, isLatest: true, title: 'LinkedIn Summary', promptText: 'Act as a: Professional branding expert.\n\nTask: Write a professional LinkedIn summary for a [Job Title] with [Number] years of experience.\n\nFormat: A compelling summary that highlights skills in [Skill 1], [Skill 2], and [Skill 3].', description: 'Generates a compelling professional summary for a LinkedIn profile.', category: 'Career', createdAt: Date.now() - 31100, framework: PromptFramework.RTF },
    // --- Data Analysis Prompts ---
    { id: 'handbook-data-1a', historyId: 'handbook-data-1a', version: 1, isLatest: true, title: 'Explain Data Findings', promptText: 'Act as a: Data Analyst communicating with stakeholders.\n\nTask: Explain the key insights from the following data findings.\n\nFormat: A simple explanation suitable for a non-technical audience.\n\nData Findings: [Data Findings]', description: 'Translates complex data findings into understandable insights.', category: 'Data Analysis', createdAt: Date.now() - 32000, framework: PromptFramework.RTF },
    // --- Image Generation Prompts ---
    { id: 'handbook-image-1a', historyId: 'handbook-image-1a', version: 1, isLatest: true, title: 'Detailed Image Prompt', promptText: 'Act as a: Prompt engineer for an image generation AI.\n\nTask: Create a detailed image generation prompt for a [Subject].\n\nFormat: Include details about the style (e.g., photorealistic, impressionistic), lighting, composition, and mood.', description: 'Builds a rich, detailed prompt for AI image generators.', category: 'Image Generation', createdAt: Date.now() - 33000, framework: PromptFramework.RTF },
    // --- Learning Prompts ---
    { id: 'handbook-learning-1a', historyId: 'handbook-learning-1a', version: 1, isLatest: true, title: 'Explain Like I\'m 5', promptText: 'Act as a: Teacher skilled in simplifying complex topics.\n\nTask: Explain the concept of [Complex Concept].\n\nFormat: An explanation simple enough for a five-year-old to understand.', description: 'Breaks down a difficult concept into a very simple explanation.', category: 'Learning', createdAt: Date.now() - 34000, framework: PromptFramework.RTF },
    // --- Marketing Prompts ---
    { id: 'handbook-marketing-1a', historyId: 'handbook-marketing-1a', version: 1, isLatest: true, title: 'AIDA Copywriting', promptText: 'Act as a: Expert Copywriter.\n\nTask: Write persuasive marketing copy for a [Product] using the AIDA framework.\n\nFormat: Structure the output into four distinct sections: Attention, Interest, Desire, and Action.', description: 'Crafts persuasive marketing copy using the classic AIDA model.', category: 'Marketing', createdAt: Date.now() - 35000, framework: PromptFramework.RTF },
    { id: 'handbook-marketing-2a', historyId: 'handbook-marketing-2a', version: 1, isLatest: true, title: 'Value Proposition', promptText: 'Act as a: Marketing Strategist.\n\nTask: Clearly articulate the value proposition for a [Product/Service].\n\nFormat: A concise statement targeting a [Specific Audience].', description: 'Defines the unique value and benefit of a product or service.', category: 'Marketing', createdAt: Date.now() - 35100, framework: PromptFramework.RTF },
    // --- Personal Development Prompts ---
    { id: 'handbook-pd-1a', historyId: 'handbook-pd-1a', version: 1, isLatest: true, title: 'Daily Journal Prompts', promptText: 'Act as a: Mindfulness coach.\n\nTask: Generate 5 reflective journal prompts.\n\nFormat: A numbered list of questions aimed at daily self-improvement.', description: 'Creates thoughtful prompts for daily journaling and reflection.', category: 'Personal Development', createdAt: Date.now() - 36000, framework: PromptFramework.RTF },
    // --- Productivity Prompts ---
    { id: 'handbook-productivity-1a', historyId: 'handbook-productivity-1a', version: 1, isLatest: true, title: 'Meeting Agenda', promptText: 'Act as an: Executive Assistant.\n\nTask: Create a meeting agenda for a 1-hour meeting about [Topic].\n\nFormat: Include objectives, talking points with time allocation, and required attendees.', description: 'Generates a structured agenda for an effective meeting.', category: 'Productivity', createdAt: Date.now() - 37000, framework: PromptFramework.RTF },
    // --- Research Prompts ---
    { id: 'handbook-research-1a', historyId: 'handbook-research-1a', version: 1, isLatest: true, title: 'Summarize Research Paper', promptText: 'Act as a: Research Assistant.\n\nTask: Summarize the following research paper.\n\nFormat: Focus on the methodology, key findings, and implications.\n\nPaper Text: [Paper Text]', description: 'Condenses a research paper into its most critical components.', category: 'Research', createdAt: Date.now() - 38000, framework: PromptFramework.RTF },
    // --- Sales Prompts ---
    { id: 'handbook-sales-1a', historyId: 'handbook-sales-1a', version: 1, isLatest: true, title: 'Cold Email Template', promptText: 'Act as a: Sales professional.\n\nTask: Write a cold email template to a potential client in the [Industry] for a [Service]. The goal is to book a 15-minute discovery call.\n\nFormat: A professional and effective email.', description: 'Creates a professional and effective cold email template to generate leads.', category: 'Sales', createdAt: Date.now() - 39000, framework: PromptFramework.RTF },
    // --- Self Help Prompts ---
    { id: 'handbook-selfhelp-1a', historyId: 'handbook-selfhelp-1a', version: 1, isLatest: true, title: 'Reframe Negative Thoughts', promptText: 'Act as a: Cognitive Behavioral Therapist.\n\nTask: Reframe the following negative thought into a more positive or constructive perspective.\n\nFormat: Provide one or more alternative, positive re-framings.\n\nNegative Thought: "[Negative Thought]"', description: 'Assists in reframing negative thoughts using cognitive-behavioral techniques.', category: 'Self Help', createdAt: Date.now() - 39500, framework: PromptFramework.RTF },
    // --- Advertising Prompts ---
    { id: 'handbook-adv-1a', historyId: 'handbook-adv-1a', version: 1, isLatest: true, title: 'Key Benefits Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Describe the key benefits and features of this [Product/Service Name] to captivate an audience on [Platform].\n\nFormat: Compelling ad copy that includes a strong call-to-action.', description: 'Crafts compelling ad copy by describing product benefits and features to captivate an audience on a specific platform, including a strong call-to-action.', category: 'Advertising', createdAt: Date.now() - 40000, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1b', historyId: 'handbook-adv-1b', version: 1, isLatest: true, title: 'Targeted Ad Copy for Pain Points', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Write a compelling [Platform] ad copy that speaks directly to the pain points and desires of our [Target Audience], positioning [Product/Service Name] as the ultimate solution.\n\nFormat: Persuasive language and a description of compelling visuals.', description: 'Writes persuasive ad copy for a specific platform by directly addressing the target audience\'s pain points and desires.', category: 'Advertising', createdAt: Date.now() - 40100, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1c', historyId: 'handbook-adv-1c', version: 1, isLatest: true, title: 'Unique Selling Proposition Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Craft an engaging [Platform] ad copy that highlights the unique selling proposition of [Product/Service Name], distinguishing it from competitors.\n\nFormat: Ad copy that includes a memorable tagline or slogan to reinforce the brand message.', description: 'Creates engaging ad copy focused on a product\'s unique selling proposition to differentiate it from competitors.', category: 'Advertising', createdAt: Date.now() - 40200, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1d', historyId: 'handbook-adv-1d', version: 1, isLatest: true, title: 'Testimonial/Case Study Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Create an authentic [Platform] ad copy featuring a customer testimonial or case study that demonstrates the real-life benefits and success stories of using [Product/Service Name].\n\nFormat: A relatable and genuine ad copy that resonates with potential customers.', description: 'Generates authentic ad copy from customer testimonials to demonstrate real-life benefits and build trust.', category: 'Advertising', createdAt: Date.now() - 40300, framework: PromptFramework.RTF },
    
    // --- Content Creation Prompts ---
    { id: 'handbook-content-1a', historyId: 'handbook-content-1a', version: 1, isLatest: true, title: 'Effective Writing Techniques', promptText: 'Act as a: Writing Coach.\n\nTask: Share tips and strategies for crafting compelling written content.\n\nFormat: A guide covering writing styles, sentence structure, and tone.', description: 'Get tips and strategies for compelling writing, covering styles, sentence structure, and tone.', category: 'Content Creation', createdAt: Date.now() - 41000, framework: PromptFramework.RTF },
    { id: 'handbook-content-1b', historyId: 'handbook-content-1b', version: 1, isLatest: true, title: 'Editing for Clarity and Polish', promptText: 'Act as a: Professional Editor.\n\nTask: Provide guidance on editing techniques to enhance clarity, readability, and professionalism in written content.\n\nFormat: A list of actionable editing tips.', description: 'Learn editing techniques to improve clarity, readability, and professionalism in your writing.', category: 'Content Creation', createdAt: Date.now() - 41100, framework: PromptFramework.RTF },
    { id: 'handbook-content-1e', historyId: 'handbook-content-1e', version: 1, isLatest: true, title: 'Storytelling in Writing', promptText: 'Act as a: Storytelling Expert.\n\nTask: Share insights on incorporating storytelling elements into written content.\n\nFormat: Explain how to use storytelling to engage readers and convey a clear message.', description: 'Learn how to use storytelling elements to make your written content more engaging and clear.', category: 'Content Creation', createdAt: Date.now() - 41200, framework: PromptFramework.RTF },
    
    // --- Copywriting Prompts ---
    { id: 'handbook-copywriting-1a', historyId: 'handbook-copywriting-1a', version: 1, isLatest: true, title: 'Attention-Grabbing Headlines', promptText: 'Act as a: Master Copywriter.\n\nTask: Share your best tips and tricks for creating headlines that grab readers\' attention, no matter the topic or industry.\n\nFormat: A list of strategies emphasizing powerful language, varying lengths, and considering the target audience.', description: 'Get tips and tricks for writing attention-grabbing headlines for any topic or industry.', category: 'Copywriting', createdAt: Date.now() - 42000, framework: PromptFramework.RTF },
    { id: 'handbook-copywriting-1c', historyId: 'handbook-copywriting-1c', version: 1, isLatest: true, title: 'Headlines with Numbers', promptText: 'Act as a: Data-driven Copywriter.\n\nTask: Explain why headlines that include numbers tend to perform better and share top strategies for incorporating them.\n\nFormat: An explanation followed by strategies like using odd numbers, lists, and specific statistics.', description: 'Learn how and why to use numbers in headlines to improve performance, with specific strategies.', category: 'Copywriting', createdAt: Date.now() - 42100, framework: PromptFramework.RTF },
    
    // --- Creative Writing Prompts ---
    { id: 'handbook-creative-1a', historyId: 'handbook-creative-1a', version: 1, isLatest: true, title: 'Develop Compelling Characters', promptText: 'Act as a: Creative Writing Professor.\n\nTask: Offer guidance on developing compelling characters in fiction writing.\n\nFormat: Discuss key considerations like backstory, motivation, and character flaws, and explain how to use character development to drive the plot.', description: 'Get guidance on creating compelling fictional characters with rich backstories, motivations, and flaws.', category: 'Creative Writing', createdAt: Date.now() - 43000, framework: PromptFramework.RTF },
    { id: 'handbook-creative-1b', historyId: 'handbook-creative-1b', version: 1, isLatest: true, title: 'Structure a Compelling Plot', promptText: 'Act as a: Creative Writing Professor.\n\nTask: Discuss the importance of plot structure in fiction writing and offer guidance on creating a compelling story arc.\n\nFormat: An explanation covering key considerations like the inciting incident, rising action, climax, and resolution.', description: 'Learn to structure a compelling plot for your story, from inciting incident to resolution.', category: 'Creative Writing', createdAt: Date.now() - 43100, framework: PromptFramework.RTF },

    // --- E-Commerce Prompts ---
    { id: 'handbook-ecommerce-1a', historyId: 'handbook-ecommerce-1a', version: 1, isLatest: true, title: 'E-Commerce Platform Comparison', promptText: 'Act as a: E-commerce Consultant.\n\nTask: Provide a comparison of popular e-commerce platforms, such as Shopify, WooCommerce, and Magento.\n\nFormat: A comparison table or list including their features, pricing, and target audience.', description: 'Get a detailed comparison of popular e-commerce platforms like Shopify, WooCommerce, and Magento.', category: 'E-Commerce', createdAt: Date.now() - 44000, framework: PromptFramework.RTF },
    { id: 'handbook-ecommerce-2a', historyId: 'handbook-ecommerce-2a', version: 1, isLatest: true, title: 'Design Principles for Online Stores', promptText: 'Act as a: UX/UI Designer specializing in e-commerce.\n\nTask: Discuss fundamental design principles for creating an effective and visually appealing online store.\n\nFormat: An explanation covering topics like color theory, typography, and layout.', description: 'Learn about the fundamental design principles for creating a beautiful and effective online store.', category: 'E-Commerce', createdAt: Date.now() - 44100, framework: PromptFramework.RTF },

    // --- Editing & Proofreading Prompts ---
    { id: 'handbook-editing-1a', historyId: 'handbook-editing-1a', version: 1, isLatest: true, title: 'Identify Common Grammar Errors', promptText: 'Act as a: Proofreader.\n\nTask: Discuss common grammar errors in written content.\n\nFormat: A list of common errors with guidance on how to identify and correct them.', description: 'Learn to identify and correct common grammar errors in your writing.', category: 'Editing & Proofreading', createdAt: Date.now() - 45000, framework: PromptFramework.RTF },
    { id: 'handbook-editing-2a', historyId: 'handbook-editing-2a', version: 1, isLatest: true, title: 'Spelling Tips and Tricks', promptText: 'Act as a: Writing Tutor.\n\nTask: Share helpful tips and strategies for improving spelling accuracy in writing.\n\nFormat: A list of actionable tips and tricks.', description: 'Get helpful tips and strategies to improve your spelling accuracy.', category: 'Editing & Proofreading', createdAt: Date.now() - 45100, framework: PromptFramework.RTF },
    
    // --- Goal Setting Prompts ---
    { id: 'handbook-goalsetting-1a', historyId: 'handbook-goalsetting-1a', version: 1, isLatest: true, title: 'SMART Goals for Personal Development', promptText: 'Act as a: Personal Development Coach.\n\nTask: Discuss the benefits of setting SMART goals and provide examples.\n\nFormat: An explanation of SMART goals followed by specific, measurable, achievable, relevant, and time-bound goal examples in areas such as fitness, education, or career advancement.', description: 'Learn to set SMART goals for personal development with examples for fitness, education, and career.', category: 'Goal Setting', createdAt: Date.now() - 46000, framework: PromptFramework.RTF },
    { id: 'handbook-goalsetting-2a', historyId: 'handbook-goalsetting-2a', version: 1, isLatest: true, title: 'Long-term Career Goal Planning', promptText: 'Act as a: Career Counselor.\n\nTask: Discuss the importance of setting long-term career goals and provide tips for creating a plan to achieve them.\n\nFormat: Tips that include acquiring necessary skills and networking.', description: 'Get tips on setting and planning long-term career goals, including skill acquisition and networking.', category: 'Goal Setting', createdAt: Date.now() - 46100, framework: PromptFramework.RTF },

    // --- Graphic Design Prompts ---
    { id: 'handbook-graphicdesign-1a', historyId: 'handbook-graphicdesign-1a', version: 1, isLatest: true, title: 'Achieving Balance in Design', promptText: 'Act as a: Graphic Design Instructor.\n\nTask: Explain the importance of balance in graphic design.\n\nFormat: An explanation with examples of how balance can be achieved through symmetrical or asymmetrical compositions.', description: 'Understand the importance of balance in graphic design with examples of symmetrical and asymmetrical compositions.', category: 'Graphic Design', createdAt: Date.now() - 47000, framework: PromptFramework.RTF },
    { id: 'handbook-graphicdesign-2a', historyId: 'handbook-graphicdesign-2a', version: 1, isLatest: true, title: 'Font Selection in Typography', promptText: 'Act as a: Typography Expert.\n\nTask: Discuss the importance of font selection in design.\n\nFormat: Recommend techniques for choosing appropriate fonts for different purposes and contexts.', description: 'Learn how to select the right fonts for different design purposes and contexts.', category: 'Graphic Design', createdAt: Date.now() - 47100, framework: PromptFramework.RTF },
    
    // --- Personal Finance Prompts ---
    { id: 'handbook-finance-1a', historyId: 'handbook-finance-1a', version: 1, isLatest: true, title: 'Debt Reduction Strategies', promptText: 'Act as a: Financial Advisor.\n\nTask: Analyze different debt reduction strategies and explain their effectiveness in achieving financial stability.\n\nFormat: An analysis with tips for choosing the best debt reduction method for individual circumstances.', description: 'Compare different debt reduction strategies and get tips on choosing the best one for you.', category: 'Personal Finance', createdAt: Date.now() - 48000, framework: PromptFramework.RTF },
    { id: 'handbook-finance-1b', historyId: 'handbook-finance-1b', version: 1, isLatest: true, title: 'Build an Emergency Fund', promptText: 'Act as a: Financial Planner.\n\nTask: Discuss the importance of having an emergency fund and provide strategies for building and maintaining one.\n\nFormat: An analysis of different options for saving and investing money in an emergency fund.', description: 'Learn why an emergency fund is important and get strategies for building and maintaining one.', category: 'Personal Finance', createdAt: Date.now() - 48100, framework: PromptFramework.RTF },
    
    // --- Persuasion & Influence Prompts ---
    { id: 'handbook-persuasion-1a', historyId: 'handbook-persuasion-1a', version: 1, isLatest: true, title: 'Active Listening for Rapport', promptText: 'Act as a: Communications Coach.\n\nTask: Discuss the importance of active listening in building rapport with others.\n\nFormat: Provide examples of active listening techniques and explain how they can help establish trust and understanding.', description: 'Learn active listening techniques to build rapport, trust, and understanding with others.', category: 'Persuasion & Influence', createdAt: Date.now() - 49000, framework: PromptFramework.RTF },
    { id: 'handbook-persuasion-2a', historyId: 'handbook-persuasion-2a', version: 1, isLatest: true, title: 'Persuasive Communication Techniques', promptText: 'Act as a: Persuasion Expert.\n\nTask: Discuss different persuasive techniques, such as using emotional appeals or logic.\n\nFormat: Explain how to use these techniques effectively to communicate your ideas.', description: 'Explore different persuasive techniques, including emotional appeals and logic, to communicate effectively.', category: 'Persuasion & Influence', createdAt: Date.now() - 49100, framework: PromptFramework.RTF },

    // --- Social Media Prompts ---
    { id: 'handbook-social-1a', historyId: 'handbook-social-1a', version: 1, isLatest: true, title: 'Set Clear Social Media Goals', promptText: 'Act as a: Social Media Strategist.\n\nTask: Discuss the importance of setting clear social media goals and objectives for effective content creation and curation.\n\nFormat: Provide examples of how different goals can influence the type of content created and curated.', description: 'Learn to set clear social media goals and see how they influence content creation with examples.', category: 'Social Media', createdAt: Date.now() - 50000, framework: PromptFramework.RTF },
    { id: 'handbook-social-1b', historyId: 'handbook-social-1b', version: 1, isLatest: true, title: 'Target Audience Analysis', promptText: 'Act as a: Social Media Manager.\n\nTask: Analyze a target audience to identify their preferences, interests, and pain points to create and curate resonant social media content.\n\nFormat: Provide tips on conducting audience research and adapting content to different social media platforms.', description: 'Analyze your target audience to create social media content that resonates, with tips on research and adaptation.', category: 'Social Media', createdAt: Date.now() - 50100, framework: PromptFramework.RTF },
];

const daveBirssPrompts: Prompt[] = [
    // Summarise
    { id: 'db-summarise-1', historyId: 'db-summarise-1', version: 1, isLatest: true, title: 'Summarise 1,000 Words', promptText: 'Act as a: Highly experienced writer who writes concise and readable text without stop words, filler words, or jargon.\n\nTask: Summarise the following text, highlighting the most important concepts.\n\nFormat: 1. A short paragraph of 100 words. 2. A bullet-point list of the most important points. 3. A one-sentence summary.\n\nText: "[TEXT]"', description: 'Concisely summarises a long text into a paragraph, bullet points, and a one-sentence summary.', category: 'Productivity', createdAt: Date.now() - 51000, framework: PromptFramework.RTF },
    { id: 'db-summarise-2', historyId: 'db-summarise-2', version: 1, isLatest: true, title: 'Summarise a Well-Known Book', promptText: 'Act as a: Highly experienced writer who writes concise and readable text without stop words, filler words or jargon.\n\nTask: Give me a summary of the book "[BOOK TITLE]" by [AUTHOR NAME], highlighting the most important concepts.\n\nFormat: A list of no more than 5 bullet points, followed by a one-sentence summary.', description: 'Summarises a well-known book into five key bullet points and a concluding sentence.', category: 'Learning', createdAt: Date.now() - 51100, framework: PromptFramework.RTF },
    { id: 'db-summarise-3', historyId: 'db-summarise-3', version: 1, isLatest: true, title: 'Summarise Current Academic Thinking', promptText: 'Act as a: Highly experienced academic writer who writes concise and readable text without stop words, filler words or jargon.\n\nTask: Give me a summary of current academic thinking around the field of [TOPIC], highlighting the most important concepts.\n\nFormat: A list of bullet points, followed by a one-sentence summary.', description: 'Provides a summary of current academic thinking on a specified topic, delivered as bullet points.', category: 'Research', createdAt: Date.now() - 51200, framework: PromptFramework.RTF },
    // Perspectives
    { id: 'db-perspectives-1', historyId: 'db-perspectives-1', version: 1, isLatest: true, title: 'Devil’s Advocate', promptText: 'Act as: A Devil’s Advocate.\n\nTask: Challenge the following idea or argument. Find holes in the logic, potential downsides, and reasons why it might fail.\n\nFormat: A bulleted list of counter-arguments.', description: 'Challenges an idea by highlighting potential flaws and counter-arguments.', category: 'Ideation', createdAt: Date.now() - 51300, framework: PromptFramework.RTF },
];

export const PUBLIC_PROMPTS: Prompt[] = [
  ...lyraPrompt,
  ...awesomePrompts,
  ...handbookPrompts,
  ...daveBirssPrompts
];

export const PUBLIC_AI_TOOLS: AITool[] = [
  {
    id: 'tool-chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s conversational AI model.',
    link: 'https://chat.openai.com',
    category: 'Chatbot',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    createdAt: Date.now()
  },
  {
    id: 'tool-midjourney',
    name: 'Midjourney',
    description: 'Generates images from text prompts.',
    link: 'https://www.midjourney.com',
    category: 'Image Generation',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png',
    createdAt: Date.now()
  },
  {
    id: 'tool-gemini',
    name: 'Gemini',
    description: 'Google\'s most capable AI model.',
    link: 'https://gemini.google.com',
    category: 'Chatbot',
    iconUrl: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    createdAt: Date.now()
  },
   {
    id: 'tool-notion-ai',
    name: 'Notion AI',
    description: 'Integrated AI writing assistant in Notion.',
    link: 'https://www.notion.so/product/ai',
    category: 'Writing',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    createdAt: Date.now()
  },
  {
    id: 'tool-runway',
    name: 'Runway Gen-2',
    description: 'AI video generation and editing.',
    link: 'https://runwayml.com/',
    category: 'Video Generation',
    iconUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_k1l0z0z0z0z0z0z0z0z0z0z0z0z0z0z0z0=s900-c-k-c0x00ffffff-no-rj',
    createdAt: Date.now()
  },
  {
    id: 'tool-github-copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer.',
    link: 'https://github.com/features/copilot',
    category: 'Code Assistant',
    iconUrl: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    createdAt: Date.now()
  },
  {
    id: 'tool-jasper',
    name: 'Jasper',
    description: 'AI copywriter for marketing.',
    link: 'https://www.jasper.ai',
    category: 'Marketing',
    iconUrl: 'https://assets-global.website-files.com/60e5f2de011b86acebc30239/60e5f2de011b86acebc3023e_Jasper%20Logo.svg',
    createdAt: Date.now()
  },
  {
    id: 'tool-canva',
    name: 'Canva Magic Studio',
    description: 'AI design tools suite.',
    link: 'https://www.canva.com/magic-home/',
    category: 'Design',
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
    createdAt: Date.now()
  }
];

export const PUBLIC_TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'google-prompting-essentials',
    title: 'Google Prompting Essentials',
    description: 'Master the basics of effective prompting with Google\'s official guide.',
    category: 'Fundamentals',
    createdAt: Date.now(),
    content: [
      {
        id: 'gpe-1',
        title: 'Be Specific',
        details: 'Don\'t leave room for interpretation. Specify the format, length, and style.',
        example: 'Instead of "Write a poem", try "Write a haiku about a robot learning to love".'
      },
      {
        id: 'gpe-2',
        title: 'Provide Context',
        details: 'Give the AI the "who, what, where, when, why" to ground its response.',
        example: 'Act as a marketing manager for a vegan bakery in Austin, Texas.'
      }
    ]
  },
  {
    id: 'vibe-coding-intro',
    title: 'Introduction to Vibe Coding',
    description: 'Learn how to use natural language to build software without writing code.',
    category: 'Advanced Techniques',
    createdAt: Date.now(),
    content: [
      {
        id: 'vc-1',
        title: 'The Vibe Check',
        details: 'Start by describing the "vibe" or emotional intent of the software.',
        example: 'I want a retro-futuristic dashboard that feels like a sci-fi movie interface.'
      }
    ]
  }
];
