import { slowDelay } from "@src/util";
import { analyzeJD } from "./ollama";

export default abstract class JobFetcher {
  protected windowId: number | undefined;
  protected tabId: number | undefined;
  protected url: string;
  protected formData: PanelFormValues;
  protected platform: string | undefined;

  constructor(formData: PanelFormValues) {
    this.formData = formData;
    this.url = this.urlBuilder();
  }

  abstract urlBuilder(): string;

  async run(signal: AbortSignal): Promise<void> {
    try {
      await this.init();
      if (this.windowId === undefined) throw new Error("Window is null");

      while (true) {
        await slowDelay();
        await this.goToFooter();
        await slowDelay();
        const count = await this.getJDCountOnCurPage();

        for (let i = 1; i <= count; i++) {
          if (signal.aborted) return;
          await this.clickJD(i);
          await slowDelay();
          const jd: JDInfo = await this.fetchJDInfo();
          if (jd) {
            const task: Task = {
              jdInfo: jd,
              criteria: this.formData.criteria,
            };
            const result: JDAnalysis = await analyzeJD(task);
            console.log(result);
            if (result.match) {
              await chrome.tabs.create({
                url: jd.url,
                active: false,
                windowId: this.windowId,
              });
            }
          }
        }

        if (!(await this.nextPage())) break;
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  }

  async clickJD(id: number): Promise<void> {
    if (this.tabId === undefined) throw new Error("Tab ID is null");
    await chrome.tabs.sendMessage(this.tabId, {
      action: "clickJD",
      id: id,
      platform: this.platform,
    });
  }

  async fetchJDInfo(): Promise<JDInfo> {
    if (this.tabId === undefined) throw new Error("Tab ID is null");
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "fetchJDInfo",
      platform: this.platform,
    });
  }

  async init(): Promise<void> {
    const window = await chrome.windows.create({
      url: this.url,
      type: "normal",
      state: "normal",
      width: 1600,
      height: 900,
      focused: false,
    });
    const tab = window.tabs?.[0];
    if (!window || !tab) throw new Error("Window or tab is null");
    this.windowId = window.id;
    this.tabId = tab.id;

    return new Promise((resolve) => {
      if (this.tabId === undefined) throw new Error("Tab ID is null");
      chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
        if (tabId === this.tabId && changeInfo.status === "complete") {
          resolve();
        }
      });
    });
  }

  async getJDCountOnCurPage(): Promise<number> {
    if (this.tabId === undefined) throw new Error("Tab ID is null");
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "getJDCountOnCurPage",
      platform: this.platform,
    });
  }

  async nextPage(): Promise<boolean> {
    if (this.tabId === undefined) throw new Error("Tab ID is null");
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "nextPage",
      platform: this.platform,
    });
  }

  async goToFooter(): Promise<void> {
    if (this.tabId === undefined) throw new Error("Tab ID is null");
    await chrome.tabs.sendMessage(this.tabId, {
      action: "goToFooter",
      platform: this.platform,
    });
  }
}
