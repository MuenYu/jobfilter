export default abstract class Agent {
  async run(task: Task): Promise<void> {
    const result: JDAnalysis = await this.analyzeJD(task.jdInfo);
    if (result.relevance >= 0.8) {
      chrome.tabs.create({
        url: task.jdInfo.url,
        active: false,
        windowId: task.windowId,
      });
    }
  }

  abstract analyzeJD(jd: JDInfo): Promise<JDAnalysis>;
}
