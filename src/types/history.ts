import { MainMode, SubMode } from './modes';

export interface HistoryItem {
  id: string;
  timestamp: string;
  mainMode: MainMode;
  subMode: SubMode;
  inputPreview: string;
  status: 'success' | 'error' | 'processing';
}
