import type { DecisionCard, Connection, Template } from '../types';

export const mockDecisions: DecisionCard[] = [
  {
    id: 'd1',
    title: 'Launch Product v2',
    description: 'Evaluate full market launch of Product v2 with enhanced AI features targeting enterprise segment.',
    pros: ['Large market opportunity', 'First-mover advantage', 'Strong tech differentiation', 'Team ready'],
    cons: ['High upfront investment', 'Competitive market', 'Long sales cycle'],
    risk: 'Medium',
    cost: '₹45L',
    costRaw: 4500000,
    dependencies: ['Marketing Team', 'Sales Pipeline', 'Legal Clearance'],
    confidence: 87,
    tags: ['Product', 'Growth', 'Enterprise'],
    owner: 'Slora Bar',
    ownerAvatar: 'SB',
    dueDate: '2024-03-15',
    priority: 'High',
    status: 'In Review',
    x: 180,
    y: 150,
    aiRecommendation: 'Proceed with Launch',
    aiAlternative: 'Phased Beta Launch',
    aiConfidence: 92,
    favorite: true,
    comments: [
      { id: 'c1', author: 'Priya Singh', avatar: 'PS', text: 'Marketing budget needs revision before we proceed.', time: '2h ago' },
      { id: 'c2', author: 'Ravi Kumar', avatar: 'RK', text: 'Legal team signed off. Good to go!', time: '5h ago' },
    ],
    createdAt: '2024-01-10',
  },
  {
    id: 'd2',
    title: 'Market Expansion – APAC',
    description: 'Strategic expansion into Southeast Asian markets, starting with Singapore and Indonesia.',
    pros: ['Huge untapped market', 'Lower competition', 'Government incentives'],
    cons: ['Regulatory complexity', 'Currency risk', 'Needs local partnerships'],
    risk: 'High',
    cost: '₹1.2Cr',
    costRaw: 12000000,
    dependencies: ['Legal Team', 'Finance Approval', 'Local Partnerships'],
    confidence: 72,
    tags: ['Expansion', 'International', 'Strategic'],
    owner: 'Sneha Patel',
    ownerAvatar: 'SP',
    dueDate: '2024-06-30',
    priority: 'High',
    status: 'Draft',
    x: 620,
    y: 120,
    aiRecommendation: 'Start with Singapore pilot',
    aiAlternative: 'Delay 6 months',
    aiConfidence: 78,
    favorite: false,
    comments: [
      { id: 'c3', author: 'Slora Bar', avatar: 'SB', text: 'Singapore makes sense as entry point.', time: '1d ago' },
    ],
    createdAt: '2024-01-15',
  },
  {
    id: 'd3',
    title: 'Key Engineering Hire',
    description: 'Hire a VP of Engineering to lead platform infrastructure and scale the tech team from 15 to 40.',
    pros: ['Fills critical leadership gap', 'Accelerates roadmap', 'Improves team culture'],
    cons: ['High compensation package', '3-month onboarding', 'Culture fit risk'],
    risk: 'Low',
    cost: '₹85L/yr',
    costRaw: 8500000,
    dependencies: ['HR Team', 'Board Approval', 'Budget Allocation'],
    confidence: 91,
    tags: ['Hiring', 'Leadership', 'Engineering'],
    owner: 'Kavita Sharma',
    ownerAvatar: 'KS',
    dueDate: '2024-02-28',
    priority: 'Urgent',
    status: 'Decided',
    x: 400,
    y: 340,
    aiRecommendation: 'Proceed with hire immediately',
    aiAlternative: 'Promote internally',
    aiConfidence: 95,
    favorite: true,
    comments: [],
    createdAt: '2024-01-05',
  },
  {
    id: 'd4',
    title: 'Series B Fundraise',
    description: 'Raise ₹50Cr Series B to fund product development, market expansion, and team growth over 18 months.',
    pros: ['Runway extension', 'Strategic investors', 'Market validation'],
    cons: ['Equity dilution', 'Time-intensive process', 'Investor pressure'],
    risk: 'Medium',
    cost: '18 months runway',
    costRaw: 50000000,
    dependencies: ['Financial Audit', 'Pitch Deck', 'Legal Due Diligence'],
    confidence: 81,
    tags: ['Finance', 'Growth', 'Investors'],
    owner: 'Rohit Verma',
    ownerAvatar: 'RV',
    dueDate: '2024-04-30',
    priority: 'Urgent',
    status: 'In Review',
    x: 900,
    y: 280,
    aiRecommendation: 'Proceed with fundraise',
    aiAlternative: 'Bootstrap for 6 more months',
    aiConfidence: 84,
    favorite: false,
    comments: [
      { id: 'c4', author: 'Sneha Patel', avatar: 'SP', text: 'Sequoia meeting scheduled for next week.', time: '3h ago' },
    ],
    createdAt: '2024-01-20',
  },
  {
    id: 'd5',
    title: 'Buy vs Build: Data Pipeline',
    description: 'Evaluate whether to build an in-house data pipeline or purchase a third-party solution like Fivetran.',
    pros: ['Buy: faster to market', 'Buy: lower maintenance', 'Build: full control'],
    cons: ['Buy: vendor lock-in', 'Build: 6 month delay', 'Build: high dev cost'],
    risk: 'Low',
    cost: '₹12L/yr (Buy) or ₹60L (Build)',
    costRaw: 1200000,
    dependencies: ['Data Team', 'Budget Review', 'Engineering'],
    confidence: 76,
    tags: ['Technology', 'Infrastructure', 'Make vs Buy'],
    owner: 'Dev Anand',
    ownerAvatar: 'DA',
    dueDate: '2024-02-15',
    priority: 'Medium',
    status: 'Draft',
    x: 160,
    y: 500,
    aiRecommendation: 'Buy (Fivetran recommended)',
    aiAlternative: 'Hybrid approach',
    aiConfidence: 89,
    favorite: false,
    comments: [],
    createdAt: '2024-01-18',
  },
  {
    id: 'd6',
    title: 'Office Expansion – Bangalore',
    description: 'Lease a larger office space in Koramangala to accommodate team growth and support in-person collaboration.',
    pros: ['Better team culture', 'Room for 200+ team', 'Prime location'],
    cons: ['High monthly lease', '3-year commitment', 'Moving costs'],
    risk: 'Low',
    cost: '₹8.5L/month',
    costRaw: 850000,
    dependencies: ['Finance Team', 'Operations', 'Leadership Sign-off'],
    confidence: 84,
    tags: ['Operations', 'Culture', 'Real Estate'],
    owner: 'Meera Iyer',
    ownerAvatar: 'MI',
    dueDate: '2024-03-31',
    priority: 'Medium',
    status: 'In Review',
    x: 660,
    y: 480,
    aiRecommendation: 'Proceed with lease',
    aiAlternative: 'Hybrid remote model',
    aiConfidence: 82,
    favorite: false,
    comments: [],
    createdAt: '2024-01-22',
  },
];

