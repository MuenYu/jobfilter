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

interface Settings {
  ollamaUrl: string;
  ollamaModel: string;
}

interface JDInfo {
  title: string;
  company: string;
  location: string;
  detail: string;
  url: string;
}

interface Task {
  jdInfo: JDInfo;
  criteria: string;
}

interface JDAnalysis {
  match: boolean;
  reason: string;
}

interface TaskQueue {
  queue: Task[];
  currentJob: Task | undefined;
}
