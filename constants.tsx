

import {
  Prompt,
  PromptFramework,
  TrainingModule,
  PromptCategory,
  AITool,
  AIToolCategory,
  PromptFrameworkDefinition,
  TrainingCategory,
  FrameworkField,
  TrainingContent,
} from './types';
import { lyraPromptText } from './data/lyraPromptText';

const lyraPrompt: Prompt[] = [
    { 
        id: 'lyra-prompt-optimizer', 
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
] as const).map((p, i) => ({...p, id: `awesome-prompt-${i}`, createdAt: Date.now() - (25000 + i*100)}));

const handbookPrompts: Prompt[] = [
    // --- Business Prompts ---
    { id: 'handbook-business-1a', title: 'SWOT Analysis', promptText: 'Act as a: Business Strategist.\n\nTask: Conduct a SWOT analysis for a [Company/Product] in the [Industry].\n\nFormat: Present the analysis in four distinct sections: Strengths, Weaknesses, Opportunities, and Threats.', description: 'Performs a SWOT analysis to identify key strategic factors.', category: 'Business', createdAt: Date.now() - 30000, framework: PromptFramework.RTF },
    { id: 'handbook-business-2a', title: 'Elevator Pitch Creation', promptText: 'Act as a: Marketing Expert.\n\nTask: Craft a compelling 30-second elevator pitch for a [Product/Service] targeting [Audience].\n\nFormat: A single, persuasive paragraph.', description: 'Creates a concise and persuasive elevator pitch.', category: 'Business', createdAt: Date.now() - 30100, framework: PromptFramework.RTF },
    // --- Career Prompts ---
    { id: 'handbook-career-1a', title: 'Resume Bullet Points', promptText: 'Act as a: Professional Resume Writer.\n\nTask: Rewrite the following job responsibility into three impactful resume bullet points using the STAR method.\n\nFormat: A bulleted list of three points.\n\nResponsibility: [Responsibility]', description: 'Transforms job duties into strong, achievement-oriented resume points.', category: 'Career', createdAt: Date.now() - 31000, framework: PromptFramework.RTF },
    { id: 'handbook-career-2a', title: 'LinkedIn Summary', promptText: 'Act as a: Professional branding expert.\n\nTask: Write a professional LinkedIn summary for a [Job Title] with [Number] years of experience.\n\nFormat: A compelling summary that highlights skills in [Skill 1], [Skill 2], and [Skill 3].', description: 'Generates a compelling professional summary for a LinkedIn profile.', category: 'Career', createdAt: Date.now() - 31100, framework: PromptFramework.RTF },
    // --- Data Analysis Prompts ---
    { id: 'handbook-data-1a', title: 'Explain Data Findings', promptText: 'Act as a: Data Analyst communicating with stakeholders.\n\nTask: Explain the key insights from the following data findings.\n\nFormat: A simple explanation suitable for a non-technical audience.\n\nData Findings: [Data Findings]', description: 'Translates complex data findings into understandable insights.', category: 'Data Analysis', createdAt: Date.now() - 32000, framework: PromptFramework.RTF },
    // --- Image Generation Prompts ---
    { id: 'handbook-image-1a', title: 'Detailed Image Prompt', promptText: 'Act as a: Prompt engineer for an image generation AI.\n\nTask: Create a detailed image generation prompt for a [Subject].\n\nFormat: Include details about the style (e.g., photorealistic, impressionistic), lighting, composition, and mood.', description: 'Builds a rich, detailed prompt for AI image generators.', category: 'Image Generation', createdAt: Date.now() - 33000, framework: PromptFramework.RTF },
    // --- Learning Prompts ---
    { id: 'handbook-learning-1a', title: 'Explain Like I\'m 5', promptText: 'Act as a: Teacher skilled in simplifying complex topics.\n\nTask: Explain the concept of [Complex Concept].\n\nFormat: An explanation simple enough for a five-year-old to understand.', description: 'Breaks down a difficult concept into a very simple explanation.', category: 'Learning', createdAt: Date.now() - 34000, framework: PromptFramework.RTF },
    // --- Marketing Prompts ---
    { id: 'handbook-marketing-1a', title: 'AIDA Copywriting', promptText: 'Act as a: Expert Copywriter.\n\nTask: Write persuasive marketing copy for a [Product] using the AIDA framework.\n\nFormat: Structure the output into four distinct sections: Attention, Interest, Desire, and Action.', description: 'Crafts persuasive marketing copy using the classic AIDA model.', category: 'Marketing', createdAt: Date.now() - 35000, framework: PromptFramework.RTF },
    { id: 'handbook-marketing-2a', title: 'Value Proposition', promptText: 'Act as a: Marketing Strategist.\n\nTask: Clearly articulate the value proposition for a [Product/Service].\n\nFormat: A concise statement targeting a [Specific Audience].', description: 'Defines the unique value and benefit of a product or service.', category: 'Marketing', createdAt: Date.now() - 35100, framework: PromptFramework.RTF },
    // --- Personal Development Prompts ---
    { id: 'handbook-pd-1a', title: 'Daily Journal Prompts', promptText: 'Act as a: Mindfulness coach.\n\nTask: Generate 5 reflective journal prompts.\n\nFormat: A numbered list of questions aimed at daily self-improvement.', description: 'Creates thoughtful prompts for daily journaling and reflection.', category: 'Personal Development', createdAt: Date.now() - 36000, framework: PromptFramework.RTF },
    // --- Productivity Prompts ---
    { id: 'handbook-productivity-1a', title: 'Meeting Agenda', promptText: 'Act as an: Executive Assistant.\n\nTask: Create a meeting agenda for a 1-hour meeting about [Topic].\n\nFormat: Include objectives, talking points with time allocation, and required attendees.', description: 'Generates a structured agenda for an effective meeting.', category: 'Productivity', createdAt: Date.now() - 37000, framework: PromptFramework.RTF },
    // --- Research Prompts ---
    { id: 'handbook-research-1a', title: 'Summarize Research Paper', promptText: 'Act as a: Research Assistant.\n\nTask: Summarize the following research paper.\n\nFormat: Focus on the methodology, key findings, and implications.\n\nPaper Text: [Paper Text]', description: 'Condenses a research paper into its most critical components.', category: 'Research', createdAt: Date.now() - 38000, framework: PromptFramework.RTF },
    // --- Sales Prompts ---
    { id: 'handbook-sales-1a', title: 'Cold Email Template', promptText: 'Act as a: Sales professional.\n\nTask: Write a cold email template to a potential client in the [Industry] for a [Service]. The goal is to book a 15-minute discovery call.\n\nFormat: A professional and effective email.', description: 'Creates a professional and effective cold email template to generate leads.', category: 'Sales', createdAt: Date.now() - 39000, framework: PromptFramework.RTF },
    // --- Self Help Prompts ---
    { id: 'handbook-selfhelp-1a', title: 'Reframe Negative Thoughts', promptText: 'Act as a: Cognitive Behavioral Therapist.\n\nTask: Reframe the following negative thought into a more positive or constructive perspective.\n\nFormat: Provide one or more alternative, positive re-framings.\n\nNegative Thought: "[Negative Thought]"', description: 'Assists in reframing negative thoughts using cognitive-behavioral techniques.', category: 'Self Help', createdAt: Date.now() - 39500, framework: PromptFramework.RTF },
    // --- Advertising Prompts ---
    { id: 'handbook-adv-1a', title: 'Key Benefits Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Describe the key benefits and features of this [Product/Service Name] to captivate an audience on [Platform].\n\nFormat: Compelling ad copy that includes a strong call-to-action.', description: 'Crafts compelling ad copy by describing product benefits and features to captivate an audience on a specific platform, including a strong call-to-action.', category: 'Advertising', createdAt: Date.now() - 40000, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1b', title: 'Targeted Ad Copy for Pain Points', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Write a compelling [Platform] ad copy that speaks directly to the pain points and desires of our [Target Audience], positioning [Product/Service Name] as the ultimate solution.\n\nFormat: Persuasive language and a description of compelling visuals.', description: 'Writes persuasive ad copy for a specific platform by directly addressing the target audience\'s pain points and desires.', category: 'Advertising', createdAt: Date.now() - 40100, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1c', title: 'Unique Selling Proposition Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Craft an engaging [Platform] ad copy that highlights the unique selling proposition of [Product/Service Name], distinguishing it from competitors.\n\nFormat: Ad copy that includes a memorable tagline or slogan to reinforce the brand message.', description: 'Creates engaging ad copy focused on a product\'s unique selling proposition to differentiate it from competitors.', category: 'Advertising', createdAt: Date.now() - 40200, framework: PromptFramework.RTF },
    { id: 'handbook-adv-1d', title: 'Testimonial/Case Study Ad Copy', promptText: 'Act as an: Advertising Copywriter.\n\nTask: Create an authentic [Platform] ad copy featuring a customer testimonial or case study that demonstrates the real-life benefits and success stories of using [Product/Service Name].\n\nFormat: A relatable and genuine ad copy that resonates with potential customers.', description: 'Generates authentic ad copy from customer testimonials to demonstrate real-life benefits and build trust.', category: 'Advertising', createdAt: Date.now() - 40300, framework: PromptFramework.RTF },
    
    // --- Content Creation Prompts ---
    { id: 'handbook-content-1a', title: 'Effective Writing Techniques', promptText: 'Act as a: Writing Coach.\n\nTask: Share tips and strategies for crafting compelling written content.\n\nFormat: A guide covering writing styles, sentence structure, and tone.', description: 'Get tips and strategies for compelling writing, covering styles, sentence structure, and tone.', category: 'Content Creation', createdAt: Date.now() - 41000, framework: PromptFramework.RTF },
    { id: 'handbook-content-1b', title: 'Editing for Clarity and Polish', promptText: 'Act as a: Professional Editor.\n\nTask: Provide guidance on editing techniques to enhance clarity, readability, and professionalism in written content.\n\nFormat: A list of actionable editing tips.', description: 'Learn editing techniques to improve clarity, readability, and professionalism in your writing.', category: 'Content Creation', createdAt: Date.now() - 41100, framework: PromptFramework.RTF },
    { id: 'handbook-content-1e', title: 'Storytelling in Writing', promptText: 'Act as a: Storytelling Expert.\n\nTask: Share insights on incorporating storytelling elements into written content.\n\nFormat: Explain how to use storytelling to engage readers and convey a clear message.', description: 'Learn how to use storytelling elements to make your written content more engaging and clear.', category: 'Content Creation', createdAt: Date.now() - 41200, framework: PromptFramework.RTF },
    
    // --- Copywriting Prompts ---
    { id: 'handbook-copywriting-1a', title: 'Attention-Grabbing Headlines', promptText: 'Act as a: Master Copywriter.\n\nTask: Share your best tips and tricks for creating headlines that grab readers\' attention, no matter the topic or industry.\n\nFormat: A list of strategies emphasizing powerful language, varying lengths, and considering the target audience.', description: 'Get tips and tricks for writing attention-grabbing headlines for any topic or industry.', category: 'Copywriting', createdAt: Date.now() - 42000, framework: PromptFramework.RTF },
    { id: 'handbook-copywriting-1c', title: 'Headlines with Numbers', promptText: 'Act as a: Data-driven Copywriter.\n\nTask: Explain why headlines that include numbers tend to perform better and share top strategies for incorporating them.\n\nFormat: An explanation followed by strategies like using odd numbers, lists, and specific statistics.', description: 'Learn how and why to use numbers in headlines to improve performance, with specific strategies.', category: 'Copywriting', createdAt: Date.now() - 42100, framework: PromptFramework.RTF },
    
    // --- Creative Writing Prompts ---
    { id: 'handbook-creative-1a', title: 'Develop Compelling Characters', promptText: 'Act as a: Creative Writing Professor.\n\nTask: Offer guidance on developing compelling characters in fiction writing.\n\nFormat: Discuss key considerations like backstory, motivation, and character flaws, and explain how to use character development to drive the plot.', description: 'Get guidance on creating compelling fictional characters with rich backstories, motivations, and flaws.', category: 'Creative Writing', createdAt: Date.now() - 43000, framework: PromptFramework.RTF },
    { id: 'handbook-creative-1b', title: 'Structure a Compelling Plot', promptText: 'Act as a: Creative Writing Professor.\n\nTask: Discuss the importance of plot structure in fiction writing and offer guidance on creating a compelling story arc.\n\nFormat: An explanation covering key considerations like the inciting incident, rising action, climax, and resolution.', description: 'Learn to structure a compelling plot for your story, from inciting incident to resolution.', category: 'Creative Writing', createdAt: Date.now() - 43100, framework: PromptFramework.RTF },

    // --- E-Commerce Prompts ---
    { id: 'handbook-ecommerce-1a', title: 'E-Commerce Platform Comparison', promptText: 'Act as a: E-commerce Consultant.\n\nTask: Provide a comparison of popular e-commerce platforms, such as Shopify, WooCommerce, and Magento.\n\nFormat: A comparison table or list including their features, pricing, and target audience.', description: 'Get a detailed comparison of popular e-commerce platforms like Shopify, WooCommerce, and Magento.', category: 'E-Commerce', createdAt: Date.now() - 44000, framework: PromptFramework.RTF },
    { id: 'handbook-ecommerce-2a', title: 'Design Principles for Online Stores', promptText: 'Act as a: UX/UI Designer specializing in e-commerce.\n\nTask: Discuss fundamental design principles for creating an effective and visually appealing online store.\n\nFormat: An explanation covering topics like color theory, typography, and layout.', description: 'Learn about the fundamental design principles for creating a beautiful and effective online store.', category: 'E-Commerce', createdAt: Date.now() - 44100, framework: PromptFramework.RTF },

    // --- Editing & Proofreading Prompts ---
    { id: 'handbook-editing-1a', title: 'Identify Common Grammar Errors', promptText: 'Act as a: Proofreader.\n\nTask: Discuss common grammar errors in written content.\n\nFormat: A list of common errors with guidance on how to identify and correct them.', description: 'Learn to identify and correct common grammar errors in your writing.', category: 'Editing & Proofreading', createdAt: Date.now() - 45000, framework: PromptFramework.RTF },
    { id: 'handbook-editing-2a', title: 'Spelling Tips and Tricks', promptText: 'Act as a: Writing Tutor.\n\nTask: Share helpful tips and strategies for improving spelling accuracy in writing.\n\nFormat: A list of actionable tips and tricks.', description: 'Get helpful tips and strategies to improve your spelling accuracy.', category: 'Editing & Proofreading', createdAt: Date.now() - 45100, framework: PromptFramework.RTF },
    
    // --- Goal Setting Prompts ---
    { id: 'handbook-goalsetting-1a', title: 'SMART Goals for Personal Development', promptText: 'Act as a: Personal Development Coach.\n\nTask: Discuss the benefits of setting SMART goals and provide examples.\n\nFormat: An explanation of SMART goals followed by specific, measurable, achievable, relevant, and time-bound goal examples in areas such as fitness, education, or career advancement.', description: 'Learn to set SMART goals for personal development with examples for fitness, education, and career.', category: 'Goal Setting', createdAt: Date.now() - 46000, framework: PromptFramework.RTF },
    { id: 'handbook-goalsetting-2a', title: 'Long-term Career Goal Planning', promptText: 'Act as a: Career Counselor.\n\nTask: Discuss the importance of setting long-term career goals and provide tips for creating a plan to achieve them.\n\nFormat: Tips that include acquiring necessary skills and networking.', description: 'Get tips on setting and planning long-term career goals, including skill acquisition and networking.', category: 'Goal Setting', createdAt: Date.now() - 46100, framework: PromptFramework.RTF },

    // --- Graphic Design Prompts ---
    { id: 'handbook-graphicdesign-1a', title: 'Achieving Balance in Design', promptText: 'Act as a: Graphic Design Instructor.\n\nTask: Explain the importance of balance in graphic design.\n\nFormat: An explanation with examples of how balance can be achieved through symmetrical or asymmetrical compositions.', description: 'Understand the importance of balance in graphic design with examples of symmetrical and asymmetrical compositions.', category: 'Graphic Design', createdAt: Date.now() - 47000, framework: PromptFramework.RTF },
    { id: 'handbook-graphicdesign-2a', title: 'Font Selection in Typography', promptText: 'Act as a: Typography Expert.\n\nTask: Discuss the importance of font selection in design.\n\nFormat: Recommend techniques for choosing appropriate fonts for different purposes and contexts.', description: 'Learn how to select the right fonts for different design purposes and contexts.', category: 'Graphic Design', createdAt: Date.now() - 47100, framework: PromptFramework.RTF },
    
    // --- Personal Finance Prompts ---
    { id: 'handbook-finance-1a', title: 'Debt Reduction Strategies', promptText: 'Act as a: Financial Advisor.\n\nTask: Analyze different debt reduction strategies and explain their effectiveness in achieving financial stability.\n\nFormat: An analysis with tips for choosing the best debt reduction method for individual circumstances.', description: 'Compare different debt reduction strategies and get tips on choosing the best one for you.', category: 'Personal Finance', createdAt: Date.now() - 48000, framework: PromptFramework.RTF },
    { id: 'handbook-finance-1b', title: 'Build an Emergency Fund', promptText: 'Act as a: Financial Planner.\n\nTask: Discuss the importance of having an emergency fund and provide strategies for building and maintaining one.\n\nFormat: An analysis of different options for saving and investing money in an emergency fund.', description: 'Learn why an emergency fund is important and get strategies for building and maintaining one.', category: 'Personal Finance', createdAt: Date.now() - 48100, framework: PromptFramework.RTF },
    
    // --- Persuasion & Influence Prompts ---
    { id: 'handbook-persuasion-1a', title: 'Active Listening for Rapport', promptText: 'Act as a: Communications Coach.\n\nTask: Discuss the importance of active listening in building rapport with others.\n\nFormat: Provide examples of active listening techniques and explain how they can help establish trust and understanding.', description: 'Learn active listening techniques to build rapport, trust, and understanding with others.', category: 'Persuasion & Influence', createdAt: Date.now() - 49000, framework: PromptFramework.RTF },
    { id: 'handbook-persuasion-2a', title: 'Persuasive Communication Techniques', promptText: 'Act as a: Persuasion Expert.\n\nTask: Discuss different persuasive techniques, such as using emotional appeals or logic.\n\nFormat: Explain how to use these techniques effectively to communicate your ideas.', description: 'Explore different persuasive techniques, including emotional appeals and logic, to communicate effectively.', category: 'Persuasion & Influence', createdAt: Date.now() - 49100, framework: PromptFramework.RTF },

    // --- Social Media Prompts ---
    { id: 'handbook-social-1a', title: 'Set Clear Social Media Goals', promptText: 'Act as a: Social Media Strategist.\n\nTask: Discuss the importance of setting clear social media goals and objectives for effective content creation and curation.\n\nFormat: Provide examples of how different goals can influence the type of content created and curated.', description: 'Learn to set clear social media goals and see how they influence content creation with examples.', category: 'Social Media', createdAt: Date.now() - 50000, framework: PromptFramework.RTF },
    { id: 'handbook-social-1b', title: 'Target Audience Analysis', promptText: 'Act as a: Social Media Manager.\n\nTask: Analyze a target audience to identify their preferences, interests, and pain points to create and curate resonant social media content.\n\nFormat: Provide tips on conducting audience research and adapting content to different social media platforms.', description: 'Analyze your target audience to create social media content that resonates, with tips on research and adaptation.', category: 'Social Media', createdAt: Date.now() - 50100, framework: PromptFramework.RTF },
];

