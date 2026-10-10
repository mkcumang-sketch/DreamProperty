export type Locale = 'en' | 'hi';

export type LeadType = 'BUYER' | 'SELLER' | 'TENANT' | 'LANDLORD' | 'PARTNER' | 'OTHER';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'WON' | 'LOST';

export interface LeadRecord {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  name: string;
  phone: string;
  email?: string | null;
  type: LeadType;
  service?: string | null;
  propertyType?: string | null;
  location?: string | null;
  budgetRange?: string | null;
  message?: string | null;
  source: string;
  status: LeadStatus;
  notes?: string | null;
  language: string;
  ip?: string | null;
  userAgent?: string | null;
}

export interface NavItem {
  label: string;
  labelHi: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleHi: string;
  benefit: string;
  benefitHi: string;
  iconName: string;
  bullets: string[];
  bulletsHi: string[];
  tag: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  duration: string;
}

export interface FaqItem {
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleHi: string;
  category: 'Residential' | 'Commercial' | 'Staging';
  location: string;
  image: string;
  description: string;
  tag: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  labelHi: string;
  isPlaceholder?: boolean;
}

export interface AdminSession {
  email: string;
  name: string;
  expires: number;
}