export const mockConnections: Connection[] = [
  { id: 'conn1', from: 'd1', to: 'd2', label: 'Enables' },
  { id: 'conn2', from: 'd1', to: 'd3', label: 'Requires' },
  { id: 'conn3', from: 'd4', to: 'd1', label: 'Funds' },
  { id: 'conn4', from: 'd4', to: 'd2', label: 'Funds' },
  { id: 'conn5', from: 'd3', to: 'd5', label: 'Decides' },
];

export const mockTemplates: Template[] = [
  { id: 't1', title: 'Product Launch', description: 'End-to-end framework for evaluating and planning a product launch.', icon: '🚀', color: '#6366F1', tags: ['Product', 'Growth'], decisions: 8 },
  { id: 't2', title: 'Business Expansion', description: 'Structured decision tree for entering new markets or geographies.', icon: '🌏', color: '#8B5CF6', tags: ['Growth', 'Strategy'], decisions: 12 },
  { id: 't3', title: 'Career Change', description: 'Personal decision framework for evaluating career opportunities.', icon: '💼', color: '#10B981', tags: ['Personal', 'Career'], decisions: 6 },
  { id: 't4', title: 'Investment Decision', description: 'ROI-focused template for financial investment analysis.', icon: '📈', color: '#F59E0B', tags: ['Finance', 'Investment'], decisions: 10 },
  { id: 't5', title: 'Key Hire', description: 'Comprehensive hiring evaluation with skills, culture, and compensation matrix.', icon: '👥', color: '#EF4444', tags: ['HR', 'Team'], decisions: 7 },
  { id: 't6', title: 'Buy a House', description: 'Personal finance and lifestyle decision framework for property purchase.', icon: '🏡', color: '#06B6D4', tags: ['Personal', 'Finance'], decisions: 9 },
  { id: 't7', title: 'Vendor Selection', description: 'Compare and evaluate vendors on cost, quality, risk, and fit.', icon: '🤝', color: '#F97316', tags: ['Operations', 'Procurement'], decisions: 5 },
  { id: 't8', title: 'Technology Adoption', description: 'Framework for evaluating new technologies and platforms.', icon: '⚙️', color: '#64748B', tags: ['Technology', 'Innovation'], decisions: 8 },
];

