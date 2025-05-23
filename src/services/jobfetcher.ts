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
      await slowDelay();
      // TODO: job scanning
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
}
