// Static data — replaces Sanity CMS while Django backend is being built.
// When Django is ready, swap each section with a fetch() call to the API.

const UNS = 'https://images.unsplash.com'

const IMG = {
  serverRoom:     `${UNS}/photo-1558494949-ef010cbdcc31?w=1600&q=85&auto=format&fit=crop`,
  networkCables:  `${UNS}/photo-1544197150-b99a580bb7a8?w=1200&q=80&auto=format&fit=crop`,
  coding:         `${UNS}/photo-1461749280684-dccba630e2f6?w=1200&q=80&auto=format&fit=crop`,
  cybersec:       `${UNS}/photo-1526374965328-7f61d4dc18c5?w=1200&q=80&auto=format&fit=crop`,
  aiNeural:       `${UNS}/photo-1677442135703-1787eea5ce01?w=1200&q=80&auto=format&fit=crop`,
  cloudCompute:   `${UNS}/photo-1451187580459-43490279c0fa?w=1200&q=80&auto=format&fit=crop`,
  analytics:      `${UNS}/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop`,
  ecommerce:      `${UNS}/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop`,
  crm:            `${UNS}/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop`,
  teamCollab:     `${UNS}/photo-1522071820081-009f0129c71c?w=1600&q=85&auto=format&fit=crop`,
  monitoring:     `${UNS}/photo-1593720213428-28a5b9e94613?w=1200&q=80&auto=format&fit=crop`,
  securityShield: `${UNS}/photo-1614064641938-3bbee52942c7?w=1200&q=80&auto=format&fit=crop`,
  kpiDashboard:   `${UNS}/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop`,
  // Team headshots
  portrait1:      `${UNS}/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop&crop=face`,
  portrait2:      `${UNS}/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop&crop=face`,
  portrait3:      `${UNS}/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop&crop=face`,
  portrait4:      `${UNS}/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop&crop=face`,
}

export { IMG }

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Service {
  _id: string
  title: string
  slug: string
  category: string
  shortDescription: string
  coverImage: string
  description?: string
  features?: { title: string; description?: string }[]
  pricing?: { startingFrom: string; pricingNote?: string }
}

export interface Product {
  _id: string
  title: string
  slug: string
  shortDescription: string
  coverImage: string
  category: string
  price?: { amount: number; currency: string; billingCycle?: string }
  features?: string[]
  description?: string
}

export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  categories: string[]
  readTime: number
  publishedAt: string
  author: { name: string; role?: string }
  body?: string
  tags?: string[]
}

export interface Project {
  _id: string
  title: string
  slug: string
  client: string
  category: string
  shortDescription: string
  coverImage: string
  tags: string[]
  description?: string
  challenge?: string
  gallery?: string[]
  completedAt?: string
  liveUrl?: string
  results?: { metric: string; label: string }[]
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  department: string
  coverImage?: string
  bio?: string
  socials?: { linkedin?: string; twitter?: string; github?: string }
}

export interface Testimonial {
  _id: string
  name: string
  role?: string
  company?: string
  content: string
  rating: number
}

