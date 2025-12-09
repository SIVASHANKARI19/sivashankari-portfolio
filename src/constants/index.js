import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
} from "../assets";
import profile from '../../public/profile.jpg';
import { Code, Rocket } from "@mui/icons-material";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];



const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React",
    icon: reactjs,
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Redux",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Git",
    icon: git,
  },
];


// constants/index.js

 const aboutContent = {
  title: "About Me",

  description: [
    "I'm a frontend developer passionate about building clean, fast, and intuitive web interfaces using React, Tailwind, and modern JavaScript.",
    "I enjoy turning ideas into smooth, user-friendly experiences that are visually appealing and highly functional.",
    "Recently, I've expanded into machine learning, working on projects that combine data, logic, and creativity. Exploring ML has helped me understand how intelligent systems enhance UX, and I'm excited to blend both worlds.",
  ],

  stats: [
    { number: "1+", label: "Years Experience" },
    { number: "3+", label: "Projects" },
    { number: "10k+", label: "Lines of Code" },
  ],

  profileImage:profile
};


 const experienceTimeline = [
  {
    title: "Full-Stack Development Workshop — Crayon'd, Chennai",
    period: "2022 – 2023",
    description: [
      "Gained hands-on experience in React.js, Next.js, and Git workflows.",
      "Built scalable applications following industry development patterns.",
      "Collaborated on real-time product features improving teamwork.",
    ],
    skills: ["React", "Next.js", "Git"],
    icon: Code,
  },
  {
    title: "Student Special Group (SSG) Member",
    period: "2023 – 2027",
    description: [
      "Built the S7 Project — an event management platform for students & admins.",
      "Developed a real-time code editor for HTML/CSS/JS using React.",
      "Worked on UI components, logic handling, and deployment tasks.",
    ],
    skills: ["React", "Frontend Dev", "Project Development"],
    icon: Rocket,
  },
  
];
const projects = [
  {
    id: 1,
    name: "EMTAX",
    description:
      "EMTAX application helps manage employee tax details, filing, and calculations efficiently",
    tags: ["Tax Management", "Employee Portal", "Finance"],
    color: "#915eff",
  },
  {
    id: 2,
    name: "Revature/RevPro",
    description:
      "Revature/Accenture application supports candidate training, onboarding, skill evaluation, and placement",
    tags: ["Training Platform", "HR Tech", "Assessment"],
    color: "#915eff",
  },
  {
    id: 3,
    name: "Maayu",
    description:
      "Maayu application focuses on wellness tracking, personalized health guidance, and daily improvement",
    tags: ["Health Tech", "Wellness", "Tracking"],
    color: "#915eff",
  },
  {
    id: 4,
    name: "Real-Time Messaging App",
    description:
      "A full-stack real-time chat application built using Socket.io, featuring live messaging, typing indicators, chat rooms, and user presence tracking",
    tags: ["Socket.io", "Real-Time Chat", "Node.js", "WebSockets"],
    color: "#915eff",
  },
];


export {  technologies, aboutContent , experienceTimeline,projects };