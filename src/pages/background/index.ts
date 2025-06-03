import Agent from "./ai/agent";
import OllamaAgent from "./ai/ollama-agent";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => {
    console.error(error);
  });

let agent: Agent = new OllamaAgent(); // the unique agent in the background script

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "analyzeJD" && message.task) {
    agent.run(message.task);
  }
});
