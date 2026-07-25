export type Risk = 'Low' | 'Medium' | 'High' | 'Critical';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type Status = 'Draft' | 'In Review' | 'Decided' | 'Archived';

export interface DecisionCard {
  id: string;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  risk: Risk;
  cost: string;
  costRaw: number;
  dependencies: string[];
  confidence: number;
  tags: string[];
  owner: string;
  ownerAvatar: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  x: number;
  y: number;
  aiRecommendation: string;
  aiAlternative: string;
  aiConfidence: number;
  favorite: boolean;
  comments: DecisionComment[];
  createdAt: string;
}

export interface DecisionComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tags: string[];
  decisions: number;
}
