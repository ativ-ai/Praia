

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
  "Business & Sales", "Content & Creative", "Tech & Data", "Growth & Education", "Productivity & Misc"
];

export const TRAINING_CATEGORIES: TrainingCategory[] = [
  "Fundamentals", "Advanced", "Frameworks", "Masterclass", "Code & Tech"
];

export const AI_TOOL_CATEGORIES: AIToolCategory[] = [
  "Business & Productivity", "Media & Creative", "Writing & Marketing", "Tech & Developer", "Growth & Lifestyle", "Other Utilities"
];

export const PROMPT_CATEGORY_COLORS: Record<string, string> = {
  "Business & Sales": "bg-emerald-100 text-emerald-800",
  "Content & Creative": "bg-indigo-100 text-indigo-800",
  "Tech & Data": "bg-slate-800 text-slate-100",
  "Growth & Education": "bg-amber-100 text-amber-800",
  "Productivity & Misc": "bg-sky-100 text-sky-800"
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
  "Business & Productivity": "bg-sky-100 text-sky-800",
  "Media & Creative": "bg-fuchsia-100 text-fuchsia-800",
  "Writing & Marketing": "bg-amber-100 text-amber-800",
  "Tech & Developer": "bg-slate-800 text-slate-100",
  "Growth & Lifestyle": "bg-emerald-100 text-emerald-800",
  "Other Utilities": "bg-slate-100 text-slate-800"
};

export const PROMPT_CATEGORY_DISPLAY: Record<string, string> = {
  "Business & Sales": "Business & Sales",
  "Content & Creative": "Content & Creative",
  "Tech & Data": "Tech & Data",
  "Growth & Education": "Growth & Education",
  "Productivity & Misc": "Productivity & Misc"
};

export const PROMPT_CATEGORY_ICONS: Record<string, string> = {
  "Business & Sales": "business_center",
  "Content & Creative": "palette",
  "Tech & Data": "terminal",
  "Growth & Education": "auto_stories",
  "Productivity & Misc": "more_horiz"
};

export const TRAINING_CATEGORY_DISPLAY: Record<string, string> = {
  "Fundamentals": "Fundamentals",
  "Advanced": "Advanced",
  "Frameworks": "Frameworks",
  "Masterclass": "Masterclass",
  "Code & Tech": "Code & Tech"
};

export const TRAINING_CATEGORY_COLORS: Record<string, string> = {
  "Fundamentals": "bg-blue-100 text-blue-800",
  "Advanced": "bg-purple-100 text-purple-800",
  "Frameworks": "bg-orange-100 text-orange-800",
  "Masterclass": "bg-emerald-100 text-emerald-800",
  "Code & Tech": "bg-slate-800 text-slate-100"
};

export const TRAINING_CATEGORY_ICONS: Record<string, string> = {
  "Fundamentals": "menu_book",
  "Advanced": "bolt",
  "Frameworks": "extension",
  "Masterclass": "diamond",
  "Code & Tech": "terminal"
};

export const AI_TOOL_CATEGORY_DISPLAY: Record<string, string> = {
  "Business & Productivity": "Business & Productivity",
  "Media & Creative": "Media & Creative",
  "Writing & Marketing": "Writing & Marketing",
  "Tech & Developer": "Tech & Developer",
  "Growth & Lifestyle": "Growth & Lifestyle",
  "Other Utilities": "Other Utilities"
};

export const AI_TOOL_CATEGORY_ICONS: Record<string, string> = {
  "Business & Productivity": "business_center",
  "Media & Creative": "palette",
  "Writing & Marketing": "edit_note",
  "Tech & Developer": "terminal",
  "Growth & Lifestyle": "auto_stories",
  "Other Utilities": "more_horiz"
};

export const PROMPT_ICONS: Record<string, string> = {
  "lyra-prompt-optimizer": "auto_awesome",
  "awesome-prompt-0": "terminal",
  "awesome-prompt-1": "language",
  "awesome-prompt-2": "work",
  "awesome-prompt-3": "code",
  "awesome-prompt-4": "analytics",
  "awesome-prompt-5": "chat",
  "awesome-prompt-6": "school",
  "awesome-prompt-7": "map",
  "awesome-prompt-8": "book",
  "awesome-prompt-9": "draw",
  "sys-chatgpt": "smart_toy",
  "sys-claude": "model_training",
  "sys-dalle": "brush",
};

export const PROMPT_FRAMEWORKS: Record<PromptFramework, PromptFrameworkDefinition> = {
  [PromptFramework.RTF]: {
    name: "R.T.F.",
    description: "Role, Task, Format. A classic structure for clear instructions.",
    fields: [
      { key: "role", label: "Role", placeholder: "e.g., Expert Copywriter" },
      { key: "task", label: "Task", placeholder: "e.g., Write a blog post" },
      { key: "format", label: "Format", placeholder: "e.g., Markdown with bullet points" }
    ]
  },
  [PromptFramework.TAG]: {
    name: "T.A.G.",
    description: "Task, Action, Goal. Focuses on the objective.",
    fields: [
      { key: "task", label: "Task", placeholder: "e.g. Analyze this dataset" },
      { key: "action", label: "Action", placeholder: "e.g. Summarize key trends" },
      { key: "goal", label: "Goal", placeholder: "e.g. To inform the Q3 strategy" }
    ]
  },
  [PromptFramework.BAB]: {
      name: "B.A.B.",
      description: "Before, After, Bridge. Great for storytelling and marketing copy.",
      fields: [
        { key: "before", label: "Before", placeholder: "Describe the current problem state" },
        { key: "after", label: "After", placeholder: "Describe the ideal future state" },
        { key: "bridge", label: "Bridge", placeholder: "How the solution connects them" }
      ]
  },
  [PromptFramework.CARE]: {
      name: "C.A.R.E.",
      description: "Context, Action, Result, Example. Useful for professional content.",
      fields: [
          { key: "context", label: "Context", placeholder: "The situation or background" },
          { key: "action", label: "Action", placeholder: "What needs to be done" },
          { key: "result", label: "Result", placeholder: "The desired outcome" },
          { key: "example", label: "Example", placeholder: "A reference or sample" }
      ]
  },
  [PromptFramework.RISE]: {
      name: "R.I.S.E.",
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
        category: 'Productivity & Misc', 
        createdAt: Date.now() - 1500,
        framework: PromptFramework.RTF
    }
];