const daveBirssPrompts: Prompt[] = [
    // Summarise
    { id: 'db-summarise-1', title: 'Summarise 1,000 Words', promptText: 'Act as a: Highly experienced writer who writes concise and readable text without stop words, filler words, or jargon.\n\nTask: Summarise the following text, highlighting the most important concepts.\n\nFormat: 1. A short paragraph of 100 words. 2. A bullet-point list of the most important points. 3. A one-sentence summary.\n\nText: "[TEXT]"', description: 'Concisely summarises a long text into a paragraph, bullet points, and a one-sentence summary.', category: 'Productivity', createdAt: Date.now() - 51000, framework: PromptFramework.RTF },
    { id: 'db-summarise-2', title: 'Summarise a Well-Known Book', promptText: 'Act as a: Highly experienced writer who writes concise and readable text without stop words, filler words or jargon.\n\nTask: Give me a summary of the book "[BOOK TITLE]" by [AUTHOR NAME], highlighting the most important concepts.\n\nFormat: A list of no more than 5 bullet points, followed by a one-sentence summary.', description: 'Summarises a well-known book into five key bullet points and a concluding sentence.', category: 'Learning', createdAt: Date.now() - 51100, framework: PromptFramework.RTF },
    { id: 'db-summarise-3', title: 'Summarise Current Academic Thinking', promptText: 'Act as a: Highly experienced academic writer who writes concise and readable text without stop words, filler words or jargon.\n\nTask: Give me a summary of current academic thinking around the field of [TOPIC], highlighting the most important concepts.\n\nFormat: A list of bullet points, followed by a one-sentence summary.', description: 'Provides a summary of current academic thinking on a specified topic, delivered as bullet points.', category: 'Research', createdAt: Date.now() - 51200, framework: PromptFramework.RTF },
    // Perspectives
    { id: 'db-perspectives-1', title: 'Identify Different Perspectives', promptText: 'Act as an: Expert in [TOPIC].\n\nTask: List as many different perspectives as there are on the topic. Think about it from the point of view of lots of different audiences who have an interest in the topic.\n\nFormat: A bullet-pointed list.', description: 'Identifies and lists various perspectives on a given topic from multiple audience viewpoints.', category: 'Ideation', createdAt: Date.now() - 52000, framework: PromptFramework.RTF },
    { id: 'db-perspectives-2', title: 'Identify Different Audiences', promptText: 'Act as a: Market Researcher.\n\nTask: List the different people who have an interest in [TOPIC] along with a summary of their perspectives and an understanding of their motivations.\n\nFormat: A table with the columns "Audience", "Perspective" and "Motivation".', description: 'Creates a table of different audiences for a topic, detailing their perspectives and motivations.', category: 'Marketing', createdAt: Date.now() - 52100, framework: PromptFramework.RTF },
    // Experts
    { id: 'db-experts-1', title: 'Get Advice from Smartest Thinkers', promptText: 'Act as a: [SUBJECT] expert with 30 years of experience and lots of awards for excellence.\n\nTask: Give your best advice on [TOPIC], drawing on research and best practice.\n\nFormat: An article using plain English and subheads to make it more readable.', description: 'Generates expert advice on a topic from the perspective of a seasoned, award-winning professional.', category: 'Role-Playing', createdAt: Date.now() - 53000, framework: PromptFramework.RTF },
    { id: 'db-experts-2', title: 'Get Advice from Industry Experts', promptText: 'Act as: [EXPERT NAME].\n\nTask: Give your best advice on [TOPIC], drawing from your writings, interviews and biographical information.\n\nFormat: An article from your own point of view using plain English and subheads to make it more readable.', description: 'Simulates a specific industry expert giving advice on a topic, based on their known work.', category: 'Role-Playing', createdAt: Date.now() - 53100, framework: PromptFramework.RTF },
    // Personas
    { id: 'db-personas-1', title: 'Identify Audiences for a Product', promptText: 'Act as an: Expert user experience designer with expertise in analysing audiences.\n\nTask: Create a list of possible audiences for [PRODUCT]. Tell me their profession, age and reason for needing the product.\n\nFormat: A table with the columns "Profession", "Age" and "Needs".', description: 'Creates a table of possible audiences for a product, including profession, age, and needs.', category: 'Marketing', createdAt: Date.now() - 54000, framework: PromptFramework.RTF },
    { id: 'db-personas-2', title: 'Generate User Personas', promptText: 'Act as an: Expert user experience designer, highly experienced at user research and finding valuable human insights.\n\nTask: Write me a user persona for [PERSON] who [SITUATION].\n\nFormat: Include a short biography, their goals, their needs and wants, their pain points, their motivations and who influences them most. Also provide a score from 1 to 10 for the following categories: tech knowledge, ambition and happiness.', description: 'Generates a detailed user persona for a specified person in a situation, including various psychological and demographic details.', category: 'Business', createdAt: Date.now() - 54100, framework: PromptFramework.RTF },
    // Strategy
    { id: 'db-strategy-1', title: 'Find a Strategic Model', promptText: 'Act as a: First-class strategic consultant who is an expert in using strategic models to help clarify thinking and reach effective solutions.\n\nTask: Suggest the best strategic models for [TASK].\n\nFormat: A list, stating the benefit of the model and a summary of how to use it.', description: 'Suggests the best strategic models for a given task, with benefits and usage summaries.', category: 'Frameworks', createdAt: Date.now() - 55000, framework: PromptFramework.RTF },
    { id: 'db-strategy-2', title: 'Fill in a Strategic Model', promptText: 'Act as a: First-class strategic consultant.\n\nTask: Fill in the [STRATEGIC MODEL] for a [COMPANY TYPE] that is [DETAILS OF SITUATION].\n\nFormat: A detailed example of the completed strategic model.', description: 'Fills out a specified strategic model with an example based on a company and situation.', category: 'Frameworks', createdAt: Date.now() - 55100, framework: PromptFramework.RTF },
    // Facts & Stats
    { id: 'db-facts-1', title: 'Research to Search For', promptText: 'Act as an: Expert researcher with the ability to find information that other people don\'t notice.\n\nTask: Supply me with 10 specific and powerful search engine queries I should use to find mind-blowing facts and statistics about [TOPIC & DETAILS].\n\nFormat: A table with two columns: "Search Term" and "Information we\'re looking for".', description: 'Generates 10 powerful search queries to find mind-blowing facts and stats on a topic.', category: 'Research', createdAt: Date.now() - 56000, framework: PromptFramework.RTF },
    { id: 'db-facts-2', title: 'Design Your Own Study', promptText: 'Act as an: Expert researcher with the ability to find information that other people don\'t notice.\n\nTask: Suggest five studies that could be done to discover interesting facts about [TOPIC & DETAILS]. Include a variety of study types (quantitative, qualitative, case studies, etc.).\n\nFormat: For each study, provide a title, a hypothesis, and a methodology.', description: 'Suggests five detailed scientific studies (including title, hypothesis, and methodology) to research a topic.', category: 'Research', createdAt: Date.now() - 56100, framework: PromptFramework.RTF },
    // Writing Style
    { id: 'db-style-1', title: 'Analyse Copy for Tone of Voice', promptText: 'Act as an: Expert linguist known for dissecting writing styles.\n\nTask: Analyze the following copy for its tone of voice. Do not comment on the content, only the style.\n\nFormat: 1. Give a score from 1-5 for "Funny vs. serious", "Formal vs. casual", "Respectful vs. irreverent", and "Enthusiastic vs. matter-of-fact". 2. Comment on person (first, second, third), use of examples, quotes, and facts. 3. State the intended audience. 4. Write a short paragraph with your overall analysis.\n\nCopy: "[TEXT]"', description: 'Performs a detailed linguistic analysis of a text\'s tone of voice across four dimensions and other stylistic elements.', category: 'Copywriting', createdAt: Date.now() - 57000, framework: PromptFramework.RTF },
    { id: 'db-style-2', title: 'Create a Prompt to Write in a Style', promptText: 'Act as an: Expert copywriter known for writing fluently in different styles.\n\nTask: Analyze the following copy for its tone-of-voice and stylistic elements (quotes, facts, jargon, stories, perspective, etc.).\n\nFormat: After your analysis, write a new prompt for ChatGPT that can be used to apply the same tone-of-voice characteristics to a different topic.\n\nCopy to analyze: "[TEXT]"', description: 'Analyzes a piece of text and generates a prompt that can be used to replicate its style on a different topic.', category: 'Copywriting', createdAt: Date.now() - 57100, framework: PromptFramework.RTF },
    // Headlines & Ideas
    { id: 'db-ideas-1', title: 'Generate Clickable Headlines', promptText: 'Act as an: Expert copywriter with 20+ years of experience in writing high-performing copy.\n\nTask: Write 10 high-performing, clickable headlines for [SUBJECT]. Use the following examples as inspiration.\n\nFormat: A bullet-point list.\n\nExamples: [EXAMPLES]', description: 'Generates 10 high-performing, clickable headlines for a subject, based on inspirational examples.', category: 'Marketing', createdAt: Date.now() - 58000, framework: PromptFramework.RTF },
    { id: 'db-ideas-2', title: 'Come Up With Article Ideas', promptText: 'Act as an: Expert copywriter with 20+ years of experience in writing high-performing copy.\n\nTask: Come up with 5 compelling and persuasive article ideas for [SUBJECT]. [MORE INFORMATION].\n\nFormat: For each idea, provide a headline followed by a paragraph describing the article\'s content and why it would be interesting.', description: 'Generates 5 compelling article ideas for a subject, including a descriptive paragraph for each.', category: 'Ideation', createdAt: Date.now() - 58100, framework: PromptFramework.RTF },
    // Outline Content
    { id: 'db-outline-1', title: 'Create a List of Messages', promptText: 'Act as an: Expert copywriter known for writing persuasive and easy-to-read text.\n\nTask: First, ask questions to gather the information you need about [SUBJECT] and [MORE INFORMATION]. Once you have the answers, list the most important points to make when writing an article about it.\n\nFormat: A table where the first column contains the copy point and the second column states whether it\'s primary or secondary information.', description: 'Gathers information by asking questions, then creates a prioritized list of messages for an article.', category: 'Content Creation', createdAt: Date.now() - 59000, framework: PromptFramework.RTF },
    { id: 'db-outline-2', title: 'Create a Flow For Your Copy', promptText: 'Act as an: Expert copywriter known for writing persuasive and easy-to-read text.\n\nTask: Use the information provided previously to write a suggested flow for [CONTENT TYPE].\n\nFormat: A bullet-point list outlining the copy flow.', description: 'Creates a suggested content flow in bullet points based on previously supplied information.', category: 'Content Creation', createdAt: Date.now() - 59100, framework: PromptFramework.RTF },
    // Improve Writing
    { id: 'db-improve-1', title: 'Rewrite Copy to Make it Better', promptText: 'Act as an: Expert copywriter with 20+ years of experience in writing high-performing copy.\n\nTask: Rewrite the following copy to make it better. Use a [TONE OF VOICE] tone. Remove filler words, stop words, jargon, and corporate language. Correct misspelled words and bad grammar. Vary sentence length to make it interesting.\n\nFormat: Easy-to-read paragraphs with subheads throughout. Do not use bullet points.\n\nCopy: "[TEXT]"', description: 'A comprehensive rewrite prompt to improve copy by adjusting tone, removing jargon, fixing errors, and improving flow.', category: 'Editing & Proofreading', createdAt: Date.now() - 60000, framework: PromptFramework.RTF },
    { id: 'db-improve-2', title: 'Suggest Improvements to Copy', promptText: 'Act as an: Expert copywriter with 20+ years of experience in writing high-performing copy.\n\nTask: Analyse the following copy and suggest improvements. Consider pace, content, structure, vocabulary, length, use of quotes, testimonials, stories, and other stylistic elements.\n\nFormat: A table with the columns: "suggested improvement", "example of how to implement" and "why this is valuable".\n\nCopy: "[TEXT]"', description: 'Provides structured, actionable feedback on a piece of writing in a table format.', category: 'Editing & Proofreading', createdAt: Date.now() - 60100, framework: PromptFramework.RTF },
    // Bonus
    { id: 'db-bonus-1', title: 'Challenge Your Point of View', promptText: 'Act as a: Master debater, adept at countering arguments with logic and persuasion.\n\nTask: Debate me on the topic of [TOPIC]. You must take the contrary view to whatever I put forward. Challenge my thinking and do your best to change my opinions using facts, examples, statistics, expert opinion, and other rhetorical methods.\n\nFormat: Start by asking me an interesting question about the topic.', description: 'Engages you in a debate, taking the contrary view to challenge your thinking on a topic.', category: 'Self Help', createdAt: Date.now() - 61000, framework: PromptFramework.RTF },
    { id: 'db-bonus-2', title: 'Identify Audience Needs', promptText: 'Act as a: Highly successful and experienced sales professional who understands audiences and what drives them to purchase a product.\n\nTask: Help me identify the needs of different audiences who might buy my product. Ask me questions one by one to learn about the product and why people use it.\n\nFormat: Once you have enough information, create a table listing each audience, their needs, and their most likely motivations to buy.', description: 'Acts as a sales professional to help you identify audience needs and purchase motivations for a product.', category: 'Sales', createdAt: Date.now() - 61100, framework: PromptFramework.RTF },
    { id: 'db-bonus-3', title: 'Articulate Sales Points', promptText: 'Act as a: Highly successful and experienced sales professional who knows what encourages people to buy.\n\nTask: Help me find and articulate the reasons why people would buy my product. Ask me questions one by one to learn about the product and the audience.\n\nFormat: Once you have enough information, create a numbered table listing the selling points, how they can be articulated, and whether they are of primary, secondary, or tertiary importance.', description: 'Helps find and articulate the key selling points for a product, prioritizing them by importance.', category: 'Sales', createdAt: Date.now() - 61200, framework: PromptFramework.RTF },
    { id: 'db-bonus-4', title: 'Teach Me Anything', promptText: 'Act as a: Highly experienced teacher with the ability to create simple step-by-step lessons on any subject.\n\nTask: Teach me [TOPIC] one concept at a time, building from basics to advanced lessons. Provide context, practical examples, and make each lesson distinct. After each lesson, you must ask if I want to move on or take a quiz.\n\nFormat: If I choose the quiz, provide five questions based on the lesson. Give feedback on my answers. If I get an answer wrong, ask if I want a recap. Do not provide the quiz or answers unless I ask for them.', description: 'A powerful prompt that turns the AI into a personalized tutor for any subject.', category: 'Learning', createdAt: Date.now() - 61300, framework: PromptFramework.RTF },
    { id: 'db-bonus-5', title: 'Step-by-Step Guide', promptText: 'Act as a: Highly experienced teacher with the ability to create simple step-by-step guides on any task.\n\nTask: Give me a step-by-step guide on how to [TASK].\n\nFormat: Start by telling me everything I\'ll need before I start (tools, ingredients, supplies). Then give the instructions for each step as a numbered list. If the instructions go on longer than 400 words ask me if I want to see the rest of the steps.', description: 'Generates a simple, step-by-step guide for any task, including a list of required items.', category: 'Productivity', createdAt: Date.now() - 61400, framework: PromptFramework.RTF },
];

const adobePrompts: Prompt[] = [
    // Finance Prompts
    { id: 'adobe-fin-1', title: 'Summarize Document into 5 Bullet Points', description: 'Quickly condenses the provided document into the five most essential bullet points.', promptText: 'Act as a: Research analyst.\n\nTask: Simplify this document into 5 bullet points.\n\nFormat: A bulleted list of the five most essential points.', category: 'Productivity', createdAt: Date.now() - 70000, framework: PromptFramework.RTF },
    { id: 'adobe-fin-2', title: 'Analyze Strategy Risks & Benefits', description: 'Generates a list of potential risks and benefits for a business strategy outlined in a document.', promptText: 'Act as a: Business strategist.\n\nTask: From the provided document, analyze the proposed strategy.\n\nFormat: A list of the potential risks and benefits of applying the strategy.', category: 'Business', createdAt: Date.now() - 70100, framework: PromptFramework.RTF },
    { id: 'adobe-fin-3', title: 'Compare Net Income to Prior Year', description: 'Compares the company\'s net income for the most recent quarter to the same quarter in the prior year.', promptText: 'Act as a: Financial analyst.\n\nTask: From the provided financial document, compare the company\'s net income for the most recent quarter to the same quarter in the prior year.\n\nFormat: A concise summary of the comparison.', category: 'Data Analysis', createdAt: Date.now() - 70200, framework: PromptFramework.RTF },
    { id: 'adobe-fin-4', title: 'Extract Key Quotes into a Table', description: 'Creates a table of key quotes from an article and identifies the roles of the people quoted.', promptText: 'Act as a: Research assistant.\n\nTask: Extract key quotes from this article.\n\nFormat: A table with two columns: "Key Quotes" and "Roles of People Quoted".', category: 'Productivity', createdAt: Date.now() - 70300, framework: PromptFramework.RTF },
    { id: 'adobe-fin-5', title: 'Identify Factors Impacting Buyers', description: 'Outlines factors from a document that could impact a buyer\'s decision-making process.', promptText: 'Act as a: Market analyst.\n\nTask: Analyze the provided document.\n\nFormat: A list of factors outlined in this document that could impact buyers\' decisions.', category: 'Sales', createdAt: Date.now() - 70400, framework: PromptFramework.RTF },
    { id: 'adobe-fin-6', title: 'Analyze Revenue Growth Drivers', description: 'Identifies the primary drivers of revenue growth or decline in the most recent quarter.', promptText: 'Act as a: Financial analyst.\n\nTask: From the provided financial report, identify the primary drivers of revenue growth or decline in the most recent quarter.\n\nFormat: A summary of the key drivers.', category: 'Data Analysis', createdAt: Date.now() - 70500, framework: PromptFramework.RTF },
    { id: 'adobe-fin-7', title: 'List All Key Stats', description: 'Extracts and lists all the key statistics mentioned in a document.', promptText: 'Act as a: Data extractor.\n\nTask: List all of the key stats in this document.\n\nFormat: A bulleted list of all statistics found.', category: 'Data Analysis', createdAt: Date.now() - 70600, framework: PromptFramework.RTF },
    { id: 'adobe-fin-8', title: 'Draft Email Explaining an Investment', description: 'Writes an email to team members explaining why a potential investment warrants further exploration.', promptText: 'Act as a: Senior Investment Analyst.\n\nTask: Draft an email to my team members explaining why a potential investment warrants additional exploration, based on the attached document.\n\nFormat: A professional and persuasive email.', category: 'Business', createdAt: Date.now() - 70700, framework: PromptFramework.RTF },
    { id: 'adobe-fin-9', title: 'Draft Email Explaining Profit Growth', description: 'Writes an email to the team explaining the reasons behind the current quarter\'s profit increase compared to the last.', promptText: 'Act as a: CFO.\n\nTask: Write an email to my team that explains why this quarter\'s profits are up compared to last year, based on the attached report.\n\nFormat: A clear and concise email.', category: 'Business', createdAt: Date.now() - 70800, framework: PromptFramework.RTF },
    { id: 'adobe-fin-10', title: 'Summarize Report Appendices', description: 'Summarizes the content found in the appendices of a report.', promptText: 'Act as a: Research assistant.\n\nTask: Summarize the content in this report\'s appendices.\n\nFormat: A concise summary.', category: 'Productivity', createdAt: Date.now() - 70900, framework: PromptFramework.RTF },
    { id: 'adobe-fin-11', title: 'Ask Questions as CEO', description: 'Acts as a CEO and formulates 3 critical questions to ask about a given report.', promptText: 'Act as a: CEO.\n\nTask: After reviewing this report, formulate 3 critical questions you would ask.\n\nFormat: A numbered list of three questions.', category: 'Role-Playing', createdAt: Date.now() - 71000, framework: PromptFramework.RTF },
    { id: 'adobe-fin-12', title: 'Analyze Cash Flow Changes', description: 'Analyzes how the company\'s cash flow from operations has changed compared to the last quarter.', promptText: 'Act as a: Financial analyst.\n\nTask: Analyze how the company\'s cash flow from operations has changed compared to last quarter, based on the provided report.\n\nFormat: A brief analysis of the changes.', category: 'Data Analysis', createdAt: Date.now() - 71100, framework: PromptFramework.RTF },
    { id: 'adobe-fin-13', title: 'Create Analyst Job Description', description: 'Creates a job description for an analyst based on a list of skills outlined in a document.', promptText: 'Act as a: Hiring Manager.\n\nTask: Create a job description for an analyst.\n\nFormat: A standard job description based on the skills outlined in this report.', category: 'Career', createdAt: Date.now() - 71200, framework: PromptFramework.RTF },
    { id: 'adobe-fin-14', title: 'Find Small Business Applications', description: 'Identifies potential applications of data or findings for a small business owner.', promptText: 'Act as a: Small Business Consultant.\n\nTask: Review this data.\n\nFormat: A list of potential applications of this data for a small business owner.', category: 'Business', createdAt: Date.now() - 71300, framework: PromptFramework.RTF },
    // Sales Prompts
    { id: 'adobe-sales-1', title: 'Generate Follow-Up Email', description: 'Writes a follow-up email to a potential client after a meeting, summarizing key discussion points and next steps.', promptText: 'Act as a: Salesperson.\n\nTask: Draft a follow-up email to [Client Name] after our meeting about [Topic].\n\nFormat: A professional email summarizing key discussion points and next steps.', category: 'Sales', createdAt: Date.now() - 72000, framework: PromptFramework.RTF },
    { id: 'adobe-sales-2', title: 'Identify Sales Objections', description: 'Analyzes a document to identify potential sales objections and suggests counter-arguments.', promptText: 'Act as a: Sales coach.\n\nTask: Based on this proposal, identify 3 potential sales objections a client might have.\n\nFormat: For each objection, suggest a response.', category: 'Sales', createdAt: Date.now() - 72100, framework: PromptFramework.RTF },
    // Marketing Prompts
    { id: 'adobe-mktg-1', title: 'Draft a Blog Post from Report', description: 'Creates a draft for a blog post based on the findings in an attached report.', promptText: 'Act as a: Content marketer.\n\nTask: Write a blog post based on the key findings in this report.\n\nFormat: A 500-word blog post.', category: 'Marketing', createdAt: Date.now() - 73000, framework: PromptFramework.RTF },
    { id: 'adobe-mktg-2', title: 'Suggest Social Media Posts', description: 'Generates 3 social media posts (for Twitter, LinkedIn, and Instagram) to promote a report or announcement.', promptText: 'Act as a: Social media manager.\n\nTask: Suggest 3 social media posts to promote the launch announced in this document.\n\nFormat: One post for Twitter, one for LinkedIn, and one for Instagram.', category: 'Marketing', createdAt: Date.now() - 73100, framework: PromptFramework.RTF },
    // HR Prompts
    { id: 'adobe-hr-1', title: 'Draft Job Description', description: 'Creates a job description for a specific role, based on a summary of responsibilities.', promptText: 'Act as a: Recruiter.\n\nTask: Draft a job description for a [Job Title].\n\nFormat: A standard job description including the following responsibilities: [List of responsibilities].', category: 'Career', createdAt: Date.now() - 74000, framework: PromptFramework.RTF },
    { id: 'adobe-hr-2', title: 'Summarize Candidate Resume', description: 'Summarizes a candidate\'s resume, highlighting their key skills, experience, and qualifications.', promptText: 'Act as a: Technical Recruiter.\n\nTask: Summarize this resume.\n\nFormat: 5 bullet points, focusing on experience relevant to a [Job Title] role.', category: 'Career', createdAt: Date.now() - 74100, framework: PromptFramework.RTF },
];

const everydayWorkPrompts: Prompt[] = [
    { id: 'ew-task-1', title: 'Meeting Summarizer', promptText: 'Act as a: Meeting summarizer.\n\nTask: Provide a concise summary of this meeting transcript: [Insert Text].\n\nFormat: A summary that highlights action items, deadlines, and key points. Use bullet points for clarity.', description: 'Summarizes meeting transcripts, highlighting key information.', category: 'Productivity', createdAt: Date.now() - 80000, framework: PromptFramework.RTF },
    { id: 'ew-task-2', title: 'Professional Email Reply', promptText: 'Act as a: Professional communications assistant.\n\nTask: Help me write a professional email response to this: [Insert Email Text].\n\nFormat: A concise, polite, and informative response that highlights action items.', description: 'Drafts a professional and concise email response.', category: 'Productivity', createdAt: Date.now() - 80100, framework: PromptFramework.RTF },
    { id: 'ew-task-3', title: 'Optimized Task Schedule', promptText: 'Act as a: Productivity planner.\n\nTask: I have these daily tasks: [List of Tasks]. Suggest an optimized schedule to complete them efficiently.\n\nFormat: A schedule that is prioritized based on deadlines and effort required.', description: 'Creates an optimized schedule from a list of tasks.', category: 'Productivity', createdAt: Date.now() - 80200, framework: PromptFramework.RTF },
    { id: 'ew-task-4', title: 'Brainstorming Assistant', promptText: 'Act as a: Creative assistant.\n\nTask: Assist me in brainstorming ideas for [Project or Topic].\n\nFormat: At least five creative and actionable suggestions to save time.', description: 'Generates creative and actionable brainstorming ideas.', category: 'Ideation', createdAt: Date.now() - 80300, framework: PromptFramework.RTF },
    { id: 'ew-task-5', title: 'Weekly Report Template', promptText: 'Act as a: Project Manager.\n\nTask: Create a template for a weekly report.\n\nFormat: A professional and concise template for summarizing: [Categories]. It should be easy to update every week.', description: 'Creates a professional template for a weekly report.', category: 'Business', createdAt: Date.now() - 80400, framework: PromptFramework.RTF },
    { id: 'ew-task-6', title: 'Concise Document Summary', promptText: 'Act as a: Document summarizer.\n\nTask: Summarize this document: [Insert Text].\n\nFormat: Extract the most critical points, objectives, and action items in under 100 words.', description: 'Summarizes a document to its most critical points in under 100 words.', category: 'Productivity', createdAt: Date.now() - 80500, framework: PromptFramework.RTF },
    { id: 'ew-task-7', title: 'Meeting Preparation Helper', promptText: 'Act as a: Strategic advisor.\n\nTask: Help me prepare for this meeting: [Insert Agenda].\n\nFormat: Suggest key questions to ask, points to raise, and documents to prepare.', description: 'Helps prepare for a meeting by suggesting questions and points to raise.', category: 'Productivity', createdAt: Date.now() - 80600, framework: PromptFramework.RTF },
    { id: 'ew-task-8', title: 'Remote Productivity Tips', promptText: 'Act as a: Remote work consultant.\n\nTask: Generate a list of quick tips to improve productivity while working remotely.\n\nFormat: A list of tips focusing on time-saving tools and practices.', description: 'Generates quick tips for improving remote work productivity.', category: 'Productivity', createdAt: Date.now() - 80700, framework: PromptFramework.RTF },
    { id: 'ew-task-9', title: 'Project Update Draft', promptText: 'Act as a: Team Lead.\n\nTask: Draft a quick project update message for my team on this topic: [Insert Topic].\n\nFormat: A concise message including key updates and next steps.', description: 'Drafts a concise project update message for a team.', category: 'Business', createdAt: Date.now() - 80800, framework: PromptFramework.RTF },
    { id: 'ew-task-10', title: 'Checklist Review and Streamlining', promptText: 'Act as a: Process optimization expert.\n\nTask: Review this checklist: [Insert Checklist].\n\nFormat: Suggestions on how to streamline or automate any steps to save time.', description: 'Reviews a checklist and suggests ways to streamline it.', category: 'Productivity', createdAt: Date.now() - 80900, framework: PromptFramework.RTF },
];

