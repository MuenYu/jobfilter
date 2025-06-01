import { slowDelay } from "@src/util";

export default abstract class JobFetcher {
  protected tabId: number | null = null;
  protected url: string = "";

  constructor(url: string) {
    this.url = url;
  }

  async run(form: PanelFormValues, signal: AbortSignal): Promise<void> {
    const { keywords, criteria } = form;

    try {
      await this.init();
      await slowDelay();
      await this.initSearch(keywords);

      await slowDelay(5);

      const count = await this.getJDCountOnCurPage();
      alert(`当前页共有${count}个职位`);
    } catch (error) {
      console.error("Error initializing job search:", error);
    }
  }

  async init(): Promise<void> {
    return new Promise((resolve) => {
      chrome.windows.create(
        {
          url: this.url,
          type: "normal",
          state: "normal",
          width: 1600,
          height: 900,
          focused: false,
        },
        (window) => {
          if (window && window.tabs && window.tabs[0]) {
            this.tabId = window.tabs[0].id || null;
            resolve();
          }
        }
      );
    });
  }

  async initSearch(keywords: string): Promise<void> {
    if (this.tabId === null) return;
    await chrome.tabs.sendMessage(this.tabId, {
      action: "fillSearchForm",
      keywords: keywords,
    });
  }

  async getJDCountOnCurPage(): Promise<number> {
    if (this.tabId === null) return 0;
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "getJDCountOnCurPage",
    }); 
  }
}
