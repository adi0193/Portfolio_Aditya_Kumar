/*
 * Single source of truth for all site content.
 *
 * Everything here comes from Aditya's résumé (src/assets/cv.pdf), his GitHub
 * profile and repositories, the previous version of this site, or his own
 * written brief. Nothing is invented.
 *
 * Any field named `review` marks information that is missing or unverified.
 * In development (`npm run dev`) these show on the page as dashed "REVIEW"
 * markers; production builds never render them. See REVIEW.md.
 */

import fruits from "../assets/projects/fruits.webp";
import game from "../assets/projects/game.webp";
import joke from "../assets/projects/joke.webp";
import resume from "../assets/projects/resume.webp";
import techy from "../assets/projects/techy.webp";

export const person = {
  name: "Aditya Kumar",
  initials: "A.K.",
  role: "Software Engineer",
  location: "India",
  timezone: "Asia/Kolkata",
  email: "adityakumar802215@gmail.com",
  links: {
    github: "https://github.com/adi0193",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-929902217/",
    twitter: "https://twitter.com/ADITYAK76489260",
    instagram: "https://www.instagram.com/adimishra1943",
  },
};

export const hero = {
  heading: "Not everything is as it appears.",
  intro:
    "I'm Aditya Kumar — a software engineer interested in understanding how things work, finding patterns, and building useful digital products.",
  tagline: ["Curious by nature.", "Analytical by instinct.", "Engineer by profession."],
};

/* The hero's observation card cycles through these. */
export const observations = [
  "Every problem has a pattern.",
  "The bug is rarely where the error message says it is.",
  "Users don't read instructions. They read the interface.",
  "If it works on the first try, test it again.",
  "Most requirements are hiding a second, unwritten requirement.",
  "A good question saves more time than a fast answer.",
];

/* The small clickable line in the footer cycles through these. */
export const asides = [
  "Nothing to see here.",
  "You're paying attention. Good.",
  "Most people scroll right past this.",
  "Curiosity is an underrated engineering skill.",
  "All right — that's everything. Probably.",
];

export const about = {
  title: "Every detail tells a story.",
  paragraphs: [
    "I studied Computer Science at Panipat Institute of Engineering and Technology. Most of what I know about software, though, I learned by taking things apart and building them again — small JavaScript experiments first, then full-stack apps with React, Node.js and MongoDB.",
    "Professionally, I've worked close to real products: testing applications, checking APIs, tracing issues with developers, evaluating AI chatbot responses, and working through healthcare technology workflows with clients. It's a vantage point that teaches you how software actually behaves — and how often a problem is really a misunderstanding.",
    "Now I'm putting that perspective to work on the building side. I'm getting stronger in Java, backend engineering and system design, and exploring how AI can be used in applications that are genuinely useful rather than merely impressive.",
  ],
  quotes: [
    "Most problems aren't complicated. Sometimes we're simply asking the wrong question.",
    "Good engineering starts with understanding the problem, not writing the code.",
  ],
  facts: [
    { label: "Currently", value: "QA Engineer, Think Future Technologies" },
    { label: "Studying", value: "Java · Spring Boot · System design" },
    { label: "Drawn to", value: "Backend systems · AI-powered applications" },
    { label: "Education", value: "B.Tech, Computer Science · 2020–2024" },
    { label: "Based in", value: "India" },
  ],
  record: [
    { title: "Kavach hackathon", detail: "Led my team at the college-level hackathon", meta: "Team lead" },
    {
      title: "Smart India Hackathon",
      detail: "Cleared the first round as a team member — railway accident detection",
      meta: "First round",
    },
    { title: "Database Programming with SQL", detail: "Certification", meta: "Oracle · 2022" },
    { title: "Developer Virtual Experience Program", detail: "Virtual programme", meta: "Accenture · 2023" },
  ],
};

/*
 * Case files. `observation` is the one-line technical detail revealed on hover;
 * every one is taken from the repository's actual code.
 */
