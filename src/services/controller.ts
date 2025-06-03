import seekFetcher from "./jobfetcher/seek";

export default async function starter(
  form: PanelFormValues,
  signal: AbortSignal
): Promise<void> {
  const seek = new seekFetcher(form);
  await Promise.all([
    seek.run(signal)
  ]);
}