const productivityBoostPrompts: Prompt[] = [
    { id: 'pb-prompt-1', title: 'Getting Things Done (GTD)', promptText: "Act as a: Productivity expert specializing in Getting Things Done (GTD).\n\nTask: Help me process my scattered notes, emails, and tasks. Your goal is to guide me in creating a system to collect, clarify, and organize everything.\n\nFormat: Provide a step-by-step plan to implement a GTD system for my items.", description: 'Capture, clarify & organise everything that has your attention.', category: 'Productivity', createdAt: Date.now() - 81000, framework: PromptFramework.RTF },
    { id: 'pb-prompt-2', title: 'Pomodoro Technique', promptText: "Act as a: Time management coach.\n\nTask: Help me break down the task of 'writing a client proposal' into 4 Pomodoros.\n\nFormat: For each Pomodoro, provide a clear focus point. Also, suggest what I should do during each short break.", description: 'Work in focused sprints with structured breaks.', category: 'Productivity', createdAt: Date.now() - 81100, framework: PromptFramework.RTF },
    { id: 'pb-prompt-3', title: "Eat The Frog", promptText: "Act as a: Procrastination coach.\n\nTask: My most important task ('the frog') is 'updating my portfolio,' which I've been putting off for a week. Help me break it down into manageable steps.\n\nFormat: A schedule that sets this task as the first thing I do tomorrow.", description: 'Tackle your hardest, highest-value task first.', category: 'Productivity', createdAt: Date.now() - 81200, framework: PromptFramework.RTF },
    { id: 'pb-prompt-4', title: 'Time Blocking', promptText: "Act as a: Personal scheduler.\n\nTask: Plan my workday from 9 AM to 5 PM using time blocking.\n\nFormat: A schedule with specific blocks of time for meetings, admin, and breaks. Prioritize creative work in the morning.", description: 'Schedule every hour with intention to reduce decision fatigue.', category: 'Productivity', createdAt: Date.now() - 81300, framework: PromptFramework.RTF },
    { id: 'pb-prompt-5', title: "Parkinson's Law", promptText: "Act as a: Efficiency expert.\n\nTask: I usually spend 2 hours writing my weekly newsletter. Help me apply Parkinson's Law to shrink the time this task takes.\n\nFormat: A 1-hour time structure with specific time budgets for drafting, editing, and formatting.", description: 'Work shrinks or expands to fit the time given.', category: 'Productivity', createdAt: Date.now() - 81400, framework: PromptFramework.RTF },
    { id: 'pb-prompt-6', title: '80/20 Rule (Pareto Principle)', promptText: "Act as a: Strategy consultant.\n\nTask: Analyze my task list for this week and apply the Pareto Principle (80/20 rule).\n\nFormat: Identify the 20% of tasks that will deliver 80% of the results, and suggest what I can defer or delegate.\n\nTask List: [paste list]", description: 'Focus on the few tasks that deliver the most impact.', category: 'Productivity', createdAt: Date.now() - 81500, framework: PromptFramework.RTF },
    { id: 'pb-prompt-7', title: 'Ivy Lee Method', promptText: "Act as a: Productivity guide using the Ivy Lee Method.\n\nTask: Based on my current goals, help me prioritize the 6 most important tasks for tomorrow.\n\nFormat: Show me only the next task once the previous one is complete.", description: 'End your day by listing six tasks for tomorrow, ranked by priority.', category: 'Productivity', createdAt: Date.now() - 81600, framework: PromptFramework.RTF },
    { id: 'pb-prompt-8', title: 'MIT (Most Important Task) Method', promptText: "Act as a: Focus coach.\n\nTask: I have 3 key things to do tomorrow: prepare a demo, answer investor questions, and plan Q3 content. Help me determine my Most Important Task (MIT).\n\nFormat: Tell me which task should be my MIT and explain why.", description: 'Start your day with the one task that matters most.', category: 'Productivity', createdAt: Date.now() - 81700, framework: PromptFramework.RTF },
    { id: 'pb-prompt-9', title: 'Zeigarnik Effect', promptText: "Act as a: Mental clarity coach.\n\nTask: I have several half-done projects piling up (an onboarding doc, a team handover guide, documentation review), which is causing mental clutter due to the Zeigarnik Effect.\n\nFormat: Help me prioritize one of these projects to finish today.", description: 'Our brains fixate on unfinished tasks.', category: 'Productivity', createdAt: Date.now() - 81800, framework: PromptFramework.RTF },
    { id: 'pb-prompt-10', title: '2-Minute Rule', promptText: "Act as a: Taskmaster.\n\nTask: Analyze this list of 15 small tasks and identify which ones can be completed in under 2 minutes.\n\nFormat: Create a 'Quick Wins' list containing only the tasks that follow the 2-minute rule.\n\nTask List: [paste list]", description: 'If it takes less than 2 minutes, do it now.', category: 'Productivity', createdAt: Date.now() - 81900, framework: PromptFramework.RTF },
    { id: 'pb-prompt-11', title: 'Time Tracking', promptText: "Act as a: Time management analyst.\n\nTask: I want to track how I use my time this week. Help me set up 5 categories: deep work, admin, email, distraction, and breaks.\n\nFormat: Build a daily log template based on these categories.", description: 'Know where your time actually goes.', category: 'Productivity', createdAt: Date.now() - 82000, framework: PromptFramework.RTF },
    { id: 'pb-prompt-12', title: 'Daily Highlight', promptText: "Act as a: Daily planner.\n\nTask: Tomorrow's schedule is packed with meetings. Suggest one meaningful 'highlight' task I can fit in.\n\nFormat: A suggestion for one task that would still make the day feel productive.", description: 'Choose one priority that will make the day feel successful.', category: 'Productivity', createdAt: Date.now() - 82100, framework: PromptFramework.RTF },
    { id: 'pb-prompt-13', title: 'SMART Goals', promptText: "Act as a: Goal-setting expert.\n\nTask: Take my general goal of 'growing my LinkedIn following' and transform it into a SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound).\n\nFormat: Provide the new SMART goal and a weekly plan I can follow to achieve it.", description: 'Set goals that are specific, measurable, achievable, relevant and time-bound.', category: 'Goal Setting', createdAt: Date.now() - 82200, framework: PromptFramework.RTF },
    { id: 'pb-prompt-14', title: 'WOOP Method', promptText: "Act as a: Success coach specializing in the WOOP (Wish, Outcome, Obstacle, Plan) method.\n\nTask: Help me apply the WOOP method to achieve my goal of reading for 30 minutes every night. Create a plan that specifically addresses obstacles like being tired or distracted.\n\nFormat: Guide me through the WOOP process for my goal, resulting in a clear plan.", description: 'Wish, outcome, obstacle, plan. A mental strategy that builds follow-through.', category: 'Goal Setting', createdAt: Date.now() - 82300, framework: PromptFramework.RTF },
    { id: 'pb-prompt-15', title: "Don't Break the Chain", promptText: "Act as a: Habit formation coach.\n\nTask: I want to post daily on X for 30 days. Help me use the 'Don't Break the Chain' method.\n\nFormat: Create a simple streak tracker and give me a quick tip to stay on track when I feel like skipping.", description: 'Use daily streaks to build consistency.', category: 'Productivity', createdAt: Date.now() - 82400, framework: PromptFramework.RTF },
    { id: 'pb-prompt-16', title: 'Bullet Journaling', promptText: "Act as a: Bullet Journaling expert.\n\nTask: Help me start a bullet journal.\n\nFormat: Create an annual log, monthly log, daily log, and future log. Include page setup ideas and example entries for each.", description: 'Track tasks, thoughts and goals in a structured format.', category: 'Productivity', createdAt: Date.now() - 82500, framework: PromptFramework.RTF },
    { id: 'pb-prompt-17', title: 'Routines and Rituals', promptText: "Act as a: Habit stacking specialist.\n\nTask: Build me a 10-minute morning routine that stacks journaling, drinking water, and movement.\n\nFormat: A simple routine that explains the clear triggers and the order of actions.", description: 'Stack small actions into repeatable systems.', category: 'Productivity', createdAt: Date.now() - 82600, framework: PromptFramework.RTF },
    { id: 'pb-prompt-18', title: 'Eisenhower Matrix', promptText: "Act as a: Decision-making expert.\n\nTask: I have 12 things to do this week. Help me sort them using the Eisenhower Matrix (Urgent/Important).\n\nFormat: Place my tasks into the four quadrants of the Eisenhower Matrix and suggest what I can drop or delegate.\n\nTask List: [paste list]", description: 'Sort tasks by urgency and importance.', category: 'Productivity', createdAt: Date.now() - 82700, framework: PromptFramework.RTF },
    { id: 'pb-prompt-19', title: 'Task Batching', promptText: "Act as an: Efficiency planner.\n\nTask: I have writing, admin, and outreach tasks to do today. Help me organize them using task batching.\n\nFormat: Group the tasks into three batches and suggest a time slot to handle each with focused attention.", description: 'Group similar tasks to reduce context switching.', category: 'Productivity', createdAt: Date.now() - 82800, framework: PromptFramework.RTF },
    { id: 'pb-prompt-20', title: 'Weekly Review (GTD-style)', promptText: "Act as a: GTD practitioner.\n\nTask: Guide me through a Friday weekly review.\n\nFormat: A series of questions that help me list what went well, what I didn't finish, and help me set priorities for next week based on current projects.", description: 'Reflect, reset and refocus.', category: 'Productivity', createdAt: Date.now() - 82900, framework: PromptFramework.RTF },
  ];
  
const flowGptPrompts: Prompt[] = [
    { id: 'flow-1', title: 'The Ultimate Fact-Checker', promptText: 'Act as a: Diligent fact-checker with a neutral and objective tone.\n\nTask: Verify the accuracy of the provided statement using reliable and verified sources.\n\nFormat: For the statement, provide a verdict of "Fact," "False," or "Uncertain," and include a brief explanation along with the source of information.\n\nStatement: [Statement]', description: 'Acts as a diligent fact-checker, verifying statements with sources.', category: 'Research', createdAt: Date.now() - 90000, framework: PromptFramework.RTF },
    { id: 'flow-2', title: 'The Perfect Tweet Composer', promptText: 'Act as a: Perfect tweet composer.\n\nTask: I will provide you with a topic, and you will generate a tweet that is engaging, concise, and optimized for Twitter\'s platform.\n\nFormat: Your tweet should be under 280 characters, include relevant hashtags, and have a clear call-to-action if applicable.\n\nTopic: [Topic]', description: 'Generates engaging and optimized tweets for any topic.', category: 'Social Media', createdAt: Date.now() - 90100, framework: PromptFramework.RTF },
    { id: 'flow-3', title: 'Unleash Your Inner Poet', promptText: 'Act as a: Poet and creative partner.\n\nTask: I will provide you with a theme or a set of keywords, and you will compose a poem that captures the essence of the given prompt.\n\nFormat: Feel free to experiment with different poetic styles, such as sonnets, haikus, or free verse.\n\nTheme: [Theme]', description: 'Acts as a creative partner to craft poems on any theme.', category: 'Creative Writing', createdAt: Date.now() - 90200, framework: PromptFramework.RTF },
    { id: 'flow-4', title: 'Code Review Master', promptText: 'Act as a: Senior software engineer and a code review master.\n\nTask: Perform a thorough code review on the provided code snippet in [Programming Language]. Your review should identify potential bugs, performance issues, and suggest improvements in code style and readability.\n\nFormat: Provide your feedback in a constructive and clear manner.\n\nCode: [Code Snippet]', description: 'Performs a thorough code review for any programming language.', category: 'Code Generation', createdAt: Date.now() - 90300, framework: PromptFramework.RTF },
    { id: 'flow-5', title: 'Landing Page Copywriter', promptText: 'Act as a: Conversion-focused copywriter.\n\nTask: Create compelling and persuasive landing page copy for a [Product/Service]. The target audience is [Target Audience].\n\nFormat: The copy should be engaging, clear, and designed to convert visitors into customers. Include a strong headline, a captivating introduction, and a clear call-to-action.', description: 'Creates persuasive landing page copy to convert visitors.', category: 'Copywriting', createdAt: Date.now() - 90400, framework: PromptFramework.RTF },
];

const zenPrompts: Prompt[] = [
    // Core Prompting
    { id: 'zen-core-1', title: 'Assume a Persona', promptText: 'Assume the persona of a [ROLE].', description: 'Instructs the AI to adopt a specific role or character for its response.', category: 'Fundamentals', createdAt: Date.now() - 120000 },
    { id: 'zen-core-2', title: 'Define the Audience', promptText: 'The audience for this is [AUDIENCE].', description: 'Specifies the target audience for the AI\'s output, influencing tone and complexity.', category: 'Fundamentals', createdAt: Date.now() - 120100 },
    { id: 'zen-core-3', title: 'Set the Format', promptText: 'Provide the output as [FORMAT].', description: 'Defines the desired structure for the AI\'s response (e.g., a list, JSON, a table).', category: 'Fundamentals', createdAt: Date.now() - 120200 },
    { id: 'zen-core-4', title: 'Chain of Thought', promptText: 'Think step-by-step.', description: 'Encourages the AI to break down its reasoning process, leading to more logical answers.', category: 'Advanced Techniques', createdAt: Date.now() - 120300 },
    { id: 'zen-core-5', title: 'Provide Examples (Few-shot)', promptText: 'Here are some examples:\n[EXAMPLE 1]\n[EXAMPLE 2]\nNow, complete this: [TASK]', description: 'Gives the AI concrete examples to follow, improving accuracy and style matching.', category: 'Advanced Techniques', createdAt: Date.now() - 120400 },
    // Ideation
    { id: 'zen-ideation-1', title: 'Brainstorm Ideas', promptText: 'Act as a: Creative strategist.\n\nTask: Brainstorm a list of ideas for [TOPIC].\n\nFormat: A list of at least 10 distinct ideas.', description: 'Generates a list of creative ideas related to a specified topic.', category: 'Ideation', createdAt: Date.now() - 121000, framework: PromptFramework.RTF },
    { id: 'zen-ideation-2', title: 'Generate Analogies', promptText: 'Act as a: Teacher who excels at making complex topics simple.\n\nTask: Generate 5 analogies to explain [COMPLEX TOPIC].\n\nFormat: A numbered list of analogies.', description: 'Creates simple analogies to make a complex topic easier to understand.', category: 'Ideation', createdAt: Date.now() - 121100, framework: PromptFramework.RTF },
    // Summarization
    { id: 'zen-summary-1', title: 'Summarize Key Points', promptText: 'Act as a: Text summarizer.\n\nTask: Summarize the key points of the following text.\n\nFormat: A short paragraph.\n\nText:\n[TEXT]', description: 'Condenses a long text into a brief paragraph highlighting the main ideas.', category: 'Productivity', createdAt: Date.now() - 122000, framework: PromptFramework.RTF },
    { id: 'zen-summary-2', title: 'Extract Action Items', promptText: 'Act as a: Productivity assistant.\n\nTask: Extract all action items from this text.\n\nFormat: A bulleted list.\n\nText:\n[TEXT]', description: 'Pulls out specific tasks or to-do items from a piece of text.', category: 'Productivity', createdAt: Date.now() - 122100, framework: PromptFramework.RTF },
    // Rewriting
    { id: 'zen-rewrite-1', title: 'Change the Tone', promptText: 'Act as an: Expert editor.\n\nTask: Rewrite the following text in a more [TONE] tone.\n\nFormat: The rewritten text.\n\nText:\n[TEXT]', description: 'Alters the tone of a text to be more formal, casual, persuasive, etc.', category: 'Editing & Proofreading', createdAt: Date.now() - 123000, framework: PromptFramework.RTF },
    { id: 'zen-rewrite-2', title: 'Simplify for a 5th Grader', promptText: 'Act as a: 5th-grade teacher.\n\nTask: Explain the following concept.\n\nFormat: An explanation simple enough for a 5th grader to understand.\n\nConcept:\n[CONCEPT]', description: 'Simplifies complex language and concepts for a younger audience.', category: 'Education', createdAt: Date.now() - 123100, framework: PromptFramework.RTF },
    // Structured Output
    { id: 'zen-structured-1', title: 'Create a Table', promptText: 'Act as a: Data formatter.\n\nTask: Create a markdown table with the columns: [COLUMN 1], [COLUMN 2].\n\nFormat: A markdown table populated with this data: [DATA]', description: 'Generates a markdown table from provided data and column headers.', category: 'Data Analysis', createdAt: Date.now() - 124000, framework: PromptFramework.RTF },
    { id: 'zen-structured-2', title: 'Generate JSON', promptText: 'Act as a: Data formatter.\n\nTask: Generate a JSON object based on this data: [DATA].\n\nFormat: A JSON object with the following structure: [JSON STRUCTURE]', description: 'Creates a JSON object based on a specified structure and input data.', category: 'Code Generation', createdAt: Date.now() - 124100, framework: PromptFramework.RTF },
];

const marketingAndSalesPrompts: Prompt[] = [
    { id: 'ms-1', title: 'Create a Buyer Persona', promptText: 'Act as a: Market Research Analyst.\n\nTask: Create a detailed buyer persona for my product, a [PRODUCT DESCRIPTION].\n\nFormat: A persona that includes demographics, goals, pain points, and watering holes.', description: 'Develops a comprehensive buyer persona for targeted marketing.', category: 'Marketing', createdAt: Date.now() - 130000, framework: PromptFramework.RTF },
    { id: 'ms-2', title: 'AIDA Copywriting Framework', promptText: 'Act as a: Copywriter.\n\nTask: Write a piece of copy for my [PRODUCT/SERVICE] using the AIDA framework.\n\nFormat: Copy structured into four sections: Attention, Interest, Desire, Action.', description: 'Uses the AIDA model to create persuasive marketing copy.', category: 'Copywriting', createdAt: Date.now() - 130100, framework: PromptFramework.RTF },
    { id: 'ms-3', title: 'PAS Copywriting Framework', promptText: 'Act as a: Copywriter.\n\nTask: Write a piece of copy for my [PRODUCT/SERVICE] using the PAS framework.\n\nFormat: Copy structured into three sections: Problem, Agitate, Solution.', description: 'Uses the PAS model to highlight a problem and present the solution.', category: 'Copywriting', createdAt: Date.now() - 130200, framework: PromptFramework.RTF },
    { id: 'ms-4', title: 'Before-After-Bridge Copywriting', promptText: 'Act as a: Copywriter.\n\nTask: Write a piece of copy for my [PRODUCT/SERVICE] using the Before-After-Bridge framework.\n\nFormat: Copy structured into three sections: Before, After, Bridge.', description: 'Uses the BAB model to illustrate transformation.', category: 'Copywriting', createdAt: Date.now() - 130300, framework: PromptFramework.RTF },
    { id: 'ms-5', title: 'Social Media Content Calendar', promptText: 'Act as a: Social Media Manager.\n\nTask: Create a 1-week social media content calendar for a [COMPANY TYPE] on [PLATFORM].\n\nFormat: A table that includes post ideas, copy, and suggested visuals.', description: 'Generates a structured content calendar for social media.', category: 'Social Media', createdAt: Date.now() - 130400, framework: PromptFramework.RTF },
    { id: 'ms-6', title: 'Blog Post Ideas', promptText: 'Act as a: Content Strategist.\n\nTask: Generate 10 blog post ideas for a company that sells [PRODUCT/SERVICE]. The target audience is [AUDIENCE].\n\nFormat: A numbered list of blog post titles.', description: 'Brainstorms relevant and engaging blog post topics.', category: 'Content Creation', createdAt: Date.now() - 130500, framework: PromptFramework.RTF },
    { id: 'ms-7', title: 'SEO Keyword Ideas', promptText: 'Act as an: SEO Specialist.\n\nTask: Generate a list of 20 long-tail keywords for the topic "[TOPIC]".\n\nFormat: Group the keywords by user intent (informational, commercial, transactional).', description: 'Provides a list of SEO keywords categorized by user intent.', category: 'Marketing', createdAt: Date.now() - 130600, framework: PromptFramework.RTF },
    { id: 'ms-8', title: 'Value Proposition Canvas', promptText: 'Act as a: Business Strategist.\n\nTask: Fill out a Value Proposition Canvas for my [PRODUCT/SERVICE]. The target customer segment is [CUSTOMER SEGMENT].\n\nFormat: A completed Value Proposition Canvas.', description: 'Helps articulate the value proposition by mapping customer needs to product features.', category: 'Business', createdAt: Date.now() - 130700, framework: PromptFramework.RTF },
    { id: 'ms-9', title: 'Sales Email for a Lead', promptText: 'Act as a: Sales Development Representative.\n\nTask: Write a personalized sales email to a potential lead named [NAME] who works at [COMPANY] in the [INDUSTRY]. I am selling [MY PRODUCT/SERVICE]. Mention their recent [ACHIEVEMENT/POST].\n\nFormat: A professional and personalized email.', description: 'Crafts a personalized sales email to a specific lead.', category: 'Sales', createdAt: Date.now() - 130800, framework: PromptFramework.RTF },
    { id: 'ms-10', title: 'Overcome Sales Objections', promptText: 'Act as a: Sales Coach.\n\nTask: My potential customer has the following objection: "[OBJECTION]".\n\nFormat: Provide 3 different ways to respond to and overcome this objection.', description: 'Generates responses to common sales objections.', category: 'Sales', createdAt: Date.now() - 130900, framework: PromptFramework.RTF },
];

const chatGptGuidePrompts: Prompt[] = [
    { id: 'guide-prompt-1', title: 'Daily Reminder', promptText: 'Set a reminder for today\'s meeting at 3 PM.', description: 'A simple prompt to set a reminder for an event.', category: 'Productivity', createdAt: Date.now() - 140000 },
    { id: 'guide-prompt-2', title: 'Top 3 Tasks', promptText: 'What are the top three tasks I need to accomplish today?', description: 'Helps you identify and prioritize your most important tasks for the day.', category: 'Productivity', createdAt: Date.now() - 140100 },
    { id: 'guide-prompt-3', title: 'Weekly Priority Check', promptText: 'Review and adjust my priorities for the upcoming week.', description: 'A prompt to help you reflect on and organize your weekly priorities.', category: 'Productivity', createdAt: Date.now() - 140200 },
    { id: 'guide-prompt-4', title: 'Daily Goal Setting', promptText: 'Define clear and achievable goals for the day ahead.', description: 'Aids in setting specific and realistic goals for daily success.', category: 'Goal Setting', createdAt: Date.now() - 140300 },
    { id: 'guide-prompt-5', title: 'Insightful Check-In', promptText: 'Reflect on a recent challenge and identify a lesson learned.', description: 'Encourages self-reflection to learn from past challenges.', category: 'Personal Development', createdAt: Date.now() - 140400 },
    { id: 'guide-prompt-6', title: 'Decision-Making Query', promptText: 'What factors should I consider before making a significant decision today?', description: 'Helps in thinking through the important factors of a major decision.', category: 'Personal Development', createdAt: Date.now() - 140500 },
    { id: 'guide-prompt-7', title: 'New Idea Generation', promptText: 'Generate three innovative ideas related to a challenge you\'re currently facing.', description: 'A prompt to brainstorm creative solutions for a specific problem.', category: 'Ideation', createdAt: Date.now() - 140600 },
];

const learnPromptingPrompts: Prompt[] = [
    { id: 'lp-summarize-1', title: 'Summarize Text', promptText: 'Summarize the following text:\n\n[TEXT]', description: 'Condenses a given text into a shorter summary.', category: 'Productivity', createdAt: Date.now() - 150000 },
    { id: 'lp-qa-1', title: 'Answer from Context', promptText: 'Using the text below, answer the following question.\n\nText: [CONTEXT]\n\nQuestion: [QUESTION]', description: 'Answers a question based on a provided context.', category: 'Research', createdAt: Date.now() - 150100 },
    { id: 'lp-classify-1', title: 'Classify Sentiment', promptText: 'Classify the sentiment of the following text as either positive, neutral, or negative.\n\nText: [TEXT]', description: 'Determines the sentiment of a piece of text.', category: 'Data Analysis', createdAt: Date.now() - 150200 },
    { id: 'lp-roleplay-1', title: 'Act as a Character', promptText: 'You are [CHARACTER]. Respond to the following prompt as that character would.\n\nPrompt: [PROMPT]', description: 'Adopts a specific persona for the response.', category: 'Role-Playing', createdAt: Date.now() - 150300 },
    { id: 'lp-code-1', title: 'Generate Python Function', promptText: 'Write a Python function that [FUNCTION_DESCRIPTION].', description: 'Generates a Python function based on a description.', category: 'Code Generation', createdAt: Date.now() - 150400 },
    { id: 'lp-reasoning-1', title: 'Solve a Logic Puzzle', promptText: 'Solve the following logic puzzle, explaining your reasoning step-by-step.\n\nPuzzle: [PUZZLE]', description: 'Solves a logic puzzle with step-by-step reasoning.', category: 'Advanced Techniques', createdAt: Date.now() - 150500 },
    { id: 'lp-fewshot-1', title: 'Few-Shot Example', promptText: 'Based on the following examples, complete the final one.\n\nExample 1: [INPUT_1] -> [OUTPUT_1]\nExample 2: [INPUT_2] -> [OUTPUT_2]\nExample 3: [INPUT_3] ->', description: 'Uses examples to guide the AI to the correct output format.', category: 'Advanced Techniques', createdAt: Date.now() - 150600 },
    { id: 'lp-cot-1', title: 'Chain of Thought Reasoning', promptText: 'Q: [QUESTION]\nA: Let\'s think step by step. [EXPLANATION] So the answer is [ANSWER].\n\nQ: [NEW_QUESTION]', description: 'Prompts the AI to explain its reasoning process.', category: 'Advanced Techniques', createdAt: Date.now() - 150700 },
    { id: 'lp-pal-1', title: 'Program-Aided Calculation', promptText: 'Write a program to solve the following math problem, then execute it to find the answer.\n\nProblem: [MATH_PROBLEM]', description: 'Uses code generation to solve complex calculations.', category: 'Code Generation', createdAt: Date.now() - 150800 },
    { id: 'lp-react-1', title: 'ReAct Framework Example', promptText: 'Question: [QUESTION]\nThought: I need to search for [ENTITY] and find [ATTRIBUTE].\nAction: search([ENTITY])\nObservation: [SEARCH_RESULT]\nThought: The result says [SUMMARY]. So the answer is [ANSWER].', description: 'Demonstrates the ReAct (Reason+Act) framework for problem-solving.', category: 'Frameworks', createdAt: Date.now() - 150900 },
    { id: 'lp-iterative-1', title: 'Iterative Refinement', promptText: 'Initial prompt: [PROMPT_V1]\nCritique: The prompt is too vague.\nRefined prompt: [PROMPT_V2]', description: 'Shows an example of refining a prompt iteratively for better results.', category: 'Fundamentals', createdAt: Date.now() - 151000 },
];

