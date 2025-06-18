import Operator from "./operator";

export default class Seek extends Operator {
  async fetchJDInfo(): Promise<JDInfo | null> {
    const title = document.querySelector(
      'h1[data-automation="job-detail-title"] a'
    ) as HTMLAnchorElement;
    const company = document.querySelector(
      'span[data-automation="advertiser-name"]'
    ) as HTMLSpanElement;
    const location = document.querySelector(
      'span[data-automation="job-detail-location"]'
    ) as HTMLSpanElement;
    const detail = document.querySelector(
      'div[data-automation="jobAdDetails"]'
    ) as HTMLDivElement;

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

  async getJDCountOnCurPage(): Promise<number> {
    return document.querySelectorAll('[data-card-type="JobCard"]').length;
  }

  async nextPage(): Promise<boolean> {
    const nextPageButton = document.querySelector(
      'a[aria-label="Next"][aria-hidden="false"]'
    ) as HTMLAnchorElement;
    if (nextPageButton) {
      nextPageButton.click();
      return true;
    }
    return false;
  }

  async clickJD(id: number): Promise<Boolean> {
    const jobCard = document.querySelector(`#jobcard-${id}`) as HTMLElement;
    if (!jobCard) return false;
    const stateBlcok = jobCard.querySelector('[data-automation="jobListingDate"]') as HTMLElement;
    if (!stateBlcok) return false;
    const stateText: string = stateBlcok.innerText;
    if (stateText.includes('Viewed') || stateText.includes('Applied')) return false;
    jobCard.click();
    return true;
  }
}
