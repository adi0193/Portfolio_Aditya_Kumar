/*
 * Single source of truth for all site content.
 *
 * Everything here comes from Aditya's résumé (src/assets/cv.pdf), his GitHub
 * profile/repositories, or the previous version of this site.
 *
 * Any field with a `review` string is information that is missing or could not
 * be verified. In development (`npm run dev`) those notes are shown on the page
 * as small orange "REVIEW" markers; in production they are never rendered.
 * See REVIEW.md for the full list.
 */

import fruits from "../assets/projects/fruits.webp";
import game from "../assets/projects/game.webp";
import joke from "../assets/projects/joke.webp";
import resume from "../assets/projects/resume.webp";
import techy from "../assets/projects/techy.webp";

export const person = {
  name: "Aditya Kumar",
  firstName: "Aditya",
  role: "Software Engineer",
  location: "India",
  timezone: "Asia/Kolkata",
  email: "adityakumar802215@gmail.com",
  summary:
    "Software engineer building practical products at the intersection of software engineering, backend systems, and AI.",
  focus: "Java, backend engineering and system design",
  links: {
    github: "https://github.com/adi0193",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-929902217/",
    twitter: "https://twitter.com/ADITYAK76489260",
    instagram: "https://www.instagram.com/adimishra1943",
  },
  linkedinReview:
    "Your résumé lists linkedin.com/in/adi0193 but this site and your GitHub profile use /in/aditya-kumar-929902217. Confirm which is current.",
};

export const about = {
  paragraphs: [
    "I studied Computer Science at Panipat Institute of Engineering and Technology, and most of what I know about software I learned by building things — small JavaScript experiments first, then full-stack apps with React, Node.js and MongoDB.",
    "Professionally, I've spent my time close to real products: testing applications, checking APIs, debugging issues with developers, evaluating AI chatbot responses and helping clients get features working the way they expect. It taught me how software actually breaks, and how much good engineering depends on clear communication.",
    "Right now I'm putting that experience to work on the building side — getting stronger in Java, backend engineering and system design, and exploring how AI can be integrated into useful applications.",
  ],
  now: [
    { label: "Currently", value: "QA Engineer at Think Future Technologies" },
    { label: "Learning", value: "Java · Spring Boot · System design" },
    { label: "Interested in", value: "Backend systems · AI-powered applications" },
    { label: "Education", value: "B.Tech, Computer Science · 2020 – 2024" },
  ],
};

/*
 * status:
 *   "work"     — used in a professional role
 *   "projects" — used to build personal/academic projects
 *   "learning" — currently learning, no production experience claimed
 */
export const skillStatus = {
  work: { label: "Used at work", short: "Work" },
  projects: { label: "Built projects with", short: "Projects" },
  learning: { label: "Currently learning", short: "Learning" },
};

export const skills = [
  {
    group: "Languages",
    items: [
      { name: "JavaScript", status: "projects" },
      { name: "Java", status: "learning" },
      { name: "C++", status: "projects", note: "DSA & coursework" },
      { name: "Python", status: "projects" },
      { name: "SQL", status: "projects" },
    ],
  },
  {
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
    group: "Databases",
    items: [
      { name: "MongoDB", status: "projects" },
      { name: "Mongoose", status: "projects" },
      { name: "MySQL", status: "projects" },
    ],
  },
  {
    group: "Testing & QA",
    items: [
      { name: "Application testing", status: "work" },
      { name: "API testing", status: "work" },
      { name: "Debugging & triage", status: "work" },
      { name: "AI chatbot evaluation", status: "work" },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Postman", status: "work" },
      { name: "Jira", status: "work" },
      { name: "Git & GitHub", status: "projects" },
    ],
  },
  {
    group: "Other",
    items: [
      { name: "Product workflows", status: "work" },
      { name: "Client coordination", status: "work" },
      { name: "AI integration", status: "learning" },
    ],
  },
];

