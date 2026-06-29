import { Project, Exploration, StatItem } from "./types";

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Core API",
    subtitle: "High-performance transactional backend with microservices",
    category: "Back-End Logic",
    imageUrl: "",
    span: 7,
    aspect: "aspect-[4/3] md:aspect-[16/10]",
    tags: ["Node.js", "Express", "PostgreSQL", "Redis"],
  },
  {
    id: "project-2",
    title: "Autonomous AI Chat Worker",
    subtitle: "Context-aware automated support agent with tool calling",
    category: "AI Workflows",
    imageUrl: "",
    span: 5,
    aspect: "aspect-[4/3] md:aspect-auto md:h-full",
    tags: ["Gemini API", "TypeScript", "LangChain"],
  },
  {
    id: "project-3",
    title: "High-Throughput Checkout Flow",
    subtitle: "Optimized payment handling with multi-gateways",
    category: "Front-End & Backend Logic",
    imageUrl: "",
    span: 5,
    aspect: "aspect-[4/3] md:aspect-auto md:h-full",
    tags: ["React", "Stripe API", "Tailwind CSS"],
  },
  {
    id: "project-4",
    title: "Distributed Cache Sync",
    subtitle: "Low-latency state replication across cloud edge regions",
    category: "System Engineering",
    imageUrl: "",
    span: 7,
    aspect: "aspect-[4/3] md:aspect-[16/10]",
    tags: ["Go", "Redis Cluster", "gRPC"],
  }
];

export const explorationsData: Exploration[] = [
  {
    id: "exp-1",
    title: "E-Commerce Sync Engine",
    imageUrl: "",
    rotation: "hover:rotate-[-3deg]"
  },
  {
    id: "exp-2",
    title: "Database Indexing Visualization",
    imageUrl: "",
    rotation: "hover:rotate-[3deg]"
  },
  {
    id: "exp-3",
    title: "AI Prompt Optimization",
    imageUrl: "",
    rotation: "hover:rotate-[-2deg]"
  },
  {
    id: "exp-4",
    title: "Load Balancing Sandbox",
    imageUrl: "",
    rotation: "hover:rotate-[2deg]"
  },
  {
    id: "exp-5",
    title: "WebAssembly Canvas Renderer",
    imageUrl: "",
    rotation: "hover:rotate-[-4deg]"
  },
  {
    id: "exp-6",
    title: "State Management Loop",
    imageUrl: "",
    rotation: "hover:rotate-[4deg]"
  }
];

export const statsData: StatItem[] = [
  {
    number: "10 Years",
    label: "Work Experience",
    description: "Building robust applications, optimizing back-end scalability, and crafting responsive front-end experiences."
  },
  {
    number: "11",
    label: "Projects Completed",
    description: "Engineering custom e-commerce stores, intelligent AI workflows, and robust enterprise software architectures."
  },
  {
    number: "200%",
    label: "Client Satisfaction",
    description: "Consistently delivering pristine performance, zero downtime, and exceptional software design."
  }
];