export const templatePresets: Record<string, { decisions: DecisionCard[]; connections: Connection[] }> = {
  t1: {
    decisions: [
      {
        id: 't1_d1', title: 'MVP Feature Scope', description: 'Define core vs deferred features for v1 launch window.',
        pros: ['Faster time to market', 'Lower dev risk', 'Clear focus'], cons: ['Fewer launch features'],
        risk: 'Low', cost: '₹15L', costRaw: 1500000, dependencies: ['Product Team'], confidence: 89,
        tags: ['Product', 'Scope'], owner: 'Slora Bar', ownerAvatar: 'SB', dueDate: '2024-03-01', priority: 'High', status: 'In Review', x: 150, y: 180,
        aiRecommendation: 'Lock MVP scope now', aiAlternative: 'Add 2 stretch features', aiConfidence: 94, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't1_d2', title: 'Pricing & Tier Strategy', description: 'Structure Freemium, Pro, and Enterprise subscription tiers.',
        pros: ['Maximizes ARPU', 'Clear upsell path'], cons: ['Needs billing integration'],
        risk: 'Medium', cost: '₹5L', costRaw: 500000, dependencies: ['Finance', 'Product'], confidence: 84,
        tags: ['Pricing', 'Monetization'], owner: 'Rohit Verma', ownerAvatar: 'RV', dueDate: '2024-03-10', priority: 'High', status: 'Draft', x: 550, y: 160,
        aiRecommendation: 'Launch 3 tiers ($19/$49/$199)', aiAlternative: 'Flat $29 pricing', aiConfidence: 88, favorite: false, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't1_d3', title: 'Beta Testing Program', description: 'Onboard 50 design partner companies for pre-launch feedback.',
        pros: ['Catches bugs early', 'Testimonial generation'], cons: ['High support touchpoint'],
        risk: 'Low', cost: '₹3L', costRaw: 300000, dependencies: ['Customer Success'], confidence: 92,
        tags: ['Beta', 'Feedback'], owner: 'Sneha Patel', ownerAvatar: 'SP', dueDate: '2024-02-28', priority: 'Urgent', status: 'In Review', x: 350, y: 440,
        aiRecommendation: 'Cap at 50 design partners', aiAlternative: 'Open public beta', aiConfidence: 96, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't1_d4', title: 'Go-to-Market Channels', description: 'Execute Product Hunt, LinkedIn Ads, and TechCrunch PR blitz.',
        pros: ['Massive early spike', 'Brand credibility'], cons: ['High ad spend'],
        risk: 'Medium', cost: '₹20L', costRaw: 2000000, dependencies: ['Marketing Team'], confidence: 80,
        tags: ['Marketing', 'GTM'], owner: 'Slora Bar', ownerAvatar: 'SB', dueDate: '2024-03-15', priority: 'High', status: 'Draft', x: 780, y: 420,
        aiRecommendation: 'Focus 70% budget on LinkedIn B2B', aiAlternative: 'Influencer marketing', aiConfidence: 85, favorite: false, comments: [], createdAt: '2024-01-25'
      }
    ],
    connections: [
      { id: 't1_c1', from: 't1_d1', to: 't1_d3', label: 'Enables Beta' },
      { id: 't1_c2', from: 't1_d2', to: 't1_d4', label: 'Feeds Pricing into GTM' },
      { id: 't1_c3', from: 't1_d3', to: 't1_d4', label: 'Validates GTM' },
    ]
  },
  t2: {
    decisions: [
      {
        id: 't2_d1', title: 'Geographic Market Evaluation', description: 'Compare Singapore, Vietnam, and Indonesia as APAC headquarters.',
        pros: ['High growth region', 'Talent availability'], cons: ['Regulatory hurdles'],
        risk: 'High', cost: '₹40L', costRaw: 4000000, dependencies: ['Strategy Team'], confidence: 78,
        tags: ['Expansion', 'APAC'], owner: 'Sneha Patel', ownerAvatar: 'SP', dueDate: '2024-04-15', priority: 'High', status: 'In Review', x: 180, y: 160,
        aiRecommendation: 'Select Singapore HQ', aiAlternative: 'Jakarta Hub', aiConfidence: 88, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't2_d2', title: 'Local Entity & Tax Setup', description: 'Incorporate local subsidiary and setup cross-border tax structure.',
        pros: ['Full legal compliance', 'Repatriation channel'], cons: ['Legal retainer fees'],
        risk: 'Medium', cost: '₹12L', costRaw: 1200000, dependencies: ['Legal', 'Finance'], confidence: 85,
        tags: ['Legal', 'Compliance'], owner: 'Rohit Verma', ownerAvatar: 'RV', dueDate: '2024-05-01', priority: 'High', status: 'Draft', x: 580, y: 180,
        aiRecommendation: 'Incorporate Private Limited in SG', aiAlternative: 'Branch office', aiConfidence: 91, favorite: false, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't2_d3', title: 'Regional Office & Hiring', description: 'Hire Country Manager and 5 local Account Executives.',
        pros: ['Native market access', 'Faster deal closing'], cons: ['High payroll commitment'],
        risk: 'Medium', cost: '₹80L/yr', costRaw: 8000000, dependencies: ['HR', 'Operations'], confidence: 81,
        tags: ['Hiring', 'Ops'], owner: 'Kavita Sharma', ownerAvatar: 'KS', dueDate: '2024-06-01', priority: 'Urgent', status: 'Draft', x: 380, y: 460,
        aiRecommendation: 'Hire Country Manager first', aiAlternative: 'Relocate internal team', aiConfidence: 86, favorite: true, comments: [], createdAt: '2024-01-25'
      }
    ],
    connections: [
      { id: 't2_c1', from: 't2_d1', to: 't2_d2', label: 'Requires Entity' },
      { id: 't2_c2', from: 't2_d2', to: 't2_d3', label: 'Enables Hiring' },
    ]
  },
  t3: {
    decisions: [
      {
        id: 't3_d1', title: 'Role & Responsibility Audit', description: 'Evaluate Staff Engineer vs Engineering Manager transition track.',
        pros: ['Higher compensation', 'Broader impact'], cons: ['Less hands-on coding'],
        risk: 'Low', cost: 'Personal Effort', costRaw: 0, dependencies: ['Personal Alignment'], confidence: 90,
        tags: ['Career', 'Growth'], owner: 'Slora Bar', ownerAvatar: 'SB', dueDate: '2024-02-15', priority: 'High', status: 'In Review', x: 200, y: 180,
        aiRecommendation: 'Choose IC Track (Staff)', aiAlternative: 'Management Track', aiConfidence: 93, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't3_d2', title: 'Upskilling & System Design', description: 'Complete advanced distributed systems & AI architecture certifications.',
        pros: ['High market demand', 'Premium pay scale'], cons: ['10 hrs/week study'],
        risk: 'Low', cost: '₹1.5L', costRaw: 150000, dependencies: ['Time Allocation'], confidence: 95,
        tags: ['Skills', 'Learning'], owner: 'Slora Bar', ownerAvatar: 'SB', dueDate: '2024-03-31', priority: 'Medium', status: 'Draft', x: 600, y: 220,
        aiRecommendation: 'Focus on System Design & Distributed Systems', aiAlternative: 'AI Specialist', aiConfidence: 91, favorite: false, comments: [], createdAt: '2024-01-25'
      }
    ],
    connections: [
      { id: 't3_c1', from: 't3_d1', to: 't3_d2', label: 'Guides Skill Focus' },
    ]
  },
  t4: {
    decisions: [
      {
        id: 't4_d1', title: 'Asset Allocation Model', description: 'Structure 60% Equity, 25% Fixed Income, 15% Alternative Assets.',
        pros: ['Balanced risk/return', 'Inflation hedge'], cons: ['Market volatility'],
        risk: 'Medium', cost: '₹50L Capital', costRaw: 5000000, dependencies: ['Finance Advisor'], confidence: 88,
        tags: ['Finance', 'Portfolio'], owner: 'Rohit Verma', ownerAvatar: 'RV', dueDate: '2024-02-28', priority: 'High', status: 'In Review', x: 180, y: 180,
        aiRecommendation: 'Rebalance quarterly to 60/25/15', aiAlternative: '70/30 aggressive', aiConfidence: 90, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't4_d2', title: 'Real Estate vs Index Funds', description: 'Compare commercial property yield vs Nifty 50 index compounding.',
        pros: ['Stable monthly rent', 'Long term capital gain'], cons: ['Illiquid asset class'],
        risk: 'Medium', cost: '₹35L', costRaw: 3500000, dependencies: ['Legal Audit'], confidence: 82,
        tags: ['Real Estate', 'Stocks'], owner: 'Slora Bar', ownerAvatar: 'SB', dueDate: '2024-03-20', priority: 'Medium', status: 'Draft', x: 600, y: 200,
        aiRecommendation: 'Index Funds for 80% capital', aiAlternative: 'REITs', aiConfidence: 87, favorite: false, comments: [], createdAt: '2024-01-25'
      }
    ],
    connections: [
      { id: 't4_c1', from: 't4_d1', to: 't4_d2', label: 'Allocates Equity Portion' },
    ]
  },
  t5: {
    decisions: [
      {
        id: 't5_d1', title: 'VP Engineering Role Definition', description: 'Finalize responsibilities for scaling tech from 15 to 50 engineers.',
        pros: ['Accelerates delivery', 'Better architecture'], cons: ['High salary budget'],
        risk: 'Low', cost: '₹90L/yr', costRaw: 9000000, dependencies: ['CEO', 'CTO'], confidence: 93,
        tags: ['Hiring', 'Leadership'], owner: 'Kavita Sharma', ownerAvatar: 'KS', dueDate: '2024-02-20', priority: 'Urgent', status: 'In Review', x: 200, y: 180,
        aiRecommendation: 'Approve job profile with ESOP package', aiAlternative: 'Promote Director', aiConfidence: 95, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't5_d2', title: 'Executive Search Firm Selection', description: 'Engage specialized tech executive recruiters on retainer.',
        pros: ['Guaranteed candidate pool', 'Discreet search'], cons: ['25% placement fee'],
        risk: 'Medium', cost: '₹22L Fee', costRaw: 2200000, dependencies: ['Finance'], confidence: 86,
        tags: ['Recruiting', 'Executive'], owner: 'Kavita Sharma', ownerAvatar: 'KS', dueDate: '2024-03-01', priority: 'High', status: 'Draft', x: 600, y: 220,
        aiRecommendation: 'Retain Korn Ferry for 60 days', aiAlternative: 'In-house sourcing', aiConfidence: 89, favorite: false, comments: [], createdAt: '2024-01-25'
      }
    ],
    connections: [
      { id: 't5_c1', from: 't5_d1', to: 't5_d2', label: 'Initiates Search' },
    ]
  },
  t6: {
    decisions: [
      {
        id: 't6_d1', title: 'Property Location & Gated Society', description: 'Evaluate Koramangala vs Whitefield 3BHK options.',
        pros: ['Near tech parks', 'High resale value'], cons: ['Premium cost/sqft'],
        risk: 'Low', cost: '₹2.4Cr', costRaw: 24000000, dependencies: ['Family', 'Bank Audit'], confidence: 89,
        tags: ['Home', 'Location'], owner: 'Slora Bar', ownerAvatar: 'SB', dueDate: '2024-04-10', priority: 'High', status: 'In Review', x: 180, y: 180,
        aiRecommendation: 'Select Koramangala 3BHK project', aiAlternative: 'Whitefield villa', aiConfidence: 92, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't6_d2', title: 'Home Loan vs Fixed Deposit Liquidation', description: 'Structure 80% bank financing at 8.4% interest vs cash payment.',
        pros: ['Tax deduction benefits', 'Preserves liquid cash'], cons: ['20 yr interest burden'],
        risk: 'Medium', cost: '₹1.8Cr Loan', costRaw: 18000000, dependencies: ['Bank Sanction'], confidence: 87,
        tags: ['Finance', 'Mortgage'], owner: 'Rohit Verma', ownerAvatar: 'RV', dueDate: '2024-04-25', priority: 'High', status: 'Draft', x: 580, y: 200,
        aiRecommendation: 'Take 80% loan with 5 yr pre-payment plan', aiAlternative: '50% loan', aiConfidence: 90, favorite: false, comments: [], createdAt: '2024-01-25'
      }
    ],
    connections: [
      { id: 't6_c1', from: 't6_d1', to: 't6_d2', label: 'Determines Loan Value' },
    ]
  },
  t7: {
    decisions: [
      {
        id: 't7_d1', title: 'Cloud Infrastructure Vendor (AWS vs GCP)', description: 'Select primary cloud provider for scalable AI workload hosting.',
        pros: ['GCP: Native BigQuery & Gemini', 'AWS: Broad service catalog'], cons: ['Migration cost'],
        risk: 'Medium', cost: '₹30L/yr', costRaw: 3000000, dependencies: ['Tech Lead'], confidence: 91,
        tags: ['Cloud', 'Infrastructure'], owner: 'Dev Anand', ownerAvatar: 'DA', dueDate: '2024-02-28', priority: 'Urgent', status: 'In Review', x: 200, y: 180,
        aiRecommendation: 'Choose GCP for AI/Data stack', aiAlternative: 'AWS Multi-Cloud', aiConfidence: 94, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't7_d2', title: 'SLA & Support Tier Contract', description: 'Negotiate 99.99% uptime guarantee with 15-minute response SLA.',
        pros: ['Business continuity', 'Dedicated TAM'], cons: ['20% support premium'],
        risk: 'Low', cost: '₹6L/yr', costRaw: 600000, dependencies: ['DevOps'], confidence: 88,
        tags: ['SLA', 'Support'], owner: 'Meera Iyer', ownerAvatar: 'MI', dueDate: '2024-03-15', priority: 'Medium', status: 'Draft', x: 600, y: 200,
        aiRecommendation: 'Sign Enterprise Support tier', aiAlternative: 'Business Support', aiConfidence: 89, favorite: false, comments: [], createdAt: '2024-01-25'
      }
    ],
    connections: [
      { id: 't7_c1', from: 't7_d1', to: 't7_d2', label: 'Binds SLA' },
    ]
  },
  t8: {
    decisions: [
      {
        id: 't8_d1', title: 'Frontend Framework Modernization', description: 'Migrate legacy Webpack setup to Vite 8 + React 18 + Tailwind v4.',
        pros: ['10x faster HMR', 'Instant cold builds', 'Modern bundle size'], cons: ['1 week dev migration'],
        risk: 'Low', cost: '₹4L Dev Hours', costRaw: 400000, dependencies: ['Frontend Team'], confidence: 96,
        tags: ['Vite', 'React', 'Frontend'], owner: 'Slora Bar', ownerAvatar: 'SB', dueDate: '2024-02-10', priority: 'Urgent', status: 'Decided', x: 180, y: 180,
        aiRecommendation: 'Migrate to Vite + React 18 immediately', aiAlternative: 'Incremental migration', aiConfidence: 98, favorite: true, comments: [], createdAt: '2024-01-25'
      },
      {
        id: 't8_d2', title: 'State Management Standardization', description: 'Standardize global state management on Zustand across all micro-apps.',
        pros: ['Zero boilerplate', 'High performance', 'Tiny footprint'], cons: ['Refactoring existing Context'],
        risk: 'Low', cost: '₹2L Dev Hours', costRaw: 200000, dependencies: ['Engineering'], confidence: 94,
        tags: ['Zustand', 'State'], owner: 'Dev Anand', ownerAvatar: 'DA', dueDate: '2024-02-20', priority: 'High', status: 'In Review', x: 580, y: 200,
        aiRecommendation: 'Adopt Zustand across codebase', aiAlternative: 'Redux Toolkit', aiConfidence: 95, favorite: false, comments: [], createdAt: '2024-01-25'
      }
    ],
    connections: [
      { id: 't8_c1', from: 't8_d1', to: 't8_d2', label: 'Establishes Architecture' },
    ]
  }
};

