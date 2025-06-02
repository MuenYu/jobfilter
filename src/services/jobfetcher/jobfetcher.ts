import { slowDelay } from "@src/util";

export default abstract class JobFetcher {
  protected window: chrome.windows.Window | undefined;
  protected tabId: number | undefined;
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

        for (let i = 1; i <= count; i++) {
          if (signal.aborted) return;
          await this.clickJD(i);
          await slowDelay();
          const jd: JDInfo = await this.fetchJDInfo();

        }

        if (!(await this.nextPage())) break;
        await slowDelay();
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
    });
  }

  async fetchJDInfo(): Promise<JDInfo> {
    if (this.tabId === undefined) throw new Error("Tab ID is null");
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "fetchJDInfo",
    });
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
          this.window = window;
          if (window && window.tabs && window.tabs[0]) {
            this.tabId = window.tabs[0].id || undefined;
            resolve();
          }
        }
      );
    });
  }

  async getJDCountOnCurPage(): Promise<number> {
    if (this.tabId === undefined) throw new Error("Tab ID is null");
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "getJDCountOnCurPage",
    });
  }

  async nextPage(): Promise<boolean> {
    if (this.tabId === undefined) throw new Error("Tab ID is null");
    return await chrome.tabs.sendMessage(this.tabId, {
      action: "nextPage",
    });
  }
}
