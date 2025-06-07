import { Ollama } from "ollama/browser";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const template = z.object({
  match: z
    .boolean()
    .describe("true: if all the requirements are met, false: otherwise"),
  reason: z.string().describe("the reason for your decision in short"),
});

export async function analyzeJD(task: Task): Promise<JDAnalysis> {
  const { settings } = (await chrome.storage.local.get("settings")) as {
    settings: Settings;
  };
  const url: string = settings?.ollamaUrl || "http://localhost:11434";
  const model: string = settings?.ollamaModel || "qwen3:14b";
  const client: Ollama = new Ollama({ host: url });

  const resp = await client.generate({
    model: model,
    prompt: promptBuilder(task),
    format: zodToJsonSchema(template),
  });
  return JSON.parse(resp.response) as JDAnalysis;
}

function promptBuilder(task: Task): string {
  return `
    Read and analyze the provided Job Description carefully. Determine if it meets all the following requirements: 
    
    Requirements:
    \`\`\`
    ${task.criteria}
    \`\`\`
    
    Job description:
    \`\`\`
    ${task.jdInfo.title} at ${task.jdInfo.company} in ${task.jdInfo.location}

    ${task.jdInfo.detail}
    \`\`\`
  `;
}