export const cases = [
  {
    id: "resume-maker",
    no: "001",
    title: "Resume Maker",
    year: "2024",
    kind: "Full-stack",
    summary: "Fill in your details once; get a formatted résumé you can print or save as PDF.",
    problem:
      "Writing a résumé usually means fighting a word processor's layout. The goal was to make it straightforward: enter your information in a form and get a clean, consistent document back.",
    approach: [
      "Built as a MERN application. An Express server exposes a user API backed by MongoDB through Mongoose.",
      "The same Express server serves the production React build, so the app deploys as a single service on one origin.",
      "The form-driven interface uses Ant Design components; the finished résumé is rendered with react-to-print for printing or saving as PDF.",
      "Details are stored per user, so a résumé can be updated later instead of re-entered.",
    ],
    tools: ["React", "Ant Design", "Node.js", "Express", "MongoDB", "Mongoose", "react-to-print"],
    observation: "The Express server serves the React build itself — one deploy, one origin, no CORS to configure.",
    image: resume,
    repo: "https://github.com/adi0193/Resume_Maker",
    demo: "https://resume-maker-p044.onrender.com",
    review: "Add a sentence on why you built this, if you'd like it shown.",
  },
  {
    id: "personality-test",
    no: "002",
    title: "Personality Test",
    year: "2024",
    kind: "Full-stack · 3 services",
    summary: "Sign up, answer a short questionnaire, get a score and an introvert/extrovert result.",
    problem:
      "A questionnaire app that needs user accounts and a scoring step. The interesting part was deciding where each responsibility should live.",
    approach: [
      "Split into three services: a React frontend, a Node/Express authentication API, and a separate Python Flask service for scoring.",
      "The auth API stores users in MongoDB via Mongoose, hashes passwords with bcrypt, validates input with Joi and issues JSON Web Tokens.",
      "The Flask service exposes POST /api/submit-test, tallies Agree / Neutral / Disagree answers into a score and an introvert/extrovert type, and returns JSON.",
      "The frontend uses Material UI, Axios and React Router, with toast notifications for feedback.",
    ],
    tools: ["React", "Material UI", "Node.js", "Express", "MongoDB", "JWT", "bcrypt", "Joi", "Python", "Flask"],
    observation: "Scoring lives in its own Python service — the auth API never needs to know how a result is calculated.",
    diagram: {
      nodes: [
        { id: "ui", label: "React + MUI", sub: "client", col: 0, row: 0.5 },
        { id: "auth", label: "Express API", sub: "JWT · bcrypt · Joi", col: 1, row: 0 },
        { id: "score", label: "Flask service", sub: "/api/submit-test", col: 1, row: 1 },
        { id: "db", label: "MongoDB", sub: "users", col: 2, row: 0 },
      ],
      edges: [
        ["ui", "auth"],
        ["ui", "score"],
        ["auth", "db"],
      ],
    },
    repos: [
      { label: "Frontend", href: "https://github.com/adi0193/Personality-test-frontend-" },
      { label: "Auth API", href: "https://github.com/adi0193/Personality-test-Backend" },
      { label: "Scoring service", href: "https://github.com/adi0193/Personality-test-pythonflask" },
    ],
    demo: "https://personality-test-frontend.onrender.com",
    review: "Add a sentence on why you built this, and a screenshot if you have one.",
  },
  {
    id: "splitwise",
    no: "003",
    title: "Splitwise Web App",
    year: "2024",
    kind: "Frontend",
    summary: "Split shared expenses among friends and see who owes whom.",
    problem:
      "After a shared trip or dinner, working out who owes whom gets messy quickly. The app keeps a list of expenses and works out the balances.",
    approach: [
      "Each transaction records who paid, the amount, a description and who it was split among.",
      "Balance calculation lives in its own module (calculateBalance) and is recomputed from the full transaction list rather than stored.",
      "Dark-mode preference is persisted in localStorage.",
    ],
    tools: ["React", "React Router", "JavaScript"],
    observation: "Balances are never stored — they're recalculated from the transaction list, so they can't drift out of sync.",
    diagram: {
      nodes: [
        { id: "form", label: "TransactionForm", sub: "paidBy · amount", col: 0, row: 0 },
        { id: "logic", label: "BalanceLogic", sub: "calculateBalance()", col: 1, row: 0 },
        { id: "sheet", label: "BalanceSheet", sub: "who owes whom", col: 2, row: 0 },
      ],
      edges: [
        ["form", "logic"],
        ["logic", "sheet"],
      ],
    },
    repo: "https://github.com/adi0193/splitwise_webapp",
    demo: "https://splitwise-webapp.onrender.com",
    review: "Add a sentence on why you built this, and a screenshot if you have one.",
  },
  {
    id: "technotrails",
    no: "004",
    title: "TechnoTrails",
    year: "2023",
    kind: "Frontend",
    summary: "A React site aimed at helping kids find answers to tech-related problems.",
    problem:
      "In the project's own words, the aim was to provide solutions to tech-related problems for kids — so the content and layout needed to be simple to navigate.",
    approach: [
      "Component-based React interface written in JSX.",
      "Styled with SCSS for structured, nested styles; responsive across screen sizes.",
      "A carousel highlights featured content.",
    ],
    tools: ["React", "SCSS"],
    observation: "An early React build: JSX components for structure, SCSS for styling, a carousel for featured content.",
    image: techy,
    repo: "https://github.com/adi0193/TechnoTrails",
    demo: "https://aditechnotrails.netlify.app/",
  },
];

