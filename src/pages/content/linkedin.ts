import Operator from "./operator";

export default class Linkedin extends Operator {
  getJDCountOnCurPage(): number {
    if (this.isNoMatch()) return 0;
    return document.querySelectorAll('div[data-view-name="job-card"]').length;
  }

  nextPage(): boolean {
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

  clickJD(id: number): void {
    const jobList = document.querySelectorAll(
      'div[data-view-name="job-card"]'
    ) as NodeListOf<HTMLDivElement>;
    if (id <= jobList.length) {
      jobList[id - 1].click();
    } else {
      throw new Error("Job not found");
    }
  }

  fetchJDInfo(): JDInfo {
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
      alert(`Job detail not found`);
      throw new Error("Job detail not found");
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

  goToFooter(): void {
    const footer = document.querySelector(
      "#jobs-search-results-footer"
    ) as HTMLDivElement;
    footer.scrollIntoView({ behavior: "smooth" });
  }
}