// ─── Services ─────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    _id: '1',
    title: 'Custom Web & App Development',
    slug: 'web-app-development',
    category: 'development',
    coverImage: IMG.coding,
    shortDescription: 'Custom business websites, e-commerce platforms, and mobile application development.',
    description: 'We design and build custom web applications, corporate websites, and mobile apps tailored to your business. From simple landing pages to complex SaaS platforms, our team delivers scalable, performant solutions using modern frameworks and best practices.',
    features: [
      { title: 'Responsive Web Design', description: 'Mobile-first designs that work seamlessly across all devices.' },
      { title: 'Progressive Web Apps', description: 'Native app-like experiences delivered through the browser.' },
      { title: 'API Integration', description: 'Seamless connection with payment gateways, CRMs, and third-party services.' },
      { title: 'Performance Optimization', description: 'Blazing fast load times and optimized Core Web Vitals.' },
    ],
    pricing: { startingFrom: '$2,500', pricingNote: 'Pricing varies based on project complexity and scope.' },
  },
  {
    _id: '2',
    title: 'AI & Data Solutions',
    slug: 'ai-data',
    category: 'ai_data',
    coverImage: IMG.aiNeural,
    shortDescription: 'Automation services, data science solutions, and intelligent AI chatbots.',
    description: 'Leverage the power of artificial intelligence and data science to automate workflows, gain insights, and build intelligent products. From chatbots to predictive analytics, we architect AI solutions that deliver measurable business outcomes.',
    features: [
      { title: 'Workflow Automation', description: 'Eliminate repetitive tasks with intelligent process automation.' },
      { title: 'Predictive Analytics', description: 'Data-driven forecasting models for business decision-making.' },
      { title: 'AI Chatbots', description: 'Intelligent conversational agents for customer service and lead generation.' },
      { title: 'Data Pipeline Engineering', description: 'Robust ETL pipelines and data warehousing solutions.' },
    ],
    pricing: { startingFrom: '$3,000', pricingNote: 'Custom pricing based on model complexity and data volume.' },
  },
  {
    _id: '3',
    title: 'Cybersecurity Services',
    slug: 'security',
    category: 'security',
    coverImage: IMG.cybersec,
    shortDescription: 'Cybersecurity services, penetration testing, and robust system protection.',
    description: 'Protect your digital assets with enterprise-grade security solutions. We conduct penetration testing, vulnerability assessments, and implement security frameworks that keep your systems and customer data safe.',
    features: [
      { title: 'Penetration Testing', description: 'Ethical hacking to identify vulnerabilities before attackers do.' },
      { title: 'Security Audits', description: 'Comprehensive review of your infrastructure and application security posture.' },
      { title: 'Incident Response', description: '24/7 response team to contain and resolve security breaches.' },
      { title: 'Compliance Consulting', description: 'GDPR, SOC 2, ISO 27001, and industry-specific compliance guidance.' },
    ],
    pricing: { startingFrom: '$1,500', pricingNote: 'Retainer and project-based engagements available.' },
  },
  {
    _id: '4',
    title: 'Business Systems',
    slug: 'business-systems',
    category: 'business_systems',
    coverImage: IMG.analytics,
    shortDescription: 'CRM, ERP, POS systems, and management solutions for your enterprise.',
    description: 'Streamline your operations with custom or configured business management systems. We implement and customize CRM, ERP, POS, and HR platforms that fit your processes and scale with your growth.',
    features: [
      { title: 'CRM Implementation', description: 'Salesforce, HubSpot, and custom CRM solutions for managing relationships.' },
      { title: 'ERP Systems', description: 'Integrated enterprise resource planning to unify your operations.' },
      { title: 'POS Solutions', description: 'Retail and restaurant point-of-sale systems with inventory management.' },
      { title: 'Custom Dashboards', description: 'Business intelligence dashboards with real-time KPI tracking.' },
    ],
    pricing: { startingFrom: '$2,000', pricingNote: 'Licensing and implementation fees vary by platform.' },
  },
  {
    _id: '5',
    title: 'Digital Growth & Marketing',
    slug: 'digital-growth',
    category: 'digital_growth',
    coverImage: IMG.kpiDashboard,
    shortDescription: 'SEO, social media management, branding, and content strategies.',
    description: 'Grow your digital presence with data-driven marketing strategies. We combine SEO, content creation, social media management, and paid advertising to build brands that attract and retain customers.',
    features: [
      { title: 'Search Engine Optimization', description: 'Technical and content SEO to rank higher and drive organic traffic.' },
      { title: 'Social Media Management', description: 'Consistent brand voice and engagement across all platforms.' },
      { title: 'Brand Identity Design', description: 'Logos, style guides, and visual identity systems that resonate.' },
      { title: 'Content Strategy', description: 'Editorial planning and content production that drives conversions.' },
    ],
    pricing: { startingFrom: '$800/mo', pricingNote: 'Monthly retainer packages available.' },
  },
  {
    _id: '6',
    title: 'Cloud & Infrastructure',
    slug: 'cloud-infrastructure',
    category: 'cloud_infrastructure',
    coverImage: IMG.networkCables,
    shortDescription: 'Web hosting, DevOps, CI/CD pipelines, and API development.',
    description: 'Build and manage cloud infrastructure that scales with your business. From initial cloud migration to ongoing DevOps support, we architect reliable, cost-efficient infrastructure on AWS, GCP, and Azure.',
    features: [
      { title: 'Cloud Migration', description: 'Seamless migration from on-premise to cloud with minimal downtime.' },
      { title: 'CI/CD Pipelines', description: 'Automated testing and deployment pipelines for faster release cycles.' },
      { title: 'Infrastructure as Code', description: 'Terraform and Ansible configurations for reproducible environments.' },
      { title: 'Managed Hosting', description: '99.9% uptime SLA with proactive monitoring and support.' },
    ],
    pricing: { startingFrom: '$500/mo', pricingNote: 'Infrastructure costs billed separately at cost.' },
  },
]

