import {
  mobile,
  backend,
  creator,
  web,
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
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
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

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
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
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
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

export { services, technologies, aboutContent , experienceTimeline };