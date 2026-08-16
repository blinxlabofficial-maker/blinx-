export interface WebsiteProject {
  id: string;
  title: string;
  client: string;
  category: 'all' | 'wellness' | 'marketplace' | 'edtech' | 'creative' | 'hospitality' | 'ai-health' | '3d-web';
  categoryLabel: string;
  liveUrl: string;
  imageSrc: string;
  techStack: string[];
  description: string;
  problem: string;
  result: string;
  metrics: {
    label: string;
    value: string;
  }[];
  featured?: boolean;
}

export const websiteCategories = [
  { id: 'all', label: 'All Websites', count: 7 },
  { id: 'wellness', label: 'Wellness & Community', count: 1 },
  { id: 'marketplace', label: 'Home Marketplace', count: 1 },
  { id: 'edtech', label: 'EdTech & Learning', count: 1 },
  { id: 'creative', label: 'Creative & Personal', count: 2 },
  { id: 'hospitality', label: 'Restaurant & Café', count: 1 },
  { id: 'ai-health', label: 'AI & Healthcare', count: 1 },
];

export const websiteProjectsData: WebsiteProject[] = [
  {
    id: 'viramah',
    title: 'Viramah — Wellness Community Platform',
    client: 'Viramah Stay',
    category: 'wellness',
    categoryLabel: 'Wellness / Community Platform',
    liveUrl: 'https://viramahstay.com/',
    imageSrc: '/images/projects/viramah.png',
    techStack: ['React.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    description: 'A modern community platform designed to help individuals improve their lifestyle through shared spaces, retreat events, and wellness-focused digital resources.',
    problem: 'The organization needed a digital platform where users could explore community spaces, participate in events, and connect with like-minded people seamlessly.',
    result: 'The platform established a strong online presence for the community and improved participation in events and booking activities by over 140%.',
    metrics: [
      { label: 'Booking Conversion', value: '+140%' },
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Page Speed', value: '98/100' }
    ],
    featured: true
  },
  {
    id: 'happyhomes',
    title: 'Happy Homes — Interior Design Marketplace',
    client: 'Happy Homes Platform',
    category: 'marketplace',
    categoryLabel: 'Interior Design / Marketplace',
    liveUrl: 'https://happyhomes-bolt.vercel.app/',
    imageSrc: '/images/projects/happyhomes.png',
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    description: 'A digital marketplace platform that connects homeowners with verified interior designers and skilled professionals for custom home renovation projects.',
    problem: 'Homeowners struggled to find trustworthy designers, while professionals lacked a structured platform to showcase their portfolio and attract qualified client inquiries.',
    result: 'The platform simplified the process of finding reliable designers and streamlined project collaboration between homeowners and verified contractors.',
    metrics: [
      { label: 'Designer Onboarding', value: '350+' },
      { label: 'Client Inquiries', value: '3.4x' },
      { label: 'Avg Session Time', value: '4m 12s' }
    ],
    featured: true
  },
  {
    id: 'educonnect',
    title: 'EduConnect — Student & Teacher Platform',
    client: 'EduConnect Learning',
    category: 'edtech',
    categoryLabel: 'Education / EdTech',
    liveUrl: 'https://project-ashen-five.vercel.app/',
    imageSrc: '/images/projects/educonnect.png',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    description: 'An interactive education platform enabling seamless communication, calendar appointment scheduling, and course coordination between students and teachers.',
    problem: 'Students and educators lacked a centralized system to schedule 1-on-1 mentorship meetings, manage real-time communication, and coordinate learning activities efficiently.',
    result: 'The system improved scheduling organization by 85%, reducing administrative friction and boosting student-teacher interaction velocity.',
    metrics: [
      { label: 'Scheduling Efficiency', value: '+85%' },
      { label: 'Active Sessions', value: '12K+' },
      { label: 'Response Latency', value: '< 20ms' }
    ],
    featured: true
  },
  {
    id: 'kartik-portfolio',
    title: 'Kartik Designer — Creative Portfolio',
    client: 'Kartik Creative Studio',
    category: 'creative',
    categoryLabel: 'Creative / Personal Branding',
    liveUrl: 'https://kartik-portfolio-psi.vercel.app/',
    imageSrc: '/images/projects/alex-portfolio.png',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    description: 'A sleek and modern interactive portfolio website built to showcase a product designer’s case studies, visual craft, and design systems.',
    problem: 'Many top designers lack a structured and high-fidelity platform to present complex case studies and attract enterprise clients and design agencies.',
    result: 'The portfolio elevated the designer’s global positioning, generating high-ticket inbound freelance inquiries and full-time senior agency offers.',
    metrics: [
      { label: 'Inbound Offers', value: '18+' },
      { label: 'Global Traffic', value: '45K+' },
      { label: 'Interaction Rate', value: '72.4%' }
    ],
    featured: true
  },
  {
    id: 'vintage-cottage',
    title: 'The Vintage Cottage — Hospitality & Dining',
    client: 'The Vintage Cottage Café',
    category: 'hospitality',
    categoryLabel: 'Restaurant / Hospitality',
    liveUrl: 'https://vintage-cottage-cafe.onrender.com/',
    imageSrc: '/images/projects/vintage-cottage.png',
    techStack: ['React.js', 'Tailwind CSS', 'Node.js'],
    description: 'A boutique café and tea room web application designed to showcase seasonal menu offerings, architectural ambience, and real-time online table reservations.',
    problem: 'The café needed a visually captivating website reflecting its cozy vintage aesthetic while providing guests with an effortless mobile reservation system.',
    result: 'The website boosted weekend reservation volume by 65% and significantly reduced front-desk phone calls with self-serve table booking.',
    metrics: [
      { label: 'Online Table Bookings', value: '+65%' },
      { label: 'Mobile Order Viewers', value: '28K/mo' },
      { label: 'Front-Desk Calls Saved', value: '14 hrs/wk' }
    ],
    featured: true
  },
  {
    id: 'neuroscan-ai',
    title: 'NeuroScan AI — Brain MRI Diagnostic System',
    client: 'NeuroScan Health Technologies',
    category: 'ai-health',
    categoryLabel: 'Healthcare / Artificial Intelligence',
    liveUrl: 'https://neuro-scan-ai.vercel.app/',
    imageSrc: '/images/projects/neuroscan-ai.png',
    techStack: ['Python', 'React.js', 'TensorFlow', 'MongoDB'],
    description: 'An AI-powered healthcare platform that analyzes brain MRI scans using deep learning neural networks and connects patients with neurologists for second opinions.',
    problem: 'Neurological diagnosis often involves slow manual MRI review queues and multiple hospital visits, creating critical delays in early treatment plans.',
    result: 'The platform streamlined early diagnostic assistance with 98.4% model accuracy and improved patient access to specialized neurological consultations.',
    metrics: [
      { label: 'Model Accuracy', value: '98.4%' },
      { label: 'Inference Speed', value: '1.2s' },
      { label: 'Specialist Connect', value: '< 24 hrs' }
    ],
    featured: true
  },
  {
    id: 'akshansh-jsm',
    title: 'Akshansh 3D — Three.js Developer Portfolio',
    client: 'Akshansh Developer',
    category: 'creative',
    categoryLabel: '3D Web / Developer Experience',
    liveUrl: 'https://3-d-portfolio-alpha-nine.vercel.app/#hero',
    imageSrc: '/images/projects/akshansh-jsm.png',
    techStack: ['Next.js', 'Three.js', 'Tailwind CSS', 'WebGL'],
    description: 'An interactive 3D developer portfolio utilizing custom WebGL shaders, particle physics, and responsive 3D model controls to showcase technical prowess.',
    problem: 'Standard flat portfolios fail to demonstrate deep technical mastery of 3D spatial computing, WebGL performance optimization, and custom shaders.',
    result: 'The interactive 3D showcase went viral on developer Twitter/X, positioning the engineer as a leading WebGL and frontend engineering talent.',
    metrics: [
      { label: 'Social Impressions', value: '250K+' },
      { label: 'Frame Rate', value: '60 FPS Solid' },
      { label: 'Avg Interactive Time', value: '3m 45s' }
    ],
    featured: true
  }
];