export const analyticsData = {
  successRate: [
    { month: 'Aug', rate: 71 }, { month: 'Sep', rate: 75 }, { month: 'Oct', rate: 68 },
    { month: 'Nov', rate: 82 }, { month: 'Dec', rate: 79 }, { month: 'Jan', rate: 87 },
  ],
  decisionDistribution: [
    { name: 'Decided', value: 38, color: '#10B981' },
    { name: 'In Review', value: 29, color: '#6366F1' },
    { name: 'Draft', value: 21, color: '#F59E0B' },
    { name: 'Archived', value: 12, color: '#64748B' },
  ],
  riskAnalysis: [
    { month: 'Aug', low: 8, medium: 5, high: 3 }, { month: 'Sep', low: 10, medium: 6, high: 2 },
    { month: 'Oct', low: 7, medium: 8, high: 4 }, { month: 'Nov', low: 12, medium: 5, high: 2 },
    { month: 'Dec', low: 9, medium: 7, high: 3 }, { month: 'Jan', low: 14, medium: 6, high: 1 },
  ],
  confidenceTrend: [
    { month: 'Aug', confidence: 72 }, { month: 'Sep', confidence: 75 }, { month: 'Oct', confidence: 70 },
    { month: 'Nov', confidence: 80 }, { month: 'Dec', confidence: 82 }, { month: 'Jan', confidence: 87 },
  ],
  monthlyDecisions: [
    { month: 'Aug', count: 16 }, { month: 'Sep', count: 18 }, { month: 'Oct', count: 19 },
    { month: 'Nov', count: 24 }, { month: 'Dec', count: 19 }, { month: 'Jan', count: 21 },
  ],
  kpis: {
    totalDecisions: 117,
    avgConfidence: 82,
    decisionsThisMonth: 21,
    successRate: 87,
    avgTimeToDecide: '4.2 days',
    activeWorkspaces: 8,
  },
};