// ─── Products ─────────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    _id: '1',
    title: 'ServerPulse Monitoring',
    slug: 'serverpulse',
    shortDescription: 'Real-time server and application monitoring dashboard with intelligent alerting and anomaly detection.',
    coverImage: IMG.monitoring,
    category: 'devtools',
    price: { amount: 29, currency: 'USD', billingCycle: 'monthly' },
    features: [
      'Real-time server metrics (CPU, RAM, disk, network)',
      'Intelligent anomaly detection and alerting',
      'Multi-server dashboard with unified view',
      'Slack, email, and webhook notifications',
      'Historical data retention and trend analysis',
      '99.9% uptime SLA',
    ],
    description: 'ServerPulse is a lightweight yet powerful monitoring solution built for developers and ops teams managing production infrastructure. Get instant visibility into your server health and be alerted before issues become outages.',
  },
  {
    _id: '2',
    title: 'SecureBox Vault',
    slug: 'securebox',
    shortDescription: 'End-to-end encrypted document and credential vault built for distributed teams.',
    coverImage: IMG.securityShield,
    category: 'security',
    price: { amount: 19, currency: 'USD', billingCycle: 'monthly' },
    features: [
      'AES-256 end-to-end encryption',
      'Secure credential and secret sharing',
      'Role-based access control',
      'Audit logs and access history',
      'Two-factor authentication',
      'Offline access with encrypted local cache',
    ],
    description: 'SecureBox provides teams with a zero-knowledge encrypted vault for storing and sharing sensitive documents, API keys, passwords, and credentials. Built with a security-first architecture, your data is always encrypted before it leaves your device.',
  },
  {
    _id: '3',
    title: 'FlowForm Builder',
    slug: 'flowform',
    shortDescription: 'Drag-and-drop form builder with workflow automation and native CRM integrations.',
    coverImage: IMG.analytics,
    category: 'productivity',
    price: { amount: 0, currency: 'USD' },
    features: [
      'Visual drag-and-drop form builder',
      'Conditional logic and branching',
      'CRM and webhook integrations',
      'File upload and signature support',
      'Real-time submission analytics',
      'Unlimited submissions on free plan',
    ],
    description: 'FlowForm makes it easy to build powerful forms without writing a single line of code. Connect your forms to your CRM, trigger automated workflows, and collect the data your business needs.',
  },
  {
    _id: '4',
    title: 'InfraKit Starter Pack',
    slug: 'infrakit',
    shortDescription: 'A curated bundle of DevOps scripts, IaC templates, and CI/CD pipelines for fast bootstrapping.',
    coverImage: IMG.serverRoom,
    category: 'devtools',
    price: { amount: 49, currency: 'USD', billingCycle: 'one-time' },
    features: [
      'Terraform modules for AWS, GCP, and Azure',
      'GitHub Actions CI/CD workflow templates',
      'Docker Compose production-ready configs',
      'Nginx and Caddy server configurations',
      'PostgreSQL, Redis, and MongoDB setups',
      'Lifetime updates included',
    ],
    description: 'InfraKit gives you a head start on any new project with battle-tested DevOps configurations. Stop setting up the same boilerplate infrastructure from scratch — just clone, configure, and deploy.',
  },
]

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    _id: '1',
    title: 'Building Scalable Cloud Infrastructure: Best Practices for 2025',
    slug: 'building-scalable-cloud-infrastructure',
    excerpt: 'Discover the key principles behind cloud systems that handle millions of requests while keeping costs under control.',
    coverImage: IMG.cloudCompute,
    categories: ['Cloud', 'Infrastructure'],
    readTime: 5,
    publishedAt: '2025-03-15',
    author: { name: 'SWN Team', role: 'Engineering' },
    tags: ['Cloud', 'AWS', 'DevOps', 'Infrastructure'],
    body: `Scaling cloud infrastructure is one of the most critical challenges modern engineering teams face. Whether you're running on AWS, GCP, or Azure, the principles that separate resilient systems from fragile ones remain consistent.

The first principle is designing for failure. Every component in your architecture should assume that any other component can fail at any time. This means building redundancy, implementing circuit breakers, and ensuring your services degrade gracefully rather than fail catastrophically.

The second principle is observability before optimization. You cannot optimize what you cannot measure. Before scaling horizontally, ensure you have comprehensive metrics, distributed tracing, and structured logging in place. This gives you the data needed to make informed scaling decisions.

Auto-scaling groups, managed Kubernetes clusters, and serverless functions have made horizontal scaling more accessible than ever. However, the most common mistake teams make is over-engineering their scaling solution before validating the need. Start simple — a well-configured load balancer and auto-scaling group handles the majority of traffic spikes for most applications.

Cost control is the hidden discipline of cloud architecture. Rightsizing instances, using reserved capacity for baseline workloads, and aggressively leveraging spot instances for non-critical workloads can reduce cloud bills by 40–60% without sacrificing performance.`,
  },
  {
    _id: '2',
    title: 'How AI is Transforming Business Operations in 2025',
    slug: 'ai-transforming-business-operations',
    excerpt: 'From automated workflows to intelligent decision support — AI is no longer optional for competitive businesses.',
    coverImage: IMG.aiNeural,
    categories: ['AI & Data'],
    readTime: 7,
    publishedAt: '2025-03-08',
    author: { name: 'SWN Team', role: 'AI Division' },
    tags: ['AI', 'Automation', 'Business', 'Machine Learning'],
    body: `Artificial intelligence has crossed the threshold from experimental technology to operational necessity. In 2025, businesses that have not integrated AI into their core workflows are increasingly at a competitive disadvantage.

The most impactful AI implementations are not the most complex ones. Customer service automation using large language models has reduced support ticket volumes by 40–70% for companies that have deployed them thoughtfully. The key word is thoughtfully — a poorly configured AI assistant creates more friction than it resolves.

Intelligent document processing has transformed finance and legal teams. Tasks that previously required hours of manual data extraction — invoice processing, contract review, compliance checking — now complete in seconds with accuracy rates exceeding human benchmarks.

Predictive analytics is reshaping inventory management, pricing strategies, and demand forecasting. Retail and logistics companies using AI-powered forecasting are achieving inventory optimization that reduces both stockouts and overstock situations by up to 30%.

The most underutilized AI application in African businesses remains internal knowledge management. Companies sitting on years of institutional knowledge buried in email threads and shared drives are missing an enormous productivity opportunity. AI-powered knowledge retrieval systems change this fundamentally.`,
  },
  {
    _id: '3',
    title: 'Cybersecurity Fundamentals Every Business Owner Should Know',
    slug: 'cybersecurity-fundamentals-business',
    excerpt: 'A practical guide to protecting your digital assets, customer data, and business continuity from modern threats.',
    coverImage: IMG.cybersec,
    categories: ['Security'],
    readTime: 6,
    publishedAt: '2025-02-28',
    author: { name: 'SWN Team', role: 'Security' },
    tags: ['Security', 'Cybersecurity', 'Business', 'Best Practices'],
    body: `Cybersecurity is no longer a concern exclusive to large enterprises. Small and medium businesses are now the primary targets for ransomware, phishing, and data breach attacks — precisely because attackers know their defenses are weaker.

The most common entry point for attacks remains phishing. Despite years of awareness campaigns, phishing emails continue to deceive employees because they have become indistinguishable from legitimate communications. Multi-factor authentication (MFA) is the single highest-impact control you can implement. Enable it everywhere, immediately.

Password hygiene is still the most neglected security practice. Reusing passwords across services is a critical vulnerability. A password manager combined with unique, complex passwords for every account eliminates the majority of credential-based attack vectors.

Keeping software up to date is not optional. The majority of successful cyberattacks exploit known vulnerabilities for which patches already exist. Unpatched systems are an open door. Establish a patch management process and treat security updates with the same urgency you would a production outage.

Backups are your last line of defense against ransomware. The 3-2-1 rule remains the gold standard: three copies of your data, on two different media types, with one stored offsite. Test your backup restoration process regularly — a backup you have never restored is a backup you cannot trust.`,
  },
]