/* Smaller, earlier projects — listed in the "minor cases" index. */
export const minorCases = [
  {
    no: "005",
    title: "Fruitopia",
    year: "2023",
    note: "Landing page for a fruit and vegetable store",
    tools: "HTML · CSS",
    image: fruits,
    repo: "https://github.com/adi0193/Froutopia",
    demo: "https://fruitopiaadi.netlify.app/",
  },
  {
    no: "006",
    title: "Moving Car",
    year: "2023",
    note: "A small car game built as a micro-project",
    tools: "HTML · CSS · JavaScript",
    image: game,
    repo: "https://github.com/adi0193/Movingcar",
    demo: "https://movingcaradi.netlify.app/",
  },
  {
    no: "007",
    title: "Random Joke Generator",
    year: "2023",
    note: "Fetches a new joke from a public API on each click",
    tools: "JavaScript · Fetch API",
    image: joke,
    repo: "https://github.com/adi0193/randomjoke",
    demo: "https://randomjokegenerate.netlify.app/",
  },
];

export const experience = [
  {
    id: "think-future",
    org: "Think Future Technologies",
    role: "QA Engineer",
    period: "Present",
    type: "Full-time",
    nature: "Quality assurance & product delivery — not a software development role",
    workedOn:
      "The quality and delivery side of software products, including healthcare technology workflows and AI chatbots.",
    contributed: [
      "Tested applications end to end and reported issues with clear reproduction steps.",
      "Tested and debugged APIs with Postman, working with developers to trace failures.",
      "Validated healthcare technology workflows against requirements.",
      "Evaluated the quality of AI chatbot responses.",
      "Coordinated client-side product implementation with engineering and product teams.",
    ],
    problems: null,
    learned:
      "How real products fail, how to describe a bug so it actually gets fixed, and why requirements deserve as much scrutiny as code.",
    tags: ["QA", "API testing", "Postman", "Jira", "Healthcare tech", "AI chatbots"],
    review:
      "Add your start date, and a line on the kinds of problems you ran into. Confirm these responsibilities belong to this role — they come from your brief, not your résumé.",
  },
  {
    id: "internpe",
    org: "InternPe",
    role: "Web Developer Intern",
    period: "Sep – Oct 2023",
    type: "Internship · Remote",
    nature: "Full-stack development",
    workedOn: "A full-stack development internship focused on the MERN stack.",
    contributed: [
      "Built “ScreenVerse”, a streaming-style web application, with MongoDB, Express, React and Node.js.",
      "Added a real-time chat feature using Socket.IO.",
    ],
    problems: null,
    learned: "Taking a feature from idea to working build, and how real-time events change the way an app is structured.",
    tags: ["MERN", "React", "Node.js", "Socket.IO"],
  },
  {
    id: "chegg",
    org: "Chegg",
    role: "Q&A Expert, Computer Science",
    period: "Oct – Dec 2021",
    type: "Part-time · Remote",
    nature: "Technical problem solving & writing",
    workedOn: "Answering computer science questions for students.",
    contributed: ["Solved around 200 questions with step-by-step explanations."],
    problems: null,
    learned: "Explaining a technical idea clearly to someone who is stuck — which mostly means finding where they got lost.",
    tags: ["DSA", "Problem solving", "Technical writing"],
  },
  {
    id: "piet",
    org: "Panipat Institute of Engineering and Technology",
    role: "B.Tech, Computer Science and Engineering",
    period: "2020 – 2024",
    type: "Education · Panipat, Haryana",
    nature: "Undergraduate degree",
    workedOn: "Coursework including Data Structures and Algorithms and Database Management Systems.",
    contributed: [
      "Led my team at the college-level Kavach hackathon.",
      "Cleared the first round of Smart India Hackathon with a team project on railway accident detection.",
    ],
    problems: null,
    learned: "Fundamentals — and how to build something with a team under a deadline.",
    tags: ["DSA", "DBMS", "Hackathons"],
  },
];

