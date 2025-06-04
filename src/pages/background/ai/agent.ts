export default abstract class Agent {
  async run(task: Task): Promise<void> {
    const result: JDAnalysis = await this.analyzeJD(task);
    if (result.match) {
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

  abstract analyzeJD(task: Task): Promise<JDAnalysis>;
}
