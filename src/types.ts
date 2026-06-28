export type Tab = 'home' | 'services' | 'case-studies' | 'insights' | 'about' | 'contact';

export type Sector = 'ALL' | 'MINING' | 'HEALTHCARE' | 'HEAVY INDUSTRY';

export interface CaseStudy {
  id: string;
  sector: 'MINING' | 'HEALTHCARE' | 'HEAVY INDUSTRY';
  region: 'APAC' | 'North America' | 'EMEA' | 'Global';
  title: string;
  subtitle: string;
  bullets?: string[];
  imageUrl?: string;
  impactMetrics?: { label: string; value: string }[];
}

export interface Insight {
  id: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  text: string;
  date: string;
  likes: number;
  comments: number;
  imageUrl?: string;
}
