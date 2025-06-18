import Operator from "./operator";

export default class Linkedin extends Operator {
  async getJDCountOnCurPage(): Promise<number> {
    if (this.isNoMatch()) return 0;

    const list = document.querySelector(
      ".scaffold-layout__list > div"
    ) as HTMLElement;
    await this.scrollTo(list, 10, 10);
    // TODO: change it to items only in list
    return list.querySelectorAll('div[data-view-name="job-card"]').length;
  }

  async nextPage(): Promise<boolean> {
    if (this.isNoMatch()) return false;
    const nextPageButton = document.querySelector(
      ".jobs-search-pagination__button--next"
    ) as HTMLButtonElement;
    if (nextPageButton) {
      nextPageButton.click();
      return true;
    }
    return false;
  }

  async clickJD(id: number): Promise<Boolean> {
    const jobList = document.querySelectorAll(
      'div[data-view-name="job-card"]'
    ) as NodeListOf<HTMLDivElement>;
    const jobCard = jobList[id - 1] as HTMLDivElement;
    if (!jobCard) return false;
    const stateBlcok = jobCard.querySelector(
      ".job-card-list__footer-wrapper"
    ) as HTMLElement;
    if (!stateBlcok) return false;
    const stateText: string = stateBlcok.innerText;
    if (stateText.includes("Viewed") || stateText.includes("Applied"))
      return false;
    jobCard.click();
    return true;
  }

  async fetchJDInfo(): Promise<JDInfo | null> {
    const title = document.querySelector(
      ".job-details-jobs-unified-top-card__job-title a"
    ) as HTMLAnchorElement;
    const company = document.querySelector(
      ".job-details-jobs-unified-top-card__company-name"
    ) as HTMLElement;
    const location = document.querySelector(
      ".job-details-jobs-unified-top-card__primary-description-container .tvm__text"
    ) as HTMLElement;
    const detail = document.querySelector("#job-details") as HTMLElement;

    if (!title || !company || !location || !detail) {
      return null;
    }

    const jdInfo: JDInfo = {
      title: title.innerText || "",
      company: company.innerText || "",
      location: location.innerText || "",
      detail: detail.innerText || "",
      url: title.href || "",
    };
    return jdInfo;
  }

  // if no match, linkedin will still show recommened jobs, so we need to check if the banner is shown
  isNoMatch(): boolean {
    return document.querySelector(".jobs-search-no-results-banner") !== null;
  }
}
