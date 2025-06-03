declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.json" {
  const content: string;
  export default content;
}

interface PanelFormValues {
  keywords: string;
  criteria: string;
}

interface JDInfo {
  title: string;
  company: string;
  location: string;
  detail: string;
  url: string;
}

interface Task{
  windowId: number;
  jdInfo: JDInfo;
}

interface JDAnalysis {
  relevance: number;
  matchedKeywords: string[];
  unmatchedKeywords: string[];
}

interface TaskQueue {
  queue: Task[];
  currentJob: Task | undefined;
}