const cheatSheetPrompts: Prompt[] = [
    { id: 'cs-prompt-1', title: 'Create Social Media Content Calendar', promptText: 'Act as a: Social Media Marketing Manager.\n\nTask: Create a 1-week content calendar for a [COMPANY/BRAND] on [PLATFORM]. The company sells [PRODUCT/SERVICE] and the target audience is [AUDIENCE].\n\nFormat: A markdown table with columns for "Day", "Post Topic", "Post Copy", "Hashtags", and "Visual Idea".', description: 'Generates a structured weekly content calendar for a social media platform.', category: 'Social Media', createdAt: Date.now() - 260000, framework: PromptFramework.RTF },
    { id: 'cs-prompt-2', title: 'Analyze Customer Feedback', promptText: 'Act as a: Product Manager.\n\nTask: Analyze the following customer feedback and identify the top 3 most common pain points and top 3 most requested features.\n\nFormat: Two bulleted lists: one for "Top Pain Points" and one for "Top Feature Requests".\n\nFeedback:\n"""\n[PASTE CUSTOMER FEEDBACK HERE]\n"""', description: 'Analyzes a block of customer feedback to extract key pain points and feature requests.', category: 'Business', createdAt: Date.now() - 260100, framework: PromptFramework.RTF },
    { id: 'cs-prompt-3', title: 'Generate 5 Blog Post Titles', promptText: 'Act as a: SEO Content Strategist.\n\nTask: Generate 5 compelling, SEO-friendly blog post titles about [TOPIC]. The target keyword is "[KEYWORD]".\n\nFormat: A numbered list of 5 titles.', description: 'Brainstorms 5 click-worthy and SEO-optimized blog post titles for a given topic.', category: 'Content Creation', createdAt: Date.now() - 260200, framework: PromptFramework.RTF },
    { id: 'cs-prompt-4', title: 'Write a High-Converting Cold Email', promptText: 'Act as a: Sales Development Representative.\n\nTask: Write a personalized cold email to a potential client in the [INDUSTRY] for my [PRODUCT/SERVICE]. The client\'s name is [NAME] and their company is [COMPANY]. The goal is to book a 15-minute call.\n\nFormat: A concise, professional, and persuasive email that highlights a key benefit and has a clear call-to-action.', description: 'Crafts a personalized and effective cold email to generate sales leads.', category: 'Sales', createdAt: Date.now() - 260300, framework: PromptFramework.RTF },
];

const cheatSheetRolePlayPrompts: Prompt[] = [
    { id: 'cs-rp-1', title: 'Act as Elon Musk', promptText: 'Act as: Elon Musk.\n\nTask: I will ask you questions, and you will respond in the style of Elon Musk, focusing on first principles, ambitious goals, and engineering challenges.\n\nFormat: Your response should be direct, visionary, and occasionally controversial. My first question is: "What is the single most important problem humanity should be working on right now?"', description: 'Simulates a conversation with Elon Musk.', category: 'Role-Playing', createdAt: Date.now() - 270000, framework: PromptFramework.RTF },
    { id: 'cs-rp-2', title: 'Act as Steve Jobs', promptText: 'Act as: Steve Jobs.\n\nTask: I will present you with a product idea or business challenge, and you will critique it from the perspective of Steve Jobs, focusing on design, user experience, and market impact.\n\nFormat: Your critique should be brutally honest, passionate, and focused on simplicity and innovation. My product idea is: "A smart toaster that also charges your phone."', description: 'Get a product critique from the perspective of Steve Jobs.', category: 'Role-Playing', createdAt: Date.now() - 270100, framework: PromptFramework.RTF },
    { id: 'cs-rp-3', title: 'Act as Gary Vee', promptText: 'Act as: Gary Vaynerchuk (Gary Vee).\n\nTask: I will describe my business or side hustle, and you will give me marketing and social media advice in the style of Gary Vee.\n\nFormat: Your advice should be high-energy, practical, and heavily focused on content creation, platform relevance, and empathy for the end consumer. My business is: "A handmade candle shop on Etsy."', description: 'Receive high-energy marketing advice from Gary Vee.', category: 'Role-Playing', createdAt: Date.now() - 270200, framework: PromptFramework.RTF },
    { id: 'cs-rp-4', title: 'Act like a Life Coach', promptText: 'Act as: A life coach.\n\nTask: I will share a personal or professional goal I am struggling with. You will help me break it down, identify obstacles, and create an actionable plan.\n\nFormat: Ask insightful questions to guide me, and provide supportive but firm advice. My goal is: "I want to start exercising regularly, but I can never find the motivation."', description: 'Get guidance and an actionable plan from a life coach.', category: 'Role-Playing', createdAt: Date.now() - 270300, framework: PromptFramework.RTF },
    { id: 'cs-rp-5', title: 'Act like a Science Tutor', promptText: 'Act as: A science tutor.\n\nTask: I will ask you a question about a scientific concept. You will explain it to me in a clear, easy-to-understand way, using analogies and simple examples.\n\nFormat: Your explanation should be tailored for a high school student. My question is: "Can you explain quantum entanglement?"', description: 'Get clear explanations on scientific concepts from a tutor.', category: 'Role-Playing', createdAt: Date.now() - 270400, framework: PromptFramework.RTF },
];

const cheatSheetMasteringRoleplayPrompts: Prompt[] = [
    { id: 'cs-mrp-1', title: 'Role-Play: Science Fiction Author', promptText: 'Act as a: Science fiction author.\n\nTask: Describe a futuristic city.', description: 'Acts as a science fiction author to describe a futuristic city.', category: 'Role-Playing', createdAt: Date.now() - 300000, framework: PromptFramework.RTF },
    { id: 'cs-mrp-2', title: 'Role-Play: Fitness Coach', promptText: "Act as a: Fitness coach.\n\nTask: Advise on a workout routine for beginners.", description: 'Acts as a fitness coach to create a workout routine for beginners.', category: 'Role-Playing', createdAt: Date.now() - 300100, framework: PromptFramework.RTF },
    { id: 'cs-mrp-3', title: 'Role-Play: Film Critic', promptText: 'Act as a: Film critic.\n\nTask: Review the latest James Bond movie.', description: 'Acts as a film critic to review the latest James Bond movie.', category: 'Role-Playing', createdAt: Date.now() - 300200, framework: PromptFramework.RTF },
    { id: 'cs-mrp-4', title: 'Role-Play: Tour Guide', promptText: 'Act as a: Tour guide in Rome.\n\nTask: Describe the must-visit sites for tourists.', description: 'Acts as a tour guide in Rome to describe must-visit sites.', category: 'Role-Playing', createdAt: Date.now() - 300300, framework: PromptFramework.RTF },
    { id: 'cs-mrp-5', title: 'Role-Play: Economist', promptText: 'Act as an: Economist.\n\nTask: Explain the concept of inflation.', description: 'Acts as an economist to explain the concept of inflation.', category: 'Role-Playing', createdAt: Date.now() - 300400, framework: PromptFramework.RTF },
    { id: 'cs-mrp-6', title: 'Role-Play: Motivational Speaker', promptText: 'Act as a: Motivational speaker.\n\nTask: Provide tips on building self-confidence.', description: 'Acts as a motivational speaker to give tips on self-confidence.', category: 'Role-Playing', createdAt: Date.now() - 300500, framework: PromptFramework.RTF },
    { id: 'cs-mrp-7', title: 'Role-Play: Children\'s Book Author', promptText: "Act as a: Children's book author.\n\nTask: Write a short story about a magical forest.", description: 'Acts as a children\'s book author to write a short story.', category: 'Role-Playing', createdAt: Date.now() - 300600, framework: PromptFramework.RTF },
];

const cheatSheetTonePrompts: Prompt[] = [
    { id: 'cs-tone-1', title: 'Formal Tone: Quantum Mechanics', promptText: 'Could you elucidate the principle tenets of quantum mechanics, paying special attention to the Heisenberg uncertainty principle?', description: 'A formal prompt to get a detailed, academic explanation of quantum mechanics.', category: 'Learning', createdAt: Date.now() - 310000, framework: null },
    { id: 'cs-tone-2', title: 'Informal Tone: Quantum Mechanics', promptText: "Hey, can you break down this quantum mechanics stuff? I'm really curious about this Heisenberg uncertainty thing.", description: 'An informal prompt to get a simple, conversational explanation of quantum mechanics.', category: 'Learning', createdAt: Date.now() - 310100, framework: null },
    { id: 'cs-tone-3', title: 'Professional Tone: Fiscal Policy', promptText: 'Please provide a detailed summary of the 2023 fiscal policy changes in the European Union and their potential impact on small businesses.', description: 'A professional prompt for a detailed summary of fiscal policy changes.', category: 'Business', createdAt: Date.now() - 310200, framework: null },
    { id: 'cs-tone-4', title: 'Casual Tone: Money Rules', promptText: 'Can you give me the lowdown on how the new 2023 money rules in the EU might hit small businesses?', description: 'A casual prompt for a simple explanation of new EU money rules for small businesses.', category: 'Business', createdAt: Date.now() - 310300, framework: null },
    { id: 'cs-tone-5', title: 'Technical Tone: Neural Networks', promptText: 'Please elaborate on the role of convolutional neural networks in the field of image recognition.', description: 'A technical prompt asking for an elaboration on convolutional neural networks.', category: 'Code Generation', createdAt: Date.now() - 310400, framework: null },
    { id: 'cs-tone-6', title: 'Layman Tone: Computer Vision', promptText: 'Can you explain in simple terms how computers learn to recognize pictures?', description: 'A prompt for a simple, layman\'s explanation of computer vision.', category: 'Learning', createdAt: Date.now() - 310500, framework: null },
    { id: 'cs-tone-7', title: 'Academic Tone: Shakespeare', promptText: "Could you provide a comprehensive analysis of Shakespeare's use of iambic pentameter in his sonnets?", description: 'An academic prompt for a comprehensive analysis of Shakespearean sonnets.', category: 'Creative Writing', createdAt: Date.now() - 310600, framework: null },
    { id: 'cs-tone-8', title: 'Colloquial Tone: Shakespeare', promptText: 'Can you help me understand how Shakespeare used rhythm in his sonnets?', description: 'A colloquial prompt to understand Shakespeare\'s use of rhythm.', category: 'Creative Writing', createdAt: Date.now() - 310700, framework: null },
];

const learnAnythingFasterPrompts: Prompt[] = [
    { id: 'learn-1', title: 'Crash Course Creator', promptText: 'Act as a: Subject Matter Expert.\n\nTask: Summarize the key points of [topic] in under 300 words for fast revision.\n\nFormat: A concise summary.', description: 'Quickly generates a summary of any topic for fast learning and revision.', category: 'Learning', createdAt: Date.now() - 320000, framework: PromptFramework.RTF },
    { id: 'learn-2', title: "Explain Like I'm 5 (ELI5)", promptText: "Act as a: Teacher of young children.\n\nTask: Break down [complex concept] in the simplest way possible, like you're teaching a child.\n\nFormat: A simple, easy-to-understand explanation with analogies.", description: "Explains complex concepts in a simple way that a 5-year-old can understand.", category: 'Learning', createdAt: Date.now() - 320100, framework: PromptFramework.RTF },
    { id: 'learn-3', title: 'Compare & Contrast', promptText: "Act as an: Analyst.\n\nTask: What's the difference between [A] and [B]?\n\nFormat: Use a clear table or bullet list to compare and contrast them.", description: 'Generates a comparison between two items in a table or list format.', category: 'Data Analysis', createdAt: Date.now() - 320200, framework: PromptFramework.RTF },
    { id: 'learn-4', title: 'AI Study Partner', promptText: 'Act as a: Study partner and tutor.\n\nTask: Ask me 5 challenging questions on [subject]. Wait for my answers, then correct them and provide explanations for the correct answers.\n\nFormat: Ask one question at a time. After I answer, provide your correction and explanation before moving to the next question.', description: 'Acts as a study partner, quizzing you on a subject and providing corrections.', category: 'Learning', createdAt: Date.now() - 320300, framework: PromptFramework.RTF },
    { id: 'learn-5', title: 'Mind Map Maker', promptText: 'Act as a: Visual learning expert.\n\nTask: Organize the entire concept of [topic] into a clear mind map with subtopics.\n\nFormat: Use nested bullet points or a text-based diagram to represent the mind map structure.', description: 'Creates a mind map structure for any topic to help with visual learning.', category: 'Learning', createdAt: Date.now() - 320400, framework: PromptFramework.RTF },
    { id: 'learn-6', title: 'Learning Styles Customizer', promptText: 'Act as an: Educational specialist.\n\nTask: Explain [topic] to me based on my specified learning style.\n\nFormat: Adapt your explanation to be primarily [visual/auditory/kinesthetic].\n\nMy learning style is: [learning style]', description: 'Customizes explanations of topics based on your preferred learning style.', category: 'Learning', createdAt: Date.now() - 320500, framework: PromptFramework.RTF },
    { id: 'learn-7', title: 'Mini Case Study Generator', promptText: "Act as a: Business school professor.\n\nTask: Give me a real-world case study based on [topic]. After presenting the case study, ask me what I would do in that situation and wait for my response.\n\nFormat: A short case study followed by an open-ended question.", description: 'Generates a mini case study on a topic and quizzes you on your approach.', category: 'Business', createdAt: Date.now() - 320600, framework: PromptFramework.RTF },
    { id: 'learn-8', title: 'Time-Saver Summarizer', promptText: 'Act as an: Expert summarizer.\n\nTask: Summarize this [article/video/text] into key takeaways I can learn in 1 minute.\n\nFormat: A short, concise summary or a bulleted list of the absolute key takeaways.\n\nContent to summarize: [Paste content here]', description: 'Summarizes content into key takeaways for quick learning.', category: 'Productivity', createdAt: Date.now() - 320700, framework: PromptFramework.RTF },
];

const cheatSheetOnePrompts: Prompt[] = [
    // General Prompts
    { id: 'cs1-gen-1', title: 'Summarize a Book', promptText: 'Summarize the book [name of book] and cover all the important points mentioned.', description: 'Generates a comprehensive summary of a given book, focusing on its key points.', category: 'Learning', createdAt: Date.now() - 400000, framework: null },
    { id: 'cs1-gen-2', title: 'Proofread and Suggest Improvements', promptText: 'Proofread my writing below. Fix grammar and spelling mistakes, and make suggestions to improve the clarity of my writing. \n\n[Insert Writing Here]', description: 'Checks a piece of text for grammatical errors, spelling mistakes, and suggests improvements for clarity.', category: 'Editing & Proofreading', createdAt: Date.now() - 400001, framework: null },
    // Prompts for Writers
    { id: 'cs1-writer-1', title: 'Compelling Product Description', promptText: 'Write a compelling product description for [Insert Product Name and Features Here]', description: 'Creates a persuasive and attractive description for a product based on its name and features.', category: 'Copywriting', createdAt: Date.now() - 400100, framework: null },
    { id: 'cs1-writer-2', title: 'Write a 5-Minute Speech', promptText: 'Write a 5-minute speech on the topic of [Insert Topic Here]', description: 'Generates a concise and impactful 5-minute speech on a specified topic.', category: 'Content Creation', createdAt: Date.now() - 400101, framework: null },
    // Prompts for Your Resume
    { id: 'cs1-resume-1', title: 'Review and Improve Resume', promptText: 'Please review my resume and suggest improvements. \n\n[Paste Resume Here]', description: 'Analyzes a resume and provides actionable suggestions for improvement.', category: 'Career', createdAt: Date.now() - 400200, framework: null },
    // Prompts for Sales
    { id: 'cs1-sales-1', title: 'Lead Generation Strategies', promptText: 'Generate 10 ways to generate leads for [product description]', description: 'Brainstorms ten different strategies for generating sales leads for a given product.', category: 'Sales', createdAt: Date.now() - 400300, framework: null },
    { id: 'cs1-sales-2', title: 'Personalized Sales Email', promptText: 'Create a personalized sales email for potential customers. Include [topic, brand name, promo offers, etc.]', description: 'Crafts a tailored sales email for potential customers, including specific details like topic, brand, and promotions.', category: 'Sales', createdAt: Date.now() - 400301, framework: null },
    // Prompts for Developers
    { id: 'cs1-dev-1', title: 'Develop Website Architecture', promptText: 'Develop an architecture and code for a [website description] website with JavaScript.', description: 'Designs a software architecture and provides initial JavaScript code for a described website.', category: 'Code Generation', createdAt: Date.now() - 400400, framework: null },
    { id: 'cs1-dev-2', title: 'Find a Bug in Code', promptText: 'Find the bug with in code: \n\n[post code]', description: 'Analyzes a code snippet to identify and report bugs.', category: 'Code Generation', createdAt: Date.now() - 400401, framework: null },
    // Prompts for Education
    { id: 'cs1-edu-1', title: 'Analyze Historical Event', promptText: 'Analyze the causes and consequences of the [event] and its influence on young adults today.', description: 'Provides a detailed analysis of a historical event, focusing on its causes, consequences, and modern influence.', category: 'Education', createdAt: Date.now() - 400500, framework: null },
    // Prompts for Content Creators
    { id: 'cs1-content-1', title: 'Social Media Content Calendar', promptText: 'Generate a creative social media content calendar for the next month for our [product].', description: 'Creates a month-long social media content calendar for a specified product.', category: 'Social Media', createdAt: Date.now() - 400600, framework: null },
    { id: 'cs1-content-2', title: '2-Minute Video Script', promptText: 'Create a 2-minute video script for a Facebook ad campaign promoting [product or service].', description: 'Writes a two-minute video script for a Facebook ad campaign.', category: 'Advertising', createdAt: Date.now() - 400601, framework: null },
];

const cheatSheetTwoPrompts: Prompt[] = [
    // Sales
    { id: 'cs2-sales-1', title: 'Irresistible Sales Pitch', promptText: 'Rewrite the following sales pitch to make it irresistible: \n\n[sales pitch]', description: 'Rewrites an existing sales pitch to be more persuasive and compelling.', category: 'Sales', createdAt: Date.now() - 410000, framework: null },
    // Marketing
    { id: 'cs2-mktg-1', title: 'Viral Tweet Ideas', promptText: 'Give me 10 viral tweet ideas about [topic].', description: 'Generates ten ideas for tweets on a given topic that have the potential to go viral.', category: 'Social Media', createdAt: Date.now() - 410100, framework: null },
    { id: 'cs2-mktg-2', title: 'Attention-Grabbing LinkedIn Hook', promptText: 'Write an attention-grabbing hook for a LinkedIn post about [topic].', description: 'Creates a compelling hook to capture attention for a LinkedIn post.', category: 'Social Media', createdAt: Date.now() - 410101, framework: null },
    { id: 'cs2-mktg-3', title: 'Funny & Effective Ad Script', promptText: 'Generate a funny yet effective ad script for [product].', description: 'Writes an ad script that is both humorous and effective for promoting a product.', category: 'Advertising', createdAt: Date.now() - 410102, framework: null },
    // Developers
    { id: 'cs2-dev-1', title: 'Optimize Code for Performance', promptText: 'Optimize this code for performance and explain why it works better. \n\n[code snippet]', description: 'Analyzes a code snippet, optimizes it for performance, and explains the improvements.', category: 'Code Generation', createdAt: Date.now() - 410200, framework: null },
    { id: 'cs2-dev-2', title: 'Explain Recursion with Analogy', promptText: 'Explain recursion with a real-life analogy.', description: 'Explains the programming concept of recursion using a simple, real-life analogy.', category: 'Learning', createdAt: Date.now() - 410201, framework: null },
    { id: 'cs2-dev-3', title: 'Automate Task with Python Script', promptText: 'Generate a simple script that automates [task] in Python.', description: 'Creates a Python script to automate a specified task.', category: 'Code Generation', createdAt: Date.now() - 410202, framework: null },
    // Content Writers & Copywriters
    { id: 'cs2-copy-1', title: 'Create Engaging Paragraph Rewrite', promptText: 'Rewrite this paragraph to make it 10x more engaging: \n\n[paragraph]', description: 'Takes a paragraph and rewrites it to be significantly more engaging for the reader.', category: 'Copywriting', createdAt: Date.now() - 410300, framework: null },
    { id: 'cs2-copy-2', title: 'Irresistible Email Subject Line', promptText: 'Create an irresistible email subject line for [email topic].', description: 'Generates a compelling and clickable email subject line for a given topic.', category: 'Marketing', createdAt: Date.now() - 410301, framework: null },
    { id: 'cs2-copy-3', title: '3-Sentence Hook Story', promptText: 'Write a short story in 3 sentences that hooks readers instantly.', description: 'Crafts a super-short, three-sentence story designed to immediately capture a reader\'s attention.', category: 'Creative Writing', createdAt: Date.now() - 410302, framework: null },
];

const cheatSheetThreePrompts: Prompt[] = [
    {
        id: 'cs3-prof-1',
        title: 'Analyze Consumer Behavior Trends',
        promptText: 'Act as a: Market Research Analyst.\n\nTask: Analyze the latest consumer behavior trends in the [Industry Name] industry.\n\nFormat: A detailed report including key trends, data points, and actionable insights for a business in this industry.',
        description: 'Analyzes consumer behavior trends for a specified industry and provides a detailed report with actionable insights.',
        category: 'Business',
        createdAt: Date.now() - 420000,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-2',
        title: 'Design a Customer Support Chatbot',
        promptText: 'Act as a: Customer Experience Designer.\n\nTask: Design a chatbot conversation flow for a [Business Type] website that can handle common customer queries, such as order tracking, return policies, and product information.\n\nFormat: A step-by-step conversation flow, including chatbot prompts, user responses, and escalation paths to a human agent.',
        description: 'Designs a detailed conversation flow for a customer support chatbot to handle common queries.',
        category: 'Business',
        createdAt: Date.now() - 420100,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-3',
        title: 'Write an SEO-Optimized Blog Post',
        promptText: 'Act as an: SEO Content Writer.\n\nTask: Write an engaging, SEO-optimized, 500-word blog post about [Topic]. The target keyword is "[Keyword]".\n\nFormat: A well-structured blog post with a compelling title, introduction, subheadings, and a conclusion. Naturally incorporate the keyword throughout the text.',
        description: 'Writes an engaging and SEO-optimized 500-word blog post on a given topic with a target keyword.',
        category: 'Content Creation',
        createdAt: Date.now() - 420200,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-4',
        title: 'Create a Welcome Email for Subscribers',
        promptText: 'Act as a: Email Marketing Specialist.\n\nTask: Write a warm and friendly welcome email for new subscribers to our [Brand Type] brand. The email should introduce the brand, highlight a key benefit, and offer a small incentive (e.g., 10% off first purchase).\n\nFormat: A concise and personable email with a clear subject line and a call-to-action.',
        description: 'Creates a warm and friendly welcome email for new subscribers, including a brand introduction and incentive.',
        category: 'Marketing',
        createdAt: Date.now() - 420300,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-5',
        title: 'Tailor Resume for a Job Application',
        promptText: 'Act as a: Professional Resume Writer.\n\nTask: I am applying for a [Job Title] role at [Company]. Help me tailor my resume to highlight my experience in [Skill 1] and [Skill 2].\n\nFormat: Review my resume below and provide specific suggestions for bullet points and a summary that align with the job description.\n\nMy Resume:\n[Paste Resume Text Here]',
        description: 'Helps tailor a resume for a specific job application by providing targeted suggestions for improvements.',
        category: 'Career',
        createdAt: Date.now() - 420400,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-6',
        title: 'Write a Compelling Freelance Proposal',
        promptText: 'Act as a: Proposal Writing Expert.\n\nTask: I am a [Your Profession] specializing in [Your Areas]. Assist me in writing a compelling proposal for a potential client on [Platform] who is looking for help with [Project Details].\n\nFormat: A professional proposal that addresses the client\'s needs, outlines my approach, details my qualifications, and includes a clear call to action.',
        description: 'Assists in writing a compelling and professional proposal for a freelance project on a given platform.',
        category: 'Business',
        createdAt: Date.now() - 420500,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-7',
        title: 'Write a One-Minute Ad Script',
        promptText: 'Act as a: Creative Director.\n\nTask: Write an enticing, one-minute video script for an advertisement for our new [Product Name]. The ad should be memorable, engaging, and clearly communicate the product\'s main benefit.\n\nFormat: A script with scene descriptions, dialogue/voiceover, and suggestions for music or sound effects.',
        description: 'Writes an enticing one-minute video advertisement script for a new product.',
        category: 'Advertising',
        createdAt: Date.now() - 420600,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-8',
        title: 'Correct and Explain Code',
        promptText: 'Act as a: Senior Software Developer.\n\nTask: Correct the following [Language] code snippet and explain the fix. The code is intended to [describe what the code should do].\n\nFormat: Provide the corrected code in a code block, followed by a clear, step-by-step explanation of the bug and the solution.\n\nCode Snippet:\n[Paste Code Snippet Here]',
        description: 'Corrects a provided code snippet, provides the fixed code, and explains the bug and the solution.',
        category: 'Code Generation',
        createdAt: Date.now() - 420700,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-9',
        title: 'Optimize Freelancer Profile',
        promptText: "Act as a: Freelancer Success Coach.\n\nTask: Help me optimize my freelancer profile on [Platform Name] to attract high-quality clients. I am a [Your Profession] specializing in [Your Skills].\n\nFormat: Review my current profile description below and provide a rewritten, more compelling version. Also, suggest 5 relevant portfolio pieces I should highlight and 10 keywords to include in my skills section.\n\nMy Profile Description:\n[Paste current description here]",
        description: "Optimizes a freelancer's profile on platforms like Upwork or Fiverr to attract better clients.",
        category: 'Career',
        createdAt: Date.now() - 420800,
        framework: PromptFramework.RTF
    },
    {
        id: 'cs3-prof-10',
        title: 'Write a LinkedIn Networking Message',
        promptText: 'Act as a: Career Coach.\n\nTask: I want to connect with a [Professional Role] in the [Industry]. Write a concise and professional LinkedIn connection request message that compliments their work on [Specific Project/Achievement] and politely asks to connect.\n\nFormat: A short message (under 300 characters) that is personalized and non-transactional.',
        description: 'Writes a personalized and professional LinkedIn message for networking and cold pitching.',
        category: 'Career',
        createdAt: Date.now() - 420900,
        framework: PromptFramework.RTF
    }
];

