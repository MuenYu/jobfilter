import Agent from "./agent";
import ollama from 'ollama/browser'
import { z } from "zod";
import { zodToJsonSchema } from 'zod-to-json-schema';

export default class OllamaAgent extends Agent {
  apiUrl: string = "http://localhost:11434/api/chat";
  model: string = "qwen3:32b";

  async analyzeJD(task: Task): Promise<JDAnalysis> {
    const resp = await ollama.generate({
      model: this.model,
      prompt: this.promptBuilder(task),
      format: zodToJsonSchema(template),
    })
    return JSON.parse(resp.response) as JDAnalysis;
  }
}

const template = z.object({
    apply: z.boolean().describe('wether the candidate should apply for the job'),
    reason: z.string().describe('the reason for your decision in short'),
})