// ─── Portfolio Projects ────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    _id: '1',
    title: 'Enterprise CRM Reconstruction',
    slug: 'enterprise-crm',
    client: 'FinEdge Africa',
    category: 'crm_erp',
    shortDescription: 'End-to-end rebuild of a legacy CRM system serving 50,000+ users across 12 African markets.',
    coverImage: IMG.crm,
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    completedAt: '2024-11-01',
    challenge: "FinEdge Africa's decade-old CRM had become a critical bottleneck. The system couldn't handle concurrent load across 12 markets, new feature releases took weeks due to deeply tangled architecture, and support tickets were piling up as users hit daily crashes. The business was losing revenue directly because its internal tooling couldn't scale.",
    description: "We led a complete reconstruction — migrating to a modern microservices architecture while keeping the existing system operational throughout the transition. Each service was rebuilt module-by-module with zero downtime, progressively cutting over user traffic until the legacy system was fully decommissioned. The new CRM handles 50,000+ concurrent users with sub-200ms response times.",
    gallery: [
      IMG.crm,
      IMG.analytics,
      IMG.kpiDashboard,
      IMG.coding,
    ],
    results: [
      { metric: '340%', label: 'Improvement in page load speed' },
      { metric: '60%', label: 'Reduction in support tickets' },
      { metric: '50K+', label: 'Concurrent users supported' },
    ],
  },
  {
    _id: '2',
    title: 'AI-Powered Analytics Dashboard',
    slug: 'ai-analytics-dashboard',
    client: 'Meridian Holdings',
    category: 'ai',
    shortDescription: 'Real-time business intelligence dashboard with predictive modelling and automated reporting.',
    coverImage: IMG.kpiDashboard,
    tags: ['Python', 'Next.js', 'TensorFlow', 'BigQuery'],
    completedAt: '2024-09-15',
    challenge: "Meridian Holdings operates a portfolio of 23 companies spanning fintech, real estate, and logistics. Executives were spending 8+ hours weekly manually consolidating reports from different ERP systems in spreadsheets — with no real-time visibility, no anomaly detection, and no common data language across portfolio companies.",
    description: 'We built a unified analytics platform that ingests data from multiple ERP systems, normalises it into a shared data model, applies machine learning models for anomaly detection and 90-day forecasting, and surfaces actionable insights through an intuitive executive dashboard. Portfolio health is now monitored in real time with automated weekly intelligence reports delivered to leadership.',
    gallery: [
      IMG.kpiDashboard,
      IMG.analytics,
      IMG.aiNeural,
      IMG.cloudCompute,
    ],
    results: [
      { metric: '23', label: 'Companies monitored in one platform' },
      { metric: '8hrs', label: 'Saved weekly per executive' },
      { metric: '94%', label: 'Forecast accuracy on 90-day projections' },
    ],
  },
  {
    _id: '3',
    title: 'E-Commerce Platform Overhaul',
    slug: 'ecommerce-overhaul',
    client: 'Stackwell Labs',
    category: 'ecommerce',
    shortDescription: 'Full-stack e-commerce rebuild with headless architecture, payment integration, and multi-vendor support.',
    coverImage: IMG.ecommerce,
    tags: ['Next.js', 'Stripe', 'Paystack', 'PostgreSQL'],
    completedAt: '2024-07-30',
    challenge: "Stackwell's WooCommerce store was collapsing under growth. Page load times had degraded to 8+ seconds, the checkout flow had a 71% abandonment rate, and onboarding new vendors required manual database edits. They were turning away business because the platform simply couldn't keep up.",
    description: "We rebuilt the platform on a headless architecture — decoupling the storefront from the commerce engine and migrating the entire vendor and product catalogue with zero data loss. The new stack delivers sub-2s page loads, a streamlined vendor self-onboarding portal, and dual payment rail support via Paystack for African markets and Stripe for international customers.",
    gallery: [
      IMG.ecommerce,
      IMG.analytics,
      IMG.coding,
      IMG.networkCables,
    ],
    results: [
      { metric: '2.1s', label: 'Average page load time (down from 8.4s)' },
      { metric: '38%', label: 'Increase in conversion rate' },
      { metric: '120+', label: 'Vendors onboarded in first month' },
    ],
  },
]

