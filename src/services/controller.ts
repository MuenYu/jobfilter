import Ollama from "./ai/ollama";
import seekFetcher from "./jobfetcher/seek";

export default async function starter(
  form: PanelFormValues,
  signal: AbortSignal
): Promise<void> {
  const ollama: Ollama = new Ollama();
  const seek = new seekFetcher(ollama, form);
  await Promise.all([
    ollama.run(signal),
    seek.run(signal)
  ]);
}