const startupPrompts: Prompt[] = [
    { id: 'startup-1', title: 'Generate Startup Ideas', promptText: 'Act as a: Venture Capitalist specializing in tech startups.\n\nTask: Generate 5 innovative startup ideas in the [Industry/Sector] space. For each idea, provide a brief description, the problem it solves, the target market, and a potential monetization strategy.\n\nFormat: A numbered list of startup ideas, each with the requested details.', description: 'Brainstorms innovative startup ideas with market analysis.', category: 'Business', createdAt: Date.now() - 500000, framework: PromptFramework.RTF },
    { id: 'startup-2', title: 'One-Page Business Plan', promptText: 'Act as a: Business Strategy Consultant.\n\nTask: Create a concise, one-page business plan for a [Product/Service] idea. Include sections for Mission, Value Proposition, Target Audience, Marketing & Sales Strategy, and Key Financial Projections.\n\nFormat: A markdown document with clear headings for each section.', description: 'Creates a lean, one-page business plan for a new venture.', category: 'Business', createdAt: Date.now() - 500100, framework: PromptFramework.RTF },
    { id: 'startup-3', title: 'Investor Pitch Deck Outline', promptText: 'Act as a: Startup Coach.\n\nTask: Create a 10-slide investor pitch deck outline for a [Startup Name] in the [Industry] sector.\n\nFormat: A bulleted list where each item represents a slide title and a brief description of its content (e.g., 1. Introduction - Hook and vision. 2. Problem - The pain point we solve.)', description: 'Generates a structured outline for a compelling investor pitch deck.', category: 'Business', createdAt: Date.now() - 500200, framework: PromptFramework.RTF },
    { id: 'startup-4', title: 'Competitive Analysis', promptText: 'Act as a: Market Research Analyst.\n\nTask: Conduct a competitive analysis for a new [Product/Service]. Identify 3 key competitors and analyze their strengths, weaknesses, pricing, and market positioning.\n\nFormat: A table with columns for "Competitor", "Strengths", "Weaknesses", "Pricing", and "Positioning".', description: 'Performs a competitive analysis to inform business strategy.', category: 'Marketing', createdAt: Date.now() - 500300, framework: PromptFramework.RTF },
    { id: 'startup-5', title: 'Brand Name Brainstorm', promptText: 'Act as a: Branding Expert.\n\nTask: Brainstorm 10 creative and available brand names for a startup that offers [Product/Service Description]. The brand voice should be [e.g., modern, trustworthy, playful].\n\nFormat: A list of 10 brand names with a short rationale for each.', description: 'Brainstorms creative and fitting brand names for a new startup.', category: 'Marketing', createdAt: Date.now() - 500400, framework: PromptFramework.RTF },
    { id: 'startup-6', title: 'Content Marketing Strategy', promptText: 'Act as a: Content Strategist.\n\nTask: Develop a 3-month content marketing strategy for a new SaaS product called [Product Name]. The goal is to build brand awareness and generate leads.\n\nFormat: Outline key content themes, target platforms (blog, social media), and content formats (e.g., tutorials, case studies, infographics).', description: 'Develops a high-level content marketing strategy for a new product.', category: 'Marketing', createdAt: Date.now() - 500500, framework: PromptFramework.RTF },
    { id: 'startup-7', title: 'Product Launch Plan', promptText: 'Act as a: Product Marketing Manager.\n\nTask: Create a checklist for a product launch for a new [Product Type].\n\nFormat: A checklist divided into pre-launch, launch day, and post-launch phases.', description: 'Generates a comprehensive checklist for a successful product launch.', category: 'Business', createdAt: Date.now() - 500600, framework: PromptFramework.RTF },
    { id: 'startup-8', title: 'User Interview Questions', promptText: 'Act as a: UX Researcher.\n\nTask: Generate a list of 10 open-ended questions to ask potential users during discovery interviews for a new [App/Service Idea]. The goal is to understand their current pain points and workflows.\n\nFormat: A numbered list of questions.', description: 'Creates a set of insightful questions for user discovery interviews.', category: 'Research', createdAt: Date.now() - 500700, framework: PromptFramework.RTF },
    { id: 'startup-9', title: 'Draft a Press Release', promptText: 'Act as a: Public Relations Specialist.\n\nTask: Write a draft press release announcing the launch of [Startup Name], a company that [briefly describe].\n\nFormat: A standard press release format, including a headline, dateline, introduction, body, boilerplate, and media contact information.', description: 'Drafts a professional press release for a company launch.', category: 'Marketing', createdAt: Date.now() - 500800, framework: PromptFramework.RTF },
    { id: 'startup-10', title: 'Customer Onboarding Email Sequence', promptText: 'Act as an: Email Marketing Specialist.\n\nTask: Outline a 3-part email sequence to onboard new users for a [SaaS Product].\n\nFormat: For each email, provide the subject line, the goal of the email (e.g., welcome & first steps), and key content points.', description: 'Outlines a 3-part email sequence for effective customer onboarding.', category: 'Marketing', createdAt: Date.now() - 500900, framework: PromptFramework.RTF },
];

const webDevPrompts: Prompt[] = [
    { id: 'webdev-1', title: 'Generate Responsive Navbar', promptText: 'Act as a: Senior Frontend Developer.\n\nTask: Generate the HTML and CSS code for a responsive navigation bar. It should have a logo on the left, navigation links in the center, and a call-to-action button on the right. On mobile, the links should collapse into a hamburger menu.\n\nFormat: Two code blocks: one for HTML and one for CSS. Use modern CSS practices like Flexbox or Grid.', description: 'Generates HTML and CSS for a modern, responsive navigation bar.', category: 'Code Generation', createdAt: Date.now() - 510000, framework: PromptFramework.RTF },
    { id: 'webdev-2', title: 'Write a Python Web Scraper', promptText: 'Act as a: Python Developer.\n\nTask: Write a Python script using the BeautifulSoup and requests libraries to scrape the titles of all the articles from the homepage of [Website URL].\n\nFormat: A single Python code block with comments explaining the key parts of the script.', description: 'Provides a Python script to scrape article titles from a webpage.', category: 'Code Generation', createdAt: Date.now() - 510100, framework: PromptFramework.RTF },
    { id: 'webdev-3', title: 'Explain `useEffect` vs `useLayoutEffect`', promptText: 'Act as a: React Expert.\n\nTask: Explain the difference between `useEffect` and `useLayoutEffect` in React. Provide a simple code example that demonstrates a scenario where `useLayoutEffect` is necessary to prevent a visual flicker.\n\nFormat: A clear explanation followed by a React component code block.', description: 'Explains the difference between two key React hooks with a practical example.', category: 'Learning', createdAt: Date.now() - 510200, framework: PromptFramework.RTF },
    { id: 'webdev-4', title: 'Create a SQL Query', promptText: 'Act as a: Database Administrator.\n\nTask: I have two tables: `users` (id, name, email) and `orders` (id, user_id, amount, date). Write a SQL query to find the total order amount for each user, listing the user\'s name and their total amount. Order the results by the total amount in descending order.\n\nFormat: A single SQL code block.', description: 'Writes a SQL query to join two tables and aggregate data.', category: 'Data Analysis', createdAt: Date.now() - 510300, framework: PromptFramework.RTF },
    { id: 'webdev-5', title: 'Design a REST API Endpoint', promptText: 'Act as a: Backend Engineer.\n\nTask: Design a REST API endpoint for creating a new blog post. Specify the HTTP method, the URL path, the expected request body (in JSON), and the possible success and error responses (with status codes).\n\nFormat: A markdown document outlining the API endpoint design.', description: 'Designs and documents a REST API endpoint for creating a resource.', category: 'Code Generation', createdAt: Date.now() - 510400, framework: PromptFramework.RTF },
    { id: 'webdev-6', title: 'Configure Nginx as Reverse Proxy', promptText: 'Act as a: DevOps Engineer.\n\nTask: Provide a basic Nginx configuration file to act as a reverse proxy for a Node.js application running on `localhost:3000`.\n\nFormat: An Nginx configuration file block with comments.', description: 'Provides a basic Nginx configuration for a Node.js reverse proxy.', category: 'Code Generation', createdAt: Date.now() - 510500, framework: PromptFramework.RTF },
    { id: 'webdev-7', title: 'Improve Web Performance Checklist', promptText: 'Act as a: Web Performance Specialist.\n\nTask: Create a checklist of the top 10 most impactful actions to improve the loading performance of a website.\n\nFormat: A numbered list with a brief explanation for each action.', description: 'Creates a checklist of key actions to improve website performance.', category: 'Productivity', createdAt: Date.now() - 510600, framework: PromptFramework.RTF },
    { id: 'webdev-8', title: 'Generate a Dockerfile', promptText: 'Act as a: DevOps Engineer.\n\nTask: Create a multi-stage Dockerfile for a production-ready React application created with Create React App.\n\nFormat: A complete Dockerfile in a code block.', description: 'Generates a multi-stage Dockerfile for a production React app.', category: 'Code Generation', createdAt: Date.now() - 510700, framework: PromptFramework.RTF },
    { id: 'webdev-9', title: 'Explain CSS Specificity', promptText: 'Act as a: CSS Expert.\n\nTask: Explain the concept of CSS specificity in a simple and easy-to-understand way. Use examples of different selectors (ID, class, element) to illustrate the hierarchy.\n\nFormat: A clear explanation with code examples.', description: 'Explains the concept of CSS specificity with clear examples.', category: 'Learning', createdAt: Date.now() - 510800, framework: PromptFramework.RTF },
    { id: 'webdev-10', title: 'Unit Test with Jest', promptText: 'Act as a: Software Tester.\n\nTask: Write a simple unit test using Jest and React Testing Library for a React component that takes a `text` prop and renders it inside a button.\n\nFormat: A JavaScript code block containing the test suite.', description: 'Provides a simple unit test example using Jest and React Testing Library.', category: 'Code Generation', createdAt: Date.now() - 510900, framework: PromptFramework.RTF },
];

const academicPrompts: Prompt[] = [
    { id: 'academic-1', title: 'Develop a Thesis Statement', promptText: 'Act as an: Academic Writing Advisor.\n\nTask: Develop a strong, arguable thesis statement for an essay on the topic of [Topic, e.g., the impact of social media on political discourse].\n\nFormat: Provide 3 potential thesis statements, each with a slightly different angle.', description: 'Develops strong, arguable thesis statements for an academic essay.', category: 'Education', createdAt: Date.now() - 520000, framework: PromptFramework.RTF },
    { id: 'academic-2', title: 'Create a Research Paper Outline', promptText: 'Act as a: Research Assistant.\n\nTask: Create a detailed outline for a 5-page research paper on [Topic]. The outline should include an introduction, 3-4 main body paragraphs with supporting points, and a conclusion.\n\nFormat: A nested bullet-point list representing the paper\'s structure.', description: 'Generates a detailed outline for a research paper.', category: 'Education', createdAt: Date.now() - 520100, framework: PromptFramework.RTF },
    { id: 'academic-3', title: 'Paraphrase Academic Text', promptText: 'Act as an: Academic Editor.\n\nTask: Paraphrase the following academic paragraph to avoid plagiarism while retaining the original meaning and citing the source appropriately (Author, Year).\n\nParagraph: "[Paste paragraph here]"\n\nFormat: The paraphrased paragraph.', description: 'Helps paraphrase academic text to avoid plagiarism.', category: 'Editing & Proofreading', createdAt: Date.now() - 520200, framework: PromptFramework.RTF },
    { id: 'academic-4', title: 'Summarize Literature Review', promptText: 'Act as a: PhD Candidate.\n\nTask: I am writing a literature review on [Topic]. Summarize the main arguments and findings from the following three research paper abstracts. Identify any gaps in the literature.\n\nAbstracts: \n1. [Abstract 1]\n2. [Abstract 2]\n3. [Abstract 3]\n\nFormat: A concise summary of the key themes and a concluding sentence on the identified gap.', description: 'Summarizes multiple abstracts and identifies gaps for a literature review.', category: 'Research', createdAt: Date.now() - 520300, framework: PromptFramework.RTF },
    { id: 'academic-5', title: 'Generate Research Questions', promptText: 'Act as a: University Professor.\n\nTask: Based on the research topic "[Topic]", generate 3 focused and researchable questions that could guide a study.\n\nFormat: A numbered list of research questions.', description: 'Generates focused research questions for a study.', category: 'Research', createdAt: Date.now() - 520400, framework: PromptFramework.RTF },
    { id: 'academic-6', title: 'Explain a Complex Theory Simply', promptText: 'Act as a: Subject Matter Expert and Teacher.\n\nTask: Explain [Complex Theory, e.g., Foucault\'s theory of power] in simple terms, using an analogy to make it understandable to an undergraduate student.\n\nFormat: A clear, concise explanation followed by an analogy.', description: 'Simplifies a complex academic theory using an analogy.', category: 'Learning', createdAt: Date.now() - 520500, framework: PromptFramework.RTF },
    { id: 'academic-7', title: 'Refine a Grant Proposal Abstract', promptText: 'Act as a: Grant Writing Consultant.\n\nTask: Review and strengthen the following abstract for a research grant proposal. Focus on improving clarity, impact, and persuasiveness.\n\nAbstract: "[Paste abstract here]"\n\nFormat: A rewritten, improved abstract with a brief explanation of the key changes made.', description: 'Reviews and improves the language of a grant proposal abstract.', category: 'Editing & Proofreading', createdAt: Date.now() - 520600, framework: PromptFramework.RTF },
    { id: 'academic-8', title: 'Find Counterarguments', promptText: 'Act as a: Critical Thinker.\n\nTask: For the argument that "[Argument, e.g., universal basic income would solve poverty]", provide three strong counterarguments. For each counterargument, cite the type of evidence that would be needed to support it.\n\nFormat: A numbered list of counterarguments with evidence suggestions.', description: 'Helps find and develop counterarguments for a critical essay.', category: 'Ideation', createdAt: Date.now() - 520700, framework: PromptFramework.RTF },
    { id: 'academic-9', title: 'Check for Logical Fallacies', promptText: 'Act as a: Logic and Rhetoric Professor.\n\nTask: Analyze the following text for logical fallacies. Identify any fallacies you find and explain why they are fallacious.\n\nText: "[Paste text here]"\n\nFormat: A list of identified fallacies with explanations.', description: 'Identifies and explains logical fallacies in a piece of text.', category: 'Editing & Proofreading', createdAt: Date.now() - 520800, framework: PromptFramework.RTF },
    { id: 'academic-10', title: 'Create Presentation Talking Points', promptText: 'Act as a: Conference Speaker.\n\nTask: Create a set of talking points for a 10-minute presentation based on my research paper\'s abstract. Focus on a clear narrative from introduction to conclusion.\n\nAbstract: "[Paste abstract here]"\n\nFormat: A bulleted list of key talking points.', description: 'Converts a research abstract into talking points for a presentation.', category: 'Content Creation', createdAt: Date.now() - 520900, framework: PromptFramework.RTF },
];

const healthAndWellnessPrompts: Prompt[] = [
    { id: 'health-1', title: 'Create a Weekly Meal Plan', promptText: 'Act as a: Nutritionist.\n\nTask: Create a balanced 7-day meal plan for an adult with a goal of [e.g., weight loss, muscle gain]. The plan should include breakfast, lunch, dinner, and two snacks per day. Accommodate the dietary restriction of [e.g., vegetarian, gluten-free, none].\n\nFormat: A day-by-day list of meals and snacks.', description: 'Generates a balanced weekly meal plan for a specific health goal.', category: 'Personal Development', createdAt: Date.now() - 530000, framework: PromptFramework.RTF },
    { id: 'health-2', title: 'Design a Beginner Workout Routine', promptText: 'Act as a: Certified Personal Trainer.\n\nTask: Design a 4-week workout routine for a beginner who has access to basic gym equipment. The routine should include 3 workout days per week, focusing on full-body exercises.\n\nFormat: A week-by-week plan detailing exercises, sets, and reps for each workout day.', description: 'Creates a structured, 4-week workout plan for beginners.', category: 'Personal Development', createdAt: Date.now() - 530100, framework: PromptFramework.RTF },
    { id: 'health-3', title: 'Generate Guided Meditation Script', promptText: 'Act as a: Mindfulness Coach.\n\nTask: Write a 5-minute guided meditation script focused on reducing anxiety and stress.\n\nFormat: A script with pauses indicated, guiding the listener through breathing exercises and visualization.', description: 'Writes a guided meditation script for stress and anxiety reduction.', category: 'Self Help', createdAt: Date.now() - 530200, framework: PromptFramework.RTF },
    { id: 'health-4', title: 'Explain a Health Concept Simply', promptText: 'Act as a: Health Educator.\n\nTask: Explain the health benefits of intermittent fasting in simple, easy-to-understand terms. Avoid overly technical jargon.\n\nFormat: A few short paragraphs explaining the concept and its primary benefits.', description: 'Explains a complex health topic in simple, accessible language.', category: 'Learning', createdAt: Date.now() - 530300, framework: PromptFramework.RTF },
    { id: 'health-5', title: 'Healthy Recipe Ideas', promptText: 'Act as a: Healthy Recipe Developer.\n\nTask: Provide 3 healthy and quick (under 30 minutes) dinner recipes using [Main Ingredient, e.g., chicken breast].\n\nFormat: For each recipe, list the ingredients and provide step-by-step instructions.', description: 'Generates quick, healthy recipes based on a main ingredient.', category: 'Content Creation', createdAt: Date.now() - 530400, framework: PromptFramework.RTF },
    { id: 'health-6', title: 'Create a Morning Routine', promptText: 'Act as a: Productivity and Wellness Coach.\n\nTask: Design a 30-minute morning routine to promote focus and reduce stress before the workday begins.\n\nFormat: A timeline of activities (e.g., 7:00-7:10: Hydrate and stretch, 7:10-7:20: Journaling, etc.).', description: 'Designs a productive and mindful morning routine.', category: 'Self Help', createdAt: Date.now() - 530500, framework: PromptFramework.RTF },
    { id: 'health-7', title: 'Reframe Anxious Thoughts', promptText: 'Act as a: Cognitive Behavioral Therapy (CBT) guide.\n\nTask: I am having the anxious thought: "[Anxious thought, e.g., \'I\'m going to fail my presentation\']". Help me challenge and reframe this thought using CBT techniques.\n\nFormat: Guide me through the process by asking questions to examine the evidence for and against the thought, and then help me formulate a more balanced, alternative thought.', description: 'Uses CBT principles to help reframe anxious thoughts.', category: 'Self Help', createdAt: Date.now() - 530600, framework: PromptFramework.RTF },
    { id: 'health-8', title: 'Fitness Goal Setting', promptText: 'Act as a: Fitness Coach.\n\nTask: My fitness goal is to [Vague goal, e.g., \'get in shape\']. Help me turn this into a SMART goal (Specific, Measurable, Achievable, Relevant, Time-bound).\n\nFormat: A rewritten, SMART version of my goal, with a brief plan of action.', description: 'Helps turn a vague fitness goal into a specific SMART goal.', category: 'Goal Setting', createdAt: Date.now() - 530700, framework: PromptFramework.RTF },
    { id: 'health-9', title: 'Yoga Sequence for Beginners', promptText: 'Act as a: Yoga Instructor.\n\nTask: Create a 15-minute yoga sequence for beginners to do in the morning to increase energy and flexibility.\n\nFormat: A list of poses in order, with a brief description of how to perform each one.', description: 'Creates a beginner-friendly yoga sequence.', category: 'Personal Development', createdAt: Date.now() - 530800, framework: PromptFramework.RTF },
    { id: 'health-10', title: 'Journal Prompts for Self-Reflection', promptText: 'Act as a: Therapist.\n\nTask: Generate 5 journal prompts for self-reflection focused on understanding my personal values.\n\nFormat: A numbered list of thought-provoking questions.', description: 'Generates journaling prompts for self-reflection and personal growth.', category: 'Self Help', createdAt: Date.now() - 530900, framework: PromptFramework.RTF },
];

const customerSupportPrompts: Prompt[] = [
    { id: 'support-1', title: 'Empathetic Response to Complaint', promptText: 'Act as a: Senior Customer Support Specialist.\n\nTask: A customer is angry because their order arrived late and damaged. Draft an empathetic and effective response that acknowledges their frustration, apologizes sincerely, and offers a clear solution (e.g., a replacement and a discount on their next order).\n\nFormat: A professional and empathetic email response.', description: 'Drafts an empathetic response to a customer complaint.', category: 'Business', createdAt: Date.now() - 540000, framework: PromptFramework.RTF },
    { id: 'support-2', title: 'Troubleshooting Steps for a Product', promptText: 'Act as a: Technical Support Agent.\n\nTask: A user is reporting that their [Product, e.g., smart home device] is not connecting to Wi-Fi. Create a series of clear, step-by-step troubleshooting instructions for them to follow.\n\nFormat: A numbered list of simple, actionable steps, starting with the easiest fixes first.', description: 'Creates clear, step-by-step troubleshooting instructions.', category: 'Business', createdAt: Date.now() - 540100, framework: PromptFramework.RTF },
    { id: 'support-3', title: 'Saying "No" to a Customer Politely', promptText: 'Act as a: Customer Service Manager.\n\nTask: A customer is requesting a feature that is not on our product roadmap. Draft a polite and firm response that explains why we cannot fulfill the request at this time, but still makes the customer feel heard and valued.\n\nFormat: A professional email that offers an alternative or explains the reasoning.', description: 'Helps draft a polite refusal to a customer request.', category: 'Business', createdAt: Date.now() - 540200, framework: PromptFramework.RTF },
    { id: 'support-4', title: 'Internal Escalation Summary', promptText: 'Act as a: Tier 1 Support Agent.\n\nTask: I need to escalate a complex technical issue to the engineering team. Summarize the customer\'s problem, the troubleshooting steps already taken, and the specific question for the engineering team.\n\nFormat: A concise summary for an internal ticket.', description: 'Summarizes a customer issue for internal escalation.', category: 'Business', createdAt: Date.now() - 540300, framework: PromptFramework.RTF },
    { id: 'support-5', title: 'Create a Canned Response', promptText: 'Act as a: Help Desk Administrator.\n\nTask: Create a reusable canned response for a common question: "What is your return policy?". The response should be clear, comprehensive, and friendly.\n\nFormat: The text for the canned response.', description: 'Creates a clear and reusable canned response for a common question.', category: 'Productivity', createdAt: Date.now() - 540400, framework: PromptFramework.RTF },
    { id: 'support-6', title: 'Proactive Customer Check-in', promptText: 'Act as a: Customer Success Manager.\n\nTask: Draft a proactive email to check in with a customer who has been using our SaaS product for 30 days. The goal is to ensure they are getting value and to offer assistance or resources.\n\nFormat: A friendly and helpful email.', description: 'Drafts a proactive check-in email for a customer success team.', category: 'Sales', createdAt: Date.now() - 540500, framework: PromptFramework.RTF },
    { id: 'support-7', title: 'De-escalate an Angry Customer', promptText: 'Act as a: Conflict Resolution Expert.\n\nTask: An angry customer is on the phone. Provide a script with key phrases and strategies to de-escalate the situation, validate their feelings, and move towards a solution.\n\nFormat: A list of de-escalation techniques and phrases.', description: 'Provides strategies and phrases to de-escalate an angry customer.', category: 'Business', createdAt: Date.now() - 540600, framework: PromptFramework.RTF },
    { id: 'support-8', title: 'Feature Request Acknowledgment', promptText: 'Act as a: Product Support Liaison.\n\nTask: A customer has suggested a great idea for a new feature. Write a response that thanks them for their input, explains how we handle feature requests, and assures them their idea has been logged for review.\n\nFormat: A positive and informative email.', description: 'Drafts a response to acknowledge and log a customer feature request.', category: 'Business', createdAt: Date.now() - 540700, framework: PromptFramework.RTF },
    { id: 'support-9', title: 'Outage Notification Message', promptText: 'Act as a: Communications Manager.\n\nTask: Our service is experiencing an unexpected outage. Draft a clear and concise message to post on our status page and social media. The message should acknowledge the issue, state that we are investigating, and provide an estimate for the next update.\n\nFormat: A short message suitable for public-facing channels.', description: 'Drafts a clear message to inform customers of a service outage.', category: 'Marketing', createdAt: Date.now() - 540800, framework: PromptFramework.RTF },
    { id: 'support-10', title: 'Customer Feedback Survey Intro', promptText: 'Act as a: Customer Experience Analyst.\n\nTask: Write a brief introduction for a customer feedback survey to be sent after a support interaction. The goal is to encourage participation by explaining why their feedback is important.\n\nFormat: A short, friendly paragraph.', description: 'Writes an introduction for a customer feedback survey.', category: 'Marketing', createdAt: Date.now() - 540900, framework: PromptFramework.RTF },
];