// ─── Team Members ─────────────────────────────────────────────────────────────

export const team: TeamMember[] = [
  {
    _id: '1',
    name: 'Adebayo Okonkwo',
    role: 'Chief Executive Officer',
    department: 'Leadership',
    coverImage: IMG.portrait1,
    bio: 'Serial entrepreneur with 15+ years building technology companies across West Africa. Former engineering lead at a top-tier fintech.',
  },
  {
    _id: '2',
    name: 'Chisom Eze',
    role: 'Chief Technology Officer',
    department: 'Engineering',
    coverImage: IMG.portrait2,
    bio: 'Systems architect specializing in distributed infrastructure and AI integration. MIT-educated, previously at Google and Andela.',
  },
  {
    _id: '3',
    name: 'Fatima Al-Hassan',
    role: 'Head of Product',
    department: 'Product',
    coverImage: IMG.portrait3,
    bio: 'Product strategist focused on building tools that solve real problems for African businesses. Former PM at Flutterwave.',
  },
  {
    _id: '4',
    name: 'James Okoro',
    role: 'Head of Security',
    department: 'Security',
    coverImage: IMG.portrait4,
    bio: 'Certified ethical hacker and security architect with expertise in enterprise security frameworks and incident response.',
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    _id: '1',
    name: 'David Okafor',
    role: 'CTO',
    company: 'FinEdge Africa',
    content: 'Servers World Network transformed our entire infrastructure. Their team understands both the technical depth and the business urgency required at our scale.',
    rating: 5,
  },
  {
    _id: '2',
    name: 'Sara Al-Rashidi',
    role: 'Head of Digital',
    company: 'Meridian Holdings',
    content: 'The precision and reliability of their cloud systems gave us the confidence to expand regionally. Truly a top-tier engineering partner.',
    rating: 5,
  },
  {
    _id: '3',
    name: 'James Whitfield',
    role: 'Founder',
    company: 'Stackwell Labs',
    content: 'From concept to deployment in 6 weeks. They delivered exactly what we scoped without the usual overruns. Exceptional execution.',
    rating: 5,
  },
]