export const teamMembers = [
  { id: 'm1', name: 'Slora Bar', role: 'CEO', avatar: 'SB', color: '#6366F1', online: true, decisions: 34 },
  { id: 'm2', name: 'Sneha Patel', role: 'COO', avatar: 'SP', color: '#8B5CF6', online: true, decisions: 28 },
  { id: 'm3', name: 'Kavita Sharma', role: 'VP HR', avatar: 'KS', color: '#10B981', online: false, decisions: 19 },
  { id: 'm4', name: 'Rohit Verma', role: 'CFO', avatar: 'RV', color: '#F59E0B', online: true, decisions: 22 },
  { id: 'm5', name: 'Dev Anand', role: 'CTO', avatar: 'DA', color: '#EF4444', online: false, decisions: 31 },
  { id: 'm6', name: 'Meera Iyer', role: 'VP Ops', avatar: 'MI', color: '#06B6D4', online: true, decisions: 17 },
];

export const activityFeed = [
  { id: 'a1', user: 'Slora Bar', avatar: 'SB', action: 'marked "Launch Product v2" as High Priority', time: '5 min ago', type: 'update' },
  { id: 'a2', user: 'Sneha Patel', avatar: 'SP', action: 'added connection between "Series B" and "APAC Expansion"', time: '12 min ago', type: 'connect' },
  { id: 'a3', user: 'Dev Anand', avatar: 'DA', action: 'created a new decision "Data Pipeline Migration"', time: '1h ago', type: 'create' },
  { id: 'a4', user: 'Rohit Verma', avatar: 'RV', action: 'updated confidence score on "Series B" to 81%', time: '2h ago', type: 'update' },
  { id: 'a5', user: 'Kavita Sharma', avatar: 'KS', action: 'decided "Key Engineering Hire" — approved!', time: '3h ago', type: 'decide' },
  { id: 'a6', user: 'Meera Iyer', avatar: 'MI', action: 'added comment on "Office Expansion"', time: '4h ago', type: 'comment' },
];