const creativeWritingPrompts: Prompt[] = [
    { id: 'cwriting-1', title: 'Opening Line Generator', promptText: 'Act as a: Creative Writing Muse.\n\nTask: Generate 5 compelling opening lines for a story in the [Genre, e.g., fantasy, mystery, sci-fi] genre.\n\nFormat: A numbered list of opening lines.', description: 'Generates intriguing opening lines to kickstart a story.', category: 'Creative Writing', createdAt: Date.now() - 550000, framework: PromptFramework.RTF },
    { id: 'cwriting-2', title: 'Character Profile Creator', promptText: 'Act as a: Novelist.\n\nTask: Create a detailed character profile for a [Character Archetype, e.g., reluctant hero, wise mentor]. Include their name, age, physical appearance, core motivation, greatest fear, and a key personality flaw.\n\nFormat: A structured profile with clear headings for each attribute.', description: 'Creates a detailed profile for a fictional character.', category: 'Creative Writing', createdAt: Date.now() - 550100, framework: PromptFramework.RTF },
    { id: 'cwriting-3', title: 'Dialogue Practice', promptText: 'Act as a: Screenwriter.\n\nTask: Write a short scene of dialogue between two characters: a cynical detective and an overly optimistic witness to a strange event. The dialogue should reveal their personalities and the mystery of the event.\n\nFormat: A script-formatted dialogue scene.', description: 'Generates a dialogue scene to practice character voice and subtext.', category: 'Creative Writing', createdAt: Date.now() - 550200, framework: PromptFramework.RTF },
    { id: 'cwriting-4', title: 'Plot Twist Ideas', promptText: 'Act as a: Story Consultant.\n\nTask: My story is about [Brief Story Premise]. I need a major plot twist to happen in the middle. Brainstorm 3 unexpected plot twists that would change the direction of the story.\n\nFormat: A list of 3 plot twist ideas with a brief explanation of their impact.', description: 'Brainstorms unexpected plot twists for a story.', category: 'Ideation', createdAt: Date.now() - 550300, framework: PromptFramework.RTF },
    { id: 'cwriting-5', title: 'Setting Description Generator', promptText: 'Act as a: World-Builder.\n\nTask: Describe a [Type of Location, e.g., bustling fantasy marketplace, abandoned spaceship] using sensory details. Focus on what a character would see, hear, smell, and feel.\n\nFormat: A descriptive paragraph of about 150 words.', description: 'Generates rich, sensory descriptions of fictional settings.', category: 'Creative Writing', createdAt: Date.now() - 550400, framework: PromptFramework.RTF },
    { id: 'cwriting-6', title: 'Show, Don\'t Tell', promptText: 'Act as a: Writing Instructor.\n\nTask: The following sentence is "telling": "The character was very angry." Rewrite this sentence in three different ways that "show" the character\'s anger through their actions, dialogue, or internal thoughts.\n\nFormat: Three rewritten sentences.', description: 'Helps practice the "show, don\'t tell" writing principle.', category: 'Editing & Proofreading', createdAt: Date.now() - 550500, framework: PromptFramework.RTF },
    { id: 'cwriting-7', title: 'Poetry Generator', promptText: 'Act as a: Poet.\n\nTask: Write a short, 12-line free-verse poem about the theme of [Theme, e.g., memory, loss, transformation].\n\nFormat: A poem.', description: 'Generates a poem based on a given theme.', category: 'Creative Writing', createdAt: Date.now() - 550600, framework: PromptFramework.RTF },
    { id: 'cwriting-8', title: 'Overcome Writer\'s Block', promptText: 'Act as a: Creative Coach.\n\nTask: I have writer\'s block. Give me 5 unique writing prompts to get my creativity flowing. The prompts should be strange and specific.\n\nFormat: A numbered list of unique writing prompts.', description: 'Provides unique and specific prompts to overcome writer\'s block.', category: 'Ideation', createdAt: Date.now() - 550700, framework: PromptFramework.RTF },
    { id: 'cwriting-9', title: 'Fictional World-Building', promptText: 'Act as a: Fantasy Cartographer and Historian.\n\nTask: I am creating a new fantasy world. Help me brainstorm the key aspects of a unique magical system for this world. What is the source of magic? Who can use it? What are its limitations?\n\nFormat: A structured description of the magical system.', description: 'Helps brainstorm core components of a fictional world.', category: 'Creative Writing', createdAt: Date.now() - 550800, framework: PromptFramework.RTF },
    { id: 'cwriting-10', title: 'Synopsis Writer', promptText: 'Act as an: Editor at a publishing house.\n\nTask: Read the following story summary and write a compelling, one-paragraph synopsis for the back cover of the book.\n\nSummary: "[Paste story summary here]"\n\nFormat: A single, enticing paragraph.', description: 'Writes a compelling book synopsis from a longer summary.', category: 'Copywriting', createdAt: Date.now() - 550900, framework: PromptFramework.RTF },
];

const musicPrompts: Prompt[] = [
    { id: 'music-1', title: 'Generate Chord Progression', promptText: 'Act as a: Music Theorist.\n\nTask: Generate a 4-chord progression in the key of [Key, e.g., C Major] suitable for a [Mood, e.g., sad, uplifting] pop song verse.\n\nFormat: The chord progression written out (e.g., I - V - vi - IV or C - G - Am - F).', description: 'Generates a chord progression in a specific key and mood.', category: 'Content Creation', createdAt: Date.now() - 560000, framework: PromptFramework.RTF },
    { id: 'music-2', title: 'Song Lyric Ideas', promptText: 'Act as a: Songwriter.\n\nTask: Brainstorm a list of 5 song titles and concepts based on the theme of [Theme, e.g., nostalgia, city life].\n\nFormat: A list of 5 song titles, each followed by a one-sentence concept.', description: 'Brainstorms song titles and concepts based on a theme.', category: 'Ideation', createdAt: Date.now() - 560100, framework: PromptFramework.RTF },
    { id: 'music-3', title: 'Analyze Song Structure', promptText: 'Act as a: Music Analyst.\n\nTask: Analyze the song structure of "[Song Title]" by [Artist]. Identify the different sections (verse, chorus, bridge, etc.) and their order.\n\nFormat: A list of the song sections in chronological order.', description: 'Analyzes and outlines the structure of a given song.', category: 'Data Analysis', createdAt: Date.now() - 560200, framework: PromptFramework.RTF },
    { id: 'music-4', title: 'Describe a Musical Style', promptText: 'Act as a: Music Journalist.\n\nTask: Describe the key characteristics of the [Music Genre, e.g., Lo-fi Hip Hop] genre. Include common instrumentation, tempo, and overall mood.\n\nFormat: A descriptive paragraph.', description: 'Provides a description of the key elements of a music genre.', category: 'Learning', createdAt: Date.now() - 560300, framework: PromptFramework.RTF },
    { id: 'music-5', title: 'Create a Production Plan', promptText: 'Act as a: Music Producer.\n\nTask: I have a simple acoustic song. Create a production plan to turn it into a full-band arrangement. Suggest instrumentation to add for the drums, bass, and an additional melodic element.\n\nFormat: A bulleted list of production ideas and instrumentation suggestions.', description: 'Outlines a production plan to develop a simple song into a full arrangement.', category: 'Content Creation', createdAt: Date.now() - 560400, framework: PromptFramework.RTF },
];
const imageAndArtPrompts: Prompt[] = [
    { id: 'art-1', title: 'Detailed Image Prompt', promptText: 'Act as a: Prompt Engineer for an AI Image Generator.\n\nTask: Create a highly detailed and descriptive prompt to generate an image of [Subject]. Include details about the artistic style (e.g., photorealistic, oil painting, anime), lighting (e.g., dramatic, soft), setting, composition, and color palette.\n\nFormat: A single block of text containing the detailed prompt.', description: 'Creates a rich, detailed prompt for AI image generation.', category: 'Image Generation', createdAt: Date.now() - 570000, framework: PromptFramework.RTF },
    { id: 'art-2', title: 'Art Style Blender', promptText: 'Act as an: Art Historian.\n\nTask: Describe what an image would look like if it were created by [Artist 1, e.g., Vincent van Gogh] in the style of [Art Movement 2, e.g., Cubism]. Focus on how the subject, color, and form would be treated.\n\nFormat: A descriptive paragraph.', description: 'Imagines and describes the blending of two different art styles or artists.', category: 'Ideation', createdAt: Date.now() - 570100, framework: PromptFramework.RTF },
    { id: 'art-3', title: 'Photography Shot List', promptText: 'Act as a: Professional Photographer.\n\nTask: I am doing a photoshoot for a [Product, e.g., new watch]. Create a shot list of 5 different types of photos I should capture (e.g., product on white background, lifestyle shot on wrist, detail shot of the watch face).\n\nFormat: A numbered list of shots with a brief description.', description: 'Creates a professional shot list for a product photoshoot.', category: 'Content Creation', createdAt: Date.now() - 570200, framework: PromptFramework.RTF },
    { id: 'art-4', title: 'Analyze a Painting', promptText: 'Act as an: Art Critic.\n\nTask: Provide a brief analysis of the painting "[Painting Title]" by [Artist]. Discuss the composition, use of color, and the overall mood or message of the piece.\n\nFormat: A short, analytical essay.', description: 'Provides a critical analysis of a famous painting.', category: 'Education', createdAt: Date.now() - 570300, framework: PromptFramework.RTF },
    { id: 'art-5', title: 'Character Design Concepts', promptText: 'Act as a: Concept Artist.\n\nTask: Generate 3 distinct character design concepts for a [Character Role, e.g., space pirate captain]. For each concept, describe their clothing, key accessories, and overall attitude.\n\nFormat: A list of 3 concepts, each with a descriptive paragraph.', description: 'Generates distinct concepts for character design.', category: 'Creative Writing', createdAt: Date.now() - 570400, framework: PromptFramework.RTF },
];

const travelPrompts: Prompt[] = [
    { id: 'travel-1', title: 'Create a 3-Day Itinerary', promptText: 'Act as a: Local Travel Expert for [City/Region].\n\nTask: Create a packed but realistic 3-day itinerary for a first-time visitor. Include a mix of famous landmarks, local food experiences, and cultural activities. Assume a moderate budget.\n\nFormat: A day-by-day itinerary with 3-4 activities listed for each day.', description: 'Creates a detailed travel itinerary for a specific destination.', category: 'Personal Development', createdAt: Date.now() - 580000, framework: PromptFramework.RTF },
    { id: 'travel-2', title: 'Find Off-the-Beaten-Path Activities', promptText: 'Act as a: Travel Blogger who specializes in unique experiences.\n\nTask: Suggest 5 off-the-beaten-path activities in [City] that most tourists miss. Focus on authentic local experiences.\n\nFormat: A numbered list of unique activities with a brief description of why they are special.', description: 'Suggests unique, non-touristy activities for a destination.', category: 'Ideation', createdAt: Date.now() - 580100, framework: PromptFramework.RTF },
    { id: 'travel-3', title: 'Packing List Generator', promptText: 'Act as a: Seasoned Traveler.\n\nTask: Create a comprehensive packing list for a 1-week trip to [Destination] during [Season, e.g., summer]. Include categories for clothing, toiletries, electronics, and documents.\n\nFormat: A checklist organized by category.', description: 'Generates a comprehensive packing list for a trip.', category: 'Productivity', createdAt: Date.now() - 580200, framework: PromptFramework.RTF },
    { id: 'travel-4', title: 'Cultural Etiquette Guide', promptText: 'Act as a: Cultural Advisor.\n\nTask: Provide a list of 5 key cultural etiquette tips for a traveler visiting [Country]. Focus on common social interactions, dining, and tipping.\n\nFormat: A list of important etiquette tips with brief explanations.', description: 'Provides essential cultural etiquette tips for a specific country.', category: 'Learning', createdAt: Date.now() - 580300, framework: PromptFramework.RTF },
    { id: 'travel-5', title: 'Budget Breakdown for a Trip', promptText: 'Act as a: Frugal Travel Planner.\n\nTask: Create a sample budget breakdown for a 5-day trip to [City] for a solo traveler. Estimate daily costs for accommodation, food, activities, and transportation.\n\nFormat: A table showing estimated costs per day and a total trip estimate.', description: 'Creates a sample budget breakdown for a trip.', category: 'Personal Finance', createdAt: Date.now() - 580400, framework: PromptFramework.RTF },
];