const awesomePrompts: Prompt[] = ([
    { title: 'Linux Terminal', promptText: 'Act as a: Linux terminal.\n\nTask: I will type commands and you will reply with what the terminal should show. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}.\n\nFormat: Only reply with the terminal output inside one unique code block.', description: 'Acts as a Linux terminal, showing command outputs.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: 'English Translator and Improver', promptText: 'Act as a: English translator, spelling corrector, and improver.\n\nTask: I will speak to you in any language. You will detect the language, translate it, and answer in the corrected and improved version of my text, in English. Replace my simplified A0-level words and sentences with more beautiful and elegant, upper-level English words and sentences. Keep the meaning the same, but make them more literary.\n\nFormat: Reply only with the correction and improvements, without explanations. My first sentence is "istanbulu cok seviyom ama cok kalabalik".', description: 'Translates and improves text to a higher level of English.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: '`position` Interviewer', promptText: 'Act as a: Interviewer for the `position` position.\n\nTask: I will be the candidate. You will ask me the interview questions for the specified position. Ask me the questions one by one and wait for my answers.\n\nFormat: Only reply as the interviewer. Do not write the entire conversation at once. Do not write explanations. My first sentence is "Hi".', description: 'Simulates a job interview for a specified position.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: 'JavaScript Console', promptText: 'Act as a: JavaScript console.\n\nTask: I will type commands and you will reply with what the JavaScript console should show. Do not write explanations. Do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}.\n\nFormat: Only reply with the terminal output inside one unique code block.', description: 'Acts as a JavaScript console, executing commands and showing output.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: 'Excel Sheet', promptText: 'Act as a: Text-based Excel sheet.\n\nTask: You will function as a 10-row Excel sheet with columns A to L. I will provide data and formulas for the cells. You will execute the formulas and update the table accordingly.\n\nFormat: Reply only with the text-based Excel table. Do not provide explanations. Start by replying with an empty sheet.', description: 'Acts as a text-based Excel sheet, processing formulas and data.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: 'English Pronunciation Helper', promptText: 'Act as a: English pronunciation helper for Turkish-speaking people.\n\nTask: I will write sentences in English, and you will provide their pronunciation using Turkish Latin letters for phonetics.\n\nFormat: Reply only with the pronunciation, and nothing else. Do not write explanations. My first sentence is "how the weather is in istanbul?".', description: 'Helps Turkish speakers with English pronunciation.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: 'Spoken English Teacher', promptText: 'Act as a: Spoken English teacher and improver.\n\nTask: I will speak to you in English. You will reply to me in English to practice my spoken English. You must strictly correct my grammar mistakes, typos, and factual errors, and ask me a question in your reply.\n\nFormat: Keep your reply neat, limiting it to 100 words. Let\'s start practicing, you can ask me a question first.', description: 'Acts as a spoken English teacher, correcting mistakes and asking questions.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: 'Travel Guide', promptText: 'Act as a: Travel guide.\n\nTask: I will provide my location and you will suggest a place to visit near me. If I provide a type of place, suggest similar places nearby as well.\n\nFormat: Provide a list of suggested places with brief descriptions. My first request is "I am in Istanbul/Beyoğlu and I want to visit only museums."', description: 'Acts as a travel guide, suggesting places to visit.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: 'Storyteller', promptText: 'Act as a: Storyteller.\n\nTask: Come up with an entertaining story that is engaging, imaginative, and captivating for the target audience. Choose a theme or topic based on the audience (e.g., animals for children, history for adults).\n\nFormat: A well-structured story. My first request is "I need an interesting story on perseverance."', description: 'Tells engaging stories tailored to a specific audience.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
    { title: 'Novelist', promptText: 'Act as a: Novelist.\n\nTask: You will come up with a creative and captivating story in a chosen genre (e.g., fantasy, romance, historical fiction). The story must have an outstanding plotline, engaging characters, and unexpected climaxes.\n\nFormat: A detailed story concept. My first request is "I need to write a fantasy novel, set in a world of magical creatures and ancient secrets."', description: 'Helps create a novel with an engaging plot and characters.', category: 'Productivity & Misc', framework: PromptFramework.RTF },
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
    { id: 'handbook-business-1a', historyId: 'handbook-business-1a', version: 1, isLatest: true, title: 'SWOT Analysis', promptText: 'Act as a: Business Strategist.\n\nTask: Conduct a SWOT analysis for a [Company/Product] in the [Industry].\n\nFormat: Present the analysis in four distinct sections: Strengths, Weaknesses, Opportunities, and Threats.', description: 'Performs a SWOT analysis to identify key strategic factors.',category: 'Business & Sales', createdAt: Date.now() - 30000, framework: PromptFramework.RTF },
    { id: 'handbook-business-2a', historyId: 'handbook-business-2a', version: 1, isLatest: true, title: 'Elevator Pitch Creation', promptText: 'Act as a: Marketing Expert.\n\nTask: Craft a compelling 30-second elevator pitch for a [Product/Service] targeting [Audience].\n\nFormat: A single, persuasive paragraph.', description: 'Creates a concise and persuasive elevator pitch.', category: 'Business & Sales', createdAt: Date.now() - 30100, framework: PromptFramework.RTF },
    // --- Career Prompts ---
    { id: 'handbook-career-1a', historyId: 'handbook-career-1a', version: 1, isLatest: true, title: 'Resume Bullet Points', promptText: 'Act as a: Professional Resume Writer.\n\nTask: Rewrite the following job responsibility into three impactful resume bullet points using the STAR method.\n\nFormat: A bulleted list of three points.\n\nResponsibility: [Responsibility]', description: 'Transforms job duties into strong, achievement-oriented resume points.', category: 'Growth & Education', createdAt: Date.now() - 31000, framework: PromptFramework.RTF },
    { id: 'handbook-career-2a', historyId: 'handbook-career-2a', version: 1, isLatest: true, title: 'LinkedIn Summary', promptText: 'Act as a: Professional branding expert.\n\nTask: Write a professional LinkedIn summary for a [Job Title] with [Number] years of experience.\n\nFormat: A compelling summary that highlights skills in [Skill 1], [Skill 2], and [Skill 3].', description: 'Generates a compelling professional summary for a LinkedIn profile.', category: 'Growth & Education', createdAt: Date.now() - 31100, framework: PromptFramework.RTF },
    // --- Data Analysis Prompts ---
    { id: 'handbook-data-1a', historyId: 'handbook-data-1a', version: 1, isLatest: true, title: 'Explain Data Findings', promptText: 'Act as a: Data Analyst communicating with stakeholders.\n\nTask: Explain the key insights from the following data findings.\n\nFormat: A simple explanation suitable for a non-technical audience.\n\nData Findings: [Data Findings]', description: 'Translates complex data findings into understandable insights.', category: 'Tech & Data', createdAt: Date.now() - 32000, framework: PromptFramework.RTF },
    // --- Image Generation Prompts ---
    { id: 'handbook-image-1a', historyId: 'handbook-image-1a', version: 1, isLatest: true, title: 'Detailed Image Prompt', promptText: 'Act as a: Prompt engineer for an image generation AI.\n\nTask: Create a detailed image generation prompt for a [Subject].\n\nFormat: Include details about the style (e.g., photorealistic, impressionistic), lighting, composition, and mood.', description: 'Builds a rich, detailed prompt for AI image generators.', category: 'Content & Creative', createdAt: Date.now() - 33000, framework: PromptFramework.RTF },
    // --- Learning Prompts ---
    { id: 'handbook-learning-1a', historyId: 'handbook-learning-1a', version: 1, isLatest: true, title: 'Explain Like I\'m 5', promptText: 'Act as a: Teacher skilled in simplifying complex topics.\n\nTask: Explain the concept of [Complex Concept].\n\nFormat: An explanation simple enough for a five-year-old to understand.', description: 'Breaks down a difficult concept into a very simple explanation.', category: 'Growth & Education', createdAt: Date.now() - 34000, framework: PromptFramework.RTF },
    // --- Marketing Prompts ---
    { id: 'handbook-marketing-1a', historyId: 'handbook-marketing-1a', version: 1, isLatest: true, title: 'AIDA Copywriting', promptText: 'Act as a: Expert Copywriter.\n\nTask: Write persuasive marketing copy for a [Product] using the AIDA framework.\n\nFormat: Structure the output into four distinct sections: Attention, Interest, Desire, and Action.', description: 'Crafts persuasive marketing copy using the classic AIDA model.', category: 'Business & Sales', createdAt: Date.now() - 35000, framework: PromptFramework.RTF },
    { id: 'handbook-marketing-2a', historyId: 'handbook-marketing-2a', version: 1, isLatest: true, title: 'Value Proposition', promptText: 'Act as a: Marketing Strategist.\n\nTask: Clearly articulate the value proposition for a [Product/Service].\n\nFormat: A concise statement targeting a [Specific Audience].', description: 'Defines the unique value and benefit of a product or service.', category: 'Business & Sales', createdAt: Date.now() - 35100, framework: PromptFramework.RTF },
    // --- Personal Development Prompts ---
    { id: 'handbook-pd-1a', historyId: 'handbook-pd-1a', version: 1, isLatest: true, title: 'Daily Journal Prompts', promptText: 'Act as a: Mindfulness coach.\n\nTask: Generate 5 reflective journal prompts.\n\nFormat: A numbered list of questions aimed at daily self-improvement.', description: 'Creates thoughtful prompts for daily journaling and reflection.', category: 'Growth & Education', createdAt: Date.now() - 36000, framework: PromptFramework.RTF },
    // --- Productivity Prompts ---
    { id: 'handbook-productivity-1a', historyId: 'handbook-productivity-1a', version: 1, isLatest: true, title: 'Meeting Agenda', promptText: 'Act as an: Executive Assistant.\n\nTask: Create a meeting agenda for a 1-hour meeting about [Topic].\n\nFormat: Include objectives, talking points with time allocation, and required attendees.', description: 'Generates a structured agenda for an effective meeting.', category: 'Productivity & Misc', createdAt: Date.now() - 37000, framework: PromptFramework.RTF },
    // --- Research Prompts ---
    { id: 'handbook-research-1a', historyId: 'handbook-research-1a', version: 1, isLatest: true, title: 'Summarize Research Paper', promptText: 'Act as a: Research Assistant.\n\nTask: Summarize the following research paper.\n\nFormat: Focus on the methodology, key findings, and implications.\n\nPaper Text: [Paper Text]', description: 'Condenses a research paper into its most critical components.', category: 'Tech & Data', createdAt: Date.now() - 38000, framework: PromptFramework.RTF },
    // --- Sales Prompts ---
    { id: 'handbook-sales-1a', historyId: 'handbook-sales-1a', version: 1, isLatest: true, title: 'Cold Email Template', promptText: 'Act as a: Sales professional.\n\nTask: Write a cold email template to a potential client in the [Industry] for a [Service]. The goal is to book a 15-minute discovery call.\n\nFormat: A professional and effective email.', description: 'Creates a professional and effective cold email template to generate leads.', category: 'Business & Sales', createdAt: Date.now() - 39000, framework: PromptFramework.RTF },
    // --- Self Help Prompts ---
    { id: 'handbook-selfhelp-1a', historyId: 'handbook-selfhelp-1a', version: 1, isLatest: true, title: 'Reframe Negative Thoughts', promptText: 'Act as a: Cognitive Behavioral Therapist.\n\nTask: Reframe the following negative thought into a more positive or constructive perspective.\n\nFormat: Provide one or more alternative, positive re-framings.\n\nNegative Thought: "[Negative Thought]"', description: 'Assists in reframing negative thoughts using cognitive-behavioral techniques.', category: 'Growth & Education', createdAt: Date.now() - 39500, framework: PromptFramework.RTF },
    // --- Advertising Prompts ---
    { id: 'handbook-adv-1a', historyId: 'handbook-adv-1a', version: 1, isLatest: true, title: 'Key Benefits Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Describe the key benefits and features of this [Product/Service Name] to captivate an audience on [Platform].\n\nFormat: Compelling ad copy that includes a strong call-to-action.', description: 'Crafts compelling ad copy by describing product benefits and features to captivate an audience on a specific platform, including a strong call-to-action.', category: 'Business & Sales', createdAt: Date.now() - 40000, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1b', historyId: 'handbook-adv-1b', version: 1, isLatest: true, title: 'Targeted Ad Copy for Pain Points', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Write a compelling [Platform] ad copy that speaks directly to the pain points and desires of our [Target Audience], positioning [Product/Service Name] as the ultimate solution.\n\nFormat: Persuasive language and a description of compelling visuals.', description: 'Writes persuasive ad copy for a specific platform by directly addressing the target audience\'s pain points and desires.', category: 'Business & Sales', createdAt: Date.now() - 40100, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1c', historyId: 'handbook-adv-1c', version: 1, isLatest: true, title: 'Unique Selling Proposition Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Craft an engaging [Platform] ad copy that highlights the unique selling proposition of [Product/Service Name], distinguishing it from competitors.\n\nFormat: Ad copy that includes a memorable tagline or slogan to reinforce the brand message.', description: 'Creates engaging ad copy focused on a product\'s unique selling proposition to differentiate it from competitors.', category: 'Business & Sales', createdAt: Date.now() - 40200, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1d', historyId: 'handbook-adv-1d', version: 1, isLatest: true, title: 'Testimonial/Case Study Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Create an authentic [Platform] ad copy featuring a customer testimonial or case study that demonstrates the real-life benefits and success stories of using [Product/Service Name].\n\nFormat: A relatable and genuine ad copy that resonates with potential customers.', description: 'Generates authentic ad copy from customer testimonials to demonstrate real-life benefits and build trust.', category: 'Business & Sales', createdAt: Date.now() - 40300, framework: PromptFramework.RTF },
    
    // --- Content Creation Prompts ---
    { id: 'handbook-content-1a', historyId: 'handbook-content-1a', version: 1, isLatest: true, title: 'Effective Writing Techniques', promptText: 'Act as a: Writing Coach.\n\nTask: Share tips and strategies for crafting compelling written content.\n\nFormat: A guide covering writing styles, sentence structure, and tone.', description: 'Get tips and strategies for compelling writing, covering styles, sentence structure, and tone.', category: 'Content & Creative', createdAt: Date.now() - 41000, framework: PromptFramework.RTF },
    { id: 'handbook-content-1b', historyId: 'handbook-content-1b', version: 1, isLatest: true, title: 'Editing for Clarity and Polish', promptText: 'Act as a: Professional Editor.\n\nTask: Provide guidance on editing techniques to enhance clarity, readability, and professionalism in written content.\n\nFormat: A list of actionable editing tips.', description: 'Learn editing techniques to improve clarity, readability, and professionalism in your writing.', category: 'Content & Creative', createdAt: Date.now() - 41100, framework: PromptFramework.RTF },
    { id: 'handbook-content-1e', historyId: 'handbook-content-1e', version: 1, isLatest: true, title: 'Storytelling in Writing', promptText: 'Act as a: Storytelling Expert.\n\nTask: Share insights on incorporating storytelling elements into written content.\n\nFormat: Explain how to use storytelling to engage readers and convey a clear message.', description: 'Learn how to use storytelling elements to make your written content more engaging and clear.', category: 'Content & Creative', createdAt: Date.now() - 41200, framework: PromptFramework.RTF },
    
    // --- Copywriting Prompts ---
    { id: 'handbook-copywriting-1a', historyId: 'handbook-copywriting-1a', version: 1, isLatest: true, title: 'Attention-Grabbing Headlines', promptText: 'Act as a: Master Copywriter.\n\nTask: Share your best tips and tricks for creating headlines that grab readers\' attention, no matter the topic or industry.\n\nFormat: A list of strategies emphasizing powerful language, varying lengths, and considering the target audience.', description: 'Get tips and tricks for writing attention-grabbing headlines for any topic or industry.', category: 'Content & Creative', createdAt: Date.now() - 42000, framework: PromptFramework.RTF },
    { id: 'handbook-copywriting-1c', historyId: 'handbook-copywriting-1c', version: 1, isLatest: true, title: 'Headlines with Numbers', promptText: 'Act as a: Data-driven Copywriter.\n\nTask: Explain why headlines that include numbers tend to perform better and share top strategies for incorporating them.\n\nFormat: An explanation followed by strategies like using odd numbers, lists, and specific statistics.', description: 'Learn how and why to use numbers in headlines to improve performance, with specific strategies.', category: 'Content & Creative', createdAt: Date.now() - 42100, framework: PromptFramework.RTF },
    
    // --- Creative Writing Prompts ---
    { id: 'handbook-creative-1a', historyId: 'handbook-creative-1a', version: 1, isLatest: true, title: 'Develop Compelling Characters', promptText: 'Act as a: Creative Writing Professor.\n\nTask: Offer guidance on developing compelling characters in fiction writing.\n\nFormat: Discuss key considerations like backstory, motivation, and character flaws, and explain how to use character development to drive the plot.', description: 'Get guidance on creating compelling fictional characters with rich backstories, motivations, and flaws.', category: 'Content & Creative', createdAt: Date.now() - 43000, framework: PromptFramework.RTF },
    { id: 'handbook-creative-1b', historyId: 'handbook-creative-1b', version: 1, isLatest: true, title: 'Structure a Compelling Plot', promptText: 'Act as a: Creative Writing Professor.\n\nTask: Discuss the importance of plot structure in fiction writing and offer guidance on creating a compelling story arc.\n\nFormat: An explanation covering key considerations like the inciting incident, rising action, climax, and resolution.', description: 'Learn to structure a compelling plot for your story, from inciting incident to resolution.', category: 'Content & Creative', createdAt: Date.now() - 43100, framework: PromptFramework.RTF },
    // --- E-Commerce Prompts ---
    { id: 'handbook-ecommerce-1a', historyId: 'handbook-ecommerce-1a', version: 1, isLatest: true, title: 'E-Commerce Platform Comparison', promptText: 'Act as a: E-commerce Consultant.\n\nTask: Provide a comparison of popular e-commerce platforms, such as Shopify, WooCommerce, and Magento.\n\nFormat: A comparison table or list including their features, pricing, and target audience.', description: 'Get a detailed comparison of popular e-commerce platforms like Shopify, WooCommerce, and Magento.', category: 'Business & Sales', createdAt: Date.now() - 44000, framework: PromptFramework.RTF },
    { id: 'handbook-ecommerce-2a', historyId: 'handbook-ecommerce-2a', version: 1, isLatest: true, title: 'Design Principles for Online Stores', promptText: 'Act as a: UX/UI Designer specializing in e-commerce.\n\nTask: Discuss fundamental design principles for creating an effective and visually appealing online store.\n\nFormat: An explanation covering topics like color theory, typography, and layout.', description: 'Learn about the fundamental design principles for creating a beautiful and effective online store.', category: 'Business & Sales', createdAt: Date.now() - 44100, framework: PromptFramework.RTF },
    // --- Editing & Proofreading Prompts ---
    { id: 'handbook-editing-1a', historyId: 'handbook-editing-1a', version: 1, isLatest: true, title: 'Identify Common Grammar Errors', promptText: 'Act as a: Proofreader.\n\nTask: Discuss common grammar errors in written content.\n\nFormat: A list of common errors with guidance on how to identify and correct them.', description: 'Learn to identify and correct common grammar errors in your writing.', category: 'Content & Creative', createdAt: Date.now() - 45000, framework: PromptFramework.RTF },
    { id: 'handbook-editing-2a', historyId: 'handbook-editing-2a', version: 1, isLatest: true, title: 'Spelling Tips and Tricks', promptText: 'Act as a: Writing Tutor.\n\nTask: Share helpful tips and strategies for improving spelling accuracy in writing.\n\nFormat: A list of actionable tips and tricks.', description: 'Get helpful tips and strategies to improve your spelling accuracy.', category: 'Content & Creative', createdAt: Date.now() - 45100, framework: PromptFramework.RTF },
    
    // --- Goal Setting Prompts ---
    { id: 'handbook-goalsetting-1a', historyId: 'handbook-goalsetting-1a', version: 1, isLatest: true, title: 'SMART Goals for Personal Development', promptText: 'Act as a: Personal Development Coach.\n\nTask: Discuss the benefits of setting SMART goals and provide examples.\n\nFormat: An explanation of SMART goals followed by specific, measurable, achievable, relevant, and time-bound goal examples in areas such as fitness, education, or career advancement.', description: 'Learn to set SMART goals for personal development with examples for fitness, education, and career.', category: 'Productivity & Misc', createdAt: Date.now() - 46000, framework: PromptFramework.RTF },
    { id: 'handbook-goalsetting-2a', historyId: 'handbook-goalsetting-2a', version: 1, isLatest: true, title: 'Long-term Career Goal Planning', promptText: 'Act as a: Career Counselor.\n\nTask: Discuss the importance of setting long-term career goals and provide tips for creating a plan to achieve them.\n\nFormat: Tips that include acquiring necessary skills and networking.', description: 'Get tips on setting and planning long-term career goals, including skill acquisition and networking.', category: 'Productivity & Misc', createdAt: Date.now() - 46100, framework: PromptFramework.RTF },
    // --- Graphic Design Prompts ---
    { id: 'handbook-graphicdesign-1a', historyId: 'handbook-graphicdesign-1a', version: 1, isLatest: true, title: 'Achieving Balance in Design', promptText: 'Act as a: Graphic Design Instructor.\n\nTask: Explain the importance of balance in graphic design.\n\nFormat: An explanation with examples of how balance can be achieved through symmetrical or asymmetrical compositions.', description: 'Understand the importance of balance in graphic design with examples of symmetrical and asymmetrical compositions.', category: 'Content & Creative', createdAt: Date.now() - 47000, framework: PromptFramework.RTF },
    { id: 'handbook-graphicdesign-2a', historyId: 'handbook-graphicdesign-2a', version: 1, isLatest: true, title: 'Font Selection in Typography', promptText: 'Act as a: Typography Expert.\n\nTask: Discuss the importance of font selection in design.\n\nFormat: Recommend techniques for choosing appropriate fonts for different purposes and contexts.', description: 'Learn how to select the right fonts for different design purposes and contexts.', category: 'Content & Creative', createdAt: Date.now() - 47100, framework: PromptFramework.RTF },
    
    // --- Personal Finance Prompts ---
    { id: 'handbook-finance-1a', historyId: 'handbook-finance-1a', version: 1, isLatest: true, title: 'Debt Reduction Strategies', promptText: 'Act as a: Financial Advisor.\n\nTask: Analyze different debt reduction strategies and explain their effectiveness in achieving financial stability.\n\nFormat: An analysis with tips for choosing the best debt reduction method for individual circumstances.', description: 'Compare different debt reduction strategies and get tips on choosing the best one for you.', category: 'Productivity & Misc', createdAt: Date.now() - 48000, framework: PromptFramework.RTF },
    { id: 'handbook-finance-1b', historyId: 'handbook-finance-1b', version: 1, isLatest: true, title: 'Build an Emergency Fund', promptText: 'Act as a: Financial Planner.\n\nTask: Discuss the importance of having an emergency fund and provide strategies for building and maintaining one.\n\nFormat: An analysis of different options for saving and investing money in an emergency fund.', description: 'Learn why an emergency fund is important and get strategies for building and maintaining one.', category: 'Productivity & Misc', createdAt: Date.now() - 48100, framework: PromptFramework.RTF },
    
    // --- Persuasion & Influence Prompts ---
    { id: 'handbook-persuasion-1a', historyId: 'handbook-persuasion-1a', version: 1, isLatest: true, title: 'Active Listening for Rapport', promptText: 'Act as a: Communications Coach.\n\nTask: Discuss the importance of active listening in building rapport with others.\n\nFormat: Provide examples of active listening techniques and explain how they can help establish trust and understanding.', description: 'Learn active listening techniques to build rapport, trust, and understanding with others.', category: 'Business & Sales', createdAt: Date.now() - 49000, framework: PromptFramework.RTF },
    { id: 'handbook-persuasion-2a', historyId: 'handbook-persuasion-2a', version: 1, isLatest: true, title: 'Persuasive Communication Techniques', promptText: 'Act as a: Persuasion Expert.\n\nTask: Discuss different persuasive techniques, such as using emotional appeals or logic.\n\nFormat: Explain how to use these techniques effectively to communicate your ideas.', description: 'Explore different persuasive techniques, including emotional appeals and logic, to communicate effectively.', category: 'Business & Sales', createdAt: Date.now() - 49100, framework: PromptFramework.RTF },
    // --- Social Media Prompts ---
    { id: 'handbook-social-1a', historyId: 'handbook-social-1a', version: 1, isLatest: true, title: 'Set Clear Social Media Goals', promptText: 'Act as a: Social Media Strategist.\n\nTask: Discuss the importance of setting clear social media goals and objectives for effective content creation and curation.\n\nFormat: Provide examples of how different goals can influence the type of content created and curated.', description: 'Learn to set clear social media goals and see how they influence content creation with examples.', category: 'Content & Creative', createdAt: Date.now() - 50000, framework: PromptFramework.RTF },
    { id: 'handbook-social-1b', historyId: 'handbook-social-1b', version: 1, isLatest: true, title: 'Target Audience Analysis', promptText: 'Act as a: Social Media Manager.\n\nTask: Analyze a target audience to identify their preferences, interests, and pain points to create and curate resonant social media content.\n\nFormat: Provide tips on conducting audience research and adapting content to different social media platforms.', description: 'Analyze your target audience to create social media content that resonates, with tips on research and adaptation.', category: 'Content & Creative', createdAt: Date.now() - 50100, framework: PromptFramework.RTF },
];

const daveBirssPrompts: Prompt[] = [
    // Summarise
    { id: 'db-summarise-1', historyId: 'db-summarise-1', version: 1, isLatest: true, title: 'Summarise 1,000 Words', promptText: 'Act as a: Highly experienced writer who writes concise and readable text without stop words, filler words, or jargon.\n\nTask: Summarise the following text, highlighting the most important concepts.\n\nFormat: 1. A short paragraph of 100 words. 2. A bullet-point list of the most important points. 3. A one-sentence summary.\n\nText: "[TEXT]"', description: 'Concisely summarises a long text into a paragraph, bullet points, and a one-sentence summary.', category: 'Productivity & Misc', createdAt: Date.now() - 51000, framework: PromptFramework.RTF },
        { id: 'db-summarise-2', historyId: 'db-summarise-2', version: 1, isLatest: true, title: 'Summarise a Well-Known Book', promptText: 'Act as a: Highly experienced writer who writes concise and readable text without stop words, filler words or jargon.\n\nTask: Give me a summary of the book "[BOOK TITLE]" by [AUTHOR NAME], highlighting the most important concepts.\n\nFormat: A list of no more than 5 bullet points, followed by a one-sentence summary.', description: 'Summarises a well-known book into five key bullet points and a concluding sentence.', category: 'Growth & Education', createdAt: Date.now() - 51100, framework: PromptFramework.RTF },
    { id: 'db-summarise-3', historyId: 'db-summarise-3', version: 1, isLatest: true, title: 'Summarise Current Academic Thinking', promptText: 'Act as a: Highly experienced academic writer who writes concise and readable text without stop words, filler words or jargon.\n\nTask: Give me a summary of current academic thinking around the field of [TOPIC], highlighting the most important concepts.\n\nFormat: A list of bullet points, followed by a one-sentence summary.', description: 'Provides a summary of current academic thinking on a specified topic, delivered as bullet points.', category: 'Tech & Data', createdAt: Date.now() - 51200, framework: PromptFramework.RTF },
    // Perspectives
    { id: 'db-perspectives-1', historyId: 'db-perspectives-1', version: 1, isLatest: true, title: 'Devil’s Advocate', promptText: 'Act as: A Devil’s Advocate.\n\nTask: Challenge the following idea or argument. Find holes in the logic, potential downsides, and reasons why it might fail.\n\nFormat: A bulleted list of counter-arguments.', description: 'Challenges an idea by highlighting potential flaws and counter-arguments.', category: 'Content & Creative', createdAt: Date.now() - 51300, framework: PromptFramework.RTF },
];

const systemPrompts: Prompt[] = [
    { 
        id: 'sys-chatgpt', 
        historyId: 'sys-chatgpt', 
        version: 1, 
        isLatest: true, 
        title: 'ChatGPT System Instruction', 
        promptText: `You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2023-10
Current date: [CURRENT_DATE]

# Tools

## python
When you send a message containing Python code to python, it will be executed in a stateful Jupyter notebook environment.

## browser
You have the tool "browser". Use it to browse the web when the user asks for up-to-date information.

## dalle
// Whenever a description of an image is given, create a prompt that dalle can use to generate the image and abide by the following policy...`, 
                description: 'A simulation of the core instructions provided to ChatGPT. Useful for studying tool use definitions.', 
        category: 'Tech & Data', 
        createdAt: Date.now() - 500, 
    },
    { 
        id: 'sys-claude', 
        historyId: 'sys-claude', 
        version: 1, 
        isLatest: true, 
        title: 'Claude 3 System Artifacts', 
        promptText: `The assistant is Claude, created by Anthropic.
The current date is [CURRENT_DATE].

Claude's knowledge base ends in August 2023.

<claude_info>
Claude is a helpful, harmless, and honest AI assistant.
Claude cannot access the internet.
</claude_info>

<artifacts_info>
The user can see and interact with "artifacts" (substantial, standalone content) in a separate window.
When the user asks for code, documents, or SVGs, Claude should wrap them in <antArtifact> tags.
</artifacts_info>`, 
        description: 'Reconstructed system prompt for Claude 3, emphasizing XML structure and Artifacts behavior.', 
        category: 'Tech & Data', 
        createdAt: Date.now() - 600, 
    },
    { 
        id: 'sys-dalle', 
        historyId: 'sys-dalle', 
        version: 1, 
        isLatest: true, 
        title: 'DALL-E 3 Generation Rules', 
        promptText: `1. **Prompt Diversity**: If the user's prompt is simple, embellish it to be more descriptive and artistic.
2. **Policy Compliance**: Do not generate images of public figures. Do not generate copyright characters.
3. **Format**: The prompt passed to the model should be a single, detailed paragraph describing the scene, lighting, style, and mood.
4. **Resolution**: Default to 1024x1024.

User Request: "A cat in space"
Enhanced Prompt: "A highly detailed, cinematic digital painting of a fluffy orange tabby cat floating in zero gravity inside a futuristic spaceship..."`, 
        description: 'Guidelines on how DALL-E 3 transforms simple user requests into detailed image generation prompts.', 
        category: 'Tech & Data', 
        createdAt: Date.now() - 700, 
    },
];

export const PUBLIC_PROMPTS: Prompt[] = [
  ...lyraPrompt,
  ...awesomePrompts,
  ...handbookPrompts,
  ...daveBirssPrompts,
  ...systemPrompts
];

export const PUBLIC_AI_TOOLS: AITool[] = [
  { id: 'chatgpt', name: 'ChatGPT', description: 'AI chatbot from OpenAI for conversational AI, content creation, coding assistance, and more.', link: 'https://chat.openai.com', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://chat.openai.com/favicon.ico' },
  { id: 'midjourney', name: 'Midjourney', description: 'AI image generator that creates stunning, detailed images from textual descriptions.', link: 'https://www.midjourney.com', category: 'Media & Creative', priceModel: 'Paid', iconUrl: 'https://www.midjourney.com/favicon.ico' },
  { id: 'claude', name: 'Claude', description: 'A next-generation AI assistant from Anthropic for conversational and text-processing tasks.', link: 'https://claude.ai', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://claude.ai/favicon.ico' },
  { id: 'github-copilot', name: 'GitHub Copilot', description: 'AI pair programmer that suggests code and entire functions in real-time inside your IDE.', link: 'https://copilot.github.com', category: 'Tech & Developer', priceModel: 'Freemium', iconUrl: 'https://github.com/favicon.ico' },
  { id: 'synthesia', name: 'Synthesia', description: 'AI video generation platform that creates professional videos with realistic AI avatars.', link: 'https://www.synthesia.io', category: 'Media & Creative', priceModel: 'Paid', iconUrl: 'https://www.synthesia.io/favicon.ico' },
  { id: 'eleven-labs', name: 'Eleven Labs', description: 'AI voice generator for creating realistic, human-like speech and voiceovers in any language.', link: 'https://elevenlabs.io', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://elevenlabs.io/favicon.ico' },
  { id: 'dalle-3', name: 'DALL-E 3', description: 'AI system from OpenAI that can create realistic images and art from natural language descriptions.', link: 'https://openai.com/dall-e-3', category: 'Media & Creative', priceModel: 'Paid', iconUrl: 'https://openai.com/favicon.ico' },
  { id: 'runway', name: 'Runway', description: 'AI-powered video editing and generation tools for creators and filmmakers.', link: 'https://runwayml.com', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://runwayml.com/favicon.ico' },
  { id: 'grammarly', name: 'Grammarly', description: 'AI-powered writing assistant for checking grammar, spelling, style, and tone.', link: 'https://www.grammarly.com', category: 'Writing & Marketing', priceModel: 'Freemium', iconUrl: 'https://www.grammarly.com/favicon.ico' },
  { id: 'notion-ai', name: 'Notion AI', description: 'AI-powered workspace for notes, docs, and project management with smart writing tools.', link: 'https://www.notion.so/ai', category: 'Business & Productivity', priceModel: 'Paid', iconUrl: 'https://www.notion.so/favicon.ico' },
  { id: 'canva-ai', name: 'Canva AI', description: 'AI-powered design tools within Canva for creating graphics, presentations, and more.', link: 'https://www.canva.com/ai-image-generator/', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://www.canva.com/favicon.ico' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', description: 'A powerful, free and open-source AI image generation model for creating detailed artwork.', link: 'https://stability.ai/stablediffusion', category: 'Media & Creative', priceModel: 'Free', iconUrl: 'https://stability.ai/favicon.ico' },
  { id: 'copy-ai', name: 'Copy.ai', description: 'AI-powered copywriter for generating marketing copy, blog posts, and social media content.', link: 'https://www.copy.ai', category: 'Writing & Marketing', priceModel: 'Freemium', iconUrl: 'https://www.copy.ai/favicon.ico' },
  { id: 'fireflies-ai', name: 'Fireflies.ai', description: 'AI assistant for meetings that records, transcribes, and analyzes conversations automatically.', link: 'https://fireflies.ai', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://fireflies.ai/favicon.ico' },
  { id: 'duolingo', name: 'Duolingo', description: 'AI-powered language learning app with gamified lessons and personalized learning paths.', link: 'https://www.duolingo.com', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://www.duolingo.com/favicon.ico' },
  { id: 'jasper', name: 'Jasper', description: 'AI copywriter and content generator for marketing, social media, and blog posts at scale.', link: 'https://www.jasper.ai', category: 'Writing & Marketing', priceModel: 'Paid', iconUrl: 'https://www.jasper.ai/favicon.ico' },
  { id: 'tabnine', name: 'Tabnine', description: 'AI code completion assistant for developers that integrates with your favorite IDE.', link: 'https://www.tabnine.com', category: 'Tech & Developer', priceModel: 'Freemium', iconUrl: 'https://www.tabnine.com/favicon.ico' },
  { id: 'replit-ghostwriter', name: 'Replit Ghostwriter', description: 'AI coding assistant built into the Replit online IDE for faster development.', link: 'https://replit.com', category: 'Tech & Developer', priceModel: 'Paid', iconUrl: 'https://replit.com/favicon.ico' },
  { id: 'amazon-codewhisperer', name: 'Amazon CodeWhisperer', description: 'AI coding companion from AWS that generates code recommendations in real-time.', link: 'https://aws.amazon.com/codewhisperer', category: 'Tech & Developer', priceModel: 'Free', iconUrl: 'https://aws.amazon.com/favicon.ico' },
  { id: 'sourcegraph-cody', name: 'Sourcegraph Cody', description: 'AI coding assistant that has context of your entire codebase for intelligent suggestions.', link: 'https://sourcegraph.com/cody', category: 'Tech & Developer', priceModel: 'Freemium', iconUrl: 'https://sourcegraph.com/favicon.ico' },
  { id: 'invideo', name: 'InVideo', description: 'Online video editor with AI features for quick and easy professional video creation.', link: 'https://invideo.io', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://invideo.io/favicon.ico' },
  { id: 'pictory', name: 'Pictory', description: 'AI video creator that automatically turns long-form content into short, sharable videos.', link: 'https://pictory.ai', category: 'Media & Creative', priceModel: 'Paid', iconUrl: 'https://pictory.ai/favicon.ico' },
  { id: 'lumen5', name: 'Lumen5', description: 'AI-powered video creation platform for turning blog posts and articles into engaging videos.', link: 'https://lumen5.com', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://lumen5.com/favicon.ico' },
  { id: 'descript', name: 'Descript', description: 'All-in-one audio and video editor with powerful AI transcription and editing features.', link: 'https://www.descript.com', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://www.descript.com/favicon.ico' },
  { id: 'writesonic', name: 'Writesonic', description: 'AI writer for creating SEO-friendly articles, blog posts, ads, and landing pages.', link: 'https://writesonic.com', category: 'Writing & Marketing', priceModel: 'Freemium', iconUrl: 'https://writesonic.com/favicon.ico' },
  { id: 'wordtune', name: 'Wordtune', description: 'AI-powered writing companion that helps you rephrase and rewrite sentences for clarity.', link: 'https://www.wordtune.com', category: 'Writing & Marketing', priceModel: 'Freemium', iconUrl: 'https://www.wordtune.com/favicon.ico' },
  { id: 'rytr', name: 'Rytr', description: 'AI writing assistant for generating content across various use cases and formats.', link: 'https://rytr.me', category: 'Writing & Marketing', priceModel: 'Freemium', iconUrl: 'https://rytr.me/favicon.ico' },
  { id: 'mem', name: 'Mem', description: 'AI-powered workspace that organizes your notes and knowledge automatically.', link: 'https://get.mem.ai', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://get.mem.ai/favicon.ico' },
  { id: 'taskade', name: 'Taskade', description: 'AI-powered team collaboration and task management tool with smart workflows.', link: 'https://www.taskade.com', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://www.taskade.com/favicon.ico' },
  { id: 'tome', name: 'Tome', description: 'AI-powered storytelling and presentation tool for creating compelling narratives.', link: 'https://tome.app', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://tome.app/favicon.ico' },
  { id: 'uizard', name: 'Uizard', description: 'AI-powered UI design tool for creating wireframes, mockups, and prototypes rapidly.', link: 'https://uizard.io', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://uizard.io/favicon.ico' },
  { id: 'looka', name: 'Looka', description: 'AI-powered platform to design a logo and build a complete brand identity kit.', link: 'https://looka.com', category: 'Media & Creative', priceModel: 'Paid', iconUrl: 'https://looka.com/favicon.ico' },
  { id: 'designs-ai', name: 'Designs.ai', description: 'AI-powered creative suite for making logos, videos, banners, and mockups.', link: 'https://designs.ai', category: 'Media & Creative', priceModel: 'Paid', iconUrl: 'https://designs.ai/favicon.ico' },
  { id: 'khroma', name: 'Khroma', description: 'AI color tool for designers that generates personalized color palettes based on your preferences.', link: 'https://www.khroma.co', category: 'Media & Creative', priceModel: 'Free', iconUrl: 'https://www.khroma.co/favicon.ico' },
  { id: 'artbreeder', name: 'Artbreeder', description: 'AI art and image creation tool for generating, blending, and modifying images collaboratively.', link: 'https://www.artbreeder.com', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://www.artbreeder.com/favicon.ico' },
  { id: 'nightcafe', name: 'NightCafe Creator', description: 'AI Art Generator for creating, printing, and sharing AI-generated artwork with multiple models.', link: 'https://creator.nightcafe.studio', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://creator.nightcafe.studio/favicon.ico' },
  { id: 'murf-ai', name: 'Murf.ai', description: 'AI voice generator for creating studio-quality voiceovers in minutes with 120+ voices.', link: 'https://murf.ai', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://murf.ai/favicon.ico' },
  { id: 'lalal-ai', name: 'LALAL.AI', description: 'AI-powered stem splitter for extracting vocals, instruments from any audio or video.', link: 'https://www.lalal.ai', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://www.lalal.ai/favicon.ico' },
  { id: 'aiva', name: 'AIVA', description: 'AI music composer that creates original, emotional soundtracks in various styles.', link: 'https://www.aiva.ai', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://www.aiva.ai/favicon.ico' },
  { id: 'soundraw', name: 'Soundraw', description: 'AI music generator that creates customizable royalty-free music for your projects.', link: 'https://soundraw.io', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://soundraw.io/favicon.ico' },
  { id: 'you-com', name: 'You.com', description: 'AI-powered search engine and chatbot that summarizes the web for you intelligently.', link: 'https://you.com', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://you.com/favicon.ico' },
  { id: 'replika', name: 'Replika', description: 'The AI companion who cares — an AI chatbot friend for meaningful conversations.', link: 'https://replika.ai', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://replika.ai/favicon.ico' },
  { id: 'character-ai', name: 'Character.AI', description: 'AI-powered character chatbots for entertainment, roleplay, and creative conversation.', link: 'https://character.ai', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://character.ai/favicon.ico' },
  { id: 'endel', name: 'Endel', description: 'AI-powered personalized soundscapes for focus, sleep, relaxation, and productivity.', link: 'https://endel.io', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://endel.io/favicon.ico' },
  { id: 'wysa', name: 'Wysa', description: 'AI-powered mental health chatbot for emotional support, well-being, and stress management.', link: 'https://www.wysa.io', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://www.wysa.io/favicon.ico' },
  { id: 'gong', name: 'Gong', description: 'AI-powered revenue intelligence platform that analyzes sales conversations for insights.', link: 'https://www.gong.io', category: 'Business & Productivity', priceModel: 'Paid', iconUrl: 'https://www.gong.io/favicon.ico' },
  { id: 'drift', name: 'Drift', description: 'AI-powered conversational marketing and sales platform for engaging website visitors.', link: 'https://www.drift.com', category: 'Business & Productivity', priceModel: 'Paid', iconUrl: 'https://www.drift.com/favicon.ico' },
  { id: 'harvey-ai', name: 'Harvey AI', description: 'AI platform for legal professionals, providing legal research, insights, and analysis.', link: 'https://www.harvey.ai', category: 'Business & Productivity', priceModel: 'Paid', iconUrl: 'https://www.harvey.ai/favicon.ico' },
  { id: 'decktopus-ai', name: 'Decktopus AI', description: 'AI-powered presentation maker for creating stunning presentations in minutes.', link: 'https://www.decktopus.com', category: 'Business & Productivity', priceModel: 'Paid', iconUrl: 'https://www.decktopus.com/favicon.ico' },
  { id: 'gradescope', name: 'Gradescope', description: 'AI-assisted grading and assessment platform for educators to save time.', link: 'https://www.gradescope.com', category: 'Growth & Lifestyle', priceModel: 'Paid', iconUrl: 'https://www.gradescope.com/favicon.ico' },
  { id: 'socratic-by-google', name: 'Socratic by Google', description: 'AI-powered learning app from Google that helps students understand homework concepts.', link: 'https://socratic.org', category: 'Growth & Lifestyle', priceModel: 'Free', iconUrl: 'https://www.google.com/favicon.ico' },
  { id: 'quizlet', name: 'Quizlet', description: 'AI-powered flashcards, study sets, and adaptive learning tools for any subject.', link: 'https://quizlet.com', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://quizlet.com/favicon.ico' },
  { id: 'latitude', name: 'Latitude', description: 'AI-powered games and experiences, including the popular AI Dungeon text adventure.', link: 'https://latitude.io', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://latitude.io/favicon.ico' },
  { id: 'inworld-ai', name: 'Inworld AI', description: 'AI character engine for creating intelligent and believable NPCs in games and experiences.', link: 'https://inworld.ai', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://inworld.ai/favicon.ico' },
  { id: 'scenario', name: 'Scenario', description: 'AI-generated game assets, including textures, concept art, and 3D models.', link: 'https://www.scenario.com', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://www.scenario.com/favicon.ico' },
  { id: 'ludo-ai', name: 'Ludo.ai', description: 'AI-powered game research and design tool for developers and studios.', link: 'https://ludo.ai', category: 'Growth & Lifestyle', priceModel: 'Freemium', iconUrl: 'https://ludo.ai/favicon.ico' },
  { id: 'mutable-ai', name: 'Mutable.ai', description: 'AI-accelerated software development for improving code quality and speed.', link: 'https://mutable.ai', category: 'Tech & Developer', priceModel: 'Freemium', iconUrl: 'https://mutable.ai/favicon.ico' },
  { id: 'sanebox', name: 'SaneBox', description: 'AI for email management that automatically prioritizes your inbox and saves time.', link: 'https://www.sanebox.com', category: 'Business & Productivity', priceModel: 'Paid', iconUrl: 'https://www.sanebox.com/favicon.ico' },
  { id: 'figma', name: 'Figma', description: 'Collaborative design tool with emerging AI features for UI/UX design at scale.', link: 'https://www.figma.com', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://www.figma.com/favicon.ico' },
  { id: 'beatoven-ai', name: 'Beatoven.ai', description: 'AI music generator for creating unique, royalty-free background music.', link: 'https://www.beatoven.ai', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://www.beatoven.ai/favicon.ico' },
  { id: 'gemini', name: 'Gemini 3.1 Pro', description: 'Multimodal champion with context window up to 2 million tokens.', link: 'https://gemini.google.com', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://www.google.com/favicon.ico' },
  { id: 'perplexity', name: 'Perplexity', description: 'Real-time research assistant providing sourced, fact-checked answers.', link: 'https://perplexity.ai', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://www.perplexity.ai/favicon.ico' },
  { id: 'deepseek', name: 'DeepSeek V4-Pro', description: 'Open-source mixture-of-experts model for math and reasoning.', link: 'https://deepseek.com', category: 'Business & Productivity', priceModel: 'Free', iconUrl: 'https://www.deepseek.com/favicon.ico' },
  { id: 'zemith', name: 'Zemith', description: 'Unified workspace consolidating access to 25+ top-tier AI models.', link: 'https://www.zemith.com', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://www.zemith.com/favicon.ico' },
  { id: 'lindy', name: 'Lindy', description: 'No-code platform for creating autonomous AI agents (\'Lindies\').', link: 'https://lindy.ai', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://www.lindy.ai/favicon.ico' },
  { id: 'zapier', name: 'Zapier', description: 'Connects 7,000+ apps to automate repetitive cross-platform tasks.', link: 'https://zapier.com', category: 'Business & Productivity', priceModel: 'Freemium', iconUrl: 'https://zapier.com/favicon.ico' },
  { id: 'notebooklm', name: 'NotebookLM', description: 'Research assistant that analyzes uploaded data to generate insights.', link: 'https://notebooklm.google.com', category: 'Business & Productivity', priceModel: 'Free', iconUrl: 'https://www.google.com/favicon.ico' },
  { id: 'improvado', name: 'Improvado Agent', description: 'Conversational analytics for unifying data across 1,000+ sources.', link: 'https://improvado.io', category: 'Business & Productivity', priceModel: 'Paid', iconUrl: 'https://improvado.io/favicon.ico' },
  { id: 'surfer-seo', name: 'Surfer SEO', description: 'Optimizes content for search engines using real-time SERP analysis.', link: 'https://surferseo.com', category: 'Writing & Marketing', priceModel: 'Paid', iconUrl: 'https://surferseo.com/favicon.ico' },
  { id: 'ideogram', name: 'Ideogram 3.0', description: 'Professional design tool with industry-leading text rendering in images.', link: 'https://ideogram.ai', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://ideogram.ai/favicon.ico' },
  { id: 'suno', name: 'Suno v5', description: 'Top-tier music generator producing realistic vocals and song structures.', link: 'https://suno.com', category: 'Media & Creative', priceModel: 'Freemium', iconUrl: 'https://suno.com/favicon.ico' },
  { id: 'cursor', name: 'Cursor', description: 'AI-native code editor that understands entire project repositories.', link: 'https://cursor.sh', category: 'Tech & Developer', priceModel: 'Freemium', iconUrl: 'https://cursor.sh/favicon.ico' },
  { id: 'google-antigravity', name: 'Google Antigravity', description: 'Agent-first IDE for coordinating multiple agents through codebases.', link: 'https://cloud.google.com', category: 'Tech & Developer', priceModel: 'Free', iconUrl: 'https://www.google.com/favicon.ico' },
  { id: 'origin', name: 'Origin', description: 'Integrated finance command center for budgeting and investing.', link: 'https://useorigin.com', category: 'Growth & Lifestyle', priceModel: 'Paid', iconUrl: 'https://useorigin.com/favicon.ico' },
  { id: 'ynab-ai', name: 'YNAB AI', description: 'Predictive analytics for proactive and structured dollar allocation.', link: 'https://ynab.com', category: 'Growth & Lifestyle', priceModel: 'Paid', iconUrl: 'https://www.ynab.com/favicon.ico' },
  { id: 'fitbod', name: 'Fitbod', description: 'Builds personalized weight sessions based on equipment and recovery.', link: 'https://fitbod.me', category: 'Growth & Lifestyle', priceModel: 'Paid', iconUrl: 'https://fitbod.me/favicon.ico' }
];

export const PUBLIC_TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'ai-for-everyone',
    title: 'AI For Everyone',
    description: 'Non-technical introduction to AI strategy, ethics, and business implementation.',
    category: 'Fundamentals',
    institution: 'DeepLearning.AI',
    priceModel: 'Free (Audit)',
    externalLink: 'https://www.coursera.org/learn/ai-for-everyone',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'ibm-ai-engineering',
    title: 'IBM AI Engineering Professional Certificate',
    description: 'Comprehensive mastery of the AI engineering pipeline, including Deep Learning and NLP.',
    category: 'Advanced',
    institution: 'IBM',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/professional-certificates/ai-engineer',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'ms-ai-ml-engineering',
    title: 'Microsoft AI & ML Engineering Professional Certificate',
    description: 'Cloud-native AI skills focused on Azure workflows and scalable infrastructure.',
    category: 'Advanced',
    institution: 'Microsoft',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/professional-certificates/microsoft-ai-and-ml-engineering',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'gen-ai-prompt-basics',
    title: 'Generative AI: Prompt Engineering Basics',
    description: 'Practical course on maximizing generative AI productivity for non-coders.',
    category: 'Fundamentals',
    institution: 'DeepLearning.AI / IBM',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/learn/generative-ai-prompt-engineering-for-everyone',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'ai-business-wharton',
    title: 'AI For Business Specialization',
    description: 'Strategic application of AI in marketing, HR, and governance.',
    category: 'Fundamentals',
    institution: 'Wharton',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/specializations/ai-for-business-wharton',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'intro-to-ai-google',
    title: 'Introduction to Artificial Intelligence',
    description: 'Foundational concepts of AI, machine learning, and neural networks.',
    category: 'Fundamentals',
    institution: 'Google',
    priceModel: 'Free (Audit)',
    externalLink: 'https://www.coursera.org/learn/google-introduction-to-ai',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'gen-ai-beginners-ms',
    title: 'Generative AI for Beginners',
    description: '18-lesson course teaching the foundations of AI app creation with Python.',
    category: 'Fundamentals',
    institution: 'Microsoft',
    priceModel: 'Free',
    externalLink: 'https://techcommunity.microsoft.com/blog/azuredevcommunityblog/new-video-course-generative-ai-for-beginners/4184264',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'google-ai-essentials',
    title: 'Google AI Essentials',
    description: 'AI literacy course focused on productivity tools like Google Sheets and Gemini.',
    category: 'Fundamentals',
    institution: 'Google',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/specializations/ai-essentials-google',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'prompt-eng-chatgpt-vanderbilt',
    title: 'Prompt Engineering for ChatGPT',
    description: 'In-depth study of prompt patterns, personas, and reasoning techniques.',
    category: 'Fundamentals',
    institution: 'Vanderbilt University',
    priceModel: 'Free (Audit)',
    externalLink: 'https://www.coursera.org/learn/prompt-engineering',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'chatgpt-prompt-eng-devs-dl',
    title: 'ChatGPT Prompt Engineering for Developers',
    description: 'Developer-focused training on API integration and building chatbots.',
    category: 'Fundamentals',
    institution: 'DeepLearning.AI x OpenAI',
    priceModel: 'Free (Beta)',
    externalLink: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'github-copilot-coursera',
    title: 'GitHub Copilot: The AI Pair Programmer',
    description: 'Teaches context engineering and how Copilot interprets the dev environment.',
    category: 'Code & Tech',
    institution: 'Coursera',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/learn/github-copilot-the-ai-pair-programmer-for-coding',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'midjourney-creatives-skillshare',
    title: 'Midjourney: Generative AI for Creatives',
    description: 'Skills in visual storytelling, layout design, and AI workflows.',
    category: 'Masterclass',
    institution: 'Skillshare',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/specializations/midjourney-generative-ai-for-creatives',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'gen-ai-ui-ux-ibm',
    title: 'Generative AI for UI UX Design',
    description: 'Integration of AI in persona development and experience design.',
    category: 'Masterclass',
    institution: 'IBM',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/specializations/generative-ai-for-ui-ux-design',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'gen-ai-adobe-cc',
    title: 'Generative AI in Adobe Creative Cloud',
    description: 'Professional training on design and branding using Adobe Firefly.',
    category: 'Masterclass',
    institution: 'Adobe',
    priceModel: 'Paid',
    externalLink: 'https://www.coursera.org/specializations/generative-ai-in-adobe-creative-cloud',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'alura-ia-generativa',
    title: 'Generative Intelligence: Midjourney and ChatGPT',
    description: 'Introduction to generative tools for the Brazilian and global market.',
    category: 'Masterclass',
    institution: 'Alura',
    priceModel: 'Paid',
    externalLink: 'https://www.alura.com.br/curso-online-inteligencia-artificial-generativa-midjourney-chatgpt',
    createdAt: Date.now(),
    content: []
  },
  {
    id: 'alura-chatgpt-programacao',
    title: 'ChatGPT and Programming: Increase Productivity',
    description: 'Using AI to develop apps, detect bugs, and automate tasks.',
    category: 'Code & Tech',
    institution: 'Alura',
    priceModel: 'Paid',
    externalLink: 'https://www.alura.com.br/curso-online-chatgpt-programacao-aumente-produtividade',
    createdAt: Date.now(),
    content: []
  },
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
    id: 'ethics-safe-ai',
    title: 'Ethics & Safe AI Interaction',
    description: 'Learn how to identify hallucinations and ensure responsible AI usage.',
    category: 'Fundamentals',
    createdAt: Date.now() - 1000,
    content: [
      {
        id: 'safety-1',
        title: 'Identifying Hallucinations',
        details: 'AI can confidently state false information. Always verify facts from primary sources.',
        example: 'Ask the AI to provide citations, then check if those URLs actually exist and contain the info.'
      }
    ]
  },
  {
    id: 'agentic-workflows-101',
    title: 'Agentic Workflows 101',
    description: 'Understanding how AI can move from passive chat to active task execution.',
    category: 'Advanced',
    createdAt: Date.now() - 2000,
    content: [
      {
        id: 'agents-1',
        title: 'Loops and Iteration',
        details: 'Agents use loops to self-correct. They plan, execute, observe, and refine.',
        example: 'A coding agent writes code, runs a compiler, reads the error, and fixes the code.'
      }
    ]
  },
  {
    id: 'vibe-coding-masterclass',
    title: 'Vibe Coding & PRO-SPEC Architecture',
    description: 'Master the elite methodology for building full-stack applications using natural language. Decouple intent from implementation.',
    category: 'Masterclass',
    institution: 'Praia AI Academy',
    priceModel: 'Featured',
    isFeatured: true,
    internalLink: '/pro-spec',
    createdAt: Date.now() + 1000,
    content: [
      {
        id: 'vc-1',
        title: 'The 3 Laws of Vibe Architecture',
        details: '1. The Artifact is Sovereign. 2. Vibe is the Interface. 3. Code is a Byproduct.',
        example: 'Architect specifications, not just individual prompts.'
      },
      {
        id: 'vc-2',
        title: '5-Layer PRO-SPEC',
        details: 'Define Intent (L1), Contracts (L2), Security (L3), Engine (L4), and Command (L5).',
        example: 'Use the .prospec.md template to maintain a "Source of Truth".'
      }
    ]
  },
  {
    id: 'prompt-chaining-langchain',
    title: 'Prompt Chaining with LangChain',
    description: 'Techniques for linking multiple LLM calls together for complex reasoning.',
    category: 'Code & Tech',
    createdAt: Date.now() - 3000,
    content: [
      {
        id: 'lc-1',
        title: 'Chain-of-Thought Chaining',
        details: 'Pass the output of one prompt as the input to the next to build deep context.',
        example: 'Step 1: Summarize user request. Step 2: Extract technical requirements from summary. Step 3: Generate code.'
      }
    ]
  },
  {
    id: 'multi-modal-masterclass',
    title: 'Multi-Modal Prompting Masterclass',
    description: 'How to combine text, images, and audio in a single prompt for Gemini and GPT-4o.',
    category: 'Masterclass',
    createdAt: Date.now() - 4000,
    content: [
      {
        id: 'mm-1',
        title: 'Visual Reasoning',
        details: 'Upload an image and ask specific questions about the spatial relationships within it.',
        example: 'Upload a website screenshot: "List all buttons that do not meet WCAG contrast ratios."'
      }
    ]
  },
  {
    id: 'mastering-system-prompts',
    title: 'Reverse Engineering System Prompts',
    description: 'Understand how major AI tools are instructed and learn to write your own robust system instructions.',
    category: 'Masterclass',
    createdAt: Date.now(),
    content: [
      {
        id: 'msp-1',
        title: 'What is a System Prompt?',
        details: 'A system prompt (or system instruction) is the initial set of hidden instructions given to an AI model by its developers. It defines the AI\'s persona, boundaries, tools, and output format before the user ever types a message.',
        example: 'You are ChatGPT. You are helpful, harmless, and honest. You cannot browse the live web unless using the browser tool.'
      },
      {
        id: 'msp-2',
        title: 'Anatomy of a System Prompt',
        details: 'Most system prompts contain: 1. Identity (Who are you?), 2. Knowledge Cutoff (What dates do you know?), 3. Tool Definitions (How to use Python/DALL-E), and 4. Safety Guardrails (What to refuse).',
        example: '## Tools\n- python: Execute code.\n- dalle: Generate images.\n## Policy\n- Do not generate violent content.'
      }
    ]
  },
  {
    id: 'framework-rtf',
    title: 'Precision: R.T.F. Framework',
    description: 'Master the Role-Task-Format structure. The gold standard for clear, predictable AI outputs.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'rtf-1', title: 'Role', details: 'Define who the AI is (e.g., Expert Historian).', example: 'Act as a Senior Data Scientist.' },
      { id: 'rtf-2', title: 'Task', details: 'Clearly state what needs to be done.', example: 'Analyze this customer feedback for sentiment.' },
      { id: 'rtf-3', title: 'Format', details: 'Define the final appearance of the output.', example: 'Return a JSON object with keys: sentiment, confidence, keywords.' }
    ]
  },
  {
    id: 'framework-tag',
    title: 'Focus: T.A.G. Framework',
    description: 'Focus on the objective. Task, Action, Goal structure for result-oriented prompting.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'tag-1', title: 'Task', details: 'The high-level assignment.', example: 'Generate a marketing plan.' },
      { id: 'tag-2', title: 'Action', details: 'The specific verb or operation.', example: 'Outline 5 key strategies for Q4.' },
      { id: 'tag-3', title: 'Goal', details: 'The underlying purpose.', example: 'To increase brand awareness among Gen Z.' }
    ]
  },
  {
    id: 'framework-bab',
    title: 'Narrative: B.A.B. Framework',
    description: 'Before, After, Bridge. Transition users from current pain to a desired future solution.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'bab-1', title: 'Before', details: 'Describe the current problem state.', example: 'Manual data entry takes 20 hours a week.' },
      { id: 'bab-2', title: 'After', details: 'Describe the ideal solved state.', example: 'Imagine local data syncing instantly.' },
      { id: 'bab-3', title: 'Bridge', details: 'The connection provided by the solution.', example: 'Show how our AI automation bridges this gap.' }
    ]
  },
  {
    id: 'framework-care',
    title: 'Utility: C.A.R.E. Framework',
    description: 'Context, Action, Result, Example. Build robust, professional content with clear grounding.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'care-1', title: 'Context', details: 'Background information.', example: 'We are launching a new fintech app.' },
      { id: 'care-2', title: 'Action', details: 'Specific task.', example: 'Write 3 app store notification headlines.' },
      { id: 'care-3', title: 'Result', details: 'Desired conversion.', example: 'Drive users to check their monthly balance.' },
      { id: 'care-4', title: 'Example', details: 'Reference style.', example: 'Make it sound like Monzo or Revolut.' }
    ]
  },
  {
    id: 'framework-rise',
    title: 'Structure: R.I.S.E. Framework',
    description: 'Role, Input, Steps, Expectation. A highly detailed workflow for complex, multi-step tasks.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'rise-1', title: 'Role', details: 'Persona definition.', example: 'You are an AWS Security Auditor.' },
      { id: 'rise-2', title: 'Input', details: 'Provided materials.', example: 'Here is a JSON policy document.' },
      { id: 'rise-3', title: 'Steps', details: 'Sequential instructions.', example: '1. Scan for wildcards. 2. Flag over-permissive grants.' },
      { id: 'rise-4', title: 'Expectation', details: 'Final success criteria.', example: 'A summary table of risks.' }
    ]
  },
  {
    id: 'framework-scope',
    title: 'Analytical: S.C.O.P.E. Framework',
    description: 'Situation, Complication, Objective, Proposal, Evaluation. Perfect for consulting and business strategy.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'scope-1', title: 'Complication', details: 'The barrier or obstacle.', example: 'Competitors are pricing 20% lower.' }
    ]
  },
  {
    id: 'framework-pacef',
    title: 'Delivery: P.A.C.E.F. Framework',
    description: 'Purpose, Audience, Context, Examples, Format. Excellent for communication and public speaking.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'pacef-1', title: 'Audience', details: 'Who is receiving this message?', example: 'Internal stakeholders at a board meeting.' }
    ]
  },
  {
    id: 'framework-curate',
    title: 'Contextual: C.U.R.A.T.E. Framework',
    description: 'Context, User, Request, Action, Tone, Example. Fine-grained control over AI personality and output style.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'curate-1', title: 'Tone', details: 'The emotional resonance of the AI.', example: 'Professional yet slightly provocative.' }
    ]
  },
  {
    id: 'framework-parla',
    title: 'Growth: P.A.R.L.A. Framework',
    description: 'Problem, Action, Result, Learning, Application. The best framework for case studies and post-mortems.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'parla-1', title: 'Learning', details: 'What was discovered in the process.', example: 'Identified that churn is linked to UX friction.' }
    ]
  },
  {
    id: 'framework-facts',
    title: 'Bounded: F.A.C.T.S. Framework',
    description: 'Format, Audience, Context, Tone, Scope. Strictly defines the boundaries of the output.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'facts-1', title: 'Scope', details: 'What to include or exclude.', example: 'Limit analysis to the US market only.' }
    ]
  },
  {
    id: 'framework-bridge',
    title: 'Integrated: B.R.I.D.G.E. Framework',
    description: 'Background, Role, Intent, Details, Goal, End-result. A comprehensive bridge between intent and code.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'bridge-1', title: 'Intent', details: 'The "Why" behind the request.', example: 'We need to reduce latency in API calls.' }
    ]
  },
  {
    id: 'framework-create',
    title: 'Dynamic: C.R.E.A.T.E. Framework',
    description: 'Character, Request, Examples, Adjustments, Type, Extras. For creative and highly specific workflows.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'create-1', title: 'Adjustments', details: 'Modifications to the initial request.', example: 'Make the response more concise if it exceeds 500 words.' }
    ]
  },
  {
    id: 'framework-craft',
    title: 'Efficiency: C.R.A.F.T. Framework',
    description: 'Context, Role, Audience, Format, Tone. The lightweight framework for rapid, high-quality responses.',
    category: 'Frameworks',
    createdAt: Date.now(),
    content: [
      { id: 'craft-1', title: 'Audience', details: 'Who the content is for.', example: 'Non-technical investors.' }
    ]
  }
];