/*
 * status:
 *   "work"     — used in a professional role
 *   "projects" — used to build personal/academic projects
 *   "learning" — currently learning; no production experience claimed
 */
export const skillStatus = {
  work: { label: "Used at work", mark: "●" },
  projects: { label: "Built projects with", mark: "○" },
  learning: { label: "Currently learning", mark: "◌" },
};

export const toolkit = [
  {
    drawer: "A",
    group: "Programming",
    items: [
      { name: "JavaScript", status: "projects" },
      { name: "Java", status: "learning" },
      { name: "C++", status: "projects", note: "DSA & coursework" },
      { name: "Python", status: "projects", note: "Flask service" },
      { name: "SQL", status: "projects" },
    ],
  },
  {
    drawer: "B",
    group: "Frontend",
    items: [
      { name: "React", status: "projects" },
      { name: "HTML", status: "projects" },
      { name: "CSS / SCSS", status: "projects" },
      { name: "Material UI", status: "projects" },
      { name: "Ant Design", status: "projects" },
    ],
  },
  {
    drawer: "C",
    group: "Backend",
    items: [
      { name: "Node.js", status: "projects" },
      { name: "Express.js", status: "projects" },
      { name: "REST APIs", status: "projects" },
      { name: "JWT auth", status: "projects" },
      { name: "Flask", status: "projects" },
      { name: "Spring Boot", status: "learning" },
      { name: "System design", status: "learning" },
    ],
  },
  {
    drawer: "D",
    group: "Database",
    items: [
      { name: "MongoDB", status: "projects" },
      { name: "Mongoose", status: "projects" },
      { name: "MySQL", status: "projects" },
    ],
  },
  {
    drawer: "E",
    group: "Tools",
    items: [
      { name: "Postman", status: "work" },
      { name: "Jira", status: "work" },
      { name: "Git", status: "projects" },
      { name: "GitHub", status: "projects" },
    ],
  },
  {
    drawer: "F",
    group: "Additional",
    items: [
      { name: "Software testing", status: "work" },
      { name: "API testing", status: "work" },
      { name: "AI chatbot evaluation", status: "work" },
      { name: "Product workflows", status: "work" },
      { name: "AI integration", status: "learning" },
    ],
  },
];

export const closing = "People notice the obvious. Engineers investigate the underlying system.";
