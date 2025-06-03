export default abstract class Agent {
  async run(task: Task): Promise<void> {
    const result: JDAnalysis = await this.analyzeJD(task);
    if (result.apply) {
      chrome.tabs.create({
        url: task.jdInfo.url,
        active: false,
        windowId: task.windowId,
      });
    }
    console.log(task, result);
  }

  promptBuilder(task: Task): string {
    return `
    You are a job filter tool.
    You need to decide wether the candidate should apply for the job, according to the job description and the matching criteria.

    Job description:
    \`\`\`md
    ## ${task.jdInfo.title}
    ${task.jdInfo.detail}
    \`\`\`

    Matching criteria:
    \`\`\`md
    ${task.criteria}
    \`\`\`
  `;
  }

  abstract analyzeJD(task: Task): Promise<JDAnalysis>;
}
