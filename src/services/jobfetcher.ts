import { slowDelay } from "@src/util";

export default abstract class JobFetcher {
  protected tabId: number | null = null;
  protected url: string;
  protected formData: PanelFormValues;

  constructor(formData: PanelFormValues) {
    this.formData = formData;
    this.url = this.urlBuilder();
  }

  abstract urlBuilder(): string;

  async run(signal: AbortSignal): Promise<void> {
    try {
      await this.init();
      await slowDelay();
      while (true) {
        const count = await this.getJDCountOnCurPage();
        alert(`${count} jobs on cur page`);
        if (!await this.nextPage()) break;
        await slowDelay();
      }
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

  async getJDCountOnCurPage(): Promise<number> {
    if (this.tabId === null) throw new Error("Tab ID is null");
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "getJDCountOnCurPage",
    });
  }

  async nextPage(): Promise<boolean> {
    if (this.tabId === null) throw new Error("Tab ID is null");
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "nextPage",
    })
  }
}