export const experience = [
  {
    id: "think-future",
    org: "Think Future Technologies",
    role: "QA Engineer",
    period: "Current",
    type: "Full-time",
    summary:
      "Working on the quality and delivery side of software products, including healthcare technology workflows and AI chatbots.",
    points: [
      "Test applications end to end and report issues with clear reproduction steps.",
      "Test and debug APIs with Postman, working alongside developers to trace failures.",
      "Work through healthcare technology workflows and validate that product behaviour matches requirements.",
      "Evaluate the quality of AI chatbot responses.",
      "Coordinate client-side product implementation and work cross-functionally with engineering and product teams.",
    ],
    tags: ["QA", "API testing", "Postman", "Jira", "Healthcare tech", "AI chatbots"],
    learned:
      "How real products fail, how to communicate a bug so it gets fixed, and why requirements matter as much as code.",
    review:
      "Add start date and location, and confirm which of these responsibilities belong to this role (they come from your brief, not your résumé).",
  },
  {
    id: "internpe",
    org: "InternPe",
    role: "Web Developer Intern",
    period: "Sep 2023 – Oct 2023",
    type: "Internship · Remote",
    summary: "Full-stack development internship focused on the MERN stack.",
    points: [
      "Built “ScreenVerse”, a streaming-style web application, using MongoDB, Express, React and Node.js.",
      "Added a real-time chat feature using Socket.IO.",
    ],
    tags: ["MERN", "React", "Node.js", "Socket.IO"],
    learned: "Taking a full-stack feature from idea to working build, and working with real-time events.",
  },
  {
    id: "chegg",
    org: "Chegg",
    role: "Q&A Expert, Computer Science",
    period: "Oct 2021 – Dec 2021",
    type: "Part-time · Remote",
    summary: "Answered computer science questions for students.",
    points: [
      "Solved around 200 computer science questions with step-by-step explanations.",
    ],
    tags: ["DSA", "Problem solving", "Technical writing"],
    learned: "Explaining technical ideas clearly to someone who is stuck.",
  },
  {
    id: "piet",
    org: "Panipat Institute of Engineering and Technology",
    role: "B.Tech, Computer Science and Engineering",
    period: "2020 – 2024",
    type: "Education · Panipat, Haryana",
    summary: "Coursework included Data Structures and Algorithms and Database Management Systems.",
    points: [
      "Led my team at the college-level Kavach hackathon.",
      "Cleared the first round of Smart India Hackathon with a team project on railway accident detection.",
    ],
    tags: ["DSA", "DBMS", "Hackathons"],
    learned: "Fundamentals, and how to build something with a team under a deadline.",
  },
];

/*
 * category drives the project filter.
 * diagram: an optional architecture sketch rendered instead of a screenshot,
 *          derived from the repository's actual code.
 */
