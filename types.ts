
export enum AppId {
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  CONTACT = 'CONTACT',
  CHAT = 'CHAT',
  GITHUB = 'GITHUB',
  NO_APP = 'NO_APP',
  TERMINAL = 'TERMINAL',
}

export interface WindowState {
  id: AppId;
  title: string;
  icon: any; // Lucide icon component
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ImageResolution {
  ONE_K = '1K',
  TWO_K = '2K',
  FOUR_K = '4K',
}