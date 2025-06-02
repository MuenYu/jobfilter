export default abstract class AI {
  protected queue: Task[] = [];
  protected currentJob: Task | undefined;
  protected deadCount: number = 0;

  async run(signal: AbortSignal) {
    await new Promise<void>((resolve) => {
      const interval = setInterval(async () => {
        await this.intervalExe();
        if (this.deadCount >= 10 || signal.aborted) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  }

  async intervalExe(): Promise<void> {
    if (this.currentJob) return;
    if (this.queue.length === 0) {
      ++this.deadCount;
      return;
    }
    this.currentJob = this.queue.shift();
    if (this.currentJob) {
      this.deadCount = 0;
      const result: JDAnalysis = await this.analyzeJD(this.currentJob.jdInfo);
      console.log(result);
      if (result.similarity > 0.8) {
        await chrome.runtime.sendMessage({
          type: "openTab",
          window: this.currentJob.window,
          url: this.currentJob.jdInfo.url,
        });
      }
      this.currentJob = undefined;
    }
  }

  abstract analyzeJD(jd: JDInfo): Promise<JDAnalysis>;
}
