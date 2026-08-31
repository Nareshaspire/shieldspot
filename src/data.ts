import { CaseStudy, Insight } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    sector: 'MINING & EXCAVATION',
    region: 'Jharkhand, India',
    title: 'Geotechnical Edge Monitoring for Open-Cast Mines',
    subtitle: 'Deployed an offline, edge-computed predictive model integrating seismic activity and subsurface integrity to forecast wall collapses with 98% accuracy 72 hours in advance.',
    bullets: [
      'Zero-latency edge processing in low-connectivity zones',
      'Integration of complex geotechnical sensor arrays',
      'Saved estimated $4M in halted operations and equipment loss'
    ]
  },
  {
    id: 'case-2',
    sector: 'PETROCHEMICALS',
    region: 'Gujarat, India',
    title: 'Preemptive Toxic Gas & Fault Detection',
    subtitle: 'Replaced reactive dashboards with an XAI-driven system monitoring extreme thermal gradients and pressure profiles to predict column flooding and volatile gas accumulations.',
    imageUrl: 'https://picsum.photos/seed/petrochemical/800/600'
  },
  {
    id: 'case-3',
    sector: 'CONSTRUCTION',
    region: 'Karnataka, India',
    title: 'BIM-Integrated Structural Load Monitoring',
    subtitle: 'Averted high-rise structural failures by correlating real-time sensor-based load data with Building Information Modeling (BIM) to detect degradation early.',
    imageUrl: 'https://picsum.photos/seed/construction_site/800/600'
  }
];

export const INSIGHTS: Insight[] = [
  {
    id: 'insight-1',
    author: {
      name: 'Dr. Arthur Vance',
      role: 'Chief Scientific Officer',
      avatarInitials: 'AV'
    },
    text: 'A major barrier in OHS is the "data vacuum." Over 80% of urban workforces operate in fragmented ecosystems where safety audits are manual checklists. Mobile-first IoT integration is not a luxury; it is the only way to build a reliable predictive baseline.',
    date: '11/18/2025',
    likes: 312,
    comments: 27,
    imageUrl: 'https://picsum.photos/seed/dashboard_team/800/600'
  },
  {
    id: 'insight-2',
    author: {
      name: 'Marcus Thorne',
      role: 'Head of Engineering',
      avatarInitials: 'MT'
    },
    text: 'We cannot expect safety officers to trust black-box models. Explainable AI (XAI) using SHAP values is critical. When we predict a machinery failure, the dashboard must explicitly state whether the risk is driven by vibration, temperature, or wear-and-tear.',
    date: '11/4/2025',
    likes: 198,
    comments: 19,
    imageUrl: 'https://picsum.photos/seed/edge_computing/800/600'
  },
  {
    id: 'insight-3',
    author: {
      name: 'Sarah Lin, P.Eng.',
      role: 'Managing Partner',
      avatarInitials: 'SL'
    },
    text: 'In remote regions with intermittent power, cloud reliance is a fatal flaw. Edge computing devices that process sensor data locally ensure that anomaly detection never sleeps, regardless of external network stability.',
    date: '10/21/2025',
    likes: 421,
    comments: 44
  }
];
