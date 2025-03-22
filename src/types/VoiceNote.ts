import { Timestamp } from 'firebase/firestore';

export interface VoiceNote {
  id?: string;
  text: string;
  createdAt: Timestamp;
  userId: string;
} 