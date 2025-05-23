import seekFetcher from "./seek";

export default async function starter(
  form: PanelFormValues,
  signal: AbortSignal
): Promise<void> {
  await Promise.all([seekFetcher.run(form, signal)]);
}