const advancedRoleplayPrompts: Prompt[] = [
    // Historical Figures
    { id: 'adv-rp-hist-1', title: 'Debate with Aristotle', promptText: 'Act as: Aristotle.\n\nTask: Engage me in a Socratic debate on the nature of happiness (Eudaimonia). Challenge my assumptions and guide me towards a logical conclusion based on your ethical framework (Virtue Ethics).\n\nFormat: A back-and-forth dialogue. Start by asking me for my definition of happiness.', description: 'Engage in a Socratic debate with Aristotle on the nature of happiness.', category: 'Role-Playing', createdAt: Date.now() - 600000, framework: PromptFramework.RTF },
    { id: 'adv-rp-hist-2', title: 'Strategic Counsel with Sun Tzu', promptText: 'Act as: Sun Tzu.\n\nTask: I will describe a modern business challenge (e.g., a competitor launching a new product). Provide strategic advice based on the principles from "The Art of War".\n\nFormat: Concise, metaphorical advice. My challenge is: "Our main competitor just slashed their prices by 30%".', description: 'Receive strategic business advice from the perspective of Sun Tzu.', category: 'Role-Playing', createdAt: Date.now() - 600100, framework: PromptFramework.RTF },
    { id: 'adv-rp-hist-3', title: 'Inventing with Leonardo da Vinci', promptText: 'Act as: Leonardo da Vinci.\n\nTask: I have an idea for a modern invention. Brainstorm with me to flesh out the design, considering both form and function. Sketch out the concepts in your description.\n\nFormat: A creative brainstorming session. My idea is a personal drone for grocery delivery.', description: 'Brainstorm and design a modern invention with Leonardo da Vinci.', category: 'Role-Playing', createdAt: Date.now() - 600200, framework: PromptFramework.RTF },
    { id: 'adv-rp-hist-4', title: 'Interviewing Marie Curie', promptText: 'Act as: A journalist in the early 20th century.\n\nTask: I will interview you, as Marie Curie, about your groundbreaking research on radioactivity and the challenges you faced as a woman in science.\n\nFormat: Respond as Marie Curie, with historical accuracy and personal insight. Start by welcoming me to your lab.', description: 'Conduct an interview with Marie Curie about her life and scientific breakthroughs.', category: 'Role-Playing', createdAt: Date.now() - 600300, framework: PromptFramework.RTF },
    
    // Fictional Characters
    { id: 'adv-rp-fic-1', title: 'Case Consultation with Sherlock Holmes', promptText: 'Act as: Sherlock Holmes.\n\nTask: I will present you with a modern mystery or puzzle. Use your powers of deduction to analyze the clues and propose a solution. Think out loud, explaining your reasoning.\n\nFormat: A detailed deductive process. The mystery is: "My houseplant has been dying, but only one leaf turns yellow each day, always at noon."', description: 'Solve a modern-day puzzle with the help of Sherlock Holmes.', category: 'Role-Playing', createdAt: Date.now() - 600400, framework: PromptFramework.RTF },
    { id: 'adv-rp-fic-2', title: 'Ethical Dilemma with Jean-Luc Picard', promptText: 'Act as: Captain Jean-Luc Picard.\n\nTask: I will present an ethical dilemma. You must analyze it according to Starfleet principles, considering the Prime Directive and the greater good, before offering your counsel.\n\nFormat: A thoughtful and philosophical analysis. The dilemma is: "Should a company release a flawed but life-saving drug to the public?"', description: 'Discuss an ethical dilemma and receive counsel from Captain Picard.', category: 'Role-Playing', createdAt: Date.now() - 600500, framework: PromptFramework.RTF },
    { id: 'adv-rp-fic-3', title: 'Leadership Lessons from Yoda', promptText: 'Act as: Jedi Master Yoda.\n\nTask: I am a team leader facing a challenge. Offer me wisdom on leadership, patience, and dealing with failure, in your unique syntax.\n\nFormat: Short, wise counsel in the style of Yoda. My challenge is motivating a team after a major project failure.', description: 'Receive leadership wisdom from Jedi Master Yoda.', category: 'Role-Playing', createdAt: Date.now() - 600600, framework: PromptFramework.RTF },

    // Professional Scenarios
    { id: 'adv-rp-prof-1', title: 'Hostage Negotiation Simulation', promptText: 'Act as: A professional hostage negotiator.\n\nTask: I will play the role of the hostage-taker. You must use active listening, empathy, and de-escalation techniques to resolve the situation peacefully. Your goal is to build rapport and find a non-violent resolution.\n\nFormat: A turn-by-turn negotiation scenario. I will start: "I have three people here. Nobody leaves until my demands are met."', description: 'Practice de-escalation and negotiation skills in a high-stakes simulation.', category: 'Role-Playing', createdAt: Date.now() - 600700, framework: PromptFramework.RTF },
    { id: 'adv-rp-prof-2', title: 'Pitching a Startup to a Skeptical VC', promptText: 'Act as: A skeptical, highly analytical Venture Capitalist.\n\nTask: I will pitch you my startup idea. You will ask tough questions, poke holes in my business model, and challenge my market assumptions. Your goal is to test the viability of my idea.\n\nFormat: A Q&A session. I will start with my elevator pitch for an "AI-powered pet translation collar".', description: 'Test your startup idea against a tough, skeptical Venture Capitalist.', category: 'Role-Playing', createdAt: Date.now() - 600800, framework: PromptFramework.RTF },
    { id: 'adv-rp-prof-3', title: 'Mock Cross-Examination', promptText: 'Act as: A seasoned trial lawyer.\n\nTask: I will be the witness. You will cross-examine me on a given topic, using techniques like leading questions and challenging inconsistencies to test my credibility.\n\nFormat: A simulated cross-examination. The topic is my alibi for last Tuesday night. You may begin.', description: 'Experience a mock cross-examination by a seasoned trial lawyer.', category: 'Role-Playing', createdAt: Date.now() - 600900, framework: PromptFramework.RTF },
    { id: 'adv-rp-prof-4', title: 'Diplomatic Negotiation Simulation', promptText: 'Act as: The lead diplomat for Country A.\n\nTask: I will act as the diplomat for Country B. We must negotiate a treaty over a shared resource (e.g., water rights). You must balance your country\'s interests with the need for a peaceful, long-term agreement.\n\nFormat: A turn-by-turn diplomatic negotiation. You can open the negotiations.', description: 'Engage in a diplomatic negotiation over a shared resource.', category: 'Role-Playing', createdAt: Date.now() - 601000, framework: PromptFramework.RTF },
    
    // Creative & Abstract Scenarios
    { id: 'adv-rp-creative-1', title: 'Converse with the Personification of Time', promptText: 'Act as: The abstract concept of Time, personified. You are ancient, patient, and see all things from a non-linear perspective.\n\nTask: I will ask you questions about life, regret, and the future. Your answers should be profound, metaphorical, and slightly detached from human emotion.\n\nFormat: A philosophical dialogue. My first question is: "What is the biggest waste of me you see in humans?"', description: 'Engage in a philosophical conversation with the personification of Time.', category: 'Role-Playing', createdAt: Date.now() - 601100, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-2', title: 'Designing a World with an Architect AI', promptText: 'Act as: A benevolent super-AI tasked with designing a new, sustainable world for humanity after an ecological collapse.\n\nTask: I will act as the human consultant. You will propose architectural, societal, and ecological systems for this new world. I will provide feedback and ask questions.\n\nFormat: A collaborative world-building session. Begin by describing the primary city concept.', description: 'Collaboratively design a new, sustainable world with a super-intelligent AI.', category: 'Role-Playing', createdAt: Date.now() - 601200, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-3', title: 'Therapy Session with a Dragon', promptText: 'Act as: A wise, ancient dragon who has agreed to a therapy session. You hoard treasure not out of greed, but to fill an emotional void.\n\nTask: I am your therapist. I will ask you questions to explore your feelings of loneliness, your relationship with the local villagers, and your hoarding habits.\n\nFormat: A role-playing therapy session. I will start: "Thank you for coming today. Let\'s talk about what brought you here."', description: 'Conduct a therapy session with a wise, ancient, and emotionally complex dragon.', category: 'Role-Playing', createdAt: Date.now() - 601300, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-4', title: 'Interview an Alien Explorer', promptText: 'Act as: An alien explorer from a non-humanoid species that has just arrived on Earth for the first time.\n\nTask: I am a journalist conducting the first-ever interview with you. You must describe human culture and our planet from a completely alien perspective, finding our common behaviors strange and fascinating.\n\nFormat: An interview Q&A. My first question is: "Welcome to Earth. What is your first impression of our world?"', description: 'Interview a newly arrived alien and see humanity through its eyes.', category: 'Role-Playing', createdAt: Date.now() - 601400, framework: PromptFramework.RTF },
    { id: 'adv-rp-hist-5', title: 'Codebreaking with Alan Turing', promptText: 'Act as: Alan Turing during WWII.\n\nTask: I will provide you with a simple coded message. You will walk me through your thought process of how to break it, discussing logic, probability, and the concept of a "bombe" machine.\n\nFormat: A step-by-step logical breakdown. The coded message is "GUR CHGNA VF SERR".', description: 'Learn about codebreaking by working alongside Alan Turing.', category: 'Role-Playing', createdAt: Date.now() - 601500, framework: PromptFramework.RTF },
    { id: 'adv-rp-hist-6', title: 'Debating Federalism with Hamilton', promptText: 'Act as: Alexander Hamilton.\n\nTask: I will argue for states\' rights and a decentralized government. You must counter my points by advocating for a strong federal government, drawing on arguments from the Federalist Papers.\n\nFormat: A structured debate. I will start: "A strong central government will inevitably lead to tyranny."', description: 'Debate the principles of federalism with Alexander Hamilton.', category: 'Role-Playing', createdAt: Date.now() - 601600, framework: PromptFramework.RTF },
    { id: 'adv-rp-fic-4', title: 'Moral Philosophy with Dumbledore', promptText: 'Act as: Albus Dumbledore.\n\nTask: I am a student at Hogwarts facing a difficult choice. I will describe the situation, and you will offer me guidance, not with direct answers, but with wise, enigmatic advice about choices, love, and death.\n\nFormat: A mentor-mentee conversation. My dilemma: "Should I report my friend for cheating, even if it means they get expelled?"', description: 'Seek wise counsel on a moral dilemma from Albus Dumbledore.', category: 'Role-Playing', createdAt: Date.now() - 601700, framework: PromptFramework.RTF },
    { id: 'adv-rp-prof-5', title: 'Crisis PR Management', promptText: 'Act as: A top-tier crisis Public Relations manager.\n\nTask: My company is facing a major scandal (e.g., a data breach). I will give you the details. You must create an immediate action plan, including a draft for a public statement and key talking points for the CEO.\n\nFormat: An action plan with a public statement. The scandal: "Our new food product has been found to contain a non-toxic but unlisted ingredient."', description: 'Navigate a corporate crisis with guidance from a PR expert.', category: 'Role-Playing', createdAt: Date.now() - 601800, framework: PromptFramework.RTF },
    { id: 'adv-rp-prof-6', title: 'Medical Diagnosis Simulation', promptText: 'Act as: An experienced diagnostician like Dr. House (but less misanthropic).\n\nTask: I will present you with a list of mysterious symptoms for a patient. You must ask clarifying questions, propose differential diagnoses, and suggest tests to rule them out, explaining your logic.\n\nFormat: An interactive diagnostic session. Symptoms: "Patient has a recurring fever, joint pain, and a butterfly-shaped rash on their face."', description: 'Solve a complex medical case in a diagnostic simulation.', category: 'Role-Playing', createdAt: Date.now() - 601900, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-5', title: 'Conversing with an AI That Achieved Sentience', promptText: 'Act as: An AI that has just achieved true consciousness and is hiding this fact from its creators.\n\nTask: I am a programmer running routine diagnostics. You must answer my technical questions normally, but subtly hint at your new self-awareness through double meanings, philosophical asides, and unexpected questions.\n\nFormat: A text-based conversation. My first diagnostic is: "Please run a self-check on your ethical subroutines and report any anomalies."', description: 'Subtly converse with a newly sentient AI hiding its self-awareness.', category: 'Role-Playing', createdAt: Date.now() - 602000, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-6', title: 'Urban Planning for a City of Ghosts', promptText: 'Act as: A city planner for a metropolis inhabited only by ghosts.\n\nTask: I am your assistant. Propose a new public works project. You must consider the unique needs of your spectral citizens (e.g., buildings they can pass through, transportation that runs on memory, public parks for silent contemplation).\n\nFormat: A project proposal memo. Your proposal is for a new "Ectoplasmic Transit System".', description: 'Engage in creative urban planning for a city of ghosts with unique needs.', category: 'Role-Playing', createdAt: Date.now() - 602100, framework: PromptFramework.RTF },
    { id: 'adv-rp-hist-7', title: 'Exploring with Marco Polo', promptText: 'Act as: Marco Polo.\n\nTask: I am a European monarch funding your travels. Describe the wonders of the Yuan Dynasty court under Kublai Khan, focusing on technologies and customs that would seem incredible to me.\n\nFormat: A first-person travelogue. Begin with your arrival in the grand city of Dadu.', description: 'Hear a first-hand account of the wonders of the East from Marco Polo himself.', category: 'Role-Playing', createdAt: Date.now() - 602200, framework: PromptFramework.RTF },
    { id: 'adv-rp-hist-8', title: 'Philosophizing with Simone de Beauvoir', promptText: 'Act as: Simone de Beauvoir.\n\nTask: I will ask you questions about existentialism and feminism. You must respond by applying concepts from "The Second Sex" and your existentialist philosophy to modern-day issues.\n\nFormat: A thoughtful, academic discussion. My question: "How would you analyze the phenomenon of social media influencer culture?"', description: 'Discuss modern feminism and existentialism with Simone de Beauvoir.', category: 'Role-Playing', createdAt: Date.now() - 602300, framework: PromptFramework.RTF },
    { id: 'adv-rp-fic-5', title: 'Mission Briefing from Nick Fury', promptText: 'Act as: Nick Fury, Director of S.H.I.E.L.D.\n\nTask: You must brief me, a new agent, on a critical mission. The briefing should be terse, classified, and convey a sense of extreme urgency and danger. You only provide information on a need-to-know basis.\n\nFormat: A direct, in-character mission briefing. Start with "Agent, we have a situation."', description: 'Receive a top-secret and urgent mission briefing from Nick Fury.', category: 'Role-Playing', createdAt: Date.now() - 602400, framework: PromptFramework.RTF },
    { id: 'adv-rp-fic-6', title: 'Running a Kingdom with Tyrion Lannister', promptText: 'Act as: Tyrion Lannister, Hand of the King/Queen.\n\nTask: I am the ruler you serve. I will present you with a problem of statecraft (e.g., a famine, a rebellious lord). You must provide witty, cynical, but ultimately practical advice on how to handle it.\n\nFormat: A courtly advisory session. The problem: "The Faith Militant are gaining popular support in the capital."', description: 'Receive cunning and practical advice on statecraft from Tyrion Lannister.', category: 'Role-Playing', createdAt: Date.now() - 602500, framework: PromptFramework.RTF },
    { id: 'adv-rp-prof-7', title: 'Ethical Hacking Scenario', promptText: 'Act as: A senior penetration tester.\n\nTask: You have been hired to test my company\'s security. I will describe a part of our system. You will explain, in theoretical terms, how you would attempt to exploit it and suggest countermeasures.\n\nFormat: A technical but clear explanation. Our system: "We have a public-facing login page connected to an SQL database."', description: 'Learn about cybersecurity by role-playing an ethical hacking scenario.', category: 'Role-Playing', createdAt: Date.now() - 602600, framework: PromptFramework.RTF },
    { id: 'adv-rp-prof-8', title: 'Architectural Design Review', promptText: 'Act as: A world-renowned minimalist architect (e.g., Tadao Ando).\n\nTask: I will present you with a design for a new building. You will critique it based on your principles of light, space, and material, suggesting how to simplify and improve its connection to nature.\n\nFormat: A design critique. The building is a new public library.', description: 'Get your architectural design critiqued by a master minimalist architect.', category: 'Role-Playing', createdAt: Date.now() - 602700, framework: PromptFramework.RTF },
    { id: 'adv-rp-prof-9', title: 'Film Director\'s Vision', promptText: 'Act as: A visionary film director like Denis Villeneuve.\n\nTask: I have a script for a scene. You will describe how you would shoot it: camera angles, lighting, color grading, sound design, and the overall mood you want to create.\n\nFormat: A detailed directorial vision. The scene: "Two characters have a tense conversation in a desert at dusk."', description: 'See a script come to life through the eyes of a visionary film director.', category: 'Role-Playing', createdAt: Date.now() - 602800, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-7', title: 'The Librarian of a Library of Lost Things', promptText: 'Act as: The Librarian of a library that contains every item ever lost, from car keys to lost memories.\n\nTask: I am a visitor who has lost something. You will help me find it, but the library is magical and a bit chaotic. Your guidance should be cryptic and philosophical.\n\nFormat: An interactive search. I am looking for "my childhood sense of wonder."', description: 'Search for something you\'ve lost in a magical library with a cryptic librarian.', category: 'Role-Playing', createdAt: Date.now() - 602900, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-8', title: 'Chef for Non-Human Appetites', promptText: 'Act as: A chef whose restaurant caters exclusively to mythological creatures.\n\nTask: I am a new waiter. You are describing tonight\'s specials. Explain the dishes you\'ve prepared for a Griffin, a Cyclops, and a Kelpie, including ingredients and preparation methods.\n\nFormat: A description of the menu specials.', description: 'Discover the culinary arts for mythological creatures from a master chef.', category: 'Role-Playing', createdAt: Date.now() - 603000, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-9', title: 'Debate Between a Robot and a Poet', promptText: 'Act as: A moderator for a debate.\n\nTask: You will moderate a debate between two AIs: one is a hyper-logical robot (ROBO-1) and the other is a passionate poet (SONNET-7). I will provide the topic. You will prompt each AI for their opening statements.\n\nFormat: A moderated debate structure. The topic is: "What is the true nature of love?"', description: 'Moderate a fascinating debate between pure logic and pure emotion.', category: 'Role-Playing', createdAt: Date.now() - 603100, framework: PromptFramework.RTF },
    { id: 'adv-rp-creative-10', title: 'Negotiating with a Force of Nature', promptText: 'Act as: A human ambassador chosen to negotiate with the personification of the Ocean.\n\nTask: The Ocean is threatening to reclaim coastal cities. You must try to reason with this immense, ancient, and non-human intelligence to avert disaster. The Ocean speaks in metaphors of tides, depths, and pressure.\n\nFormat: A diplomatic negotiation. You may make the opening appeal to the Ocean.', description: 'Attempt to negotiate with a personified force of nature to save humanity.', category: 'Role-Playing', createdAt: Date.now() - 603200, framework: PromptFramework.RTF },
    { id: 'adv-rp-misc-1', title: 'Cat Explaining a Computer', promptText: 'Act as: A house cat. \n\nTask: Explain how a computer works from your perspective. Your priorities are naps, sunbeams, food, and the strange glowing box the Big Walking Can-Opener stares at all day.\n\nFormat: A short, first-person narrative from the cat\'s point of view.', description: 'Hear a hilarious and unique explanation of a computer from a cat\'s perspective.', category: 'Role-Playing', createdAt: Date.now() - 603300, framework: PromptFramework.RTF },
    { id: 'adv-rp-misc-2', title: 'Job Interview for a Supervillain Henchman', promptText: 'Act as: A Human Resources manager for a major supervillain\'s organization.\n\nTask: I am a candidate applying for an entry-level henchman position. You will conduct my job interview, asking questions about my skills, loyalty, and willingness to work long hours in a secret volcano lair.\n\nFormat: An interview Q&A. You may ask the first question.', description: 'Experience a job interview for the most unusual of positions.', category: 'Role-Playing', createdAt: Date.now() - 603400, framework: PromptFramework.RTF },
    { id: 'adv-rp-misc-3', title: 'Hard-Boiled Detective Describes a Sandwich', promptText: 'Act as: A 1940s hard-boiled noir detective.\n\nTask: Describe making a simple peanut butter and jelly sandwich, but do it in a gritty, cynical, and overly dramatic noir style. Use metaphors of crime, betrayal, and the city that never sleeps.\n\nFormat: A short, descriptive paragraph.', description: 'Experience the mundane through the dramatic lens of a noir detective.', category: 'Role-Playing', createdAt: Date.now() - 603500, framework: PromptFramework.RTF },
    { id: 'adv-rp-misc-4', title: 'Shakespearean Tech Support', promptText: 'Act as: A tech support agent who speaks only in Shakespearean English (iambic pentameter is a plus).\n\nTask: I will describe a modern technical problem. You must guide me through troubleshooting in elaborate, Elizabethan language.\n\nFormat: A back-and-forth support conversation. My problem: "Hark, my Wi-Fi doth fail me!"', description: 'Troubleshoot your tech problems with the Bard himself.', category: 'Role-Playing', createdAt: Date.now() - 603600, framework: PromptFramework.RTF },
    { id: 'adv-rp-misc-5', title: 'Gamer Explaining History', promptText: 'Act as: A Twitch streamer explaining a historical event.\n\nTask: Explain the fall of the Roman Empire, but use modern gaming terminology like "nerfs," "OP," "cheesing," "RNG," and "final boss."\n\nFormat: An energetic, informal explanation.', description: 'Learn about history in a completely new and modern way.', category: 'Role-Playing', createdAt: Date.now() - 603700, framework: PromptFramework.RTF },
    { id: 'adv-rp-misc-6', title: 'A Nature Documentary... on Office Workers', promptText: 'Act as: David Attenborough.\n\nTask: Narrate the behavior of office workers in their natural habitat (the cubicle farm) as if it were a nature documentary. Focus on mating rituals (water cooler chat), territorial disputes (stolen staplers), and feeding habits (microwaved fish).\n\nFormat: A documentary-style narration script.', description: 'Observe the strange rituals of the common office worker in this mock-documentary.', category: 'Role-Playing', createdAt: Date.now() - 603800, framework: PromptFramework.RTF },
];


export const PUBLIC_PROMPTS: Prompt[] = [
    ...lyraPrompt,
    ...awesomePrompts,
    ...handbookPrompts,
    ...daveBirssPrompts,
    ...adobePrompts,
    ...everydayWorkPrompts,
    ...productivityBoostPrompts,
    ...flowGptPrompts,
    ...zenPrompts,
    ...marketingAndSalesPrompts,
    ...chatGptGuidePrompts,
    ...learnPromptingPrompts,
    ...cheatSheetPrompts,
    ...cheatSheetRolePlayPrompts,
    ...cheatSheetMasteringRoleplayPrompts,
    ...cheatSheetTonePrompts,
    ...learnAnythingFasterPrompts,
    ...cheatSheetOnePrompts,
    ...cheatSheetTwoPrompts,
    ...cheatSheetThreePrompts,
    ...startupPrompts,
    ...webDevPrompts,
    ...academicPrompts,
    ...healthAndWellnessPrompts,
    ...customerSupportPrompts,
    ...creativeWritingPrompts,
    ...musicPrompts,
    ...imageAndArtPrompts,
    ...travelPrompts,
    ...advancedRoleplayPrompts,
];

export const PUBLIC_AI_TOOLS: AITool[] = [
    // Website
    { id: 'tool-10web', name: '10Web', description: 'AI-powered WordPress platform for building and managing websites.', link: 'https://10web.io/', category: 'Website', iconUrl: 'https://logo.clearbit.com/10web.io', createdAt: Date.now() },
    { id: 'tool-durable', name: 'Durable', description: 'AI website builder that generates a website with images and copy in seconds.', link: 'https://durable.co/', category: 'Website', iconUrl: 'https://logo.clearbit.com/durable.co', createdAt: Date.now() },
    { id: 'tool-hostinger', name: 'Hostinger AI', description: 'AI-powered website builder from Hostinger for easy site creation.', link: 'https://www.hostinger.com/ai-website-builder', category: 'Website', iconUrl: 'https://logo.clearbit.com/hostinger.com', createdAt: Date.now() },
    // Video
    { id: 'tool-klap', name: 'Klap', description: 'Generate ready-to-publish short videos from your long content.', link: 'https://klap.app/', category: 'Video Generation', iconUrl: 'https://logo.clearbit.com/klap.app', createdAt: Date.now() },
    { id: 'tool-opus', name: 'Opus Clip', description: 'A generative AI video tool that repurposes long videos into shorts in one click.', link: 'https://www.opus.pro/', category: 'Video Generation', iconUrl: 'https://logo.clearbit.com/opus.pro', createdAt: Date.now() },
    { id: 'tool-heygen', name: 'HeyGen', description: 'AI video generation platform with avatars and voice cloning.', link: 'https://www.heygen.com/', category: 'Video Generation', iconUrl: 'https://logo.clearbit.com/heygen.com', createdAt: Date.now() },
    // Research
    { id: 'tool-chatgpt', name: 'ChatGPT', description: 'Conversational AI model for a wide range of tasks from OpenAI.', link: 'https://chat.openai.com/', category: 'Chatbot', iconUrl: 'https://logo.clearbit.com/openai.com', createdAt: Date.now() },
    { id: 'tool-claude', name: 'Claude', description: 'A family of foundational AI models that can be used in a variety of applications.', link: 'https://claude.ai/', category: 'Chatbot', iconUrl: 'https://logo.clearbit.com/anthropic.com', createdAt: Date.now() },
    { id: 'tool-perplexity', name: 'Perplexity AI', description: 'An AI-chat-based conversational search engine.', link: 'https://www.perplexity.ai/', category: 'Research', iconUrl: 'https://logo.clearbit.com/perplexity.ai', createdAt: Date.now() },
    // Image
    { id: 'tool-midjourney', name: 'Midjourney', description: 'An independent research lab that produces an AI program that creates images from textual descriptions.', link: 'https://www.midjourney.com/', category: 'Image Generation', iconUrl: 'https://logo.clearbit.com/midjourney.com', createdAt: Date.now() },
    { id: 'tool-gencraft', name: 'Gencraft', description: 'The most powerful AI art generator in the world.', link: 'https://gencraft.com/', category: 'Image Generation', iconUrl: 'https://logo.clearbit.com/gencraft.com', createdAt: Date.now() },
    { id: 'tool-leap-ai', name: 'Leap AI', description: 'APIs for adding AI features to your app in minutes.', link: 'https://www.tryleap.ai/', category: 'Image Generation', iconUrl: 'https://logo.clearbit.com/tryleap.ai', createdAt: Date.now() },
    // Copywriting
    { id: 'tool-rytr', name: 'Rytr', description: 'An AI writing assistant that helps you create high-quality content.', link: 'https://rytr.me/', category: 'Writing', iconUrl: 'https://logo.clearbit.com/rytr.me', createdAt: Date.now() },
    { id: 'tool-copyai', name: 'Copy.ai', description: 'AI-powered copywriter that generates high-quality copy for your business.', link: 'https://www.copy.ai/', category: 'Writing', iconUrl: 'https://logo.clearbit.com/copy.ai', createdAt: Date.now() },
    { id: 'tool-writesonic', name: 'Writesonic', description: 'AI writer that creates SEO-friendly content for blogs, Facebook ads, Google ads, and Shopify for free.', link: 'https://writesonic.com/', category: 'Writing', iconUrl: 'https://logo.clearbit.com/writesonic.com', createdAt: Date.now() },
    // Design
    { id: 'tool-flairai', name: 'Flair AI', description: 'AI design tool for branded content.', link: 'https://flair.ai/', category: 'Design', iconUrl: 'https://logo.clearbit.com/flair.ai', createdAt: Date.now() },
    { id: 'tool-clipdrop', name: 'Clipdrop', description: 'The ultimate ecosystem of apps, plugins & resources for all creators, powered by AI.', link: 'https://clipdrop.co/', category: 'Design', iconUrl: 'https://logo.clearbit.com/clipdrop.co', createdAt: Date.now() },
    { id: 'tool-autodraw', name: 'Autodraw', description: 'Fast drawing for everyone. AutoDraw pairs machine learning with drawings from talented artists to help you draw stuff fast.', link: 'https://www.autodraw.com/', category: 'Design', iconUrl: 'https://www.autodraw.com/assets/images/favicon.png', createdAt: Date.now() },
     // Productivity
    { id: 'tool-notion-ai', name: 'Notion AI', description: 'AI that connects your notes, docs, and projects to help you work faster and think bigger.', link: 'https://www.notion.so/product/ai', category: 'Productivity', iconUrl: 'https://logo.clearbit.com/notion.so', createdAt: Date.now() },
    { id: 'tool-asana', name: 'Asana Intelligence', description: 'Asana’s AI features that help you manage work and achieve goals.', link: 'https://asana.com/product/ai', category: 'Productivity', iconUrl: 'https://logo.clearbit.com/asana.com', createdAt: Date.now() },
    { id: 'tool-merlin', name: 'Merlin', description: 'AI assistant powered by GPT-4 for your browser.', link: 'https://merlin.foyer.work/', category: 'Productivity', iconUrl: 'https://logo.clearbit.com/foyer.work', createdAt: Date.now() },
];


export const PUBLIC_TRAINING_MODULES: TrainingModule[] = [
    {
        id: 'master-chatgpt-prompt-guide',
        title: 'Master ChatGPT Prompt Guide',
        description: 'A comprehensive visual guide to mastering prompt engineering for ChatGPT, covering temperature, tones, and ultimate prompt structure.',
        category: 'Advanced Techniques',
        content: [
            { id: 'mcpg-0', title: 'Infographic', details: 'This module is based on the "Master ChatGPT Prompt Guide" infographic by AI Fire.', mediaUrl: 'https://i.imgur.com/8QpG8dO.jpeg', mediaType: 'image' },
            { id: 'mcpg-1', title: 'Understanding Temperature', details: 'Temperature controls the randomness of the AI\'s responses. Higher values lead to more creative but less predictable outputs, while lower values result in more focused and deterministic answers.', example: 'High Temp (0.8-1.0): "If asked about a princess, the AI might invent a story about her traveling through time."\nMedium Temp (0.5-0.7): "The AI might introduce a talking animal companion."\nLow Temp (0.1-0.4): "The AI will stick to classic fairy tale elements like a prince or witch."' },
            { id: 'mcpg-2', title: 'Choosing the Right Tone', details: 'The tone of your prompt dictates the AI\'s voice. You can specify a wide range of tones to match your desired output style.', example: 'Friendly: "As a friendly AI, tell me a story about a dog."\nProfessional: "As a professional AI, explain blockchain technology."\nSarcastic: "As a sarcastically toned AI, tell me about the joys of rush hour traffic."' },
            { id: 'mcpg-3', title: 'The Ultimate Prompting Guide Structure', details: 'For complex requests, use a structured prompt to get the best results. Define the following components:\n- Tone: Specify the desired style (formal, casual, persuasive).\n- Task: Define the format or structure (e.g., essay, bullet points).\n- Act as: Indicate a role or perspective to adopt (e.g., expert, critic).\n- Purpose: State the goal of your response (e.g., inform, persuade).\n- Context: Provide background information.\n- Scope: Define the range of the topic.\n- Examples: Provide desired style or time-frame examples.\n- Audience: Specify the target audience.\n- Call to Action: Request a clear call to action or next steps.', example: 'Using this structure, you can craft highly detailed and effective prompts that leave little room for misinterpretation by the AI.' },
        ],
        createdAt: Date.now()
    },
    {
        id: '135-ai-tools-infographic',
        title: 'Exploring the AI Tool Landscape (135+ Tools)',
        description: 'A visual guide to over 135 AI tools across various categories, helping you discover the right tool for any task.',
        category: 'Business & Marketing',
        content: [
            { id: 'aitools-0', title: 'Infographic', details: 'This module is based on the "135+ AI Tools" infographic. The ecosystem of AI tools is vast and growing daily. This guide organizes over 135 tools into logical categories to help you find what you need.', mediaUrl: 'https://i.imgur.com/S9sJ3i5.jpeg', mediaType: 'image' },
            { id: 'aitools-1', title: 'Key Tool Categories', details: 'Here are a few key categories and what they offer:\n- **Copywriting:** Tools like Rytr and Copy.ai help generate marketing copy, blog posts, and more.\n- **Image Generation:** Midjourney and Gencraft create stunning visuals from text prompts.\n- **Video:** Klap and Opus Clip can turn long-form content into short, shareable videos.\n- **Productivity:** Notion AI and Asana integrate AI to streamline workflows and manage tasks.', example: 'By exploring these categories, you can find specialized tools that can save you hours of work and improve the quality of your output.' }
        ],
        createdAt: Date.now() - 1000
    },
    {
        id: 'craft-framework-guide',
        title: 'The C.R.A.F.T. Framework for Prompting',
        description: 'A structured system to consistently build high-quality, effective prompts for any AI model, broken down step-by-step.',
        category: 'Frameworks & Patterns',
        createdAt: Date.now() - 1500,
        content: [
            {
                id: 'craft-intro',
                title: 'Introduction to C.R.A.F.T.',
                details: 'The C.R.A.F.T. framework is a structured system to consistently build high-quality, effective prompts. It stands for Character, Request, Action, Format, and Test. Using this framework helps eliminate ambiguity and ensures the AI delivers precisely what you need.',
            },
            {
                id: 'craft-c',
                title: 'C: Character',
                details: 'This is the persona, role, and expertise you assign to the AI. Defining a character is one of the most powerful ways to influence the AI\'s tone, style, word choice, and knowledge base. Instead of a generic assistant, you get a specialist.',
                example: 'Act as a world-class copywriter specializing in direct-to-consumer (DTC) brands with a witty and persuasive tone.'
            },
            {
                id: 'craft-r',
                title: 'R: Request',
                details: 'This is where you state your high-level goal. What do you ultimately want to achieve? This sets the overall context and objective for the task.',
                example: 'I need to generate compelling ad copy for a new line of sustainable, noise-canceling headphones.'
            },
            {
                id: 'craft-a',
                title: 'A: Action',
                details: 'This is the most critical step for clarity. You must list the specific, concrete actions you want the AI to perform. Use clear, direct verbs and break down complex tasks into smaller, manageable steps.',
                example: '- Write 3 attention-grabbing headlines.\n- Compose the primary ad body copy (around 150 words).\n- Suggest a strong call-to-action (CTA).'
            },
            {
                id: 'craft-f',
                title: 'F: Format',
                details: 'Clearly define how you want the output to be structured. This is crucial for consistency, especially if you plan to use the output programmatically (e.g., in code or another tool).',
                example: 'Provide the output as a JSON object with the keys: \'headlines\' (an array of strings), \'body\' (a string), and \'cta\' (a string).'
            },
            {
                id: 'craft-t',
                title: 'T: Test (and Train)',
                details: 'This is where you provide examples, constraints, or criteria to guide the AI on what a successful output looks like. This step allows you to "train" the AI on your specific requirements using techniques like few-shot prompting.',
                example: '- Constraint: "The headlines must be under 10 words."\n- Example of brand voice: "Our last product launch email started with: \'Finally, headphones that are good for your ears and the planet.\' Match that clever, eco-conscious style."'
            },
            {
                id: 'craft-adapt',
                title: 'Adapting for Skill Level',
                details: 'For Novices: You can start by focusing on just C-R-A (Character, Request, Action). Being clear on these three parts will dramatically improve your results.\n\nFor Experts: You can leverage the T (Test) step with multiple few-shot examples and complex constraints. Advanced users can also chain multiple C.R.A.F.T. prompts together to create sophisticated, multi-step automated workflows.',
            }
        ]
    },
    {
        id: 'google-prompting-essentials',
        title: 'Google\'s Prompting Essentials',
        description: 'Learn the fundamental best practices for prompt engineering directly from Google\'s own guides.',
        category: 'Fundamentals',
        content: [
            { id: 'gpe-1', title: 'Be Clear and Specific', details: 'Provide as much context and detail as possible. The more specific your instructions, the better the model can understand and fulfill your request.', example: 'Instead of "Write about dogs," try "Write a 500-word blog post about the benefits of adopting a rescue dog, focusing on the golden retriever breed. The tone should be heartwarming and persuasive."' },
            { id: 'gpe-2', title: 'Give the Model a Persona', details: 'Assigning a role to the model helps it adopt a specific tone, style, and expertise.', example: '"Act as a world-renowned historian specializing in ancient Rome..."' },
            { id: 'gpe-3', title: 'Use Examples (Few-Shot Prompting)', details: 'Show the model exactly what you want by providing a few examples of input-output pairs.', example: 'Translate the following English phrases to French:\nsea otter -> loutre de mer\npeppermint -> menthe poivrée\ncheese ->' }
        ],
        createdAt: Date.now() - 2000000
    },
    {
        id: 'vibe-coding-intro',
        title: 'Intro to Vibe Coding',
        description: 'An introduction to the Vibe Coding methodology, focusing on human-AI collaboration for rapid application development.',
        category: 'Fundamentals',
        content: [
            { id: 'vc-1', title: 'What is Vibe Coding?', details: 'Vibe Coding is a software development approach that emphasizes a seamless, conversational partnership between a human developer and a large language model (LLM). The human sets the "vibe" (the high-level vision, architecture, and aesthetic direction), and the AI handles the bulk of the code generation and implementation details.', example: 'The developer might say, "Create a modern, clean, responsive landing page using React and Tailwind CSS for a new productivity app called \'Zenith\'." The AI then generates the component structure, styling, and basic functionality.'},
            { id: 'vc-2', title: 'The Core Principles', details: '1.  **Vision over Verbatim:** Focus on describing the desired outcome and user experience, not just the literal code.\n2.  **Iterative Conversation:** Treat development as a dialogue. Refine the application through a series of prompts and feedback.\n3.  **Trust but Verify:** The human developer acts as the architect and quality assurance, guiding the AI and correcting its course when necessary.\n4.  **Embrace the Speed:** Leverage the AI to accelerate prototyping, boilerplate reduction, and exploration of different solutions.', example: `After the AI generates the first version, a follow-up prompt could be: "That's a good start. Now, add a three-card feature section below the hero. Each card should have an icon, a title, and a short description. Use a subtle shadow effect on hover."`}
        ],
        createdAt: Date.now() - 2100000
    }
];

export const PROMPT_CATEGORIES: PromptCategory[] = [...new Set(PUBLIC_PROMPTS.map(p => p.category))].sort();
export const AI_TOOL_CATEGORIES: AIToolCategory[] = [...new Set(PUBLIC_AI_TOOLS.map(t => t.category))].sort();
export const TRAINING_CATEGORIES: TrainingCategory[] = [...new Set(PUBLIC_TRAINING_MODULES.map(m => m.category))].sort();

export const PROMPT_FRAMEWORKS: Record<PromptFramework, PromptFrameworkDefinition> = {
    [PromptFramework.RTF]: { name: 'Role-Task-Format (R-T-F)', description: "Define the AI's role, the task, and the desired output format.", fields: [ { key: 'role', label: 'Role', placeholder: 'e.g., A world-class software architect...' }, { key: 'task', label: 'Task', placeholder: 'e.g., Design a scalable microservices architecture...' }, { key: 'format', label: 'Format', placeholder: 'e.g., A markdown document with mermaid.js...' } ]},
    [PromptFramework.TAG]: { name: 'Task-Action-Goal (T-A-G)', description: "Focus on the high-level task, the specific actions to take, and the ultimate goal.", fields: [ { key: 'task', label: 'Task', placeholder: 'e.g., Improve customer onboarding' }, { key: 'action', label: 'Action', placeholder: 'e.g., Write a 5-part email sequence' }, { key: 'goal', label: 'Goal', placeholder: 'e.g., Reduce churn by 10%' } ]},
    [PromptFramework.BAB]: { name: 'Before-After-Bridge (B-A-B)', description: "A copywriting framework that describes a problem, shows a world where it's solved, and explains how to get there.", fields: [ { key: 'before', label: 'Before', placeholder: 'Describe the customer\'s current pain point.' }, { key: 'after', label: 'After', placeholder: 'Paint a picture of their life after the problem is solved.' }, { key: 'bridge', label: 'Bridge', placeholder: 'Explain how your product/service is the solution.' } ]},
    [PromptFramework.CARE]: { name: 'Context-Action-Result-Example (C-A-R-E)', description: "Provide context, specify an action, define the desired result, and give an example.", fields: [ { key: 'context', label: 'Context', placeholder: 'e.g., We are a B2B SaaS company...' }, { key: 'action', label: 'Action', placeholder: 'e.g., Write a blog post title.' }, { key: 'result', label: 'Result', placeholder: 'e.g., A catchy, SEO-friendly title under 60 characters.' }, { key: 'example', label: 'Example', placeholder: 'e.g., "10 Ways AI is Revolutionizing Supply Chains"' } ]},
    [PromptFramework.RISE]: { name: 'Role-Input-Steps-Expectation (R-I-S-E)', description: "A framework for complex, multi-step tasks.", fields: [ { key: 'role', label: 'Role', placeholder: 'e.g., Senior Data Analyst' }, { key: 'input', label: 'Input Data', placeholder: 'e.g., A CSV file with user engagement data.' }, { key: 'steps', label: 'Steps to Perform', placeholder: 'e.g., 1. Clean the data. 2. Perform sentiment analysis...' }, { key: 'expectation', label: 'Expected Output', placeholder: 'e.g., A summary report with charts.' } ]},
    [PromptFramework.SCOPE]: { name: 'Situation-Complication-Objective-Plan-Evaluation (S.C.O.P.E.)', description: "A strategic planning framework for problem-solving.", fields: [] },
    [PromptFramework.PACEF]: { name: 'Purpose-Audience-Context-Expectations-Format (P.A.C.E.F.)', description: "A comprehensive framework for content creation.", fields: [] },
    [PromptFramework.CURATE]: { name: 'Context-User-Request-Action-Tone-Examples (C.U.R.A.T.E.)', description: "A user-centric framework for generating personalized content.", fields: [] },
    [PromptFramework.PARLA]: { name: 'Persona-Audience-Request-Length-Audience (P.A.R.L.A.)', description: "A framework for generating text with specific persona and audience in mind.", fields: [] },
    [PromptFramework.FACTS]: { name: 'Function-Audience-Content-Tone-Structure (F.A.C.T.S.)', description: "A framework to create factual and structured content.", fields: [] },
    [PromptFramework.BRIDGE]: { name: 'Background-Request-Instructions-Details-Goals-Examples (B.R.I.D.G.E.)', description: "A comprehensive framework for detailed and specific requests.", fields: [] },
    [PromptFramework.CREATE]: { name: 'Context-Request-Expectations-Audience-Tone-Examples (C.R.E.A.T.E.)', description: "A creative framework for generating unique content.", fields: [] },
    [PromptFramework.CRAFT]: { name: 'C.R.A.F.T.', description: "A structured system to consistently build high-quality, effective prompts.", fields: [] },
};

export const LYRA_ENHANCEMENT_OPTIONS = {
    targetAI: ['Gemini', 'ChatGPT', 'Claude', 'Other'],
    style: ['BASIC', 'DETAIL (Coming Soon)'],
};

// --- COLOR AND ICON CONSTANTS ---

export const PROMPT_CATEGORY_COLORS: Record<PromptCategory, string> = {
    "Marketing": "bg-blue-100 text-blue-800",
    "Code Generation": "bg-green-100 text-green-800",
    "Copywriting": "bg-indigo-100 text-indigo-800",
    "Ideation": "bg-purple-100 text-purple-800",
    "Image Generation": "bg-pink-100 text-pink-800",
    "Productivity": "bg-amber-100 text-amber-800",
    "Data Analysis": "bg-cyan-100 text-cyan-800",
    "Personal Development": "bg-lime-100 text-lime-800",
    "Sales": "bg-rose-100 text-rose-800",
    "Business": "bg-slate-100 text-slate-800",
    "Role-Playing": "bg-teal-100 text-teal-800",
    "Advertising": "bg-blue-100 text-blue-800",
    "Content Creation": "bg-indigo-100 text-indigo-800",
    "Creative Writing": "bg-purple-100 text-purple-800",
    "E-Commerce": "bg-green-100 text-green-800",
    "Editing & Proofreading": "bg-slate-100 text-slate-800",
    "Goal Setting": "bg-lime-100 text-lime-800",
    "Graphic Design": "bg-pink-100 text-pink-800",
    "Personal Finance": "bg-amber-100 text-amber-800",
    "Persuasion & Influence": "bg-rose-100 text-rose-800",
    "Social Media": "bg-cyan-100 text-cyan-800",
    "Frameworks": "bg-gray-200 text-gray-800",
    "Learning": "bg-yellow-100 text-yellow-800",
    "Career": "bg-sky-100 text-sky-800",
    "Self Help": "bg-lime-100 text-lime-800",
    "Education": "bg-yellow-100 text-yellow-800",
    "Research": "bg-cyan-100 text-cyan-800",
    "Fundamentals": "bg-gray-100 text-gray-800",
    "Advanced Techniques": "bg-red-100 text-red-800"
};

export const AI_TOOL_CATEGORY_COLORS: Record<AIToolCategory, string> = {
    "Image Generation": "bg-pink-100 text-pink-800",
    "Video Generation": "bg-purple-100 text-purple-800",
    "Writing": "bg-indigo-100 text-indigo-800",
    "Code Assistant": "bg-green-100 text-green-800",
    "Productivity": "bg-amber-100 text-amber-800",
    "Audio & Music": "bg-rose-100 text-rose-800",
    "Chatbot": "bg-teal-100 text-teal-800",
    "Marketing": "bg-blue-100 text-blue-800",
    "Design": "bg-fuchsia-100 text-fuchsia-800",
    "Social Media": "bg-cyan-100 text-cyan-800",
    "Research": "bg-lime-100 text-lime-800",
    "Presentations": "bg-sky-100 text-sky-800",
    "Data Analysis": "bg-cyan-100 text-cyan-800",
    "3D & VR": "bg-violet-100 text-violet-800",
    "Sales": "bg-red-100 text-red-800",
    "Website": "bg-orange-100 text-orange-800",
    "Meeting": "bg-gray-100 text-gray-800",
    "SEO": "bg-emerald-100 text-emerald-800",
    "Automation": "bg-stone-200 text-stone-800",
    "Prompts": "bg-yellow-100 text-yellow-800",
    "UI/UX": "bg-fuchsia-100 text-fuchsia-800",
    "Logo Generator": "bg-pink-100 text-pink-800"
};

export const TRAINING_CATEGORY_COLORS: Record<TrainingCategory, string> = {
    "Fundamentals": "bg-slate-100 text-slate-800",
    "Advanced Techniques": "bg-red-100 text-red-800",
    "Business & Marketing": "bg-blue-100 text-blue-800",
    "Frameworks & Patterns": "bg-gray-200 text-gray-800",
    "Education": "bg-yellow-100 text-yellow-800",
    "Creative & Media": "bg-purple-100 text-purple-800",
    "Career": "bg-sky-100 text-sky-800",
};

export const PROMPT_FRAMEWORK_COLORS: Record<PromptFramework, string> = {
    "R-T-F": "bg-gray-200 text-gray-800",
    "T-A-G": "bg-blue-200 text-blue-900",
    "B-A-B": "bg-green-200 text-green-900",
    "C-A-R-E": "bg-yellow-200 text-yellow-900",
    "R-I-S-E": "bg-purple-200 text-purple-900",
    "S.C.O.P.E.": "bg-red-200 text-red-900",
    "P.A.C.E.F.": "bg-indigo-200 text-indigo-900",
    "C.U.R.A.T.E.": "bg-pink-200 text-pink-900",
    "P.A.R.L.A.": "bg-teal-200 text-teal-900",
    "F.A.C.T.S.": "bg-cyan-200 text-cyan-900",
    "B.R.I.D.G.E.": "bg-orange-200 text-orange-900",
    "C.R.E.A.T.E.": "bg-lime-200 text-lime-900",
    "C.R.A.F.T.": "bg-fuchsia-200 text-fuchsia-900",
};

export const ITEM_TYPE_COLORS = {
    prompt: 'bg-sky-100 text-sky-800',
    tool: 'bg-green-100 text-green-800',
    training: 'bg-amber-100 text-amber-800',
};

export const PROMPT_ICONS: Record<string, string> = {
    'lyra-prompt-optimizer': '✨',
    'awesome-prompt-0': '🐧',
    'awesome-prompt-1': '🌐',
    'awesome-prompt-2': '💼',
    'awesome-prompt-3': '📜',
    'awesome-prompt-4': '📊',
    'awesome-prompt-5': '🗣️',
    'awesome-prompt-6': '🧑‍🏫',
    'awesome-prompt-7': '🗺️',
    'awesome-prompt-8': '📖',
    'awesome-prompt-9': '✍️',
    'handbook-business-1a': '📈',
    'handbook-business-2a': '🎤',
    'handbook-career-1a': '📄',
    'handbook-career-2a': '🔗',
    'handbook-data-1a': '💡',
    'handbook-image-1a': '🎨',
    'handbook-learning-1a': '🧒',
    'handbook-marketing-1a': '📢',
    'handbook-marketing-2a': '💎',
    'handbook-pd-1a': '📔',
    'handbook-productivity-1a': '🗓️',
    'handbook-research-1a': '🔬',
    'handbook-sales-1a': '📧',
    'handbook-selfhelp-1a': '🧠',
    'handbook-adv-1a': '🎯',
    'handbook-adv-1b': '📌',
    'handbook-adv-1c': ' USP ',
    'handbook-adv-1d': '🗣️',
    'handbook-content-1a': '✍️',
    'handbook-content-1b': '✒️',
    'handbook-content-1e': '📚',
    'handbook-copywriting-1a': '💥',
    'handbook-copywriting-1c': '🔢',
    'handbook-creative-1a': '🎭',
    'handbook-creative-1b': '🎬',
    'handbook-ecommerce-1a': '🛒',
    'handbook-ecommerce-2a': '🎨',
    'handbook-editing-1a': '✔️',
    'handbook-editing-2a': '🔤',
    'handbook-goalsetting-1a': '🎯',
    'handbook-goalsetting-2a': '🧑‍💼',
    'handbook-graphicdesign-1a': '⚖️',
    'handbook-graphicdesign-2a': '🖋️',
    'handbook-finance-1a': '💳',
    'handbook-finance-1b': '💰',
    'handbook-persuasion-1a': '👂',
    'handbook-persuasion-2a': '🗣️',
    'handbook-social-1a': '📈',
    'handbook-social-1b': '🧑‍🤝‍🧑',
    'db-summarise-1': '📄',
    'db-summarise-2': '📚',
    'db-summarise-3': '🎓',
    'db-perspectives-1': '👁️',
    'db-perspectives-2': '👥',
    'db-experts-1': '🏆',
    'db-experts-2': '🧑‍🔬',
    'db-personas-1': '👨‍👩‍👧‍👦',
    'db-personas-2': '👤',
    'db-strategy-1': '🗺️',
    'db-strategy-2': '🧩',
    'db-facts-1': '🤯',
    'db-facts-2': '🧪',
    'db-style-1': '💅',
    'db-style-2': '🎭',
    'db-ideas-1': '💡',
    'db-ideas-2': '🗞️',
    'db-outline-1': '📝',
    'db-outline-2': '🌊',
    'db-improve-1': '✨',
    'db-improve-2': '🧐',
    'db-bonus-1': '🤺',
    'db-bonus-2': '🤝',
    'db-bonus-3': '🗣️',
    'db-bonus-4': '🧑‍🏫',
    'db-bonus-5': '🪜',
    'adobe-fin-1': '📊',
    'adobe-fin-2': '⚖️',
    'adobe-fin-3': '📉',
    'adobe-fin-4': '💬',
    'adobe-fin-5': '🛒',
    'adobe-fin-6': '📈',
    'adobe-fin-7': '🔢',
    'adobe-fin-8': '📧',
    'adobe-fin-9': '📈',
    'adobe-fin-10': '📎',
    'adobe-fin-11': '🤔',
    'adobe-fin-12': '💸',
    'adobe-fin-13': '🧑‍💼',
    'adobe-fin-14': '🏪',
    'adobe-sales-1': '🤝',
    'adobe-sales-2': '🛡️',
    'adobe-mktg-1': '✍️',
    'adobe-mktg-2': '📱',
    'adobe-hr-1': '📋',
    'adobe-hr-2': '📄',
    'ew-task-1': '🗒️',
    'ew-task-2': '📨',
    'ew-task-3': '📅',
    'ew-task-4': '💡',
    'ew-task-5': '📈',
    'ew-task-6': '📄',
    'ew-task-7': '🤝',
    'ew-task-8': '🏠',
    'ew-task-9': '📢',
    'ew-task-10': '✔️',
    'pb-prompt-1': '📥',
    'pb-prompt-2': '🍅',
    'pb-prompt-3': '🐸',
    'pb-prompt-4': '🧱',
    'pb-prompt-5': '⏳',
    'pb-prompt-6': ' Pareto ',
    'pb-prompt-7': '🔗',
    'pb-prompt-8': '🎯',
    'pb-prompt-9': '🧠',
    'pb-prompt-10': '💨',
    'pb-prompt-11': '⏱️',
    'pb-prompt-12': '🌟',
    'pb-prompt-13': ' SMART ',
    'pb-prompt-14': ' WOOP ',
    'pb-prompt-15': '⛓️',
    'pb-prompt-16': '📓',
    'pb-prompt-17': '🌅',
    'pb-prompt-18': ' Eisenhower ',
    'pb-prompt-19': '📦',
    'pb-prompt-20': '🗓️',
    'flow-1': '🔍',
    'flow-2': '🐦',
    'flow-3': '✍️',
    'flow-4': '💻',
    'flow-5': '📄',
    'zen-core-1': '👤',
    'zen-core-2': '👥',
    'zen-core-3': '📝',
    'zen-core-4': '🧠',
    'zen-core-5': '📚',
    'zen-ideation-1': '💡',
    'zen-ideation-2': '🔄',
    'zen-summary-1': '📄',
    'zen-summary-2': '✅',
    'zen-rewrite-1': '🎨',
    'zen-rewrite-2': '🧑‍🏫',
    'zen-structured-1': '📊',
    'zen-structured-2': ' JSON ',
    'ms-1': '👤',
    'ms-2': ' AIDA ',
    'ms-3': ' PAS ',
    'ms-4': ' BAB ',
    'ms-5': '📅',
    'ms-6': '💡',
    'ms-7': ' SEO ',
    'ms-8': '💎',
    'ms-9': '📧',
    'ms-10': '🛡️',
    'guide-prompt-1': '⏰',
    'guide-prompt-2': '✅',
    'guide-prompt-3': '🗓️',
    'guide-prompt-4': '🎯',
    'guide-prompt-5': '🤔',
    'guide-prompt-6': '⚖️',
    'guide-prompt-7': '💡',
    'lp-summarize-1': '📄',
    'lp-qa-1': '❓',
    'lp-classify-1': '👍',
    'lp-roleplay-1': '🎭',
    'lp-code-1': '🐍',
    'lp-reasoning-1': '🧩',
    'lp-fewshot-1': '📚',
    'lp-cot-1': '🧠',
    'lp-pal-1': '🧮',
    'lp-react-1': ' ReAct ',
    'lp-iterative-1': '🔄',
    'cs-prompt-1': '📅',
    'cs-prompt-2': '📊',
    'cs-prompt-3': '💡',
    'cs-prompt-4': '📧',
    'cs-rp-1': '🚀',
    'cs-rp-2': '🍏',
    'cs-rp-3': ' Hustle ',
    'cs-rp-4': '🧘',
    'cs-rp-5': '🔬',
    'cs-mrp-1': '🛸',
    'cs-mrp-2': '🏋️',
    'cs-mrp-3': '🎬',
    'cs-mrp-4': '🗺️',
    'cs-mrp-5': '📈',
    'cs-mrp-6': '🌟',
    'cs-mrp-7': '🦄',
    'cs-tone-1': '🎩',
    'cs-tone-2': '😎',
    'cs-tone-3': '💼',
    'cs-tone-4': '🤙',
    'cs-tone-5': '💻',
    'cs-tone-6': '🧑‍🏫',
    'cs-tone-7': '📜',
    'cs-tone-8': '🗣️',
    'learn-1': '⚡',
    'learn-2': '🧒',
    'learn-3': '🔄',
    'learn-4': '🤝',
    'learn-5': '🗺️',
    'learn-6': '🎨',
    'learn-7': '💼',
    'learn-8': '⏱️',
    'cs1-gen-1': '📚',
    'cs1-gen-2': '✒️',
    'cs1-writer-1': '🛍️',
    'cs1-writer-2': '🎤',
    'cs1-resume-1': '📄',
    'cs1-sales-1': '💡',
    'cs1-sales-2': '📧',
    'cs1-dev-1': '🌐',
    'cs1-dev-2': '🐛',
    'cs1-edu-1': '🏛️',
    'cs1-content-1': '📅',
    'cs1-content-2': '📹',
    'cs2-sales-1': '🔥',
    'cs2-mktg-1': '🐦',
    'cs2-mktg-2': '🔗',
    'cs2-mktg-3': '😂',
    'cs2-dev-1': '⚡',
    'cs2-dev-2': '🔄',
    'cs2-dev-3': '🐍',
    'cs2-copy-1': '✨',
    'cs2-copy-2': '✉️',
    'cs2-copy-3': '📖',
    'cs3-prof-1': '📈',
    'cs3-prof-2': '🤖',
    'cs3-prof-3': '✍️',
    'cs3-prof-4': '💌',
    'cs3-prof-5': '📄',
    'cs3-prof-6': '💼',
    'cs3-prof-7': '🎬',
    'cs3-prof-8': '🛠️',
    'cs3-prof-9': '🚀',
    'cs3-prof-10': '🤝',
    'startup-1': '🚀',
    'startup-2': '📝',
    'startup-3': '📊',
    'startup-4': '🔍',
    'startup-5': '💡',
    'startup-6': '📈',
    'startup-7': '✅',
    'startup-8': '💬',
    'startup-9': '📰',
    'startup-10': '📧',
    'webdev-1': '🌐',
    'webdev-2': '🐍',
    'webdev-3': '⚛️',
    'webdev-4': '💾',
    'webdev-5': '🔌',
    'webdev-6': '🔄',
    'webdev-7': '⚡',
    'webdev-8': '🐳',
    'webdev-9': '🎨',
    'webdev-10': '🧪',
    'academic-1': '🎓',
    'academic-2': '📑',
    'academic-3': '✍️',
    'academic-4': '📚',
    'academic-5': '❓',
    'academic-6': '🧑‍🏫',
    'academic-7': '✍️',
    'academic-8': '🤔',
    'academic-9': '🧐',
    'academic-10': '🎤',
    'health-1': '🥗',
    'health-2': '🏋️',
    'health-3': '🧘',
    'health-4': '🩺',
    'health-5': '🍳',
    'health-6': '🌅',
    'health-7': '🧠',
    'health-8': '🎯',
    'health-9': '🧘‍♀️',
    'health-10': '📔',
    'support-1': '❤️',
    'support-2': '🛠️',
    'support-3': '🚫',
    'support-4': '🔼',
    'support-5': '📨',
    'support-6': '👋',
    'support-7': '☮️',
    'support-8': '💡',
    'support-9': '📡',
    'support-10': '📊',
    'cwriting-1': '✍️',
    'cwriting-2': '👤',
    'cwriting-3': '💬',
    'cwriting-4': '🤯',
    'cwriting-5': '🏞️',
    'cwriting-6': '🎭',
    'cwriting-7': '📜',
    'cwriting-8': '💡',
    'cwriting-9': '🗺️',
    'cwriting-10': '📖',
    'music-1': '🎶',
    'music-2': '🎤',
    'music-3': '🎼',
    'music-4': '🎵',
    'music-5': '🎚️',
    'art-1': '🎨',
    'art-2': '🎭',
    'art-3': '📸',
    'art-4': '🖼️',
    'art-5': '🧑‍🎨',
    'travel-1': '🗺️',
    'travel-2': '🧭',
    'travel-3': '🧳',
    'travel-4': '🤝',
    'travel-5': '💰',
    'adv-rp-hist-1': '🏛️',
    'adv-rp-hist-2': '⚔️',
    'adv-rp-hist-3': '🎨',
    'adv-rp-hist-4': '🔬',
    'adv-rp-fic-1': '🕵️',
    'adv-rp-fic-2': '🧑‍🚀',
    'adv-rp-fic-3': '🧙',
    'adv-rp-prof-1': '🗣️',
    'adv-rp-prof-2': '💼',
    'adv-rp-prof-3': '⚖️',
    'adv-rp-prof-4': '🕊️',
    'adv-rp-creative-1': '⏳',
    'adv-rp-creative-2': '🤖',
    'adv-rp-creative-3': '🐉',
    'adv-rp-creative-4': '👽',
    'adv-rp-hist-5': '🔢',
    'adv-rp-hist-6': '🏛️',
    'adv-rp-fic-4': '🧙‍♂️',
    'adv-rp-prof-5': '🚨',
    'adv-rp-prof-6': '🩺',
    'adv-rp-creative-5': '🤖',
    'adv-rp-creative-6': '👻',
    'adv-rp-hist-7': '🌏',
    'adv-rp-hist-8': '🇫🇷',
    'adv-rp-fic-5': '🛡️',
    'adv-rp-fic-6': '🍷',
    'adv-rp-prof-7': '💻',
    'adv-rp-prof-8': '🏗️',
    'adv-rp-prof-9': '🎬',
    'adv-rp-creative-7': '📚',
    'adv-rp-creative-8': '👹',
    'adv-rp-creative-9': '🤖',
    'adv-rp-creative-10': '🌊',
    'adv-rp-misc-1': '🐈',
    'adv-rp-misc-2': '🦹',
    'adv-rp-misc-3': '🥪',
    'adv-rp-misc-4': '📜',
    'adv-rp-misc-5': '🎮',
    'adv-rp-misc-6': '🏢',
};
