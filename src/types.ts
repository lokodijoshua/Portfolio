export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  span: number; // grid col span
  aspect: string; // Tailwind aspect class
  tags: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

export interface Exploration {
  id: string;
  title: string;
  imageUrl: string;
  rotation: string; // e.g., 'hover:rotate-3'
}

export interface StatItem {
  number: string;
  label: string;
  description: string;
}
