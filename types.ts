
export interface GeneratedCode {
  html: string;
  explanation: string;
  timestamp: number;
}

export enum ViewMode {
  PREVIEW = 'PREVIEW',
  CODE = 'CODE'
}

export interface HistoryItem {
  id: string;
  prompt: string;
  code: GeneratedCode;
}
