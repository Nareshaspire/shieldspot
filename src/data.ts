import { CaseStudy, Insight } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    sector: 'HEAVY INDUSTRY',
    region: 'APAC',
    title: 'Contractor Risk Platform for Heavy Civil Operations',
    subtitle: 'Unified contractor onboarding, permit-to-work and incident telemetry into a single risk surface for executive oversight.',
    bullets: [
      'Single source of safety truth',
      '60% faster permit issuance',
      'Board-grade risk reporting'
    ]
  },
  {
    id: 'case-2',
    sector: 'HEAVY INDUSTRY',
    region: 'North America',
    title: 'Energy & Yield Optimization at a Continuous Smelter',
    subtitle: 'Built a closed-loop optimization model on plant historian data, balancing yield, emissions and energy intensity.',
    imageUrl: 'https://picsum.photos/seed/smelter/800/600'
  },
  {
    id: 'case-3',
    sector: 'HEALTHCARE',
    region: 'EMEA',
    title: 'Clinical Workflow Orchestration for a Regional Health Network',
    subtitle: 'Re-engineered triage and bed-allocation workflows with an enterprise AI layer over existing EHR systems.',
    imageUrl: 'https://picsum.photos/seed/clinical_tablet/800/600'
  }
];

export const INSIGHTS: Insight[] = [
  {
    id: 'insight-1',
    author: {
      name: 'ShieldSpot Research',
      role: 'Industrial AI Consulting',
      avatarInitials: 'SS'
    },
    text: 'Most safety dashboards report lagging indicators. The frontier is anticipating incidents 48–72 hours out with operational telemetry. Here is what we are seeing across mining and heavy industry.',
    date: '11/18/2025',
    likes: 312,
    comments: 27,
    imageUrl: 'https://picsum.photos/seed/dashboard_team/800/600'
  },
  {
    id: 'insight-2',
    author: {
      name: 'ShieldSpot Research',
      role: 'Industrial AI Consulting',
      avatarInitials: 'SS'
    },
    text: 'Healthcare operations teams are quietly running the most complex AI rollouts in the enterprise. Three patterns we keep recommending to COOs navigating GDPR & PIPEDA.',
    date: '11/4/2025',
    likes: 198,
    comments: 19,
    imageUrl: 'https://picsum.photos/seed/healthcare_team/800/600'
  },
  {
    id: 'insight-3',
    author: {
      name: 'ShieldSpot Research',
      role: 'Industrial AI Consulting',
      avatarInitials: 'SS'
    },
    text: 'Field note: the best Enterprise AI Workflow programs do not start with a model. They start with a clearly-owned operational decision and a measurable counterfactual.',
    date: '10/21/2025',
    likes: 421,
    comments: 44
  }
];