export const projects = [
  {
    id: "personality-test",
    title: "Personality Test",
    year: "2024",
    category: "Full-stack",
    featured: true,
    problem:
      "A web app where users sign up, answer a short questionnaire and get a score with an introvert/extrovert result.",
    why: null,
    details: [
      "Split into three services: a React frontend, a Node/Express auth API, and a separate Python Flask service that scores answers.",
      "Auth API stores users in MongoDB via Mongoose, hashes passwords with bcrypt, validates input with Joi and issues JWTs.",
      "Flask service exposes a POST /api/submit-test endpoint that tallies answers and returns the score and personality type.",
      "Frontend built with Material UI, Axios and React Router, with toast notifications for feedback.",
    ],
    stack: ["React", "Material UI", "Node.js", "Express", "MongoDB", "JWT", "Python", "Flask"],
    repo: "https://github.com/adi0193/Personality-test-frontend-",
    repos: [
      { label: "Frontend", href: "https://github.com/adi0193/Personality-test-frontend-" },
      { label: "Auth API", href: "https://github.com/adi0193/Personality-test-Backend" },
      { label: "Scoring service", href: "https://github.com/adi0193/Personality-test-pythonflask" },
    ],
    demo: "https://personality-test-frontend.onrender.com",
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
    review: "Add a line on why you built this, and a screenshot if you have one.",
  },
  {
    id: "resume-maker",
    title: "Resume Maker",
    year: "2024",
    category: "Full-stack",
    featured: true,
    problem:
      "Helps job seekers fill in their details once and turn them into a formatted résumé they can print or save as a PDF.",
    why: null,
    details: [
      "MERN application: an Express server with a user API backed by MongoDB, serving the built React client from the same origin.",
      "Form-driven UI built with Ant Design; résumé output rendered with react-to-print for PDF export.",
      "User details are stored in MongoDB so a résumé can be updated later instead of re-entered.",
    ],
    stack: ["React", "Ant Design", "Node.js", "Express", "MongoDB"],
    repo: "https://github.com/adi0193/Resume_Maker",
    demo: "https://resume-maker-p044.onrender.com",
    image: resume,
    review: "Add a line on why you built this.",
  },
  {
    id: "splitwise",
    title: "Splitwise Web App",
    year: "2024",
    category: "Frontend",
    featured: true,
    problem: "Splits shared expenses among friends and shows who owes whom.",
    why: null,
    details: [
      "Add a transaction with who paid, the amount, and who it's split among.",
      "Balance logic lives in its own service module and recalculates the balance sheet from the transaction list.",
      "Dark mode preference persisted in localStorage.",
    ],
    stack: ["React", "React Router", "JavaScript"],
    repo: "https://github.com/adi0193/splitwise_webapp",
    demo: "https://splitwise-webapp.onrender.com",
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
    review: "Add a line on why you built this, and a screenshot if you have one.",
  },
  {
    id: "technotrails",
    title: "TechnoTrails",
    year: "2023",
    category: "Frontend",
    problem: "A React site aimed at helping kids find answers to tech-related problems.",
    details: [
      "Component-based React UI written in JSX, styled with SCSS.",
      "Responsive layout with a carousel for featured content.",
    ],
    stack: ["React", "SCSS"],
    repo: "https://github.com/adi0193/TechnoTrails",
    demo: "https://aditechnotrails.netlify.app/",
    image: techy,
  },
  {
    id: "fruitopia",
    title: "Fruitopia",
    year: "2023",
    category: "Frontend",
    problem: "Landing page for a fruit and vegetable store.",
    details: ["Static, responsive landing page built with HTML and CSS."],
    stack: ["HTML", "CSS"],
    repo: "https://github.com/adi0193/Froutopia",
    demo: "https://fruitopiaadi.netlify.app/",
    image: fruits,
  },
  {
    id: "moving-car",
    title: "Moving Car",
    year: "2023",
    category: "Frontend",
    problem: "A small car game built as a micro-project.",
    details: ["Animation and controls with HTML, CSS and JavaScript."],
    stack: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/adi0193/Movingcar",
    demo: "https://movingcaradi.netlify.app/",
    image: game,
  },
  {
    id: "random-joke",
    title: "Random Joke Generator",
    year: "2023",
    category: "Frontend",
    problem: "Fetches a new joke from a public joke API on each click.",
    details: ["Vanilla JavaScript with the Fetch API."],
    stack: ["JavaScript", "REST API"],
    repo: "https://github.com/adi0193/randomjoke",
    demo: "https://randomjokegenerate.netlify.app/",
    image: joke,
  },
];

export const achievements = [
  { title: "Kavach hackathon", detail: "Led my team at the college-level hackathon.", meta: "Team lead" },
  {
    title: "Smart India Hackathon",
    detail: "Selected in the first round as a team member — project on railway accident detection.",
    meta: "First round",
  },
  { title: "Database Programming with SQL", detail: "Certification", meta: "Oracle · Dec 2022" },
  { title: "Developer Virtual Experience Program", detail: "Virtual experience program", meta: "Accenture · Jul 2023" },
];
